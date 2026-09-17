import 'package:flutter/material.dart';
import 'package:flutter_ui_app/services/app_logger.dart';
import 'package:flutter_ui_app/widgets/custom_button.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() {
    final state = _HomeScreenState();
    AppLogger.log('HomeScreen.createState');
    return state;
  }
}

class _HomeScreenState extends State<HomeScreen> {
  bool pressed = false;

  @override
  Widget build(BuildContext context) {
    final page = Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const SizedBox(height: 16),
            CustomButton(
              label: pressed ? 'Pressed' : 'Press Me',
              onPressed: () {
                setState(() {
                  pressed = true;
                });
              },
            ),
            if (pressed) const Text('Button Pressed'),
          ],
        ),
      ),
    );
    AppLogger.log('_HomeScreenState.build');
    return page;
  }
}
