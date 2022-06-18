// ignore: file_names
// ignore_for_file: file_names, prefer_const_constructors

import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:sheger_parking/constants/api.dart';
import 'package:sheger_parking/pages/ProfilePage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../constants/colors.dart';
import '../constants/strings.dart';

class EditProfilePage extends StatefulWidget {
  String id, fullName, phone, email, passwordHash, defaultPlateNumber;

  EditProfilePage(
      {required this.id,
      required this.fullName,
      required this.phone,
      required this.email,
      required this.passwordHash,
      required this.defaultPlateNumber});

  @override
  _EditProfilePageState createState() => _EditProfilePageState(
      id, fullName, phone, email, passwordHash, defaultPlateNumber);
}

class _EditProfilePageState extends State<EditProfilePage> {
  String id, fullName, phone, email, passwordHash, defaultPlateNumber;

  _EditProfilePageState(this.id, this.fullName, this.phone, this.email,
      this.passwordHash, this.defaultPlateNumber);

  final _formKey = GlobalKey<FormState>();
  bool _secureText = true;
  String password = "";

  String? phoneInUse;

  Future edit() async {
    var headersList = {'Accept': '*/*', 'Content-Type': 'application/json'};
    var url = Uri.parse('${base_url}/clients/${id}');

    var body = {
      "fullName": fullName,
      "phone": phone,
      "passwordHash": password,
      "defaultPlateNumber": defaultPlateNumber
    };
    var req = http.Request('PATCH', url);
    req.headers.addAll(headersList);
    req.body = json.encode(body);

    var res = await req.send();
    final resBody = await res.stream.bytesToString();

    setState(() {
      phoneInUse = "PHONE DOES NOT EXIST";
    });

    if (res.statusCode >= 200 && res.statusCode < 300) {
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => ProfilePage(
                  id: id,
                  fullName: fullName,
                  phone: phone,
                  email: email,
                  passwordHash: passwordHash,
                  defaultPlateNumber: defaultPlateNumber)));
      print(resBody);
    } else {
      var exists = json.decode(resBody);
      setState(() {
        phoneInUse = exists["message"].toString();
      });
      print(resBody);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Col.background,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(kToolbarHeight),
        child: Container(
          decoration: BoxDecoration(boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              offset: Offset(0, 1.0),
              blurRadius: 7.0,
            )
          ]),
          child: AppBar(
            brightness: Brightness.dark,
            backgroundColor: Colors.transparent,
            elevation: 0.0,
            toolbarHeight: 60,
            leading: IconButton(
              color: Col.Onbackground,
              onPressed: () {
                Navigator.of(context).pop();
              },
              icon: Icon(Icons.arrow_back),
            ),
            title: Text(
              "Edit Profile",
              style: TextStyle(
                color: Col.blackColor,
                fontSize: 20,
                fontWeight: FontWeight.w500,
                fontFamily: 'Nunito',
                letterSpacing: 0.3,
              ),
            ),
            flexibleSpace: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(0),
                    bottomRight: Radius.circular(0)),
                gradient: LinearGradient(
                    colors: [Colors.white, Colors.white],
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter),
              ),
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          color: Col.background,
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                SizedBox(
                  height: 30,
                ),
                Center(
                  child: Icon(
                    Icons.person_outline,
                    size: 110,
                    color: Col.blackColor,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                  child: Container(
                    alignment: Alignment.center,
                    child: TextFormField(
                      controller: TextEditingController(text: fullName),
                      onChanged: (value) {
                        fullName = value;
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
                        labelText: "Full Name",
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
                  padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                  child: Container(
                    alignment: Alignment.center,
                    child: TextFormField(
                      controller: TextEditingController(text: phone),
                      onChanged: (value) {
                        phone = value;
                      },
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "This field can not be empty";
                        } else if (RegExp(r"^(?:[+0]9)?[0-9]{10}$")
                            .hasMatch(value)) {
                          return null;
                        } else {
                          return "Please enter valid phone number";
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
                (phoneInUse == "INVALID_CALL:|:USER_PHONE_ALREADY_IN_USE")
                    ? Padding(
                  padding: const EdgeInsets.only(top: 5),
                  child: Center(
                    child: Text(
                      "Phone already in use",
                      style: TextStyle(
                          color: Colors.redAccent,
                          fontWeight: FontWeight.bold,
                          fontSize: 15),
                    ),
                  ),
                )
                    : SizedBox(),
                Padding(
                  padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                  child: Container(
                    alignment: Alignment.center,
                    child: TextFormField(
                      controller:
                          TextEditingController(text: defaultPlateNumber),
                      onChanged: (value) {
                        defaultPlateNumber = value;
                      },
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "This field can not be empty";
                        }
                        return null;
                      },
                      decoration: InputDecoration(
                        hintText: "",
                        hintStyle: TextStyle(
                          color: Col.textfieldLabel,
                          fontSize: 14,
                          fontFamily: 'Nunito',
                          letterSpacing: 0.1,
                        ),
                        labelText: "Plate Number",
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
                  padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                  child: Container(
                    alignment: Alignment.center,
                    child: TextFormField(
                      onChanged: (value) {
                        password = value;
                      },
                      validator: (value) {
                        if (value!.length > 0 && value.length < 6) {
                          return "Password should be at least 6 characters";
                        } else {
                          return null;
                        }
                      },
                      decoration: InputDecoration(
                        hintText: "unchanged",
                        hintStyle: TextStyle(
                          color: Col.textfieldLabel,
                          fontSize: 14,
                          fontFamily: 'Nunito',
                          letterSpacing: 0.1,
                        ),
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        labelText: "Password",
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
                            color: Col.textfieldLabel,
                          ),
                        ),
                      ),
                      obscureText: _secureText,
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(25, 40, 25, 0),
                  child: Container(
                    width: double.infinity,
                    child: RaisedButton(
                        padding: EdgeInsets.symmetric(vertical: 10),
                        color: Col.primary,
                        child: Text(
                          "Save",
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
                            if (password == "") {
                              password = passwordHash;
                            } else {
                              var bytes = utf8.encode(password);
                              var sha512 = sha256.convert(bytes);
                              password = sha512.toString();
                            }
                            edit();
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
