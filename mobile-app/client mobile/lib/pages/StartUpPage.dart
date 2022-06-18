// ignore: file_names
// ignore_for_file: file_names, prefer_const_constructors

import 'package:flutter/gestures.dart';
import 'package:sheger_parking/pages/LoginPage.dart';
import 'package:sheger_parking/pages/SignUpPage.dart';
import 'package:flutter/material.dart';

import '../constants/colors.dart';
import '../constants/strings.dart';
import 'package:flutter_svg/flutter_svg.dart';

class StartUp extends StatelessWidget {
  const StartUp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Col.background,
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          padding: EdgeInsets.fromLTRB(0, 40, 0, 25),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    Strings.app_title,
                    style: TextStyle(
                      color: Col.primary,
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.3,
                    ),
                  ),
                  Text(
                    "PARKING",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.3,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 30,),
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                    child: SvgPicture.asset('images/Parking-amico.svg'),
                    height: MediaQuery.of(context).size.height / 2.15,
                  ),
                  Text(
                    Strings.app_title_desc,
                    style: TextStyle(
                      color: Col.Onbackground,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.3,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
        
              Expanded(child: Column()),
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.symmetric(horizontal: 50),
                    child: RaisedButton(
                      color: Col.primary,
                      padding: EdgeInsets.symmetric(vertical: 5),
                      child: Text(
                        "Sign in",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Nunito',
                          letterSpacing: 0.3,
                        ),
                      ),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                          side: BorderSide(color: Col.primary)),
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => LoginPage()));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    width: double.infinity,
                    child: Center(
                      child: RichText(
                        text: TextSpan(
                          children: [
                            TextSpan(
                                style: TextStyle(
                                  color: Col.Onbackground,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0.3,
                                ),
                                text: "New around here?"),
                            TextSpan(
                                style: TextStyle(
                                  color: Col.primary,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0.3,
                                ),
                                text: " SignUp",
                                recognizer: TapGestureRecognizer()
                                  ..onTap = () {
                                    Navigator.push(
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
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
