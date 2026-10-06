import 'dart:convert';

import 'package:flutter_ui_app/models/access.dart';

class LoginSession {
  final String userName;
  final String designation;
  final DateTime lastLogin;
  final String browserDetails;
  final String deviceDetails;
  final String locationStatus;
  final double? latitude;
  final double? longitude;

  const LoginSession({
    required this.userName,
    required this.designation,
    required this.lastLogin,
    required this.browserDetails,
    required this.deviceDetails,
    required this.locationStatus,
    this.latitude,
    this.longitude,
  });

  factory LoginSession.forProfile({
    required AccessProfile profile,
    required String browserDetails,
    required String deviceDetails,
    required String locationStatus,
    double? latitude,
    double? longitude,
    DateTime? lastLogin,
  }) {
    return LoginSession(
      userName: profile.name,
      designation: profile.designation,
      lastLogin: lastLogin ?? DateTime.now(),
      browserDetails: browserDetails,
      deviceDetails: deviceDetails,
      locationStatus: locationStatus,
      latitude: latitude,
      longitude: longitude,
    );
  }

  factory LoginSession.fromJson(Map<String, dynamic> json) {
    return LoginSession(
      userName: json['userName'] as String,
      designation: json['designation'] as String,
      lastLogin: DateTime.parse(json['lastLogin'] as String),
      browserDetails: json['browserDetails'] as String,
      deviceDetails: json['deviceDetails'] as String,
      locationStatus: json['locationStatus'] as String,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
    );
  }

  String toJsonString() => jsonEncode({
        'userName': userName,
        'designation': designation,
        'lastLogin': lastLogin.toIso8601String(),
        'browserDetails': browserDetails,
        'deviceDetails': deviceDetails,
        'locationStatus': locationStatus,
        'latitude': latitude,
        'longitude': longitude,
      });
}
