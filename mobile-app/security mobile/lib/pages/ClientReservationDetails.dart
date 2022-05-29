// ignore_for_file: file_names, prefer_const_constructors, no_logic_in_create_state

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/constants/strings.dart';

class ClientReservationDetails extends StatefulWidget {
  String reservationId,
      client,
      reservationPlateNumber,
      branch,
      branchName,
      slot,
      price,
      startingTime,
      duration;
  bool parked;

  ClientReservationDetails(
      {required this.reservationId,
      required this.client,
      required this.reservationPlateNumber,
      required this.branch,
      required this.branchName,
      required this.slot,
      required this.price,
      required this.startingTime,
      required this.duration,
      required this.parked});

  @override
  _ClientReservationDetailsState createState() =>
      _ClientReservationDetailsState(reservationId, client,
          reservationPlateNumber, branch, branchName, slot, price, startingTime, duration, parked);
}

class _ClientReservationDetailsState extends State<ClientReservationDetails> {
  String reservationId,
      client,
      reservationPlateNumber,
      branch,
      branchName,
      slot,
      price,
      startingTime,
      duration;
  bool parked;

  _ClientReservationDetailsState(
      this.reservationId,
      this.client,
      this.reservationPlateNumber,
      this.branch,
      this.branchName,
      this.slot,
      this.price,
      this.startingTime,
      this.duration,
      this.parked);

  String? formattedstartTime;

  @override
  void initState() {
    super.initState();

    DateTime startTime = DateTime.fromMillisecondsSinceEpoch(int.parse(startingTime));
    String formattedstartTime = DateFormat('kk:00 a').format(startTime);

    this.formattedstartTime = formattedstartTime;

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Col.background,
      appBar: AppBar(
        brightness: Brightness.dark,
        backgroundColor: Colors.transparent,
        elevation: 4.0,
        toolbarHeight: 70,
        leading: IconButton(
          color: Col.Onbackground,
          onPressed: () {
            Navigator.of(context).pop();
          },
          icon: Icon(Icons.arrow_back),
        ),
        title: Text(
          Strings.app_title,
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
            borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(0),
                bottomRight: Radius.circular(0)),
            gradient: LinearGradient(
                colors: [Col.secondary, Col.secondary],
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          color: Col.background,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.fromLTRB(30, 40, 0, 0),
                child: Text(
                  "Reservation Details",
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.1,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 40, 0, 0),
                child: Text(
                  "Branch",
                  style: TextStyle(
                    color: Col.Onsurface,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                child: Text(
                  branchName,
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Divider(
                color: Col.Onbackground,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 5, 0, 0),
                child: Text(
                  "Start Time",
                  style: TextStyle(
                    color: Col.Onsurface,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                child: Text(
                  "$formattedstartTime",
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Divider(
                color: Col.Onbackground,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 5, 0, 0),
                child: Text(
                  "Duration",
                  style: TextStyle(
                    color: Col.Onsurface,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                child: Text(
                  "$duration hours",
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Divider(
                color: Col.Onbackground,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 5, 0, 0),
                child: Text(
                  "Slot",
                  style: TextStyle(
                    color: Col.Onsurface,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                child: Text(
                  slot,
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Divider(
                color: Col.Onbackground,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 5, 0, 0),
                child: Text(
                  "Price",
                  style: TextStyle(
                    color: Col.Onsurface,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                child: Text(
                  "$price birr",
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Divider(
                color: Col.Onbackground,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 5, 0, 0),
                child: Text(
                  "Parked",
                  style: TextStyle(
                    color: Col.Onsurface,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                child: Text(
                  "$parked",
                  style: TextStyle(
                    color: Col.Onbackground,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Nunito',
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              Divider(
                color: Col.Onbackground,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
