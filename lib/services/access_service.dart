import 'package:flutter_ui_app/models/access.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class AccessService {
  static AccessProfile? login({required String accessNo}) {
    final profile = AccessRegistry.find(accessNo);
    AppLogger.log('AccessService.login', profile?.accessNo ?? 'not found');
    return profile;
  }

  static bool showPortal(String accessNo, String portal) {
    final profile = AccessRegistry.find(accessNo);
    final canShow = profile != null &&
        profile.canUsePortal &&
        profile.portals.contains(portal);
    AppLogger.log('AccessService.showPortal', canShow);
    return canShow;
  }
}
