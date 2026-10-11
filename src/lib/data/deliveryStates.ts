import { StateDeliveryInfo } from '@/types';

export const PAN_INDIA_REGIONS: StateDeliveryInfo[] = [
  // 28 States
  {
    slug: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    type: 'State',
    capital: 'Amaravati',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '515xxx - 535xxx',
    hubCity: 'Visakhapatnam & Vijayawada',
    expressAvailable: true,
    deliveryNotes: 'Dispatches are routed through our South logistics interchange in Vijayawada, with priority coverage for coastal and Rayalaseema districts.'
  },
  {
    slug: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    type: 'State',
    capital: 'Itanagar',
    estimatedDays: '6 to 9 business days',
    serviceablePincodesRange: '790xxx - 792xxx',
    hubCity: 'Itanagar & Guwahati Transit Hub',
    expressAvailable: false,
    deliveryNotes: 'Consignments connect via Guwahati hub; terrain and weather advisories may impact transit times in foothill and border sectors.'
  },
  {
    slug: 'assam',
    name: 'Assam',
    type: 'State',
    capital: 'Dispur',
    estimatedDays: '4 to 7 business days',
    serviceablePincodesRange: '781xxx - 788xxx',
    hubCity: 'Guwahati',
    expressAvailable: true,
    deliveryNotes: 'Guwahati acts as the primary regional distribution nodal point for air and surface dispatches across Lower and Upper Assam.'
  },
  {
    slug: 'bihar',
    name: 'Bihar',
    type: 'State',
    capital: 'Patna',
    estimatedDays: '4 to 6 business days',
    serviceablePincodesRange: '800xxx - 855xxx',
    hubCity: 'Patna',
    expressAvailable: true,
    deliveryNotes: 'Direct road and air links via Patna airport support regular courier schedules to urban and district centers.'
  },
  {
    slug: 'chhattisgarh',
    name: 'Chhattisgarh',
    type: 'State',
    capital: 'Raipur',
    estimatedDays: '4 to 6 business days',
    serviceablePincodesRange: '490xxx - 497xxx',
    hubCity: 'Raipur & Bilaspur',
    expressAvailable: true,
    deliveryNotes: 'Central India transit routes connect Raipur hub directly with industrial and residential sectors across the state.'
  },
  {
    slug: 'goa',
    name: 'Goa',
    type: 'State',
    capital: 'Panaji',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '403xxx',
    hubCity: 'Panaji & Vasco da Gama',
    expressAvailable: true,
    deliveryNotes: 'Both North and South Goa pincodes are covered through regional sorting facilities linked with Mumbai and Bengaluru hubs.'
  },
  {
    slug: 'gujarat',
    name: 'Gujarat',
    type: 'State',
    capital: 'Gandhinagar',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '360xxx - 396xxx',
    hubCity: 'Ahmedabad & Surat',
    expressAvailable: true,
    deliveryNotes: 'Western industrial corridor ensures frequent daily flights and overnight road transit for prompt fulfillment.'
  },
  {
    slug: 'haryana',
    name: 'Haryana',
    type: 'State',
    capital: 'Chandigarh',
    estimatedDays: '1 to 3 business days',
    serviceablePincodesRange: '121xxx - 136xxx',
    hubCity: 'Gurugram, Faridabad & Ambala',
    expressAvailable: true,
    deliveryNotes: 'Direct proximity to the National Capital Region logistics network allows next-day and expedited delivery across key districts.'
  },
  {
    slug: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    type: 'State',
    capital: 'Shimla',
    estimatedDays: '4 to 7 business days',
    serviceablePincodesRange: '171xxx - 177xxx',
    hubCity: 'Shimla, Solan & Chandigarh Hub',
    expressAvailable: false,
    deliveryNotes: 'Shipments move via Chandigarh sorting facilities with temperature-controlled handling suitable for luxury items.'
  },
  {
    slug: 'jharkhand',
    name: 'Jharkhand',
    type: 'State',
    capital: 'Ranchi',
    estimatedDays: '4 to 6 business days',
    serviceablePincodesRange: '814xxx - 835xxx',
    hubCity: 'Ranchi & Jamshedpur',
    expressAvailable: true,
    deliveryNotes: 'Air connections via Birsa Munda Airport ensure steady transit for Ranchi, Jamshedpur, and Dhanbad corridors.'
  },
  {
    slug: 'karnataka',
    name: 'Karnataka',
    type: 'State',
    capital: 'Bengaluru',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '560xxx - 591xxx',
    hubCity: 'Bengaluru & Mysuru',
    expressAvailable: true,
    deliveryNotes: 'Major southern logistics gateway; high daily linehaul capacity for Greater Bengaluru, Mangaluru, and Hubballi.'
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    type: 'State',
    capital: 'Thiruvananthapuram',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '670xxx - 695xxx',
    hubCity: 'Kochi & Thiruvananthapuram',
    expressAvailable: true,
    deliveryNotes: 'Dual hub operations via Cochin and Trivandrum International gateways service northern and southern taluks.'
  },
  {
    slug: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    type: 'State',
    capital: 'Bhopal',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '450xxx - 488xxx',
    hubCity: 'Indore & Bhopal',
    expressAvailable: true,
    deliveryNotes: 'Centrally located logistics hubs in Indore and Bhopal manage statewide distribution with high reliability.'
  },
  {
    slug: 'maharashtra',
    name: 'Maharashtra',
    type: 'State',
    capital: 'Mumbai',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '400xxx - 445xxx',
    hubCity: 'Mumbai, Pune & Nagpur',
    expressAvailable: true,
    deliveryNotes: 'Core metropolitan and regional infrastructure; comprehensive air and surface linehauls across western and Vidarbha zones.'
  },
  {
    slug: 'manipur',
    name: 'Manipur',
    type: 'State',
    capital: 'Imphal',
    estimatedDays: '6 to 9 business days',
    serviceablePincodesRange: '795xxx',
    hubCity: 'Imphal',
    expressAvailable: false,
    deliveryNotes: 'Air courier freight routed via Imphal Airport; ground distribution depends on regional operational corridors.'
  },
  {
    slug: 'meghalaya',
    name: 'Meghalaya',
    type: 'State',
    capital: 'Shillong',
    estimatedDays: '5 to 8 business days',
    serviceablePincodesRange: '793xxx - 794xxx',
    hubCity: 'Shillong & Guwahati Gateway',
    expressAvailable: false,
    deliveryNotes: 'Connected directly via the Guwahati road transit corridor up to Shillong and adjoining hill districts.'
  },
  {
    slug: 'mizoram',
    name: 'Mizoram',
    type: 'State',
    capital: 'Aizawl',
    estimatedDays: '6 to 9 business days',
    serviceablePincodesRange: '796xxx',
    hubCity: 'Aizawl (Lengpui Air Transit)',
    expressAvailable: false,
    deliveryNotes: 'Scheduled air connectivity to Lengpui ensures protected transit for high-value and luxury parcels.'
  },
  {
    slug: 'nagaland',
    name: 'Nagaland',
    type: 'State',
    capital: 'Kohima',
    estimatedDays: '6 to 9 business days',
    serviceablePincodesRange: '797xxx',
    hubCity: 'Dimapur & Kohima',
    expressAvailable: false,
    deliveryNotes: 'Commercial hub Dimapur serves as the prime cargo gateway for Kohima and surrounding administrative centers.'
  },
  {
    slug: 'odisha',
    name: 'Odisha',
    type: 'State',
    capital: 'Bhubaneswar',
    estimatedDays: '4 to 6 business days',
    serviceablePincodesRange: '751xxx - 770xxx',
    hubCity: 'Bhubaneswar & Cuttack',
    expressAvailable: true,
    deliveryNotes: 'Regular air dispatches to Biju Patnaik Airport cover the coastal belt, western districts, and southern zones.'
  },
  {
    slug: 'punjab',
    name: 'Punjab',
    type: 'State',
    capital: 'Chandigarh',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '140xxx - 160xxx',
    hubCity: 'Ludhiana, Amritsar & Jalandhar',
    expressAvailable: true,
    deliveryNotes: 'Robust northern highway network allows swift 48-hour delivery across Majha, Doaba, and Malwa regions.'
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    type: 'State',
    capital: 'Jaipur',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '301xxx - 345xxx',
    hubCity: 'Jaipur, Jodhpur & Udaipur',
    expressAvailable: true,
    deliveryNotes: 'Direct western freight routes connect Jaipur and Jodhpur with regular schedules for urban and heritage districts.'
  },
  {
    slug: 'sikkim',
    name: 'Sikkim',
    type: 'State',
    capital: 'Gangtok',
    estimatedDays: '5 to 8 business days',
    serviceablePincodesRange: '737xxx',
    hubCity: 'Gangtok & Siliguri Gateway',
    expressAvailable: false,
    deliveryNotes: 'Parcels transition through the Siliguri corridor before onward ascent to Gangtok and East/South Sikkim.'
  },
  {
    slug: 'tamil-nadu',
    name: 'Tamil Nadu',
    type: 'State',
    capital: 'Chennai',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '600xxx - 643xxx',
    hubCity: 'Chennai, Coimbatore & Madurai',
    expressAvailable: true,
    deliveryNotes: 'High-density logistics hub with multiple daily domestic cargo flights into Chennai and Coimbatore.'
  },
  {
    slug: 'telangana',
    name: 'Telangana',
    type: 'State',
    capital: 'Hyderabad',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '500xxx - 509xxx',
    hubCity: 'Hyderabad & Warangal',
    expressAvailable: true,
    deliveryNotes: 'Hyderabad air cargo hub delivers next-day and second-day performance across the state.'
  },
  {
    slug: 'tripura',
    name: 'Tripura',
    type: 'State',
    capital: 'Agartala',
    estimatedDays: '5 to 8 business days',
    serviceablePincodesRange: '799xxx',
    hubCity: 'Agartala (Maharaja Bir Bikram Airport)',
    expressAvailable: false,
    deliveryNotes: 'Daily air courier linehauls from Kolkata and Guwahati land at Agartala for prompt regional distribution.'
  },
  {
    slug: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    type: 'State',
    capital: 'Lucknow',
    estimatedDays: '2 to 4 business days',
    serviceablePincodesRange: '201xxx - 285xxx',
    hubCity: 'Lucknow, Noida, Kanpur & Varanasi',
    expressAvailable: true,
    deliveryNotes: 'NCR proximity and express highway corridors enable high-speed transit across western and eastern UP.'
  },
  {
    slug: 'uttarakhand',
    name: 'Uttarakhand',
    type: 'State',
    capital: 'Dehradun',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '244xxx - 263xxx',
    hubCity: 'Dehradun, Haridwar & Haldwani',
    expressAvailable: true,
    deliveryNotes: 'Regular courier connectivity through Dehradun and Kumaon plains with secure packing for hill destinations.'
  },
  {
    slug: 'west-bengal',
    name: 'West Bengal',
    type: 'State',
    capital: 'Kolkata',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '700xxx - 743xxx',
    hubCity: 'Kolkata & Siliguri',
    expressAvailable: true,
    deliveryNotes: 'Eastern zone headquarters in Kolkata provides air and railway hub connections across South Bengal and North Bengal.'
  },

  // 8 Union Territories
  {
    slug: 'andaman-and-nicobar-islands',
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    capital: 'Port Blair',
    estimatedDays: '6 to 10 business days',
    serviceablePincodesRange: '744xxx',
    hubCity: 'Port Blair (Veer Savarkar Airport)',
    expressAvailable: false,
    deliveryNotes: 'Exclusive air cargo dispatch via Chennai or Kolkata. Island transit depends on local marine weather and flights.'
  },
  {
    slug: 'chandigarh',
    name: 'Chandigarh',
    type: 'Union Territory',
    capital: 'Chandigarh',
    estimatedDays: '1 to 3 business days',
    serviceablePincodesRange: '160xxx',
    hubCity: 'Chandigarh Urban Gateway',
    expressAvailable: true,
    deliveryNotes: 'Direct, premium courier access with same-day and next-day dispatches operating from northern regional nodes.'
  },
  {
    slug: 'dadra-and-nagar-haveli-and-daman-and-diu',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    capital: 'Daman',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '396xxx',
    hubCity: 'Vapi & Surat Interchange',
    expressAvailable: true,
    deliveryNotes: 'Serviced efficiently via western industrial highway corridors connecting Mumbai, Vapi, and Surat.'
  },
  {
    slug: 'delhi',
    name: 'Delhi, National Capital Territory',
    type: 'Union Territory',
    capital: 'New Delhi',
    estimatedDays: '1 to 2 business days',
    serviceablePincodesRange: '110xxx',
    hubCity: 'New Delhi Direct Hub',
    expressAvailable: true,
    deliveryNotes: 'Capital city priority distribution. Same-day dispatch and next-day delivery available across all postal codes.'
  },
  {
    slug: 'jammu-and-kashmir',
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    capital: 'Srinagar & Jammu',
    estimatedDays: '4 to 7 business days',
    serviceablePincodesRange: '180xxx - 194xxx',
    hubCity: 'Jammu & Srinagar Airport Nodes',
    expressAvailable: true,
    deliveryNotes: 'Air-lifted dispatches via Jammu and Srinagar airports with weather-monitored ground handovers.'
  },
  {
    slug: 'ladakh',
    name: 'Ladakh',
    type: 'Union Territory',
    capital: 'Leh',
    estimatedDays: '6 to 10 business days',
    serviceablePincodesRange: '194xxx',
    hubCity: 'Leh (Kushok Bakula Rimpochee Airport)',
    expressAvailable: false,
    deliveryNotes: 'Air-only connection via Leh; consignments require robust thermal packaging to withstand high-altitude conditions.'
  },
  {
    slug: 'lakshadweep',
    name: 'Lakshadweep',
    type: 'Union Territory',
    capital: 'Kavaratti',
    estimatedDays: '7 to 12 business days',
    serviceablePincodesRange: '682xxx',
    hubCity: 'Kochi Island Forwarding Cell',
    expressAvailable: false,
    deliveryNotes: 'Consignments transfer from Kochi via scheduled naval/air cargo feeder vessels to Agatti and Kavaratti.'
  },
  {
    slug: 'puducherry',
    name: 'Puducherry',
    type: 'Union Territory',
    capital: 'Puducherry',
    estimatedDays: '3 to 5 business days',
    serviceablePincodesRange: '605xxx',
    hubCity: 'Puducherry & Chennai Distribution Hub',
    expressAvailable: true,
    deliveryNotes: 'Connected directly via the East Coast Road transit line from Chennai central distribution hub.'
  }
];
