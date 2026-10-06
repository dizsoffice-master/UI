import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_ui_app/models/access.dart';
import 'package:flutter_ui_app/models/login_session.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

const _navy = Color(0xff102a43);
const _blue = Color(0xff1d4ed8);
const _teal = Color(0xff0f766e);
const _gold = Color(0xfff59e0b);
const _pageBackground = Color(0xfff4f7fb);

class DashboardPage extends StatefulWidget {
  final AccessProfile accessProfile;
  final String loginSessionJson;

  const DashboardPage({
    super.key,
    required this.accessProfile,
    required this.loginSessionJson,
  });

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  late final LoginSession _session;
  String _selectedModule = 'Dashboard';

  @override
  void initState() {
    super.initState();
    final json = jsonDecode(widget.loginSessionJson);
    if (json is! Map<String, dynamic>) {
      throw const FormatException('Login response must be a JSON object.');
    }
    _session = LoginSession.fromJson(json);
  }

  @override
  Widget build(BuildContext context) {
    final allowedModules = widget.accessProfile.portals;
    final page = Scaffold(
      backgroundColor: _pageBackground,
      appBar: AppBar(
        backgroundColor: _navy,
        foregroundColor: Colors.white,
        titleSpacing: 0,
        title: Row(
          children: [
            Image.asset(
              'assets/images/dizs-logo.png',
              width: 36,
              height: 36,
              semanticLabel: 'DIZS logo',
            ),
            const SizedBox(width: 10),
            const Flexible(
              child: Text(
                'DIZS Software Services Pvt. Ltd.',
                overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: Center(
              child: Text(
                _session.userName,
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
      drawer: _buildDrawer(allowedModules),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            _UserSummary(session: _session),
            const SizedBox(height: 24),
            Text(
              _selectedModule == 'Dashboard' ? 'Business workspace' : _selectedModule,
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: _navy,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              _selectedModule == 'Dashboard'
                  ? 'Choose a module to manage your business records.'
                  : '$_selectedModule workspace. Connect this section to your approved JSON service to load live records.',
              style: TextStyle(color: Colors.blueGrey.shade700),
            ),
            const SizedBox(height: 16),
            _buildModuleContent(allowedModules),
            const SizedBox(height: 20),
            _LoginDetailsCard(session: _session),
          ],
        ),
      ),
    );
    AppLogger.log('DashboardPage.build', _selectedModule);
    return page;
  }

  Widget _buildDrawer(List<String> allowedModules) {
    return Drawer(
      child: SafeArea(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            _DrawerHeader(session: _session),
            _drawerItem(
              icon: Icons.dashboard_outlined,
              title: 'Dashboard',
              onTap: () => _selectDrawerModule('Dashboard'),
            ),
            if (allowedModules.contains('account'))
              ExpansionTile(
                leading: const Icon(Icons.account_balance_wallet_outlined),
                title: const Text('Account'),
                childrenPadding: const EdgeInsets.only(left: 16),
                children: [
                  ExpansionTile(
                    leading: const Icon(Icons.account_tree_outlined),
                    title: const Text('Chart of Accounts'),
                    childrenPadding: const EdgeInsets.only(left: 24),
                    children: [
                      _drawerItem(
                        icon: Icons.savings_outlined,
                        title: 'Capital Accounts',
                        onTap: () => _selectDrawerModule('Capital Accounts'),
                      ),
                      _drawerItem(
                        icon: Icons.account_balance_outlined,
                        title: 'Current Assets',
                        onTap: () => _selectDrawerModule('Current Assets'),
                      ),
                    ],
                  ),
                  _drawerItem(
                    icon: Icons.menu_book_outlined,
                    title: 'Ledger',
                    onTap: () => _selectDrawerModule('Ledger'),
                  ),
                ],
              ),
            if (allowedModules.contains('gate'))
              _drawerItem(
                icon: Icons.meeting_room_outlined,
                title: 'Gate Entry',
                onTap: () => _selectDrawerModule('Gate Entry'),
              ),
            if (allowedModules.contains('purchase'))
              _drawerItem(
                icon: Icons.shopping_cart_checkout_outlined,
                title: 'Purchase',
                onTap: () => _selectDrawerModule('Purchase'),
              ),
            if (allowedModules.contains('store'))
              _drawerItem(
                icon: Icons.inventory_2_outlined,
                title: 'Store',
                onTap: () => _selectDrawerModule('Store'),
              ),
            if (allowedModules.contains('sales'))
              _drawerItem(
                icon: Icons.point_of_sale_outlined,
                title: 'Sales',
                onTap: () => _selectDrawerModule('Sales'),
              ),
          ],
        ),
      ),
    );
  }

  Widget _drawerItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: _blue),
      title: Text(title),
      selected: _selectedModule == title,
      selectedTileColor: const Color(0xffe8f0ff),
      onTap: onTap,
    );
  }

  Widget _buildModuleContent(List<String> allowedModules) {
    if (_selectedModule != 'Dashboard') {
      return _ModuleDetailCard(title: _selectedModule);
    }

    final modules = <_Module>[
      if (allowedModules.contains('account'))
        const _Module(
          'Account',
          'Chart of Accounts and Ledger',
          Icons.account_balance_wallet_outlined,
          _blue,
        ),
      if (allowedModules.contains('gate'))
        const _Module(
          'Gate Entry',
          'Visitor, vehicle, and goods entry',
          Icons.meeting_room_outlined,
          _teal,
        ),
      if (allowedModules.contains('purchase'))
        const _Module(
          'Purchase',
          'Supplier and purchase records',
          Icons.shopping_cart_checkout_outlined,
          _gold,
        ),
      if (allowedModules.contains('store'))
        const _Module(
          'Store',
          'Items, stock, and store movements',
          Icons.inventory_2_outlined,
          Color(0xff7c3aed),
        ),
      if (allowedModules.contains('sales'))
        const _Module(
          'Sales',
          'Sales and customer records',
          Icons.point_of_sale_outlined,
          Color(0xffdc5a45),
        ),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final columns = constraints.maxWidth >= 900
            ? 3
            : constraints.maxWidth >= 580
                ? 2
                : 1;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: columns,
            mainAxisSpacing: 14,
            crossAxisSpacing: 14,
            childAspectRatio: 1.8,
          ),
          itemCount: modules.length,
          itemBuilder: (context, index) {
            final module = modules[index];
            return _ModuleCard(
              module: module,
              onTap: () => _selectModule(module.title),
            );
          },
        );
      },
    );
  }

  void _selectModule(String title) {
    setState(() => _selectedModule = title);
  }

  void _selectDrawerModule(String title) {
    Navigator.of(context).pop();
    _selectModule(title);
  }
}

class _DrawerHeader extends StatelessWidget {
  final LoginSession session;

  const _DrawerHeader({required this.session});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      color: _navy,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset(
            'assets/images/dizs-logo.png',
            width: 54,
            height: 54,
            semanticLabel: 'DIZS logo',
          ),
          const SizedBox(height: 12),
          const Text(
            'DIZS Software Services Pvt. Ltd.',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            session.userName,
            style: const TextStyle(color: Colors.white, fontSize: 18),
          ),
          Text(
            session.designation,
            style: const TextStyle(color: Color(0xffcbd5e1)),
          ),
          const SizedBox(height: 6),
          Text(
            'Last login: ${_formatDate(session.lastLogin)}',
            style: const TextStyle(color: Color(0xffcbd5e1), fontSize: 12),
          ),
        ],
      ),
    );
  }
}

class _UserSummary extends StatelessWidget {
  final LoginSession session;

  const _UserSummary({required this.session});

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
        child: Wrap(
          spacing: 28,
          runSpacing: 16,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            const CircleAvatar(
              radius: 28,
              backgroundColor: Color(0xffe8f0ff),
              child: Icon(Icons.person_outline, color: _blue, size: 30),
            ),
            _SummaryField(label: 'User', value: session.userName),
            _SummaryField(label: 'Designation', value: session.designation),
            _SummaryField(label: 'Last Login', value: _formatDate(session.lastLogin)),
          ],
        ),
      ),
    );
  }
}

class _SummaryField extends StatelessWidget {
  final String label;
  final String value;

  const _SummaryField({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(color: Colors.blueGrey.shade600)),
        const SizedBox(height: 3),
        Text(value, style: const TextStyle(fontWeight: FontWeight.w700)),
      ],
    );
  }
}

class _LoginDetailsCard extends StatelessWidget {
  final LoginSession session;

  const _LoginDetailsCard({required this.session});

  @override
  Widget build(BuildContext context) {
    final location = session.latitude != null && session.longitude != null
        ? '${session.latitude!.toStringAsFixed(5)}, ${session.longitude!.toStringAsFixed(5)}'
        : 'Not shared';
    return Card(
      elevation: 0,
      color: const Color(0xffeef6ff),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'This sign-in session',
              style: TextStyle(color: _navy, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 12),
            _detailRow(Icons.language, 'Browser', session.browserDetails),
            _detailRow(Icons.devices, 'Device', session.deviceDetails),
            _detailRow(Icons.location_on_outlined, 'Location', location),
            _detailRow(
              Icons.info_outline,
              'Location status',
              session.locationStatus,
            ),
            const SizedBox(height: 8),
            Text(
              'Session details are held in this app session only; no server is configured to store them.',
              style: TextStyle(color: Colors.blueGrey.shade700, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }

  Widget _detailRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 18, color: _teal),
          const SizedBox(width: 8),
          SizedBox(
            width: 82,
            child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700)),
          ),
          Expanded(
            child: SelectableText(
              value,
              maxLines: 3,
            ),
          ),
        ],
      ),
    );
  }
}

class _Module {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;

  const _Module(this.title, this.subtitle, this.icon, this.color);
}

class _ModuleCard extends StatelessWidget {
  final _Module module;
  final VoidCallback onTap;

  const _ModuleCard({required this.module, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xffdbe4ef)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                backgroundColor: module.color.withValues(alpha: 0.12),
                child: Icon(module.icon, color: module.color),
              ),
              const SizedBox(height: 14),
              Text(
                module.title,
                style: const TextStyle(
                  color: _navy,
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                module.subtitle,
                style: TextStyle(color: Colors.blueGrey.shade700),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ModuleDetailCard extends StatelessWidget {
  final String title;

  const _ModuleDetailCard({required this.title});

  @override
  Widget build(BuildContext context) {
    final details = switch (title) {
      'Capital Accounts' => 'Chart of Accounts  /  Capital Accounts',
      'Current Assets' => 'Chart of Accounts  /  Current Assets',
      'Ledger' => 'Account  /  Ledger',
      _ => title,
    };
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xffdbe4ef)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: _navy,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 8),
            Text(details, style: TextStyle(color: Colors.blueGrey.shade600)),
            const SizedBox(height: 24),
            const Text('No records loaded. Connect the approved JSON response to show this module’s data.'),
          ],
        ),
      ),
    );
  }
}

String _formatDate(DateTime value) {
  final local = value.toLocal();
  final month = local.month.toString().padLeft(2, '0');
  final day = local.day.toString().padLeft(2, '0');
  final hour = local.hour.toString().padLeft(2, '0');
  final minute = local.minute.toString().padLeft(2, '0');
  return '${local.year}-$month-$day $hour:$minute';
}
