import 'package:flutter_ui_app/services/app_logger.dart';

class AccessProfile {
  final String accessNo;
  final String name;
  final List<String> portals;
  final bool canUsePortal;

  const AccessProfile({
    required this.accessNo,
    required this.name,
    required this.portals,
    required this.canUsePortal,
  });
}

class AccessRegistry {
  static final Map<String, AccessProfile> profiles = {
    '101': AccessProfile(
      accessNo: '101',
      name: 'Admin Portal',
      portals: ['dashboard', 'darshan', 'services', 'visitors', 'reports'],
      canUsePortal: true,
    ),
    '202': AccessProfile(
      accessNo: '202',
      name: 'Darshan Portal',
      portals: ['dashboard', 'darshan'],
      canUsePortal: true,
    ),
    '303': AccessProfile(
      accessNo: '303',
      name: 'Visitor Portal',
      portals: ['dashboard', 'visitors', 'services'],
      canUsePortal: true,
    ),
    '404': AccessProfile(
      accessNo: '404',
      name: 'Guest Portal',
      portals: ['dashboard'],
      canUsePortal: true,
    ),
  };

  static AccessProfile? find(String accessNo) {
    final profile = profiles[accessNo.trim()];
    AppLogger.log('AccessRegistry.find', profile?.accessNo ?? 'not found');
    return profile;
  }
}
