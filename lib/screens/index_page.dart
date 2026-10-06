import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_ui_app/features/auth/login_page.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

const _navy = Color(0xff102a43);
const _teal = Color(0xff0f766e);
const _gold = Color(0xfff59e0b);
const _pageBackground = Color(0xfff4f7fb);

class IndexPage extends StatelessWidget {
  const IndexPage({super.key});

  @override
  Widget build(BuildContext context) {
    final page = Scaffold(
      backgroundColor: _pageBackground,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              _SiteHeader(onLogin: () => _openLogin(context)),
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 1240),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 32,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _Hero(onLogin: () => _openLogin(context)),
                        const SizedBox(height: 36),
                        Text(
                          'Our Services',
                          style: Theme.of(context)
                              .textTheme
                              .headlineMedium
                              ?.copyWith(
                                color: _navy,
                                fontWeight: FontWeight.w800,
                              ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Integrated tools for accounting, inventory, purchasing, '
                          'sales, and daily operations.',
                          style:
                              Theme.of(context).textTheme.bodyLarge?.copyWith(
                                    color: Colors.blueGrey.shade700,
                                  ),
                        ),
                        const SizedBox(height: 20),
                        GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate:
                              SliverGridDelegateWithMaxCrossAxisExtent(
                            maxCrossAxisExtent: 300,
                            mainAxisSpacing: 16,
                            crossAxisSpacing: 16,
                            childAspectRatio:
                                MediaQuery.sizeOf(context).width < 600
                                    ? 1.15
                                    : 0.82,
                          ),
                          itemCount: _services.length,
                          itemBuilder: (_, index) =>
                              _ServiceTile(service: _services[index]),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              _SiteFooter(
                onOpen: (label) => _showFooterDialog(context, label),
              ),
            ],
          ),
        ),
      ),
    );
    AppLogger.log('screens.IndexPage.build');
    return page;
  }

  void _openLogin(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const LoginPage()),
    );
  }

  void _showFooterDialog(BuildContext context, String label) {
    final body = switch (label) {
      'About' =>
        'DIZS Software Services Pvt. Ltd. builds software for business operations.',
      'Contact' => 'Email: dizs.office@gmail.com\nPhone: +91 9045029002',
      'Privacy' =>
        'This UI demo keeps sign-in session details in memory only. Location is optional and requested only with your permission.',
      _ => 'Use this application for authorized business purposes.',
    };
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(label),
        content: Text(body),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }
}

class _SiteHeader extends StatelessWidget {
  final VoidCallback onLogin;

  const _SiteHeader({required this.onLogin});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: _navy,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1240),
          child: Row(
            children: [
              Image.asset(
                'assets/images/dizs-logo.png',
                width: 48,
                height: 48,
                fit: BoxFit.contain,
                semanticLabel: 'DIZS logo',
              ),
              const SizedBox(width: 14),
              const Expanded(
                child: Text(
                  'DIZS Software Services Pvt. Ltd.',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              FilledButton.icon(
                onPressed: onLogin,
                icon: const Icon(Icons.login),
                label: const Text('Login'),
                style: FilledButton.styleFrom(
                  backgroundColor: _teal,
                  foregroundColor: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Hero extends StatelessWidget {
  final VoidCallback onLogin;

  const _Hero({required this.onLogin});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [_navy, Color(0xff1e4975)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Wrap(
        alignment: WrapAlignment.spaceBetween,
        runSpacing: 24,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 680),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'BUSINESS OPERATIONS, CONNECTED',
                  style: TextStyle(
                    color: Color(0xffa7f3d0),
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'A clearer view of your business.',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w900,
                      ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Manage accounts, gate entries, stores, purchases, and sales '
                  'from one organized workspace.',
                  style: TextStyle(
                    color: Color(0xffdbeafe),
                    fontSize: 17,
                    height: 1.6,
                  ),
                ),
              ],
            ),
          ),
          FilledButton.icon(
            onPressed: onLogin,
            icon: const Icon(Icons.arrow_forward),
            label: const Text('Open workspace'),
            style: FilledButton.styleFrom(
              backgroundColor: _gold,
              foregroundColor: _navy,
              padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 18),
            ),
          ),
        ],
      ),
    );
  }
}

class _ServiceTile extends StatelessWidget {
  final _Service service;

  const _ServiceTile({required this.service});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xffdbe4ef)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 58,
              height: 58,
              padding: const EdgeInsets.all(9),
              decoration: BoxDecoration(
                color: const Color(0xffeff6ff),
                borderRadius: BorderRadius.circular(16),
              ),
              child: SvgPicture.asset(service.iconPath),
            ),
            const Spacer(),
            Text(
              service.title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: _navy,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              service.description,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.blueGrey.shade700,
                    height: 1.4,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SiteFooter extends StatelessWidget {
  final ValueChanged<String> onOpen;

  const _SiteFooter({required this.onOpen});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: _navy,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1240),
          child: Column(
            children: [
              const Text(
                'DIZS Software Services Pvt. Ltd.',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 8,
                children: ['About', 'Contact', 'Privacy', 'Terms']
                    .map(
                      (label) => TextButton(
                        onPressed: () => onOpen(label),
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.white,
                        ),
                        child: Text(label),
                      ),
                    )
                    .toList(),
              ),
              const Text(
                '© 2026 DIZS Software Services Pvt. Ltd.',
                style: TextStyle(color: Color(0xffcbd5e1), fontSize: 12),
              ),
            ],
          ),
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
    'Accounting Software',
    'Organize accounts, ledgers, and financial records.',
    'assets/icons/accounting-software.svg',
  ),
  _Service(
    'Gate Entry',
    'Record visitor, vehicle, and goods movements.',
    'assets/icons/gate-entry.svg',
  ),
  _Service(
    'Store',
    'Track stock, item movements, and store balances.',
    'assets/icons/store.svg',
  ),
  _Service(
    'Purchase',
    'Manage supplier orders and purchase records.',
    'assets/icons/purchase.svg',
  ),
  _Service(
    'Sales',
    'Keep sales transactions and customer records organized.',
    'assets/icons/sales.svg',
  ),
  _Service(
    'School Fee Software',
    'Manage fees, payments, receipts, and dues.',
    'assets/icons/school-fee.svg',
  ),
  _Service(
    'Attendance and Report Cards',
    'Track attendance and prepare student reports.',
    'assets/icons/attendance.svg',
  ),
  _Service(
    'Website Builder',
    'Build practical websites for schools and businesses.',
    'assets/icons/website-builder.svg',
  ),
  _Service(
    'App Builder',
    'Create mobile apps for connected communities.',
    'assets/icons/app-builder.svg',
  ),
];
