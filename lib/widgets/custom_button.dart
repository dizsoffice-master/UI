import 'package:flutter/material.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class CustomButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const CustomButton({
    Key? key,
    required this.label,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final button = ElevatedButton(
      onPressed: onPressed,
      child: Text(label),
    );
    AppLogger.log('CustomButton.build', label);
    return button;
  }
}
