// ignore_for_file: file_names, prefer_const_constructors

import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sheger_parking_security/constants/api.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/constants/strings.dart';
import 'package:sheger_parking_security/models/Staff.dart';
import 'package:sheger_parking_security/pages/HomePage.dart';
import 'package:http/http.dart' as http;

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  bool _secureText = true;

  String? response;
  String? hashedPassword;
  bool socketError = false;

  Future login() async {
    var headersList = {'Accept': '*/*', 'Content-Type': 'application/json'};
    var url = Uri.parse('${base_url}/token:qwhu67fv56frt5drfx45e/staffs/login');

    var body = {"phone": staff.phone, "passwordHash": hashedPassword};

    try{
      var req = http.Request('POST', url);
      req.headers.addAll(headersList);
      req.body = json.encode(body);

      var res = await req.send();
      final resBody = await res.stream.bytesToString();

      setState(() {
        response = res.reasonPhrase;
        socketError = false;
      });

      if (res.statusCode >= 200 && res.statusCode < 300) {
        var data = json.decode(resBody);
        String email = data["email"].toString();
        String branchId = data["branch"].toString();

        var url = Uri.parse(
            '${base_url}/token:qwhu67fv56frt5drfx45e/branches/${branchId}');
        var req = http.Request('GET', url);
        req.headers.addAll(headersList);

        var resBranch = await req.send();
        final resBodyBranch = await resBranch.stream.bytesToString();
        String branchName = "";
        if (resBranch.statusCode >= 200 && resBranch.statusCode < 300) {
          var dataBranch = json.decode(resBodyBranch);
          branchName = dataBranch["name"].toString();
        }
        final SharedPreferences sharedPreferences =
        await SharedPreferences.getInstance();
        sharedPreferences.setString("email", email);
        sharedPreferences.setString("branchId", branchId);
        sharedPreferences.setString("branchName", branchName);

        Strings.branchId = branchId;
        Strings.branchName = branchName;

        Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => HomePage()));
      } else {}
    }
    catch (e) {
      setState(() {
        socketError = true;
      });
    }
  }

  Staff staff = Staff('', '', '', '', '');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Col.background,
      body: SingleChildScrollView(
        child: Container(
          color: Col.background,
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.fromLTRB(15, 40, 0, 0),
                  child: Text(
                    Strings.app_title,
                    style: TextStyle(
                      color: Col.primary,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.3,
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(15, 0, 0, 0),
                  child: Text(
                    "PARKING",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.3,
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(15, 40, 0, 0),
                  child: Text(
                    Strings.login,
                    style: TextStyle(
                      color: Col.Onbackground,
                      fontSize: 60,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.1,
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(25, 60, 25, 0),
                  child: Container(
                    alignment: Alignment.center,
                    child: TextFormField(
                      controller: TextEditingController(text: staff.phone),
                      onChanged: (value) {
                        staff.phone = value;
                      },
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "This field can not be empty";
                        } else {
                          return null;
                        }
                      },
                      decoration: InputDecoration(
                        hintText: "",
                        hintStyle: TextStyle(
                          color: Col.textfieldLabel,
                          fontSize: 14,
                          fontFamily: 'Nunito',
                          letterSpacing: 0.1,
                        ),
                        labelText: "Phone Number",
                        labelStyle: TextStyle(
                          color: Col.textfieldLabel,
                          fontSize: 14,
                          fontFamily: 'Nunito',
                          letterSpacing: 0,
                        ),
                        border: OutlineInputBorder(),
                        errorBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.red),
                        ),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(25, 20, 25, 0),
                  child: Container(
                    alignment: Alignment.center,
                    child: TextFormField(
                      controller:
                          TextEditingController(text: staff.passwordHash),
                      onChanged: (value) {
                        var bytes = utf8.encode(value);
                        var sha512 = sha256.convert(bytes);
                        var hashedPassword = sha512.toString();
                        this.hashedPassword = hashedPassword;
                        staff.passwordHash = value;
                      },
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "This field can not be empty";
                        } else {
                          return null;
                        }
                      },
                      decoration: InputDecoration(
                          hintText: "Password",
                          hintStyle: TextStyle(
                            color: Col.textfieldLabel,
                            fontSize: 14,
                            fontFamily: 'Nunito',
                            letterSpacing: 0.1,
                          ),
                          labelText: "Password",
                          labelStyle: TextStyle(
                            color: Col.textfieldLabel,
                            fontSize: 14,
                            fontFamily: 'Nunito',
                            letterSpacing: 0,
                          ),
                          border: OutlineInputBorder(),
                          suffixIcon: IconButton(
                            onPressed: () {
                              setState(() {
                                _secureText = !_secureText;
                              });
                            },
                            icon: Icon(
                              _secureText == true
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Col.Onbackground,
                            ),
                          )),
                      obscureText: _secureText,
                    ),
                  ),
                ),
                (response == "Not Found")
                    ? Padding(
                        padding: const EdgeInsets.only(top: 15, left: 25),
                        child: Text(
                          "One of the credentials is incorrect",
                          style: TextStyle(
                              color: Colors.redAccent,
                              fontWeight: FontWeight.bold,
                              fontSize: 15),
                        ),
                      )
                    : Text(""),
                (socketError)
                    ? Padding(
                  padding: const EdgeInsets.only(top: 5),
                  child: Center(
                    child: Text(
                      "There is an internet connection problem",
                      style: TextStyle(
                          color: Colors.redAccent,
                          fontWeight: FontWeight.bold,
                          fontSize: 15),
                    ),
                  ),
                )
                    : SizedBox(),
                Padding(
                  padding: EdgeInsets.fromLTRB(25, 65, 25, 0),
                  child: Container(
                    width: double.infinity,
                    child: RaisedButton(
                        color: Col.primary,
                        child: Text(
                          "Login",
                          style: TextStyle(
                            color: Col.Onprimary,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Nunito',
                            letterSpacing: 0.3,
                          ),
                        ),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8)),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            login();
                          }
                        }),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
