import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_ui_app/features/auth/login_page.dart';
import 'package:flutter_ui_app/features/web/index_page.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final isWeb = kIsWeb;

    final app = MaterialApp(
      title: 'Karauli Shankar Mahadev',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xff102a43)),
        useMaterial3: true,
      ),
      routes: {
        '/login': (context) => const LoginPage(),
        '/index': (context) => const IndexPage(),
      },
      home: isWeb ? const IndexPage() : const LoginPage(),
    );
    AppLogger.log('MyApp.build');
    return app;
  }
}
