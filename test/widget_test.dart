import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_ui_app/features/auth/login_page.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

void main() {
  tearDown(() {
    AppLogger.enabled = true;
    AppLogger.onLog = null;
  });

  test('AppLogger master switch controls all log output', () {
    final messages = <String>[];
    AppLogger.onLog = messages.add;

    AppLogger.enabled = false;
    AppLogger.log('disabledFunction');
    expect(messages, isEmpty);

    AppLogger.enabled = true;
    AppLogger.log('enabledFunction', 'done');
    expect(messages, ['enabledFunction: Completed: done']);
  });

  testWidgets('LoginPage has a welcome title, access selector and login button', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));

    expect(find.text('Welcome Back'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
    expect(find.text('Create free account'), findsOneWidget);
    expect(find.text('Access No'), findsOneWidget);
  });

  testWidgets('LoginPage shows validation for empty fields', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));

    final loginButton = find.text('Login');
    await tester.tap(loginButton);
    await tester.pump();

    expect(find.text('Email is required'), findsOneWidget);
    expect(find.text('Password is required'), findsOneWidget);
    expect(find.text('Access No is required'), findsOneWidget);
  });
}