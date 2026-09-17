import 'dart:developer' as developer;

class AppLogger {
  AppLogger._();

  static bool enabled = true;
  static void Function(String message)? onLog;

  static void log(String functionName, [Object? result]) {
    if (!enabled) {
      return;
    }

    final message = result == null ? 'Completed' : 'Completed: $result';
    onLog?.call('$functionName: $message');
    developer.log(message, name: 'flutter_ui_app.$functionName');
  }
}