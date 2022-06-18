// ignore_for_file: file_names, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/constants/strings.dart';
import 'package:sheger_parking_security/pages/HistoryPage.dart';
import 'package:sheger_parking_security/pages/LoginPage.dart';
import 'package:sheger_parking_security/pages/ParkedPage.dart';

import 'ExpectedPage.dart';
import 'ExpiredPage.dart';

class HomePage extends StatefulWidget {

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  int currentIndex = 0;
  final screens = [
    ExpectedPage(),
    ParkedPage(),
    ExpiredPage(),
    HistoryPage()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Col.background,
      appBar: PreferredSize(
        child: Container(
          decoration: BoxDecoration(boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              offset: Offset(0, 1.0),
              blurRadius: 7.0,
            )
          ]),
          child: AppBar(
            automaticallyImplyLeading: false,
            brightness: Brightness.dark,
            backgroundColor: Colors.transparent,
            elevation: 0.0,
            toolbarHeight: 60,
            actions: [
              TextButton(
                style: TextButton.styleFrom(
                    padding: EdgeInsets.zero,
                    minimumSize: Size(50, 30),
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    alignment: Alignment.centerLeft),
                onPressed: () {
                  showDialog(context: context, builder: (context) {
                    return AlertDialog(
                      title: Text("Sheger Parking",
                        style: TextStyle(
                          color: Col.Onbackground,
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Nunito',
                          letterSpacing: 0.3,
                        ),
                      ),
                      content: Text("Do you want to Log out",
                        style: TextStyle(
                          color: Col.Onbackground,
                          fontSize: 20,
                          fontFamily: 'Nunito',
                          letterSpacing: 0.3,
                        ),
                      ),
                      actions: [
                        FlatButton(onPressed: (){
                          Navigator.of(context).pop(AlertDialog());
                        }, child: Text("Cancel",
                          style: TextStyle(
                            fontSize: 18,
                            letterSpacing: 0.3,
                          ),
                        ),
                        ),
                        FlatButton(onPressed: () async {
                          final SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
                          sharedPreferences.remove("email");
                          sharedPreferences.remove("branchId");
                          sharedPreferences.remove("branchName");
                          Strings.branchId = false;
                          Strings.branchName = "";
                          Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (context) => LoginPage()), (Route<dynamic> route) => false);
                        }, child: Text("Log out",
                          style: TextStyle(
                            fontSize: 18,
                            letterSpacing: 0.3,
                          ),
                        ),
                        ),
                      ],
                      elevation: 10.0,
                    );
                  });
                },
                child: Container(
                  margin: EdgeInsets.only(right: 20),
                  child: Text(
                    "Log out",
                    style: TextStyle(
                      color: Col.linkColor,
                      fontSize: 20,
                      fontFamily: 'Nunito',
                    ),
                  ),
                ),
              ),
            ],
            title: Text(
              "SHEGER",
              style: TextStyle(
                color: Col.blackColor,
                fontSize: 24,
                fontWeight: FontWeight.bold,
                fontFamily: 'Nunito',
                letterSpacing: 0.3,
              ),
            ),
            flexibleSpace: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(bottomLeft: Radius.circular(0),bottomRight: Radius.circular(0)),
                gradient: LinearGradient(
                    colors: [Colors.white,Colors.white],
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter
                ),
              ),
            ),
          ),
        ),
        preferredSize: Size.fromHeight(kToolbarHeight),
      ),
      body:
      screens[currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: Col.primary,
        iconSize: 28,
        currentIndex: currentIndex,
        onTap: (index) => setState(() => currentIndex = index),
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_filled),
            label: "Home",
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.car_repair),
          label: "Parked",
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.assignment_late),
          label: "Expired",
        ),
          BottomNavigationBarItem(
            icon: Icon(Icons.history),
            label: "History",
          ),
      ],
      ),
    );
  }
}
