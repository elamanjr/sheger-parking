import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sheger_parking_security/pages/LoginPage.dart';
import 'package:sheger_parking_security/pages/SplashScreen.dart';

//public server url - https://api-shegerparking.loca.lt
//online server url - https://shegerparking.herokuapp.com
//local server url - http://127.0.0.1:5000

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitDown,
    DeviceOrientation.portraitUp,
  ]);
  SystemChrome.setEnabledSystemUIMode(
    SystemUiMode.immersive,
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home:
      SplashScreen(),
    );
  }
}