// ignore_for_file: file_names, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/constants/strings.dart';
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
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Col.background,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        brightness: Brightness.dark,
        backgroundColor: Colors.transparent,
        elevation: 4.0,
        toolbarHeight: 70,
        actions: [IconButton(
            color: Col.Onbackground,
            padding: EdgeInsets.fromLTRB(0, 0, 25, 0),
            iconSize: 40,
            onPressed: (){
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
                    FlatButton(onPressed: (){
                      Navigator.push(context, MaterialPageRoute(builder: (context) => LoginPage()));
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
            icon: Icon(Icons.logout)),
        ],
        title: Text(Strings.app_title,
          style: TextStyle(
            color: Col.Onsurface,
            fontSize: 28,
            fontWeight: FontWeight.bold,
            fontFamily: 'Nunito',
            letterSpacing: 0.3,
          ),
        ),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.only(bottomLeft: Radius.circular(0),bottomRight: Radius.circular(0)),
            gradient: LinearGradient(
                colors: [Col.secondary,Col.secondary],
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter
            ),
          ),
        ),
      ),
      body:
      screens[currentIndex],
      bottomNavigationBar: BottomNavigationBar(
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
      ],
      ),
    );
  }
}
