import 'package:flutter/material.dart';
import 'package:flutter_ui_app/app.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

void main() {
  runApp(const MyApp());
  AppLogger.log('main');
}
