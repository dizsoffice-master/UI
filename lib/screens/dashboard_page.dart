import 'package:flutter/material.dart';
import 'package:flutter_ui_app/models/access.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class DashboardPage extends StatelessWidget {
  final AccessProfile accessProfile;

  const DashboardPage({super.key, required this.accessProfile});

  @override
  Widget build(BuildContext context) {
    final allowedPortals = accessProfile.portals;

    final page = Scaffold(
      appBar: AppBar(
        title: Text('Dashboard • ${accessProfile.name}'),
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            UserAccountsDrawerHeader(
              accountName: Text(accessProfile.name),
              accountEmail: Text('Access No: ${accessProfile.accessNo}'),
              currentAccountPicture: const CircleAvatar(
                child: Icon(Icons.person),
              ),
            ),
            ...allowedPortals.map(
              (portal) => ListTile(
                leading: Icon(_portalIcon(portal)),
                title: Text(_portalTitle(portal)),
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Open ${_portalTitle(portal)}')),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: GridView.count(
          crossAxisCount: MediaQuery.of(context).size.width > 760 ? 3 : 1,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          children: allowedPortals.map((portal) {
            return Card(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(_portalIcon(portal), size: 36),
                    const SizedBox(height: 16),
                    Text(
                      _portalTitle(portal),
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 12),
                    Text(_portalSubtitle(portal)),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
    AppLogger.log('screens.DashboardPage.build');
    return page;
  }

  IconData _portalIcon(String portal) {
    late final IconData icon;
    switch (portal) {
      case 'dashboard':
        icon = Icons.dashboard;
        break;
      case 'darshan':
        icon = Icons.temple_hindu;
        break;
      case 'services':
        icon = Icons.miscellaneous_services;
        break;
      case 'visitors':
        icon = Icons.people;
        break;
      case 'reports':
        icon = Icons.bar_chart;
        break;
      default:
        icon = Icons.apps;
    }
    AppLogger.log('screens.DashboardPage._portalIcon', portal);
    return icon;
  }

  String _portalTitle(String portal) {
    late final String title;
    switch (portal) {
      case 'dashboard':
        title = 'Dashboard';
        break;
      case 'darshan':
        title = 'Darshan';
        break;
      case 'services':
        title = 'Services';
        break;
      case 'visitors':
        title = 'Visitors';
        break;
      case 'reports':
        title = 'Reports';
        break;
      default:
        title = portal;
    }
    AppLogger.log('screens.DashboardPage._portalTitle', title);
    return title;
  }

  String _portalSubtitle(String portal) {
    late final String subtitle;
    switch (portal) {
      case 'dashboard':
        subtitle = 'Overview and app summary';
        break;
      case 'darshan':
        subtitle = 'Darshan and pooja services';
        break;
      case 'services':
        subtitle = 'Service management and booking';
        break;
      case 'visitors':
        subtitle = 'Visitor records and guidance';
        break;
      case 'reports':
        subtitle = 'Operational and performance reports';
        break;
      default:
        subtitle = 'Portal access';
    }
    AppLogger.log('screens.DashboardPage._portalSubtitle', subtitle);
    return subtitle;
  }
}
