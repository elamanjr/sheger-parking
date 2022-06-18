// ignore_for_file: file_names, prefer_const_constructors

import 'dart:async';
import 'dart:convert';

import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:flutter/material.dart';
import 'package:sheger_parking_security/constants/api.dart';
import 'package:sheger_parking_security/constants/colors.dart';
import 'package:sheger_parking_security/constants/strings.dart';
import 'package:sheger_parking_security/models/ReservationDetails.dart';
import 'package:http/http.dart' as http;
import 'package:sheger_parking_security/models/notification_service.dart';
import 'package:sheger_parking_security/pages/ClientReservationDetails.dart';
import 'package:sheger_parking_security/widget/search_widget.dart';
import 'package:intl/intl.dart';

class ExpiredPage extends StatefulWidget {
  @override
  _ExpiredPageState createState() => _ExpiredPageState();
}

class _ExpiredPageState extends State<ExpiredPage> {
  bool isLoading = false;

  List<ReservationDetails> reservations = [];
  String query = '';
  Timer? debouncer;
  bool isParked = false;
  bool isCompleted = false;

  late String startingTime;
  late String startDate;
  late String endTime;

  late String fullName;
  late String phone;
  bool noExpired = true;

  @override
  void initState() {
    super.initState();

    AwesomeNotifications().isNotificationAllowed().then(
      (isAllowed) {
        if (!isAllowed) {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Allow Notifications'),
              content: Text('Our app would like to send you notifications'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text(
                    'Don\'t Allow',
                    style: TextStyle(color: Colors.grey, fontSize: 18),
                  ),
                ),
                TextButton(
                  onPressed: () => AwesomeNotifications()
                      .requestPermissionToSendNotifications()
                      .then((_) => Navigator.pop(context)),
                  child: Text(
                    'Allow',
                    style: TextStyle(
                      color: Colors.teal,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          );
        }
      },
    );

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
        '${base_url}/token:qwhu67fv56frt5drfx45e/branches/${Strings.branchId}/reservations');
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

    while (true) {
      final reservationDetails = await getReservationDetails(query);
      noExpired = true;
      for (int index = 0; index < reservationDetails.length; index++) {
        ReservationDetails reservationDetail = reservationDetails[index];

        if (reservationDetail.expired) {
          noExpired = false;
          break;
        }
      }
      setState(() {
        this.reservations = reservationDetails;
        isLoading = false;
      });
      await Future.delayed(Duration(seconds: 10));
    }
  }

  Future editParked(String reserveId) async {
    var headersList = {'Accept': '*/*', 'Content-Type': 'application/json'};
    var url = Uri.parse(
        '${base_url}/token:qwhu67fv56frt5drfx45e/reservations/$reserveId');

    var body = {"parked": isParked, "completed": isCompleted};
    var req = http.Request('PATCH', url);
    req.headers.addAll(headersList);
    req.body = json.encode(body);

    var res = await req.send();
    final resBody = await res.stream.bytesToString();

    if (res.statusCode >= 200 && res.statusCode < 300) {
    } else {}
  }

  @override
  Widget build(BuildContext context) {
    if (reservations.length < 1) {
    } else {
      DateTime startingTime =
          DateTime.fromMillisecondsSinceEpoch(reservations[0].startingTime);
      String startDate = DateFormat.yMMMd().format(startingTime);
      String formattedStartTime = DateFormat('h:mm a').format(startingTime);

      DateTime finishTime =
          startingTime.add(Duration(minutes: (reservations[0].duration*60).round()));
      String endTime = DateFormat('h:mm a').format(finishTime);

      this.startingTime = formattedStartTime;
      this.startDate = startDate;
      this.endTime = endTime;
    }

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(top: 20),
            child: Center(
              child: RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                        style: TextStyle(
                          color: Col.blackColor,
                          fontSize: 25,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Nunito',
                        ),
                        text: Strings.branchName),
                    TextSpan(
                      style: TextStyle(
                        color: Col.blackColor,
                        fontSize: 25,
                        fontFamily: 'Nunito',
                      ),
                      text: " Branch",
                    ),
                  ],
                ),
              ),
            ),
          ),
          buildSearch(),
          Container(
            margin: EdgeInsets.only(top: 10, left: 20),
            child: Text(
              "Expired reservations",
              style: TextStyle(
                color: Col.blackColor,
                fontSize: 20,
                fontFamily: 'Nunito',
                letterSpacing: 0.1,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          isLoading
              ? Container(
                  height: MediaQuery.of(context).size.height / 2 - 100,
                  alignment: Alignment.bottomCenter,
                  child: CircularProgressIndicator(),
                )
              : !noExpired
                  ? ListView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: reservations.length,
                      itemBuilder: (context, index) {
                        final reservationDetail = reservations[index];

                        DateTime startingTime =
                            DateTime.fromMillisecondsSinceEpoch(
                                reservationDetail.startingTime);
                        String startDateEach =
                            DateFormat.yMMMd().format(startingTime);
                        String formattedStartTime =
                            DateFormat('h:mm a').format(startingTime);

                        return reservationDetail.completed
                            ? Padding(padding: EdgeInsets.all(0))
                            : index == 0
                                ? Container(
                                    child: reservationDetail.expired
                                        ? Padding(
                                            padding: EdgeInsets.fromLTRB(
                                                30, 0, 30, 10),
                                            child: GestureDetector(
                                              onTap: () {
                                                Navigator.push(
                                                    context,
                                                    MaterialPageRoute(
                                                        builder: (context) => ClientReservationDetails(
                                                            reservationId:
                                                                reservationDetail
                                                                    .id,
                                                            client: reservationDetail
                                                                .client,
                                                            reservationPlateNumber:
                                                                reservationDetail
                                                                    .reservationPlateNumber,
                                                            branch: reservationDetail
                                                                .branch,
                                                            branchName:
                                                                reservationDetail
                                                                    .branchName,
                                                            slot: reservationDetail
                                                                .slot,
                                                            price: reservationDetail
                                                                .price
                                                                .toString(),
                                                            startingTime:
                                                                reservationDetail
                                                                    .startingTime
                                                                    .toString(),
                                                            duration:
                                                                reservationDetail
                                                                    .duration
                                                                    .toString(),
                                                            parked: reservationDetail
                                                                .parked,
                                                            completed: reservationDetail.completed)));
                                              },
                                              child: Card(
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          15.0),
                                                ),
                                                color: Col.blackColor,
                                                elevation: 8,
                                                child: Container(
                                                  decoration: BoxDecoration(
                                                    borderRadius:
                                                        BorderRadius.all(
                                                            Radius.circular(
                                                                15.0)),
                                                    gradient: LinearGradient(
                                                        colors: [
                                                          Col.blackColor,
                                                          Col.blackColor
                                                        ],
                                                        begin: Alignment
                                                            .centerLeft,
                                                        end: Alignment
                                                            .centerRight),
                                                  ),
                                                  child: Padding(
                                                    padding:
                                                        EdgeInsets.fromLTRB(
                                                            10, 10, 15, 10),
                                                    child: Column(
                                                      crossAxisAlignment:
                                                          CrossAxisAlignment
                                                              .start,
                                                      children: <Widget>[
                                                        Center(
                                                          child: Text(
                                                            reservations[index]
                                                                .reservationPlateNumber,
                                                            style: TextStyle(
                                                              color: reservationDetail
                                                                      .expired
                                                                  ? Col
                                                                      .expiredColor
                                                                  : Col
                                                                      .whiteColor,
                                                              fontSize: 24,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                              fontFamily:
                                                                  'Nunito',
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsets.only(
                                                                  left: 20,
                                                                  top: 5),
                                                          child: Row(
                                                            children: [
                                                              Text(
                                                                "$startDateEach ",
                                                                style:
                                                                    TextStyle(
                                                                  color: Col
                                                                      .whiteColor,
                                                                  fontSize: 16,
                                                                  fontFamily:
                                                                      'Nunito',
                                                                ),
                                                              ),
                                                              Text(
                                                                "|",
                                                                style:
                                                                    TextStyle(
                                                                  color: Col
                                                                      .primary,
                                                                  fontSize: 16,
                                                                  fontFamily:
                                                                      'Nunito',
                                                                ),
                                                              ),
                                                              Text(
                                                                " $formattedStartTime",
                                                                style:
                                                                    TextStyle(
                                                                  color: Col
                                                                      .whiteColor,
                                                                  fontSize: 16,
                                                                  fontFamily:
                                                                      'Nunito',
                                                                ),
                                                              ),
                                                            ],
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsets.only(
                                                                  left: 20),
                                                          child: RichText(
                                                            text: TextSpan(
                                                              children: [
                                                                TextSpan(
                                                                    style:
                                                                        TextStyle(
                                                                      color: Col
                                                                          .whiteColor,
                                                                      fontSize:
                                                                          16,
                                                                      fontWeight:
                                                                          FontWeight
                                                                              .bold,
                                                                      fontFamily:
                                                                          'Nunito',
                                                                      letterSpacing:
                                                                          0.3,
                                                                    ),
                                                                    text:
                                                                        "Until"),
                                                                TextSpan(
                                                                  style:
                                                                      TextStyle(
                                                                    color: Col
                                                                        .whiteColor,
                                                                    fontSize:
                                                                        16,
                                                                    fontFamily:
                                                                        'Nunito',
                                                                    letterSpacing:
                                                                        0.3,
                                                                  ),
                                                                  text:
                                                                      " $endTime",
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsets.only(
                                                                  left: 20),
                                                          child: RichText(
                                                            text: TextSpan(
                                                              children: [
                                                                TextSpan(
                                                                    style:
                                                                        TextStyle(
                                                                      color: Col
                                                                          .whiteColor,
                                                                      fontSize:
                                                                          16,
                                                                      fontWeight:
                                                                          FontWeight
                                                                              .bold,
                                                                      fontFamily:
                                                                          'Nunito',
                                                                      letterSpacing:
                                                                          0.3,
                                                                    ),
                                                                    text:
                                                                        "Slot"),
                                                                TextSpan(
                                                                  style:
                                                                      TextStyle(
                                                                    color: Col
                                                                        .whiteColor,
                                                                    fontSize:
                                                                        16,
                                                                    fontFamily:
                                                                        'Nunito',
                                                                    letterSpacing:
                                                                        0.3,
                                                                  ),
                                                                  text:
                                                                      " ${reservations[index].slot}",
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height: 10,
                                                        ),
                                                        (reservationDetail
                                                                .parked)
                                                            ? Container(
                                                                width: double
                                                                    .infinity,
                                                                child:
                                                                    RaisedButton(
                                                                  onPressed:
                                                                      () async {
                                                                    setState(
                                                                        () {
                                                                      isParked =
                                                                          true;
                                                                      isCompleted =
                                                                          true;
                                                                    });
                                                                    await editParked(
                                                                        reservationDetail
                                                                            .id);
                                                                    final reservationDetails =
                                                                        await getReservationDetails(
                                                                            query);
                                                                    setState(
                                                                        () {
                                                                      this.reservations =
                                                                          reservationDetails;
                                                                    });
                                                                  },
                                                                  color: Col
                                                                      .primary,
                                                                  child: Text(
                                                                    'Left',
                                                                    style:
                                                                        TextStyle(
                                                                      color: Col
                                                                          .blackColor,
                                                                      fontSize:
                                                                          16,
                                                                      fontFamily:
                                                                          'Nunito',
                                                                      letterSpacing:
                                                                          0.3,
                                                                    ),
                                                                    textAlign:
                                                                        TextAlign
                                                                            .center,
                                                                  ),
                                                                  shape: RoundedRectangleBorder(
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                              20)),
                                                                ),
                                                              )
                                                            : Container(
                                                                width: double
                                                                    .infinity,
                                                                child:
                                                                    RaisedButton(
                                                                  onPressed:
                                                                      () async {
                                                                    setState(
                                                                        () {
                                                                      isParked =
                                                                          true;
                                                                    });
                                                                    await editParked(
                                                                        reservationDetail
                                                                            .id);
                                                                    final reservationDetails =
                                                                        await getReservationDetails(
                                                                            query);
                                                                    setState(
                                                                        () {
                                                                      this.reservations =
                                                                          reservationDetails;
                                                                    });
                                                                  },
                                                                  color: Col
                                                                      .primary,
                                                                  child: Text(
                                                                    'Parked',
                                                                    style:
                                                                        TextStyle(
                                                                      color: Col
                                                                          .blackColor,
                                                                      fontSize:
                                                                          16,
                                                                      fontFamily:
                                                                          'Nunito',
                                                                      letterSpacing:
                                                                          0.3,
                                                                    ),
                                                                    textAlign:
                                                                        TextAlign
                                                                            .center,
                                                                  ),
                                                                  shape: RoundedRectangleBorder(
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                              20)),
                                                                ),
                                                              ),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                                margin: EdgeInsets.fromLTRB(
                                                    0, 10, 0, 0),
                                              ),
                                            ),
                                          )
                                        : SizedBox(),
                                  )
                                : reservationDetail.expired
                                    ? buildReservation(reservationDetail,
                                        formattedStartTime, startDateEach)
                                    : SizedBox();
                      },
                    )
                  : Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 30),
                      child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                        color: Col.blackColor,
                        elevation: 8,
                        child: ConstrainedBox(
                          constraints: BoxConstraints(
                              minWidth: MediaQuery.of(context).size.width),
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(15.0)),
                              gradient: LinearGradient(
                                  colors: [
                                    Col.expiredColor.withRed(100),
                                    Col.blackColor
                                  ],
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter),
                            ),
                            child: Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 20, vertical: 30),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SizedBox(
                                    width: 15,
                                  ),
                                  Icon(
                                    Icons.car_repair,
                                    size: 80,
                                    color: Col.expiredColor.withRed(200),
                                  ),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Text(
                                    "No Expired Reservations!",
                                    style: TextStyle(
                                      color: Col.whiteColor,
                                      fontSize: 22,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                  SizedBox(
                                    height: 10,
                                  ),
                                  Text(
                                    "Expired reservations will appear here.",
                                    style: TextStyle(
                                      color: Col.whiteColor,
                                      fontSize: 18,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
                      ),
                    ),
        ],
      ),
    );
  }

  Widget buildSearch() => SearchWidget(
        text: query,
        hintText: 'Search by plate number',
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

  Widget buildReservation(ReservationDetails reservationDetail,
          String formattedstartTime, String startDateEach) =>
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
                      completed: reservationDetail.completed)));
        },
        child: Padding(
          padding: EdgeInsets.fromLTRB(30, 0, 30, 5),
          child: Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(15.0),
            ),
            color: Col.blackColor,
            elevation: 8,
            child: Padding(
              padding: EdgeInsets.fromLTRB(0, 16, 0, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Center(
                    child: Text(
                      reservationDetail.reservationPlateNumber,
                      style: TextStyle(
                        color: reservationDetail.expired
                            ? Col.expiredColor
                            : Col.whiteColor,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'Nunito',
                      ),
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    child: Center(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "$startDateEach ",
                            style: TextStyle(
                              color: Col.whiteColor,
                              fontSize: 18,
                              fontFamily: 'Nunito',
                            ),
                          ),
                          Text(
                            "|",
                            style: TextStyle(
                              color: Col.primary,
                              fontSize: 18,
                              fontFamily: 'Nunito',
                            ),
                          ),
                          Text(
                            " $formattedstartTime",
                            style: TextStyle(
                              color: Col.whiteColor,
                              fontSize: 18,
                              fontFamily: 'Nunito',
                            ),
                          ),
                        ],
                      ),
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
