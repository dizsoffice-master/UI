import 'package:flutter_ui_app/services/app_logger.dart';

class AccessProfile {
  final String accessNo;
  final String name;
  final String designation;
  final List<String> portals;
  final bool canUsePortal;

  const AccessProfile({
    required this.accessNo,
    required this.name,
    required this.designation,
    required this.portals,
    required this.canUsePortal,
  });
}

class AccessRegistry {
  static final Map<String, AccessProfile> profiles = {
    '101': AccessProfile(
      accessNo: '101',
      name: 'DIZS Administrator',
      designation: 'System Administrator',
      portals: ['dashboard', 'account', 'gate', 'purchase', 'store', 'sales'],
      canUsePortal: true,
    ),
    '202': AccessProfile(
      accessNo: '202',
      name: 'DIZS Gate User',
      designation: 'Gate Entry Operator',
      portals: ['dashboard', 'gate'],
      canUsePortal: true,
    ),
    '303': AccessProfile(
      accessNo: '303',
      name: 'DIZS Store User',
      designation: 'Store Manager',
      portals: ['dashboard', 'store'],
      canUsePortal: true,
    ),
    '404': AccessProfile(
      accessNo: '404',
      name: 'DIZS Purchase User',
      designation: 'Purchase Operator',
      portals: ['dashboard', 'purchase'],
      canUsePortal: true,
    ),
  };

  static AccessProfile? find(String accessNo) {
    final profile = profiles[accessNo.trim()];
    AppLogger.log('AccessRegistry.find', profile?.accessNo ?? 'not found');
    return profile;
  }
}
