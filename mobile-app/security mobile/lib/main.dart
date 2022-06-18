import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sheger_parking_security/constants/strings.dart';
import 'package:sheger_parking_security/pages/ExpectedPage.dart';
import 'package:sheger_parking_security/pages/LoginPage.dart';
import 'package:sheger_parking_security/pages/SplashScreen.dart';
import 'package:sheger_parking_security/widget/notifications.dart';

//public server url - https://api-shegerparking.loca.lt
//online server url - https://shegerparking.herokuapp.com
//local server url - http://10.5.197.136:5000

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

Future fetchToNotify() async {
  List<String> notified = [];
  while (true) {
    if (Strings.branchId != false) {
      final reservationDetails =
          await ExpectedPageState.getReservationDetails('');
      reservationDetails.forEach((element) {
        if (!element.expired) return;
        var startTimeInM = element.startingTime / 60000;
        var durationInM = (element.duration * 60).round();
        var endTimeInM = startTimeInM + durationInM;
        var currentTimestampInM = DateTime.now().millisecondsSinceEpoch / 60000;
        var minutesLeft = endTimeInM - currentTimestampInM;
        if (minutesLeft > -10 && !notified.contains(element.id)) {
          notified.add(element.id);
          createNotification(element.reservationPlateNumber);
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
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: SplashScreen(),
    );
  }
}
