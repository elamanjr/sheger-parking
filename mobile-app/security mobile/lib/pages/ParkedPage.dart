// ignore_for_file: file_names, prefer_const_constructors
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/models/ReservationDetails.dart';
import 'package:http/http.dart' as http;
import 'package:sheger_parking_security/pages/ClientReservationDetails.dart';
import 'package:sheger_parking_security/widget/search_widget.dart';

class ParkedPage extends StatefulWidget {
  @override
  _ParkedPageState createState() => _ParkedPageState();
}

class _ParkedPageState extends State<ParkedPage> {

  bool isLoading = false;

  List<ReservationDetails> reservations = [];
  String query = '';
  Timer? debouncer;

  @override
  void initState() {
    super.initState();

    init();
  }

  @override
  void dispose() {
    debouncer?.cancel();
    super.dispose();
  }

  void debounce(
    VoidCallback callback, {
    Duration duration = const Duration(milliseconds: 1000),
  }) {
    if (debouncer != null) {
      debouncer!.cancel();
    }

    debouncer = Timer(duration, callback);
  }

  static Future<List<ReservationDetails>> getReservationDetails(
      String query) async {
    final url = Uri.parse(
        'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/reservations');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final List reservationDetails = json.decode(response.body);

      return reservationDetails
          .map((json) => ReservationDetails.fromJson(json))
          .where((reservationDetail) {
        final reservationPlateNumberLower =
            reservationDetail.reservationPlateNumber.toLowerCase();
        final branchLower = reservationDetail.branchName.toLowerCase();
        final searchLower = query.toLowerCase();

        return reservationPlateNumberLower.contains(searchLower) ||
            branchLower.contains(searchLower);
      }).toList();
    } else {
      throw Exception();
    }
  }

  Future init() async {

    setState(() {
      isLoading = true;
    });

    final reservationDetails = await getReservationDetails(query);

    setState(() => this.reservations = reservationDetails);

    setState(() {
      isLoading = false;
    });

  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        buildSearch(),
        Padding(
          padding: EdgeInsets.fromLTRB(15, 5, 0, 10),
          child: Text(
            "Parked Reservations",
            style: TextStyle(
              color: Col.Onbackground,
              fontSize: 28,
              fontWeight: FontWeight.bold,
              fontFamily: 'Nunito',
              letterSpacing: 0.1,
            ),
          ),
        ),
        Expanded(
          child: isLoading ? Center(child: CircularProgressIndicator(),
          ) : ListView.builder(
            itemCount: reservations.length,
            itemBuilder: (context, index) {
              final reservationDetail = reservations[index];
              DateTime startTime = DateTime.fromMillisecondsSinceEpoch(reservationDetail.startingTime);
              String formattedstartTime = DateFormat('kk:00 a').format(startTime);

              return reservationDetail.completed ? Padding(padding: EdgeInsets.all(0)) : reservationDetail.parked ? buildReservation(reservationDetail, formattedstartTime) : Padding(padding: EdgeInsets.all(0));
            },
          ),
        ),
      ],
    );
  }

  Widget buildSearch() => SearchWidget(
        text: query,
        hintText: 'Plate Number',
        onChanged: searchReservations,
      );

  Future searchReservations(String query) async => debounce(() async {
        final reservationDetails = await getReservationDetails(query);

        if (!mounted) return;

        setState(() {
          this.query = query;
          this.reservations = reservationDetails;
        });
      });

  Widget buildReservation(ReservationDetails reservationDetail, String formattedstartTime) =>
      GestureDetector(
        onTap: () {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => ClientReservationDetails(
                        reservationId: reservationDetail.id,
                        client: reservationDetail.client,
                        reservationPlateNumber:
                        reservationDetail.reservationPlateNumber,
                        branch: reservationDetail.branch,
                    branchName: reservationDetail.branchName,
                        slot: reservationDetail.slot,
                        price: reservationDetail.price.toString(),
                        startingTime: reservationDetail.startingTime.toString(),
                        duration: reservationDetail.duration.toString(),
                        parked: reservationDetail.parked,
                      )));
        },
        child: Padding(
          padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
          child: Card(
            color: reservationDetail.expired ? Col.expired : Colors.grey[100],
            elevation: 8,
            child: Padding(
              padding: EdgeInsets.fromLTRB(10, 8, 0, 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Stack(
                    children: [
                      Align(
                        child: IconButton(
                          onPressed: () {},
                          icon: Icon((reservationDetail.parked)
                              ? Icons.check
                              : Icons.car_repair),
                          iconSize: 25,
                        ),
                        alignment: Alignment.topRight,
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 15, 0, 0),
                        child: Text(
                          "Plate Number : ${reservationDetail.reservationPlateNumber}",
                          style: TextStyle(
                            color: Col.Onbackground,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Nunito',
                            letterSpacing: 0.3,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 5,),
                  Text(
                    "Branch : ${reservationDetail.branchName}",
                    style: TextStyle(
                      color: Col.Onbackground,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.1,
                    ),
                  ),
                  SizedBox(height: 5,),
                  Text(
                    "Start Time : $formattedstartTime",
                    style: TextStyle(
                      color: Col.Onbackground,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.1,
                    ),
                  ),
                  SizedBox(height: 5,),
                  Text(
                    "Slot Number: ${reservationDetail.slot}",
                    style: TextStyle(
                      color: Col.Onbackground,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Nunito',
                      letterSpacing: 0.1,
                    ),
                  ),
                ],
              ),
            ),
            margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
          ),
        ),
      );
}
