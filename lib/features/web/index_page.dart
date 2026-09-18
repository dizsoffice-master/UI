import 'package:flutter/material.dart';
import 'package:flutter_ui_app/features/auth/login_page.dart';
import 'package:flutter_ui_app/features/auth/signup_page.dart';
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
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const LoginPage()),
              );
            },
            child: const Text('Login'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const SignupPage()),
              );
            },
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
                          style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 20),
                        const Text(
                          'Pilgrimage, darshan, booking and community services.',
                          style: TextStyle(fontSize: 18),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 30),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) => const LoginPage(),
                                  ),
                                );
                              },
                              child: const Text('Login'),
                            ),
                            const SizedBox(width: 16),
                            ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) => const SignupPage(),
                                  ),
                                );
                              },
                              child: const Text('Signup'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                GridView.count(
                  shrinkWrap: true,
                  crossAxisCount: 3,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 1.8,
                  children: const [
                    _FeatureTile(title: 'Tourism'),
                    _FeatureTile(title: 'Darshan'),
                    _FeatureTile(title: 'Accommodation'),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
    AppLogger.log('IndexPage.build');
    return page;
  }
}

class _FeatureTile extends StatelessWidget {
  final String title;

  const _FeatureTile({required this.title});

  @override
  Widget build(BuildContext context) {
    final tile = Card(
      child: Center(
        child: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
        ),
      ),
    );
    AppLogger.log('_FeatureTile.build');
    return tile;
  }
}
