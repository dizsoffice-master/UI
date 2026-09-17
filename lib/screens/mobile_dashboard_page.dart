import 'package:flutter/material.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class MobileDashboardPage extends StatelessWidget {
  const MobileDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final page = Scaffold(
      appBar: AppBar(
        title: const Text('Mobile Dashboard'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: GridView.count(
          crossAxisCount: MediaQuery.of(context).size.width > 700 ? 3 : 1,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          children: const [
            _DashboardCard(title: 'Darshan', subtitle: 'Today 07:30 AM'),
            _DashboardCard(title: 'Services', subtitle: '2 bookings'),
            _DashboardCard(title: 'Visitor Guide', subtitle: 'Route map'),
          ],
        ),
      ),
    );
    AppLogger.log('MobileDashboardPage.build');
    return page;
  }
}

class _DashboardCard extends StatelessWidget {
  final String title;
  final String subtitle;

  const _DashboardCard({required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    final card = Card(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 16),
            Text(subtitle),
          ],
        ),
      ),
    );
    AppLogger.log('_DashboardCard.build', title);
    return card;
  }
}
