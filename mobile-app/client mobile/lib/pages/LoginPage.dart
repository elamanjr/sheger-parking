// ignore: file_names
// ignore_for_file: file_names, prefer_const_constructors, prefer_const_literals_to_create_immutables, sized_box_for_whitespace, unnecessary_brace_in_string_interps

import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sheger_parking/bloc/home_bloc.dart';
import 'package:sheger_parking/constants/api.dart';
import 'package:sheger_parking/models/User.dart';
import 'package:sheger_parking/pages/ForgotPassword.dart';
import 'package:sheger_parking/pages/HomePage.dart';
import 'package:sheger_parking/pages/SignUpPage.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../constants/colors.dart';
import '../constants/strings.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _secureText = true;
  bool isLoading = false;
  bool isProcessing = false;

  String? response;
  String? hashedPassword;

  final _formKey = GlobalKey<FormState>();
  bool socketError = false;

  Future login() async {

    setState(() {
      isProcessing = true;
      response = "none";
    });

    var headersList = {'Accept': '*/*', 'Content-Type': 'application/json'};
    var url = Uri.parse('${base_url}/clients/login');

    var body = {"phone": user.phone, "passwordHash": hashedPassword};

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
        String id = data["id"].toString();
        String fullName = data["fullName"].toString();
        String phone = data["phone"].toString();
        String email = data["email"].toString();
        String passwordHash = data["passwordHash"].toString();
        String defaultPlateNumber = data["defaultPlateNumber"].toString();
        Strings.userId = id;

        final SharedPreferences sharedPreferences =
        await SharedPreferences.getInstance();
        sharedPreferences.setString("id", id);
        sharedPreferences.setString("fullName", fullName);
        sharedPreferences.setString("phone", phone);
        sharedPreferences.setString("email", email);
        sharedPreferences.setString("passwordHash", passwordHash);
        sharedPreferences.setString("defaultPlateNumber", defaultPlateNumber);

        setState(() {
          isProcessing = false;
        });

        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(
                builder: (context) => BlocProvider(
                    create: (context) => CurrentIndexBloc(),
                    child: HomePage(
                        id: id,
                        fullName: fullName,
                        phone: phone,
                        email: email,
                        passwordHash: passwordHash,
                        defaultPlateNumber: defaultPlateNumber))),
                (Route<dynamic> route) => false);
      } else {
        setState(() {
          isProcessing = false;
        });
      }
    }
    catch (e) {
      setState(() {
        socketError = true;
        isProcessing = false;
      });
    }
  }

  User user = User('', '', '', '', '');

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
            child: ConstrainedBox(
              constraints:
                  BoxConstraints(minHeight: MediaQuery.of(context).size.height),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0, 45, 0, 65),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.fromLTRB(15, 0, 0, 0),
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
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: EdgeInsets.fromLTRB(15, 0, 0, 0),
                          child: Text(
                            Strings.login,
                            style: TextStyle(
                              color: Col.Onbackground,
                              fontSize: 35,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Nunito',
                              letterSpacing: 0.1,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 30, 25, 0),
                          child: Container(
                            alignment: Alignment.center,
                            child: TextFormField(
                              controller:
                                  TextEditingController(text: user.phone),
                              onChanged: (value) {
                                user.phone = value;
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
                              controller: TextEditingController(
                                  text: user.passwordHash),
                              onChanged: (value) {
                                var bytes = utf8.encode(value);
                                var sha512 = sha256.convert(bytes);
                                var hashedPassword = sha512.toString();
                                this.hashedPassword = hashedPassword;
                                user.passwordHash = value;
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
                                padding:
                                    const EdgeInsets.only(top: 15, left: 25),
                                child: Text(
                                  "One of the credentials is incorrect",
                                  style: TextStyle(
                                      color: Colors.redAccent,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15),
                                ),
                              )
                            : Text(""),
                        isProcessing
                            ? Padding(
                          padding: EdgeInsets.fromLTRB(0, 15, 0, 0),
                          child: Center(
                            child: CircularProgressIndicator(
                              color: Col.primary,
                              strokeWidth: 2,
                            ),
                          ),
                        ) : SizedBox(),
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
                          padding: EdgeInsets.fromLTRB(25, 25, 25, 0),
                          child: Container(
                            width: double.infinity,
                            child: RaisedButton(
                                color: Col.primary,
                                child: Text(
                                  "Sign in",
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
                                onPressed: isProcessing ? null : () {
                                  if (_formKey.currentState!.validate()) {
                                    login();
                                  }
                                }),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 0, 25, 0),
                          child: Container(
                            width: double.infinity,
                            child: TextButton(
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            ForgotPassword()));
                              },
                              child: Text(
                                "Forgot password",
                                style: TextStyle(
                                  color: Col.primary,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0.3,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    Padding(
                      padding: EdgeInsets.fromLTRB(25, 0, 25, 0),
                      child: Container(
                        width: double.infinity,
                        child: Center(
                          child: RichText(
                            text: TextSpan(
                              children: [
                                TextSpan(
                                    style: TextStyle(
                                      color: Col.blackColor,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Nunito',
                                      letterSpacing: 0.3,
                                    ),
                                    text: "Don’t have an account?"),
                                TextSpan(
                                    style: TextStyle(
                                      color: Col.primary,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'Nunito',
                                      letterSpacing: 0.3,
                                    ),
                                    text: " SignUp",
                                    recognizer: TapGestureRecognizer()
                                      ..onTap = () {
                                        Navigator.pushReplacement(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) =>
                                                    SignUpPage()));
                                      }),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  loading() async {
    setState(() {
      isLoading = true;
    });

    await Future.delayed(Duration(seconds: 3), () {
      setState(() {
        isLoading = false;
      });
    });
  }
}
