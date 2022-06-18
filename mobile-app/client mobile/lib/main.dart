import 'dart:io';

import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:sheger_parking/constants/strings.dart';
import 'package:sheger_parking/pages/SplashScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sheger_parking/widget/notifications.dart';
import 'package:sheger_parking/pages/Reservations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitDown,
    DeviceOrientation.portraitUp,
  ]);
  SystemChrome.setEnabledSystemUIMode(
    SystemUiMode.immersive,
  );
  AwesomeNotifications().initialize(
    'resource://drawable/ic_launcher',
    [
      NotificationChannel(
        channelKey: 'basic_channel',
        channelName: 'Basic Notifications',
        defaultColor: Colors.teal,
        importance: NotificationImportance.High,
        channelShowBadge: false,
        channelDescription: '',
      ),
    ],
  );
  runApp(MyApp());
}

Future getCurrentLocation() async {
  Strings.lat = 8.9575;
  Strings.longs = 38.7263;
  var position = Geolocator()
      .getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
      .then(
    (position) {
      Strings.lat = position.latitude;
      Strings.longs = position.longitude;
    },
  );
}

// Future getCurrentLocation() async {
//   // var position = await Geolocator()
//   //     .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
//   Strings.lat = 1.2;
//   Strings.longs = 1.3;
// }
Future fetchToNotify() async {
  List<String> notified = [];
  while (true) {
    if (Strings.userId != false) {
      final reservationDetails =
          await ReservationsState.getReservationDetails();
      reservationDetails.forEach((reservationDetail) {
        if (!reservationDetail.parked) return;
        var startTimeInM = reservationDetail.startingTime / 60000;
        var durationInM = reservationDetail.duration * 60;
        var endTimeInM = startTimeInM + durationInM;
        var currentTimestampInM = DateTime.now().millisecondsSinceEpoch / 60000;
        var minutesLeft = endTimeInM - currentTimestampInM;
        if (minutesLeft >= 0 &&
            minutesLeft <= 10 &&
            !notified.contains(reservationDetail.id)) {
          notified.add(reservationDetail.id);
          DateTime startingTime =
          DateTime.fromMillisecondsSinceEpoch(reservationDetail.startingTime);
          String startDate = DateFormat.yMMMd().format(startingTime);
          String formattedStartTime = DateFormat('h:mm a').format(startingTime);
          createNotification(reservationDetail.branchName, formattedStartTime, startDate, reservationDetail.slot);
        }
      });
    }
    await Future.delayed(Duration(seconds: 10));
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    fetchToNotify();
    getCurrentLocation();
    return MaterialApp(
      title: 'Sheger Parking',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: SplashScreen(),
    );
  }
}
