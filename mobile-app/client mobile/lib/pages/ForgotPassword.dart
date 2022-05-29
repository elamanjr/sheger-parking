// ignore_for_file: file_names, prefer_const_constructors

import 'dart:async';
import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:flutter/material.dart';
import 'package:sheger_parking/constants/colors.dart';
import 'package:sheger_parking/constants/strings.dart';
import 'package:sheger_parking/models/User.dart';
import 'package:http/http.dart' as http;
import 'package:sheger_parking/models/UserDetails.dart';
import 'package:sheger_parking/pages/LoginPage.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({Key? key}) : super(key: key);

  @override
  _ForgotPasswordState createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {

  List<UserDetails> users = [];
  String query = '';
  Timer? debouncer;
  String? id;

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

  Future<List<UserDetails>> getUserDetails(String query) async {

    final url = Uri.parse(
        'http://10.4.103.211:5000/token:qwhu67fv56frt5drfx45e/clients');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final List userDetails = json.decode(response.body);

      return userDetails.map((json) => UserDetails.fromJson(json)).where((reservationDetail) {
        final reservationPlateNumberLower = reservationDetail.fullName.toLowerCase();
        final searchLower = query.toLowerCase();

        return reservationPlateNumberLower.contains(searchLower);
      }).toList();
    } else {
      throw Exception();
    }
  }

  Future init() async {

    final userDetails = await getUserDetails(query);

    setState(() => this.users = userDetails);
  }

  final _formKey = GlobalKey<FormState>();
  bool isDataEntered = false;
  bool isVerified = false;
  bool isProcessing = false;
  bool _secureText = true;
  bool _secureConfirmText = true;
  late String verificationCode;
  String? emailExists;
  bool doesEmailExist = false;
  String? hashedPassword;

  void verified(){
    setState(() {
      isVerified = true;
    });
  }

  void emailExistance(){
    setState(() {
      doesEmailExist = true;
    });
  }

  Future changePassword() async {
    var headersList = {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    };
    var url = Uri.parse('http://10.4.103.211:5000/token:qwhu67fv56frt5drfx45e/clients/$id');

    var body = {
      "passwordHash": hashedPassword
    };
    var req = http.Request('PATCH', url);
    req.headers.addAll(headersList);
    req.body = json.encode(body);

    var res = await req.send();
    final resBody = await res.stream.bytesToString();

    if (res.statusCode >= 200 && res.statusCode < 300) {
      print(resBody);
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginPage()));
    }
    else {
      print(res.reasonPhrase);
    }
  }

  Future verify() async {
    var headersList = {'Accept': '*/*', 'Content-Type': 'application/json'};
    var url = Uri.parse(
        'http://10.4.103.211:5000/token:qwhu67fv56frt5drfx45e/clients/recover');

    var body = {"email": user.email};
    var req = http.Request('POST', url);
    req.headers.addAll(headersList);
    req.body = json.encode(body);

    var res = await req.send();
    final resBody = await res.stream.bytesToString();

    if (res.statusCode >= 200 && res.statusCode < 300) {
      var verificationCode = json.decode(resBody);
      print(verificationCode["emailVerificationCode"]);
      setState(() {
        emailExists = "Email exists";
      });
      this.verificationCode = verificationCode["emailVerificationCode"].toString();
      emailExistance();
      print(resBody);
    } else {
      var emailExists = json.decode(resBody);
      setState(() {
        this.emailExists = emailExists["message"].toString();
      });
      print(resBody);
    }
  }

  User user = User('', '', '', '', '');

  void trial(){
    if(doesEmailExist){
      setState(() {
        isDataEntered = true;
      });
    }
    if(doesEmailExist){
      setState(() {
        isProcessing = true;
      });
    }
    if(doesEmailExist){
      Future.delayed(Duration(seconds: 6), () {
        setState(() {
          isProcessing = false;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Col.background,
      body: ListView(
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(15, 10, 0, 0),
            child: Text(
              Strings.app_title,
              style: TextStyle(
                color: Col.primary,
                fontSize: 28,
                fontWeight: FontWeight.bold,
                fontFamily: 'Nunito',
                letterSpacing: 0.3,
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.fromLTRB(15, 0, 0, 0),
            child: Text(
              "PARKING",
              style: TextStyle(
                color: Colors.black,
                fontSize: 28,
                fontWeight: FontWeight.bold,
                fontFamily: 'Nunito',
                letterSpacing: 0.3,
              ),
            ),
          ),
          isVerified
              ? Container(
                  margin: EdgeInsets.fromLTRB(10, 60, 10, 0),
                  padding: EdgeInsets.symmetric(vertical: 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.black26, width: 1),
                    color: Col.background,
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.fromLTRB(15, 0, 0, 0),
                          child: Text(
                            "CONFIRM PASSWORD",
                            style: TextStyle(
                              color: Col.Onbackground,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Nunito',
                              letterSpacing: 0.1,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 35, 25, 0),
                          child: Container(
                            alignment: Alignment.center,
                            child: TextFormField(
                              controller: TextEditingController(text: user.passwordHash),
                              onChanged: (value){
                                var bytes = utf8.encode(value);
                                var sha512 = sha256.convert(bytes);
                                var hashedPassword = sha512.toString();
                                this.hashedPassword = hashedPassword;
                                user.passwordHash = value;
                              },
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return "This field can not be empty";
                                } else if (value.length <= 6) {
                                  return "Password should be at least 6 characters";
                                }
                                return null;
                              },
                              decoration: InputDecoration(
                                  hintText: "Password",
                                  hintStyle: TextStyle(
                                    color: Col.textfieldLabel,
                                    fontSize: 14,
                                    fontFamily: 'Nunito',
                                    letterSpacing: 0.1,
                                  ),
                                  labelText: "Password",
                                  labelStyle: TextStyle(
                                    color: Col.textfieldLabel,
                                    fontSize: 14,
                                    fontFamily: 'Nunito',
                                    letterSpacing: 0,
                                  ),
                                  border: OutlineInputBorder(),
                                  errorBorder: OutlineInputBorder(
                                    borderSide: BorderSide(color: Colors.red),
                                  ),
                                  suffixIcon: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        _secureText = !_secureText;
                                      });
                                    },
                                    icon: Icon(
                                      _secureText == true
                                          ? Icons.visibility
                                          : Icons.visibility_off,
                                      color: Col.Onbackground,
                                    ),
                                  )),
                              obscureText: _secureText,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                          child: Container(
                            alignment: Alignment.center,
                            child: TextFormField(
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return "This field can not be empty";
                                } else if (value != user.passwordHash) {
                                  return "Both passwords should be the same";
                                }
                                return null;
                              },
                              decoration: InputDecoration(
                                  hintText: "Confirm Password",
                                  hintStyle: TextStyle(
                                    color: Col.textfieldLabel,
                                    fontSize: 14,
                                    fontFamily: 'Nunito',
                                    letterSpacing: 0.1,
                                  ),
                                  labelText: "Confirm Password",
                                  labelStyle: TextStyle(
                                    color: Col.textfieldLabel,
                                    fontSize: 14,
                                    fontFamily: 'Nunito',
                                    letterSpacing: 0,
                                  ),
                                  border: OutlineInputBorder(),
                                  errorBorder: OutlineInputBorder(
                                    borderSide: BorderSide(color: Colors.red),
                                  ),
                                  suffixIcon: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        _secureConfirmText = !_secureConfirmText;
                                      });
                                    },
                                    icon: Icon(
                                      _secureConfirmText == true
                                          ? Icons.visibility
                                          : Icons.visibility_off,
                                      color: Col.Onbackground,
                                    ),
                                  )),
                              obscureText: _secureConfirmText,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 40, 25, 0),
                          child: Container(
                            width: double.infinity,
                            child: RaisedButton(
                              color: Col.primary,
                              child: Text(
                                "Submit",
                                style: TextStyle(
                                  color: Col.Onprimary,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0.3,
                                ),
                              ),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8)),
                              onPressed: () {
                                if (_formKey.currentState!.validate()) {
                                  changePassword();
                                }
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              : Container(
                  margin: EdgeInsets.fromLTRB(10, 60, 10, 0),
                  padding: EdgeInsets.symmetric(vertical: 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.black26, width: 1),
                    color: Col.background,
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.fromLTRB(15, 0, 0, 0),
                          child: Text(
                            "FORGOT PASSWORD",
                            style: TextStyle(
                              color: Col.Onbackground,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Nunito',
                              letterSpacing: 0.1,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                          child: Container(
                            alignment: Alignment.center,
                            child: TextFormField(
                              controller:
                                  TextEditingController(text: user.email),
                              onChanged: (value) {
                                user.email = value;
                              },
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return "This field can not be empty";
                                } else if (RegExp(
                                        r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                                    .hasMatch(value)) {
                                  return null;
                                } else {
                                  return "Please enter valid email";
                                }
                              },
                              decoration: InputDecoration(
                                hintText: "",
                                hintStyle: TextStyle(
                                  color: Col.textfieldLabel,
                                  fontSize: 14,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0.1,
                                ),
                                labelText: "Email",
                                labelStyle: TextStyle(
                                  color: Col.textfieldLabel,
                                  fontSize: 14,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0,
                                ),
                                border: OutlineInputBorder(),
                                errorBorder: OutlineInputBorder(
                                  borderSide: BorderSide(color: Colors.red),
                                ),
                              ),
                              keyboardType: TextInputType.emailAddress,
                            ),
                          ),
                        ),
                        (emailExists == "INVALID_CALL:|:USER_EMAIL_NOT_IN_USE")
                            ? Padding(
                          padding: const EdgeInsets.only(top: 5),
                          child: Text(
                            "Email does not exist",
                            style: TextStyle(
                                color: Colors.redAccent,
                                fontWeight: FontWeight.bold,
                                fontSize: 15),
                          ),
                        )
                            : Text(""),
                        isProcessing
                            ? Padding(
                                padding: EdgeInsets.fromLTRB(0, 15, 0, 0),
                                child: Center(
                                  child: CircularProgressIndicator(
                                    color: Col.primary,
                                    strokeWidth: 2,
                                  ),
                                ),
                              )
                            : isDataEntered
                                ? Padding(
                                    padding: EdgeInsets.fromLTRB(25, 15, 25, 0),
                                    child: Column(
                                      children: [
                                        Text(
                                          "Verification code has been sent to your email",
                                          style: TextStyle(
                                            color: Col.Onbackground,
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            fontFamily: 'Nunito',
                                            letterSpacing: 0.1,
                                          ),
                                        ),
                                        SizedBox(
                                          height: 10,
                                        ),
                                        Container(
                                          alignment: Alignment.center,
                                          child: TextFormField(
                                            validator: (value) {
                                              if (value!.isEmpty) {
                                                return "This field can not be empty";
                                              } else if (value !=
                                                  verificationCode) {
                                                return "Please enter the correct verification code";
                                              }
                                              verified();
                                              for(int i = 0; i < users.length; i++){
                                                final userDetail = users[i];

                                                if(user.email == userDetail.email){
                                                  setState(() {
                                                    id = userDetail.id;
                                                  });
                                                }
                                              }
                                              return null;
                                            },
                                            decoration: InputDecoration(
                                              hintText: "",
                                              hintStyle: TextStyle(
                                                color: Col.textfieldLabel,
                                                fontSize: 14,
                                                fontFamily: 'Nunito',
                                                letterSpacing: 0.1,
                                              ),
                                              labelText: "Verification Code",
                                              labelStyle: TextStyle(
                                                color: Col.textfieldLabel,
                                                fontSize: 14,
                                                fontFamily: 'Nunito',
                                                letterSpacing: 0,
                                              ),
                                              border: OutlineInputBorder(),
                                              errorBorder: OutlineInputBorder(
                                                borderSide: BorderSide(
                                                    color: Colors.red),
                                              ),
                                            ),
                                            keyboardType: TextInputType.number,
                                          ),
                                        ),
                                      ],
                                    ),
                                  )
                                : Text(""),
                        Padding(
                          padding: EdgeInsets.fromLTRB(25, 50, 25, 0),
                          child: Container(
                            width: double.infinity,
                            child: RaisedButton(
                              color: Col.primary,
                              child: Text(
                                isDataEntered ? "Verify" : "Submit",
                                style: TextStyle(
                                  color: Col.Onprimary,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Nunito',
                                  letterSpacing: 0.3,
                                ),
                              ),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8)),
                              onPressed: () {
                                if (_formKey.currentState!.validate()) {
                                  verify();
                                  trial();
                                }
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
        ],
      ),
    );
  }
}
