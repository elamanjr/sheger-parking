// ignore_for_file: file_names, prefer_const_constructors

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/constants/strings.dart';
import 'package:sheger_parking_security/pages/HomePage.dart';
import 'package:sheger_parking_security/pages/LoginPage.dart';


class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}
class _SplashScreenState extends State<SplashScreen> {

  String? finalEmail;

  Future getValidationData() async {
    final SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    var obtainedEmail = sharedPreferences.getString("email");
    var obtainedBranchId = sharedPreferences.getString("branchId");
    var obtainedBranchName = sharedPreferences.getString("branchName");
    Strings.branchId = obtainedBranchId;
    Strings.branchName = obtainedBranchName;
    setState(() {
      finalEmail = obtainedEmail;
    });
  }

  @override
  void initState() {
    super.initState();
    getValidationData().whenComplete(() async {
      Timer(Duration(seconds: 1),
              ()=>Navigator.pushReplacement(context,
              MaterialPageRoute(builder:
                  (context) =>
                  finalEmail == null ? LoginPage() : HomePage()
              )
          )
      );
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        child: Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(0, 40, 0, 0),
                  child: Text(
                    "SHEGER",
                    style: TextStyle(
                      color: Col.primary,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.3,
                    ),
                  ),
                ),
                Text(
                  "PARKING",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ]),
        ),
      ),
    );
  }
}
