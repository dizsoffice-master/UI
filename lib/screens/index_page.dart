import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_ui_app/screens/login_page.dart';
import 'package:flutter_ui_app/screens/signup_page.dart';
import 'package:flutter_ui_app/services/app_logger.dart';

class IndexPage extends StatefulWidget {
  const IndexPage({super.key});

  @override
  State<IndexPage> createState() => _IndexPageState();
}

class _IndexPageState extends State<IndexPage> {
  final _offerSearchController = TextEditingController();
  bool _areaFilterEnabled = false;
  String _offerSearch = '';

  @override
  void dispose() {
    _offerSearchController.dispose();
    super.dispose();
  }

  Future<void> _requestAreaFilter() async {
    final permission = await Geolocator.requestPermission();
    if (!mounted) return;

    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Location permission was not granted.')),
      );
      return;
    }

    setState(() => _areaFilterEnabled = true);
  }

  @override
  Widget build(BuildContext context) {
    final offers = _offers
        .where((offer) => offer.shopName.toLowerCase().contains(_offerSearch) ||
            offer.offer.toLowerCase().contains(_offerSearch) ||
            offer.location.toLowerCase().contains(_offerSearch))
        .toList();
      final visibleOffers = _areaFilterEnabled
        ? offers.where((offer) => offer.isLocal).toList()
        : offers;
    final page = Scaffold(
      appBar: AppBar(
        title: const Text('Karauli Shankar Mahadev'),
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
                _OffersSection(
                  searchController: _offerSearchController,
                  offers: visibleOffers,
                  areaFilterEnabled: _areaFilterEnabled,
                  onSearchChanged: (value) {
                    setState(() => _offerSearch = value.trim().toLowerCase());
                  },
                  onAreaFilterPressed: _requestAreaFilter,
                  onClearPressed: () {
                    _offerSearchController.clear();
                    setState(() {
                      _offerSearch = '';
                      _areaFilterEnabled = false;
                    });
                  },
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
                    maxCrossAxisExtent: 280,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 1.8,
                  ),
                  itemCount: _services.length,
                  itemBuilder: (_, index) => _FeatureTile(service: _services[index]),
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

class _FeatureTile extends StatelessWidget {
  final _Service service;

  const _FeatureTile({required this.service});

  @override
  Widget build(BuildContext context) {
    final tile = Card(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(service.icon, size: 30, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: 8),
            Text(
              service.title,
              textAlign: TextAlign.center,
              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 17),
            ),
          ],
        ),
      ),
    );
    AppLogger.log('screens._FeatureTile.build');
    return tile;
  }
}

class _OffersSection extends StatelessWidget {
  final TextEditingController searchController;
  final List<_Offer> offers;
  final bool areaFilterEnabled;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onAreaFilterPressed;
  final VoidCallback onClearPressed;

  const _OffersSection({
    required this.searchController,
    required this.offers,
    required this.areaFilterEnabled,
    required this.onSearchChanged,
    required this.onAreaFilterPressed,
    required this.onClearPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Find My Offers & Services',
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            const Text('Discover verified offers from shops near you.'),
            const SizedBox(height: 16),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                SizedBox(
                  width: 320,
                  child: TextField(
                    controller: searchController,
                    onChanged: onSearchChanged,
                    decoration: const InputDecoration(
                      labelText: 'Search offers',
                      prefixIcon: Icon(Icons.search),
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: onAreaFilterPressed,
                  icon: Icon(areaFilterEnabled ? Icons.location_on : Icons.location_searching),
                  label: Text(areaFilterEnabled ? 'Area Filter On' : 'Show Offers Near Me'),
                ),
                OutlinedButton.icon(
                  onPressed: onClearPressed,
                  icon: const Icon(Icons.clear),
                  label: const Text('Clear Filters'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            const Row(
              children: [
                Icon(Icons.privacy_tip_outlined, size: 18),
                SizedBox(width: 6),
                Expanded(
                  child: Text(
                    'We never store your location. Enable the area filter to see local offers only.',
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),
            if (offers.isEmpty)
              const Text('No offers match your search.')
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 360,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 1.35,
                ),
                itemCount: offers.length,
                itemBuilder: (_, index) => _OfferCard(offer: offers[index]),
              ),
          ],
        ),
      ),
    );
  }
}

class _OfferCard extends StatelessWidget {
  final _Offer offer;

  const _OfferCard({required this.offer});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    offer.shopName,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
                const Icon(Icons.verified, color: Colors.blue, size: 20),
              ],
            ),
            const SizedBox(height: 8),
            Text(offer.offer, style: TextStyle(color: Theme.of(context).colorScheme.primary)),
            const SizedBox(height: 6),
            Text(offer.address, maxLines: 2, overflow: TextOverflow.ellipsis),
            const Spacer(),
            Row(
              children: [
                const Icon(Icons.location_on_outlined, size: 16),
                Expanded(child: Text(offer.location)),
                IconButton(
                  tooltip: 'Open location',
                  onPressed: () {},
                  icon: const Icon(Icons.map_outlined),
                ),
                IconButton(
                  tooltip: 'Call shop',
                  onPressed: () {},
                  icon: const Icon(Icons.call_outlined),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Service {
  final String title;
  final IconData icon;

  const _Service(this.title, this.icon);
}

class _Offer {
  final String shopName;
  final String offer;
  final String location;
  final String address;
  final bool isLocal;

  const _Offer({
    required this.shopName,
    required this.offer,
    required this.location,
    required this.address,
    required this.isLocal,
  });
}

const _services = [
  _Service('Tourism', Icons.travel_explore),
  _Service('Darshan', Icons.temple_hindu),
  _Service('Accommodation', Icons.hotel),
  _Service('Website Development', Icons.language),
  _Service('Mobile App Development', Icons.phone_android),
];

const _offers = [
  _Offer(
    shopName: 'Ganga Pooja Store',
    offer: '10% off on pooja essentials',
    location: 'Haridwar',
    address: 'Har Ki Pauri Road, Haridwar, Uttarakhand',
    isLocal: true,
  ),
  _Offer(
    shopName: 'Haridwar Handicrafts',
    offer: 'Free local delivery above Rs 999',
    location: 'Haridwar',
    address: 'Upper Road Market, Haridwar, Uttarakhand',
    isLocal: true,
  ),
  _Offer(
    shopName: 'Maa Ganga Sweets',
    offer: 'Buy 2 boxes, get 1 box at 50% off',
    location: 'Haridwar',
    address: 'Kankhal Main Bazaar, Haridwar, Uttarakhand',
    isLocal: true,
  ),
  _Offer(
    shopName: 'Shivam Guest House',
    offer: '15% off on two-night stays',
    location: 'Haridwar',
    address: 'Bhupatwala, Haridwar, Uttarakhand',
    isLocal: true,
  ),
  _Offer(
    shopName: 'Rishikesh Yoga House',
    offer: 'First class free for new visitors',
    location: 'Rishikesh',
    address: 'Tapovan Main Road, Rishikesh, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Ram Jhula Cafe',
    offer: 'Free chai with every breakfast',
    location: 'Rishikesh',
    address: 'Swargashram Road, Rishikesh, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Himalayan Trek Gear',
    offer: '20% off on trekking accessories',
    location: 'Rishikesh',
    address: 'Laxman Jhula Market, Rishikesh, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Neelkanth Taxi Service',
    offer: 'Fixed fare for temple transfers',
    location: 'Rishikesh',
    address: 'ISBT Road, Rishikesh, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Doon Organic Basket',
    offer: 'Free delivery on weekend orders',
    location: 'Dehradun',
    address: 'Rajpur Road, Dehradun, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Paltan Bazaar Textiles',
    offer: 'Extra 10% off on festive wear',
    location: 'Dehradun',
    address: 'Paltan Bazaar, Dehradun, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Doon Computer Care',
    offer: 'Free diagnosis for laptop repairs',
    location: 'Dehradun',
    address: 'Nehru Colony, Dehradun, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Forest View Homestay',
    offer: 'Complimentary breakfast for two',
    location: 'Dehradun',
    address: 'Sahastradhara Road, Dehradun, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Roorkee Stationery Hub',
    offer: 'Buy 5 notebooks, get 1 free',
    location: 'Roorkee',
    address: 'Civil Lines, Roorkee, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'IIT Road Cafe',
    offer: 'Student combo from Rs 99',
    location: 'Roorkee',
    address: 'IIT Roorkee Road, Roorkee, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Ganga Electronics',
    offer: 'Free installation on selected appliances',
    location: 'Roorkee',
    address: 'Delhi Road Market, Roorkee, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Saraswati Boutique',
    offer: '15% off on wedding collection',
    location: 'Roorkee',
    address: 'B.T. Ganj, Roorkee, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Kankhal Ayurveda Centre',
    offer: 'Free wellness consultation',
    location: 'Haridwar',
    address: 'Jwalapur Road, Haridwar, Uttarakhand',
    isLocal: true,
  ),
  _Offer(
    shopName: 'Beatles Walk Tours',
    offer: 'Second walking tour at half price',
    location: 'Rishikesh',
    address: 'Muni Ki Reti, Rishikesh, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Doon Web Studio',
    offer: 'Free consultation for small businesses',
    location: 'Dehradun',
    address: 'IT Park Road, Dehradun, Uttarakhand',
    isLocal: false,
  ),
  _Offer(
    shopName: 'Roorkee Mobile Point',
    offer: 'Free screen guard with every phone',
    location: 'Roorkee',
    address: 'Railway Road, Roorkee, Uttarakhand',
    isLocal: false,
  ),
];
