import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_ui_app/app.dart';
import 'package:flutter_ui_app/features/auth/login_page.dart';
import 'package:flutter_ui_app/models/access.dart';
import 'package:flutter_ui_app/models/login_session.dart';
import 'package:flutter_ui_app/screens/index_page.dart';
import 'package:flutter_ui_app/features/dashboard/dashboard_page.dart';
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

  testWidgets('LoginPage has a welcome title, access selector and login button',
      (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));
    await tester.pumpAndSettle();

    expect(find.text('Optional sign-in location'), findsOneWidget);
    await tester.tap(find.text('Continue without location'));
    await tester.pumpAndSettle();
    expect(find.text('Welcome Back'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
    expect(find.text('Create free account'), findsOneWidget);
    expect(find.text('Access No'), findsOneWidget);
  });

  testWidgets('Native app starts at login instead of the public landing page',
      (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    expect(find.text('Optional sign-in location'), findsOneWidget);
    expect(find.text('Accounting Software'), findsNothing);
    await tester.tap(find.text('Continue without location'));
    await tester.pumpAndSettle();
    expect(find.text('Welcome Back'), findsOneWidget);
  });

  testWidgets('LoginPage shows validation for empty fields',
      (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue without location'));
    await tester.pumpAndSettle();

    final loginButton = find.text('Login');
    await tester.ensureVisible(loginButton);
    await tester.tap(loginButton);
    await tester.pump();

    expect(find.text('Email is required'), findsOneWidget);
    expect(find.text('Password is required'), findsOneWidget);
    expect(find.text('Access No is required'), findsOneWidget);
  });

  testWidgets('Login continues without optional location consent',
      (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: LoginPage()));
    await tester.pumpAndSettle();

    expect(find.text('Optional sign-in location'), findsOneWidget);
    await tester.tap(find.text('Continue without location'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextFormField).at(0), '101');
    await tester.enterText(
        find.byType(TextFormField).at(1), 'admin@example.com');
    await tester.enterText(find.byType(TextFormField).at(2), 'demo-password');

    final loginButton = find.text('Login');
    await tester.ensureVisible(loginButton);
    await tester.tap(loginButton);
    await tester.pumpAndSettle();

    expect(find.text('Business workspace'), findsOneWidget);
  });

  testWidgets('IndexPage shows the requested DIZS business services',
      (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: IndexPage()));

    expect(find.text('DIZS Software Services Pvt. Ltd.'), findsNWidgets(2));
    expect(find.text('Accounting Software'), findsOneWidget);
    expect(find.text('Gate Entry'), findsOneWidget);
    expect(find.text('Store'), findsOneWidget);
    expect(find.text('Purchase'), findsOneWidget);
    expect(find.text('Sales'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
  });

  testWidgets('Dashboard shows the account hierarchy and session details',
      (WidgetTester tester) async {
    final profile = AccessRegistry.find('101')!;
    final sessionJson = LoginSession.forProfile(
      profile: profile,
      browserDetails: 'Test browser',
      deviceDetails: 'Test device',
      locationStatus: 'Not shared by user',
      lastLogin: DateTime.utc(2026, 10, 6, 12),
    ).toJsonString();

    await tester.pumpWidget(
      MaterialApp(
        home: DashboardPage(
          accessProfile: profile,
          loginSessionJson: sessionJson,
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('DIZS Software Services Pvt. Ltd.'), findsOneWidget);
    expect(find.text('DIZS Administrator'), findsNWidgets(2));
    expect(find.text('System Administrator'), findsOneWidget);
    expect(find.text('Account'), findsOneWidget);
    expect(find.text('Gate Entry'), findsOneWidget);
    expect(find.text('Purchase'), findsOneWidget);
    expect(find.text('Store'), findsOneWidget);
    expect(find.text('Sales'), findsOneWidget);
    await tester.drag(find.byType(ListView), const Offset(0, -500));
    await tester.pumpAndSettle();
    expect(find.text('Test browser'), findsOneWidget);

    await tester.tap(find.byTooltip('Open navigation menu'));
    await tester.pumpAndSettle();
    await tester.tap(find.byType(ExpansionTile).first);
    await tester.pumpAndSettle();
    expect(find.text('Chart of Accounts'), findsOneWidget);
    await tester.tap(find.text('Chart of Accounts'));
    await tester.pumpAndSettle();
    expect(find.text('Capital Accounts'), findsOneWidget);
    expect(find.text('Current Assets'), findsOneWidget);
    expect(find.text('Ledger'), findsOneWidget);
  });
}
