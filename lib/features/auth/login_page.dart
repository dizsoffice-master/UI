import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_ui_app/features/auth/signup_page.dart';
import 'package:flutter_ui_app/features/dashboard/dashboard_page.dart';
import 'package:flutter_ui_app/models/login_session.dart';
import 'package:flutter_ui_app/services/access_service.dart';
import 'package:flutter_ui_app/services/app_logger.dart';
import 'package:flutter_ui_app/services/browser_details_stub.dart'
    if (dart.library.js_interop) 'package:flutter_ui_app/services/browser_details_web.dart'
    as browser_details;

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() {
    final state = _LoginPageState();
    AppLogger.log('LoginPage.createState');
    return state;
  }
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _accessNoController = TextEditingController();

  String? _errorEmail;
  String? _errorPassword;
  String? _errorAccessNo;
  Position? _loginPosition;
  var _locationStatus = 'Not shared by user';
  var _locationConsentResolved = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _collectLocationConsent();
    });
  }

  @override
  Widget build(BuildContext context) {
    final isSmall = MediaQuery.of(context).size.width < 700;

    final page = Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xff102a43), Color(0xff1d3557)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 980),
                child: Card(
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Row(
                    children: [
                      if (!isSmall)
                        Expanded(
                          child: Container(
                            height: 620,
                            padding: const EdgeInsets.all(48),
                            decoration: const BoxDecoration(
                              color: Color(0xff0d3b66),
                              borderRadius: BorderRadius.horizontal(
                                left: Radius.circular(24),
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text(
                                  'DIZS Software Services Pvt. Ltd.',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 30,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 16),
                                const Text(
                                  'Business operations workspace',
                                  style: TextStyle(
                                    color: Colors.white70,
                                    fontSize: 16,
                                  ),
                                ),
                                const SizedBox(height: 40),
                                Container(
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.08),
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  child: const Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Business Workspace',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 22,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      SizedBox(height: 10),
                                      Text(
                                        'Manage accounts, gate entries, purchases, stores, and sales.',
                                        style: TextStyle(
                                          color: Colors.white70,
                                          fontSize: 14,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      Expanded(
                        child: Padding(
                          padding: EdgeInsets.symmetric(
                            horizontal: isSmall ? 20 : 48,
                            vertical: 40,
                          ),
                          child: Form(
                            key: _formKey,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text(
                                  'Welcome Back',
                                  style: TextStyle(
                                    fontSize: 32,
                                    fontWeight: FontWeight.w700,
                                    color: Color(0xff102a43),
                                  ),
                                ),
                                const SizedBox(height: 8),
                                const Text(
                                  'Demo sign-in: use access number 101, 202, 303, or 404 and enter any non-empty email and password.',
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.black54,
                                  ),
                                ),
                                const SizedBox(height: 30),
                                TextFormField(
                                  controller: _accessNoController,
                                  keyboardType: TextInputType.number,
                                  decoration: const InputDecoration(
                                    labelText: 'Access No',
                                    prefixIcon: Icon(
                                        Icons.confirmation_number_outlined),
                                    border: OutlineInputBorder(),
                                  ),
                                  validator: (value) {
                                    if (value == null || value.trim().isEmpty) {
                                      return 'Access No is required';
                                    }
                                    return null;
                                  },
                                ),
                                if (_errorAccessNo != null)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 6),
                                    child: Text(
                                      _errorAccessNo!,
                                      style: const TextStyle(color: Colors.red),
                                    ),
                                  ),
                                const SizedBox(height: 16),
                                TextFormField(
                                  controller: _emailController,
                                  keyboardType: TextInputType.emailAddress,
                                  decoration: const InputDecoration(
                                    labelText: 'Email',
                                    prefixIcon: Icon(Icons.email_outlined),
                                    border: OutlineInputBorder(),
                                  ),
                                  validator: (value) {
                                    if (value == null || value.trim().isEmpty) {
                                      return 'Email is required';
                                    }
                                    return null;
                                  },
                                ),
                                if (_errorEmail != null)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 6),
                                    child: Text(
                                      _errorEmail!,
                                      style: const TextStyle(color: Colors.red),
                                    ),
                                  ),
                                const SizedBox(height: 16),
                                TextFormField(
                                  controller: _passwordController,
                                  obscureText: true,
                                  decoration: const InputDecoration(
                                    labelText: 'Password',
                                    prefixIcon: Icon(Icons.lock_outline),
                                    border: OutlineInputBorder(),
                                  ),
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Password is required';
                                    }
                                    return null;
                                  },
                                ),
                                if (_errorPassword != null)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 6),
                                    child: Text(
                                      _errorPassword!,
                                      style: const TextStyle(color: Colors.red),
                                    ),
                                  ),
                                const SizedBox(height: 20),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: TextButton(
                                    onPressed: () {},
                                    child: const Text('Forgot password?'),
                                  ),
                                ),
                                const SizedBox(height: 12),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xff1d3557),
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 16),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                  ),
                                  onPressed: _locationConsentResolved
                                      ? _handleLogin
                                      : null,
                                  child: const Text(
                                    'Login',
                                    style: TextStyle(fontSize: 16),
                                  ),
                                ),
                                const SizedBox(height: 18),
                                Wrap(
                                  alignment: WrapAlignment.center,
                                  crossAxisAlignment: WrapCrossAlignment.center,
                                  children: [
                                    const Padding(
                                      padding: EdgeInsets.only(right: 8),
                                      child: Text('New to platform?'),
                                    ),
                                    TextButton(
                                      onPressed: () {
                                        Navigator.of(context).push(
                                          MaterialPageRoute(
                                            builder: (_) => const SignupPage(),
                                          ),
                                        );
                                      },
                                      child: const Text(
                                        'Create free account',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
    AppLogger.log('_LoginPageState.build');
    return page;
  }

  Future<void> _collectLocationConsent() async {
    final shareLocation = await _askLocationPermission();
    if (!mounted) return;

    if (shareLocation) {
      try {
        if (!await Geolocator.isLocationServiceEnabled()) {
          _locationStatus = 'Location services are disabled';
        } else {
          var permission = await Geolocator.checkPermission();
          if (permission == LocationPermission.denied) {
            permission = await Geolocator.requestPermission();
          }
          if (permission == LocationPermission.denied) {
            _locationStatus = 'Location permission was denied';
          } else if (permission == LocationPermission.deniedForever) {
            _locationStatus =
                'Location permission is blocked in device settings';
          } else {
            _loginPosition = await Geolocator.getCurrentPosition(
              locationSettings: const LocationSettings(
                accuracy: LocationAccuracy.low,
                timeLimit: Duration(seconds: 10),
              ),
            );
            _locationStatus = 'Shared for this sign-in session';
          }
        }
      } on Exception catch (error) {
        _locationStatus = 'Location could not be retrieved';
        AppLogger.log('_LoginPageState.location', error.runtimeType.toString());
      }
    }

    if (mounted) {
      setState(() {
        _locationConsentResolved = true;
      });
    }
  }

  Future<void> _handleLogin() async {
    setState(() {
      _errorEmail = null;
      _errorPassword = null;
      _errorAccessNo = null;
    });

    final email = _emailController.text.trim();
    final password = _passwordController.text;
    final accessNo = _accessNoController.text.trim();
    var hasError = false;

    if (accessNo.isEmpty) {
      _errorAccessNo = 'Access No is required';
      hasError = true;
    }

    if (email.isEmpty) {
      _errorEmail = 'Email is required';
      hasError = true;
    }

    if (password.isEmpty) {
      _errorPassword = 'Password is required';
      hasError = true;
    }

    final accessProfile = AccessService.login(accessNo: accessNo);
    if (accessProfile == null && accessNo.isNotEmpty) {
      _errorAccessNo = 'Access No is invalid';
      hasError = true;
    }

    if (!hasError) {
      if (accessProfile == null) {
        _errorAccessNo = 'Access No is invalid';
        AppLogger.log('_LoginPageState._handleLogin', 'invalid access number');
        return;
      }

      final screenSize = MediaQuery.sizeOf(context);
      final session = LoginSession.forProfile(
        profile: accessProfile,
        browserDetails: browser_details.getBrowserDetails(),
        deviceDetails: '${kIsWeb ? 'Web' : defaultTargetPlatform.name} · '
            '${screenSize.width.round()}×${screenSize.height.round()} logical px',
        locationStatus: _locationStatus,
        latitude: _loginPosition?.latitude,
        longitude: _loginPosition?.longitude,
      );
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => DashboardPage(
            accessProfile: accessProfile,
            loginSessionJson: session.toJsonString(),
          ),
        ),
      );
    }
    AppLogger.log('_LoginPageState._handleLogin',
        hasError ? 'validation failed' : 'logged in');
  }

  Future<bool> _askLocationPermission() async {
    return await showDialog<bool>(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Optional sign-in location'),
            content: const Text(
              'Before showing the login form, DIZS can read your device '
              'location for this sign-in session. '
              'Your coordinates stay in memory only and are not sent to a server. '
              'You can continue without sharing your location.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(false),
                child: const Text('Continue without location'),
              ),
              FilledButton(
                onPressed: () => Navigator.of(context).pop(true),
                child: const Text('Share location'),
              ),
            ],
          ),
        ) ??
        false;
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _accessNoController.dispose();
    super.dispose();
    AppLogger.log('_LoginPageState.dispose');
  }
}
