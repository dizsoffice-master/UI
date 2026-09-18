import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_ui_app/screens/login_page.dart';
import 'package:flutter_ui_app/screens/signup_page.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class IndexPage extends StatelessWidget {
  const IndexPage({super.key});

  @override
  Widget build(BuildContext context) {
    final page = Scaffold(
      appBar: AppBar(
        title: const Text('DIZS Software Services Pvt. Ltd.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const LoginPage()),
            ),
            child: const Text('Login'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const SignupPage()),
            ),
            child: const Text('Signup'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1100),
            child: Column(
              children: [
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(36),
                    child: Column(
                      children: [
                        const Text(
                          'Welcome to Shankar Mahadev',
                          style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 20),
                        const Text(
                          'School management software and digital services.',
                          style: TextStyle(fontSize: 18),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 30),
                        Wrap(
                          spacing: 16,
                          runSpacing: 12,
                          alignment: WrapAlignment.center,
                          children: [
                            ElevatedButton(
                              onPressed: () => Navigator.of(context).push(
                                MaterialPageRoute(builder: (_) => const LoginPage()),
                              ),
                              child: const Text('Login'),
                            ),
                            ElevatedButton(
                              onPressed: () => Navigator.of(context).push(
                                MaterialPageRoute(builder: (_) => const SignupPage()),
                              ),
                              child: const Text('Signup'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 28),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Our Services',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(height: 12),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                    maxCrossAxisExtent: 300,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 1.35,
                  ),
                  itemCount: _services.length,
                  itemBuilder: (_, index) => _ServiceTile(service: _services[index]),
                ),
              ],
            ),
          ),
        ),
      ),
    );
    AppLogger.log('screens.IndexPage.build');
    return page;
  }
}

class _ServiceTile extends StatelessWidget {
  final _Service service;

  const _ServiceTile({required this.service});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset(service.iconPath, width: 46, height: 46),
            const SizedBox(height: 12),
            Text(
              service.title,
              textAlign: TextAlign.center,
              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 17),
            ),
            const SizedBox(height: 6),
            Text(service.description, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

class _Service {
  final String title;
  final String description;
  final String iconPath;

  const _Service(this.title, this.description, this.iconPath);
}

const _services = [
  _Service(
    'School Fee Software',
    'Manage fees, payments, receipts, and dues.',
    'assets/icons/school-fee.svg',
  ),
  _Service(
    'School Attendance and Report Card System',
    'Track attendance and create student report cards.',
    'assets/icons/attendance.svg',
  ),
  _Service(
    'School Transport Management System',
    'Coordinate routes, vehicles, drivers, and students.',
    'assets/icons/transport.svg',
  ),
  _Service(
    'Paper Designer System',
    'Design and organize school papers efficiently.',
    'assets/icons/paper-designer.svg',
  ),
  _Service(
    'Website Builder Services',
    'Build practical websites for schools and businesses.',
    'assets/icons/website-builder.svg',
  ),
  _Service(
    'App Builder Services',
    'Create mobile apps for connected communities.',
    'assets/icons/app-builder.svg',
  ),
];
