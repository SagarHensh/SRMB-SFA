var fsaMap = google.maps.Map;
var routeMap = google.maps.Map;
var marker = google.maps.Marker;
var geocoder = google.maps.Geocoder;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
var directionsService2 = new google.maps.DirectionsService();
var directionsRenderer2 = new google.maps.DirectionsRenderer();
var sfaType = 0,
  sfaState = 0,
  sfaDistrict = 0,
  sfaZone = 0,
  sfaEmpList = [],
  sfaMarker = [],
  routeShop = [],
  routeType = 0,
  routeName = "";
var SHOP_LIST = [
  {
    id: 1,
    name: "Baba Loknath H/W",
    lat: 22.4853113,
    lng: 88.3657988,
    type: "Dealer",
    isNew: 0,
  },
  {
    id: 2,
    name: "Paul H/W",
    lat: 22.4852909,
    lng: 88.3661579,
    type: "Dealer",
    isNew: 0,
  },
  {
    id: 3,
    name: "Garg Enterprise",
    lat: 22.4830579,
    lng: 88.3728338,
    type: "Dealer",
    isNew: 0,
  },
  {
    id: 4,
    name: "Gobinda H/W",
    lat: 22.4957897,
    lng: 88.3729642,
    type: "Dealer",
    isNew: 0,
  },
  {
    id: 5,
    name: "M.K. Traders",
    lat: 22.4941065,
    lng: 88.3711498,
    type: "Dealer",
    isNew: 1,
  },
  {
    id: 5,
    name: "M.K. Traders",
    lat: 22.4988822,
    lng: 88.3692183,
    type: "Dealer",
    isNew: 0,
  },
  {
    id: 6,
    name: "Biswajit Saha",
    lat: 22.5080948,
    lng: 88.3556327,
    type: "Mason",
    isNew: 0,
  },
  {
    id: 7,
    name: "Maa Kali H/W",
    lat: 22.5131875,
    lng: 88.3603685,
    type: "Sub Dealer",
    isNew: 1,
  },
  {
    id: 8,
    name: "Maa Kali H/W",
    lat: 22.5184938,
    lng: 88.3711498,
    type: "Sub Dealer",
    isNew: 0,
  },
  {
    id: 9,
    name: "Maa Kali H/W",
    lat: 22.5139322,
    lng: 88.3911408,
    type: "Sub Dealer",
    isNew: 0,
  },
  {
    id: 10,
    name: "Maa Tara Enterprise",
    lat: 22.5135084,
    lng: 88.40069,
    type: "Sub Dealer",
    isNew: 1,
  },
  {
    id: 11,
    name: "Mithun Roy",
    lat: 22.5253419,
    lng: 88.3931309,
    type: "Distributor",
    isNew: 0,
  },
  {
    id: 12,
    name: "Radha Stores",
    lat: 22.5401381,
    lng: 88.3938624,
    type: "Distributor",
    isNew: 0,
  },
  {
    id: 13,
    name: "Srinjay Traders",
    lat: 22.557919,
    lng: 88.4070109,
    type: "Distributor",
    isNew: 1,
  },
  {
    id: 14,
    name: "Tirupati Iron Stores",
    lat: 22.5710531,
    lng: 88.4184056,
    type: "Distributor",
    isNew: 0,
  },
  {
    id: 15,
    name: "Asoka Ent",
    lat: 22.5729745,
    lng: 88.4319967,
    type: "Sub Distributor",
    isNew: 0,
  },
  {
    id: 16,
    name: "Built Tech",
    lat: 22.5747463,
    lng: 88.4315684,
    type: "Sub Distributor",
    isNew: 0,
  },
  {
    id: 17,
    name: "GL Cement Hardware",
    lat: 22.5831991,
    lng: 88.4370691,
    type: "Sub Distributor",
    isNew: 1,
  },
  {
    id: 18,
    name: "Hardware Corner",
    lat: 22.5829666,
    lng: 88.4175377,
    type: "Sub Distributor",
    isNew: 0,
  },
  {
    id: 19,
    name: "Sonai Dhar",
    lat: 22.5690538,
    lng: 88.4068503,
    type: "IFB",
    isNew: 1,
  },
  {
    id: 20,
    name: "Swapan Modak",
    lat: 22.5690538,
    lng: 88.4068503,
    type: "Mason",
    isNew: 0,
  },
  {
    id: 21,
    name: "Parimal Das",
    lat: 22.5925748,
    lng: 88.3888748,
    type: "Mason",
    isNew: 1,
  },
  {
    id: 22,
    name: "Priyabrata Samanta",
    lat: 22.6210587,
    lng: 88.3908469,
    type: "IFB",
    isNew: 0,
  },
  {
    id: 23,
    name: "Kamran Sk",
    lat: 22.5979665,
    lng: 88.3684575,
    type: "Mason",
    isNew: 0,
  },
  {
    id: 24,
    name: "Anadi Basak",
    lat: 22.5202434,
    lng: 88.3376986,
    type: "Mason",
    isNew: 0,
  },
];
const EMP_LIST = [
  {
    id: 1,
    name: "PRANAB DAS",
    phone: "9230066106",
    email: "pranab.das@srmbsteel.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    lat: 22.587404900000003,
    lng: 88.40787700000001,
    emp_type_id: 1,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 2,
    name: "DEBOJIT GHOSH HAZRA",
    phone: "9232353029",
    email: "debojit.hazra@srmbsteel.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    emp_type_id: 1,
    lat: 22.553678594641333,
    lng: 88.33806895000001,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 3,
    name: "SANJIB CHANDA",
    phone: "9230066115",
    email: "sanjib.chanda@srmbsteel.com",
    zone_id: 3,
    district_id: 371,
    state_id: 35,
    emp_type_id: 1,
    lat: 22.520037601882475,
    lng: 88.36631055,
    isPresent: 1,
    isLate: 1,
  },
  {
    id: 4,
    name: "SANJIT CHATTERJEE",
    phone: 9230066147,
    email: "sanjit.chatterjee@srmbsteel.com",
    zone_id: 4,
    district_id: 371,
    state_id: 35,
    emp_type_id: 1,
    lat: 22.6211825,
    lng: 88.3931409,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 5,
    name: "RAMENDRA BHATTACHARJEE",
    phone: 8585081393,
    email: "ramendra.bhattacharyya@srmbsteel.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    emp_type_id: 1,
    lat: 22.474126829557175,
    lng: 88.32392655000001,
    isPresent: 1,
    isLate: 1,
  },
  {
    id: 6,
    name: "BIVAS PAL",
    phone: 9230066102,
    email: "bivas.pal@srmbsteel.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    emp_type_id: 1,
    lat: 22.474126829557175,
    lng: 88.32392655000001,
    isPresent: 0,
    isLate: 0,
  },
  {
    id: 7,
    name: "DEBASISH GHOSH",
    phone: 9903943311,
    email: "bebasish.ghosh@srmbsteel.com",
    zone_id: 3,
    district_id: 371,
    state_id: 35,
    emp_type_id: 2,
    lat: 22.539049000000002,
    lng: 88.3230111,
    isPresent: 0,
    isLate: 0,
  },
  {
    id: 8,
    name: "SIDDHARTHA SEN MAJUMDER",
    phone: 9230011666,
    email: "siddhartha.senmajumdar@srmbsteel.com",
    zone_id: 4,
    district_id: 371,
    state_id: 35,
    emp_type_id: 2,
    lat: 22.605972999999988,
    lng: 88.386353,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 9,
    name: "SANTANU DUTTA",
    phone: 9230066143,
    email: "santanu.dutta@srmbsteel.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    lat: 22.569053800000024,
    lng: 88.40904429999999,
    emp_type_id: 2,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 10,
    name: "NIRMALYA MAITRA",
    phone: 9230066092,
    email: "nirmalya.maitra@srmbsteel.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    emp_type_id: 2,
    lat: 28.651375322205904,
    lng: 77.23163735000001,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 11,
    name: "SANDIP BANGAL",
    phone: 7604023981,
    email: "sandip.bangal@srmbsteel.com",
    zone_id: 3,
    district_id: 371,
    state_id: 35,
    emp_type_id: 2,
    lat: 22.533264500000016,
    lng: 88.3463011,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 11,
    name: "SUVRA DAS",
    phone: 9230066035,
    email: "suvra.das@srmbsteel.com",
    zone_id: 4,
    district_id: 371,
    state_id: 35,
    emp_type_id: 3,
    lat: 22.600602700000007,
    lng: 88.3702928,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 12,
    name: "SOMA DEY",
    phone: 8585090970,
    email: "soma.dey@srmbsteel.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    lat: 22.571053099999997,
    lng: 88.4205996,
    emp_type_id: 3,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 13,
    name: "ANKITA GUPTA",
    phone: 9230066129,
    email: "ankita.gupta@srmbsteel.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    emp_type_id: 3,
    lat: 22.554245899999994,
    lng: 88.33587440000001,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 14,
    name: "NAVIN BHUWALKA",
    phone: 9831844000,
    email: "navin.bhuwalka@srmbsteel.com",
    zone_id: 3,
    district_id: 371,
    state_id: 35,
    emp_type_id: 3,
    lat: 22.538951900000015,
    lng: 88.36575380000002,
    isPresent: 1,
    isLate: 1,
  },
  {
    id: 15,
    name: "SAURAV MISTRI",
    phone: 9833811001,
    email: "saurav.mistri@gmail.com",
    zone_id: 4,
    district_id: 371,
    state_id: 35,
    emp_type_id: 4,
    lat: 22.587139800000013,
    lng: 88.36309129999998,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 16,
    name: "BHOLANATH PAL",
    phone: 9434003115,
    email: "pal.bholanath@rediffmail.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    lat: 22.603133500000016,
    lng: 88.46713859999998,
    emp_type_id: 1,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 17,
    name: "MANOJ BANSAL",
    phone: 9830772152,
    email: "mb.mbansal@gmail.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    emp_type_id: 4,
    lat: 22.57576390778483,
    lng: 88.35891609999996,
    isPresent: 1,
    isLate: 1,
  },
  {
    id: 18,
    name: "DEBASIS ADHIKARI",
    phone: 9007291398,
    email: "adhikary.enterprise1977@gmail.com",
    zone_id: 3,
    district_id: 371,
    state_id: 35,
    emp_type_id: 2,
    lat: 22.501713999999982,
    lng: 88.36173860000001,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 19,
    name: "MANAS DAS",
    phone: 9734196261,
    email: "manasdas008@gmail.com",
    zone_id: 4,
    district_id: 371,
    state_id: 35,
    emp_type_id: 3,
    lat: 22.57718040000002,
    lng: 88.36449110000002,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 20,
    name: "CHITTARANJAN BANIK",
    phone: 9477143435,
    email: "chitta.baniksrmb@gmail.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    lat: 22.56257450000001,
    lng: 88.4652202,
    emp_type_id: 1,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 21,
    name: "PARAS DAS",
    phone: 9609819032,
    email: "paraspca@gmail.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    emp_type_id: 2,
    lat: 22.552045528487216,
    lng: 88.35081749999999,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 22,
    name: "SUNNY KESHRI",
    phone: 9831900444,
    email: "keshri.sunny@gmail.com",
    zone_id: 3,
    district_id: 371,
    state_id: 35,
    emp_type_id: 3,
    lat: 22.53703430000001,
    lng: 88.33166969999999,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 23,
    name: "SURAJIT MAJI",
    phone: 8584898929,
    email: "surajit.maji@srmbsteel.com",
    zone_id: 4,
    district_id: 371,
    state_id: 35,
    emp_type_id: 1,
    lat: 22.591775500000008,
    lng: 88.37784950000002,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 24,
    name: "SUROJIT DAS",
    phone: 7603013412,
    email: "surojit.das@srmbsteel.com",
    zone_id: 1,
    district_id: 371,
    state_id: 35,
    lat: 22.540138100000046,
    lng: 88.39605639999999,
    emp_type_id: 1,
    isPresent: 1,
    isLate: 0,
  },
  {
    id: 25,
    name: "KANCHAN PAL",
    phone: 9230066716,
    email: "kanchan.pal@srmbsteel.com",
    zone_id: 2,
    district_id: 371,
    state_id: 35,
    lat: 22.565964600000004,
    lng: 88.34639770000001,
    emp_type_id: 1,
    isPresent: 1,
    isLate: 0,
  },
];
const EMP_TYPES = [
  { id: 1, name: "AM" },
  { id: 2, name: "BDM" },
  { id: 3, name: "Branding & Gift" },
  { id: 4, name: "CRM" },
  { id: 5, name: "Director" },
  { id: 6, name: "Distributor EMP" },
  { id: 7, name: "Distributor CRM" },
  { id: 8, name: "FSE" },
  { id: 9, name: "MO" },
  { id: 10, name: "Off Role EMP" },
  { id: 11, name: "Others" },
  { id: 12, name: "Receptionist" },
  { id: 13, name: "SO" },
  { id: 14, name: "TO" },
];
const STATES = [
  {
    id: "1",
    title: "Andaman & Nicobar Islands",
  },
  {
    id: "2",
    title: "Andhra Pradesh",
  },
  {
    id: "3",
    title: "Arunachal Pradesh",
  },
  {
    id: "4",
    title: "Assam",
  },
  {
    id: "5",
    title: "Bihar",
  },
  {
    id: "6",
    title: "Chandigarh",
  },
  {
    id: "7",
    title: "Chhattisgarh",
  },
  {
    id: "8",
    title: "Dadra & Nagar Haveli",
  },
  {
    id: "9",
    title: "Daman & Diu",
  },
  {
    id: "10",
    title: "Delhi",
  },
  {
    id: "11",
    title: "Goa",
  },
  {
    id: "12",
    title: "Gujarat",
  },
  {
    id: "13",
    title: "Haryana",
  },
  {
    id: "14",
    title: "Himachal Pradesh",
  },
  {
    id: "15",
    title: "Jammu & Kashmir",
  },
  {
    id: "16",
    title: "Jharkhand",
  },
  {
    id: "17",
    title: "Karnataka",
  },
  {
    id: "18",
    title: "Kerala",
  },
  {
    id: "19",
    title: "Lakshadweep",
  },
  {
    id: "20",
    title: "Madhya Pradesh",
  },
  {
    id: "21",
    title: "Maharashtra",
  },
  {
    id: "22",
    title: "Manipur",
  },
  {
    id: "23",
    title: "Meghalaya",
  },
  {
    id: "24",
    title: "Mizoram",
  },
  {
    id: "25",
    title: "Nagaland",
  },
  {
    id: "26",
    title: "Odisha",
  },
  {
    id: "27",
    title: "Puducherry",
  },
  {
    id: "28",
    title: "Punjab",
  },
  {
    id: "29",
    title: "Rajasthan",
  },
  {
    id: "30",
    title: "Sikkim",
  },
  {
    id: "31",
    title: "Tamil Nadu",
  },
  {
    id: "32",
    title: "Tripura",
  },
  {
    id: "33",
    title: "Uttar Pradesh",
  },
  {
    id: "34",
    title: "Uttarakhand",
  },
  {
    id: "35",
    title: "West Bengal",
  },
];
const ZONES = [
  { id: 1, title: "East Zone", district_id: 371, state_id: 35 },
  { id: 2, title: "Central Zone", district_id: 371, state_id: 35 },
  { id: 3, title: "South Zone", district_id: 371, state_id: 35 },
  { id: 4, title: "North Zone", district_id: 371, state_id: 35 },
];
const DISTRICTS = [
  { id: "36", title: "Anantnag", state_id: "15" },
  { id: "37", title: "Bandipore", state_id: "15" },
  { id: "38", title: "Baramulla", state_id: "15" },
  { id: "39", title: "Budgam", state_id: "15" },
  { id: "40", title: "Doda", state_id: "15" },
  { id: "41", title: "Ganderbal", state_id: "15" },
  { id: "42", title: "Jammu", state_id: "15" },
  { id: "43", title: "Kargil", state_id: "15" },
  { id: "44", title: "Kathua", state_id: "15" },
  { id: "45", title: "Kishtwar", state_id: "15" },
  { id: "46", title: "Kulgam", state_id: "15" },
  { id: "47", title: "Kupwara", state_id: "15" },
  { id: "48", title: "Leh (Ladakh)", state_id: "15" },
  { id: "49", title: "Poonch", state_id: "15" },
  { id: "50", title: "Pulwama", state_id: "15" },
  { id: "51", title: "Rajouri", state_id: "15" },
  { id: "52", title: "Ramban", state_id: "15" },
  { id: "53", title: "Reasi", state_id: "15" },
  { id: "54", title: "Samba", state_id: "15" },
  { id: "55", title: "Shopian", state_id: "15" },
  { id: "56", title: "Srinagar", state_id: "15" },
  { id: "57", title: "Udhampur", state_id: "15" },
  { id: "58", title: "Bilaspur (Himachal Pradesh)", state_id: "14" },
  { id: "59", title: "Chamba", state_id: "14" },
  { id: "60", title: "Hamirpur (Himachal Pradesh)", state_id: "14" },
  { id: "61", title: "Kangra", state_id: "14" },
  { id: "62", title: "Kinnaur", state_id: "14" },
  { id: "63", title: "Kullu", state_id: "14" },
  { id: "64", title: "Lahul & Spiti", state_id: "14" },
  { id: "65", title: "Mandi", state_id: "14" },
  { id: "66", title: "Shimla", state_id: "14" },
  { id: "67", title: "Sirmaur", state_id: "14" },
  { id: "68", title: "Solan", state_id: "14" },
  { id: "69", title: "Una", state_id: "14" },
  { id: "70", title: "Amritsar", state_id: "28" },
  { id: "71", title: "Barnala", state_id: "28" },
  { id: "72", title: "Bathinda", state_id: "28" },
  { id: "73", title: "Faridkot", state_id: "28" },
  { id: "74", title: "Fatehgarh Sahib", state_id: "28" },
  { id: "75", title: "Firozpur", state_id: "28" },
  { id: "76", title: "Gurdaspur", state_id: "28" },
  { id: "77", title: "Hoshiarpur", state_id: "28" },
  { id: "78", title: "Jalandhar", state_id: "28" },
  { id: "79", title: "Kapurthala", state_id: "28" },
  { id: "80", title: "Ludhiana", state_id: "28" },
  { id: "81", title: "Mansa", state_id: "28" },
  { id: "82", title: "Moga", state_id: "28" },
  { id: "83", title: "Muktsar", state_id: "28" },
  { id: "84", title: "Patiala", state_id: "28" },
  { id: "85", title: "Rupnagar (Ropar)", state_id: "28" },
  { id: "86", title: "Sahibzada Ajit Singh Nagar (Mohali)", state_id: "28" },
  { id: "87", title: "Sangrur", state_id: "28" },
  { id: "88", title: "Shahid Bhagat Singh Nagar (Nawanshahr)", state_id: "28" },
  { id: "89", title: "Tarn Taran", state_id: "28" },
  { id: "90", title: "Chandigarh", state_id: "6" },
  { id: "91", title: "Almora", state_id: "34" },
  { id: "92", title: "Bageshwar", state_id: "34" },
  { id: "93", title: "Chamoli", state_id: "34" },
  { id: "94", title: "Champawat", state_id: "34" },
  { id: "95", title: "Dehradun", state_id: "34" },
  { id: "96", title: "Haridwar", state_id: "34" },
  { id: "97", title: "Nainital", state_id: "34" },
  { id: "98", title: "Pauri Garhwal", state_id: "34" },
  { id: "99", title: "Pithoragarh", state_id: "34" },
  { id: "100", title: "Rudraprayag", state_id: "34" },
  { id: "101", title: "Tehri Garhwal", state_id: "34" },
  { id: "102", title: "Udham Singh Nagar", state_id: "34" },
  { id: "103", title: "Uttarkashi", state_id: "34" },
  { id: "104", title: "Ambala", state_id: "13" },
  { id: "105", title: "Bhiwani", state_id: "13" },
  { id: "106", title: "Faridabad", state_id: "13" },
  { id: "107", title: "Fatehabad", state_id: "13" },
  { id: "108", title: "Gurgaon", state_id: "13" },
  { id: "109", title: "Hisar", state_id: "13" },
  { id: "110", title: "Jhajjar", state_id: "13" },
  { id: "111", title: "Jind", state_id: "13" },
  { id: "112", title: "Kaithal", state_id: "13" },
  { id: "113", title: "Karnal", state_id: "13" },
  { id: "114", title: "Kurukshetra", state_id: "13" },
  { id: "115", title: "Mahendragarh", state_id: "13" },
  { id: "116", title: "Mewat", state_id: "13" },
  { id: "117", title: "Palwal", state_id: "13" },
  { id: "118", title: "Panchkula", state_id: "13" },
  { id: "119", title: "Panipat", state_id: "13" },
  { id: "120", title: "Rewari", state_id: "13" },
  { id: "121", title: "Rohtak", state_id: "13" },
  { id: "122", title: "Sirsa", state_id: "13" },
  { id: "123", title: "Sonipat", state_id: "13" },
  { id: "124", title: "Yamuna Nagar", state_id: "13" },
  { id: "125", title: "Central Delhi", state_id: "10" },
  { id: "126", title: "East Delhi", state_id: "10" },
  { id: "127", title: "New Delhi", state_id: "10" },
  { id: "128", title: "North Delhi", state_id: "10" },
  { id: "129", title: "North East Delhi", state_id: "10" },
  { id: "130", title: "North West Delhi", state_id: "10" },
  { id: "131", title: "South Delhi", state_id: "10" },
  { id: "132", title: "South West Delhi", state_id: "10" },
  { id: "133", title: "West Delhi", state_id: "10" },
  { id: "134", title: "Ajmer", state_id: "29" },
  { id: "135", title: "Alwar", state_id: "29" },
  { id: "136", title: "Banswara", state_id: "29" },
  { id: "137", title: "Baran", state_id: "29" },
  { id: "138", title: "Barmer", state_id: "29" },
  { id: "139", title: "Bharatpur", state_id: "29" },
  { id: "140", title: "Bhilwara", state_id: "29" },
  { id: "141", title: "Bikaner", state_id: "29" },
  { id: "142", title: "Bundi", state_id: "29" },
  { id: "143", title: "Chittorgarh", state_id: "29" },
  { id: "144", title: "Churu", state_id: "29" },
  { id: "145", title: "Dausa", state_id: "29" },
  { id: "146", title: "Dholpur", state_id: "29" },
  { id: "147", title: "Dungarpur", state_id: "29" },
  { id: "148", title: "Ganganagar", state_id: "29" },
  { id: "149", title: "Hanumangarh", state_id: "29" },
  { id: "150", title: "Jaipur", state_id: "29" },
  { id: "151", title: "Jaisalmer", state_id: "29" },
  { id: "152", title: "Jalor", state_id: "29" },
  { id: "153", title: "Jhalawar", state_id: "29" },
  { id: "154", title: "Jhunjhunu", state_id: "29" },
  { id: "155", title: "Jodhpur", state_id: "29" },
  { id: "156", title: "Karauli", state_id: "29" },
  { id: "157", title: "Kota", state_id: "29" },
  { id: "158", title: "Nagaur", state_id: "29" },
  { id: "159", title: "Pali", state_id: "29" },
  { id: "160", title: "Pratapgarh (Rajasthan)", state_id: "29" },
  { id: "161", title: "Rajsamand", state_id: "29" },
  { id: "162", title: "Sawai Madhopur", state_id: "29" },
  { id: "163", title: "Sikar", state_id: "29" },
  { id: "164", title: "Sirohi", state_id: "29" },
  { id: "165", title: "Tonk", state_id: "29" },
  { id: "166", title: "Udaipur", state_id: "29" },
  { id: "167", title: "Agra", state_id: "33" },
  { id: "168", title: "Aligarh", state_id: "33" },
  { id: "169", title: "Allahabad", state_id: "33" },
  { id: "170", title: "Ambedkar Nagar", state_id: "33" },
  { id: "171", title: "Auraiya", state_id: "33" },
  { id: "172", title: "Azamgarh", state_id: "33" },
  { id: "173", title: "Bagpat", state_id: "33" },
  { id: "174", title: "Bahraich", state_id: "33" },
  { id: "175", title: "Ballia", state_id: "33" },
  { id: "176", title: "Balrampur", state_id: "33" },
  { id: "177", title: "Banda", state_id: "33" },
  { id: "178", title: "Barabanki", state_id: "33" },
  { id: "179", title: "Bareilly", state_id: "33" },
  { id: "180", title: "Basti", state_id: "33" },
  { id: "181", title: "Bijnor", state_id: "33" },
  { id: "182", title: "Budaun", state_id: "33" },
  { id: "183", title: "Bulandshahr", state_id: "33" },
  { id: "184", title: "Chandauli", state_id: "33" },
  { id: "185", title: "Chitrakoot", state_id: "33" },
  { id: "186", title: "Deoria", state_id: "33" },
  { id: "187", title: "Etah", state_id: "33" },
  { id: "188", title: "Etawah", state_id: "33" },
  { id: "189", title: "Faizabad", state_id: "33" },
  { id: "190", title: "Farrukhabad", state_id: "33" },
  { id: "191", title: "Fatehpur", state_id: "33" },
  { id: "192", title: "Firozabad", state_id: "33" },
  { id: "193", title: "Gautam Buddha Nagar", state_id: "33" },
  { id: "194", title: "Ghaziabad", state_id: "33" },
  { id: "195", title: "Ghazipur", state_id: "33" },
  { id: "196", title: "Gonda", state_id: "33" },
  { id: "197", title: "Gorakhpur", state_id: "33" },
  { id: "198", title: "Hamirpur", state_id: "33" },
  { id: "199", title: "Hardoi", state_id: "33" },
  { id: "200", title: "Hathras", state_id: "33" },
  { id: "201", title: "Jalaun", state_id: "33" },
  { id: "202", title: "Jaunpur", state_id: "33" },
  { id: "203", title: "Jhansi", state_id: "33" },
  { id: "204", title: "Jyotiba Phule Nagar", state_id: "33" },
  { id: "205", title: "Kannauj", state_id: "33" },
  { id: "206", title: "Kanpur Dehat", state_id: "33" },
  { id: "207", title: "Kanpur Nagar", state_id: "33" },
  { id: "208", title: "Kanshiram Nagar", state_id: "33" },
  { id: "209", title: "Kaushambi", state_id: "33" },
  { id: "210", title: "Kheri", state_id: "33" },
  { id: "211", title: "Kushinagar", state_id: "33" },
  { id: "212", title: "Lalitpur", state_id: "33" },
  { id: "213", title: "Lucknow", state_id: "33" },
  { id: "214", title: "Maharajganj", state_id: "33" },
  { id: "215", title: "Mahoba", state_id: "33" },
  { id: "216", title: "Mainpuri", state_id: "33" },
  { id: "217", title: "Mathura", state_id: "33" },
  { id: "218", title: "Mau", state_id: "33" },
  { id: "219", title: "Meerut", state_id: "33" },
  { id: "220", title: "Mirzapur", state_id: "33" },
  { id: "221", title: "Moradabad", state_id: "33" },
  { id: "222", title: "Muzaffarnagar", state_id: "33" },
  { id: "223", title: "Pilibhit", state_id: "33" },
  { id: "224", title: "Pratapgarh", state_id: "33" },
  { id: "225", title: "Rae Bareli", state_id: "33" },
  { id: "226", title: "Rampur", state_id: "33" },
  { id: "227", title: "Saharanpur", state_id: "33" },
  { id: "228", title: "Sant Kabir Nagar", state_id: "33" },
  { id: "229", title: "Sant Ravidas Nagar (Bhadohi)", state_id: "33" },
  { id: "230", title: "Shahjahanpur", state_id: "33" },
  { id: "231", title: "Shrawasti", state_id: "33" },
  { id: "232", title: "Siddharthnagar", state_id: "33" },
  { id: "233", title: "Sitapur", state_id: "33" },
  { id: "234", title: "Sonbhadra", state_id: "33" },
  { id: "235", title: "Sultanpur", state_id: "33" },
  { id: "236", title: "Unnao", state_id: "33" },
  { id: "237", title: "Varanasi", state_id: "33" },
  { id: "238", title: "Araria", state_id: "5" },
  { id: "239", title: "Arwal", state_id: "5" },
  { id: "240", title: "Aurangabad (Bihar)", state_id: "5" },
  { id: "241", title: "Banka", state_id: "5" },
  { id: "242", title: "Begusarai", state_id: "5" },
  { id: "243", title: "Bhagalpur", state_id: "5" },
  { id: "244", title: "Bhojpur", state_id: "5" },
  { id: "245", title: "Buxar", state_id: "5" },
  { id: "246", title: "Darbhanga", state_id: "5" },
  { id: "247", title: "East Champaran", state_id: "5" },
  { id: "248", title: "Gaya", state_id: "5" },
  { id: "249", title: "Gopalganj", state_id: "5" },
  { id: "250", title: "Jamui", state_id: "5" },
  { id: "251", title: "Jehanabad", state_id: "5" },
  { id: "252", title: "Kaimur (Bhabua)", state_id: "5" },
  { id: "253", title: "Katihar", state_id: "5" },
  { id: "254", title: "Khagaria", state_id: "5" },
  { id: "255", title: "Kishanganj", state_id: "5" },
  { id: "256", title: "Lakhisarai", state_id: "5" },
  { id: "257", title: "Madhepura", state_id: "5" },
  { id: "258", title: "Madhubani", state_id: "5" },
  { id: "259", title: "Munger", state_id: "5" },
  { id: "260", title: "Muzaffarpur", state_id: "5" },
  { id: "261", title: "Nalanda", state_id: "5" },
  { id: "262", title: "Nawada", state_id: "5" },
  { id: "263", title: "Patna", state_id: "5" },
  { id: "264", title: "Purnia", state_id: "5" },
  { id: "265", title: "Rohtas", state_id: "5" },
  { id: "266", title: "Saharsa", state_id: "5" },
  { id: "267", title: "Samastipur", state_id: "5" },
  { id: "268", title: "Saran", state_id: "5" },
  { id: "269", title: "Sheikhpura", state_id: "5" },
  { id: "270", title: "Sheohar", state_id: "5" },
  { id: "271", title: "Sitamarhi", state_id: "5" },
  { id: "272", title: "Siwan", state_id: "5" },
  { id: "273", title: "Supaul", state_id: "5" },
  { id: "274", title: "Vaishali", state_id: "5" },
  { id: "275", title: "West Champaran", state_id: "5" },
  { id: "276", title: "East Sikkim", state_id: "30" },
  { id: "277", title: "North Sikkim", state_id: "30" },
  { id: "278", title: "South Sikkim", state_id: "30" },
  { id: "279", title: "West Sikkim", state_id: "30" },
  { id: "280", title: "Anjaw", state_id: "3" },
  { id: "281", title: "Changlang", state_id: "3" },
  { id: "282", title: "Dibang Valley", state_id: "3" },
  { id: "283", title: "East Kameng", state_id: "3" },
  { id: "284", title: "East Siang", state_id: "3" },
  { id: "285", title: "Kurung Kumey", state_id: "3" },
  { id: "286", title: "Lohit", state_id: "3" },
  { id: "287", title: "Lower Dibang Valley", state_id: "3" },
  { id: "288", title: "Lower Subansiri", state_id: "3" },
  { id: "289", title: "Papum Pare", state_id: "3" },
  { id: "290", title: "Tawang", state_id: "3" },
  { id: "291", title: "Tirap", state_id: "3" },
  { id: "292", title: "Upper Siang", state_id: "3" },
  { id: "293", title: "Upper Subansiri", state_id: "3" },
  { id: "294", title: "West Kameng", state_id: "3" },
  { id: "295", title: "West Siang", state_id: "3" },
  { id: "296", title: "Dimapur", state_id: "25" },
  { id: "297", title: "Kiphire", state_id: "25" },
  { id: "298", title: "Kohima", state_id: "25" },
  { id: "299", title: "Longleng", state_id: "25" },
  { id: "300", title: "Mokokchung", state_id: "25" },
  { id: "301", title: "Mon", state_id: "25" },
  { id: "302", title: "Peren", state_id: "25" },
  { id: "303", title: "Phek", state_id: "25" },
  { id: "304", title: "Tuensang", state_id: "25" },
  { id: "305", title: "Wokha", state_id: "25" },
  { id: "306", title: "Zunheboto", state_id: "25" },
  { id: "307", title: "Bishnupur", state_id: "22" },
  { id: "308", title: "Chandel", state_id: "22" },
  { id: "309", title: "Churachandpur", state_id: "22" },
  { id: "310", title: "Imphal East", state_id: "22" },
  { id: "311", title: "Imphal West", state_id: "22" },
  { id: "312", title: "Senapati", state_id: "22" },
  { id: "313", title: "Tamenglong", state_id: "22" },
  { id: "314", title: "Thoubal", state_id: "22" },
  { id: "315", title: "Ukhrul", state_id: "22" },
  { id: "316", title: "Aizawl", state_id: "24" },
  { id: "317", title: "Champhai", state_id: "24" },
  { id: "318", title: "Kolasib", state_id: "24" },
  { id: "319", title: "Lawngtlai", state_id: "24" },
  { id: "320", title: "Lunglei", state_id: "24" },
  { id: "321", title: "Mamit", state_id: "24" },
  { id: "322", title: "Saiha", state_id: "24" },
  { id: "323", title: "Serchhip", state_id: "24" },
  { id: "324", title: "Dhalai", state_id: "32" },
  { id: "325", title: "North Tripura", state_id: "32" },
  { id: "326", title: "South Tripura", state_id: "32" },
  { id: "327", title: "West Tripura", state_id: "32" },
  { id: "328", title: "East Garo Hills", state_id: "23" },
  { id: "329", title: "East Khasi Hills", state_id: "23" },
  { id: "330", title: "Jaintia Hills", state_id: "23" },
  { id: "331", title: "Ri Bhoi", state_id: "23" },
  { id: "332", title: "South Garo Hills", state_id: "23" },
  { id: "333", title: "West Garo Hills", state_id: "23" },
  { id: "334", title: "West Khasi Hills", state_id: "23" },
  { id: "335", title: "Baksa", state_id: "4" },
  { id: "336", title: "Barpeta", state_id: "4" },
  { id: "337", title: "Bongaigaon", state_id: "4" },
  { id: "338", title: "Cachar", state_id: "4" },
  { id: "339", title: "Chirang", state_id: "4" },
  { id: "340", title: "Darrang", state_id: "4" },
  { id: "341", title: "Dhemaji", state_id: "4" },
  { id: "342", title: "Dhubri", state_id: "4" },
  { id: "343", title: "Dibrugarh", state_id: "4" },
  { id: "344", title: "Dima Hasao (North Cachar Hills)", state_id: "4" },
  { id: "345", title: "Goalpara", state_id: "4" },
  { id: "346", title: "Golaghat", state_id: "4" },
  { id: "347", title: "Hailakandi", state_id: "4" },
  { id: "348", title: "Jorhat", state_id: "4" },
  { id: "349", title: "Kamrup", state_id: "4" },
  { id: "350", title: "Kamrup Metropolitan", state_id: "4" },
  { id: "351", title: "Karbi Anglong", state_id: "4" },
  { id: "352", title: "Karimganj", state_id: "4" },
  { id: "353", title: "Kokrajhar", state_id: "4" },
  { id: "354", title: "Lakhimpur", state_id: "4" },
  { id: "355", title: "Morigaon", state_id: "4" },
  { id: "356", title: "Nagaon", state_id: "4" },
  { id: "357", title: "Nalbari", state_id: "4" },
  { id: "358", title: "Sivasagar", state_id: "4" },
  { id: "359", title: "Sonitpur", state_id: "4" },
  { id: "360", title: "Tinsukia", state_id: "4" },
  { id: "361", title: "Udalguri", state_id: "4" },
  { id: "362", title: "Bankura", state_id: "35" },
  { id: "363", title: "Bardhaman", state_id: "35" },
  { id: "364", title: "Birbhum", state_id: "35" },
  { id: "365", title: "Cooch Behar", state_id: "35" },
  { id: "366", title: "Dakshin Dinajpur (South Dinajpur)", state_id: "35" },
  { id: "367", title: "Darjiling", state_id: "35" },
  { id: "368", title: "Hooghly", state_id: "35" },
  { id: "369", title: "Howrah", state_id: "35" },
  { id: "370", title: "Jalpaiguri", state_id: "35" },
  { id: "371", title: "Kolkata", state_id: "35" },
  { id: "372", title: "Maldah", state_id: "35" },
  { id: "373", title: "Murshidabad", state_id: "35" },
  { id: "374", title: "Nadia", state_id: "35" },
  { id: "375", title: "North 24 Parganas", state_id: "35" },
  { id: "376", title: "Paschim Medinipur (West Midnapore)", state_id: "35" },
  { id: "377", title: "Purba Medinipur (East Midnapore)", state_id: "35" },
  { id: "378", title: "Puruliya", state_id: "35" },
  { id: "379", title: "South 24 Parganas", state_id: "35" },
  { id: "380", title: "Uttar Dinajpur (North Dinajpur)", state_id: "35" },
  { id: "381", title: "Bokaro", state_id: "16" },
  { id: "382", title: "Chatra", state_id: "16" },
  { id: "383", title: "Deoghar", state_id: "16" },
  { id: "384", title: "Dhanbad", state_id: "16" },
  { id: "385", title: "Dumka", state_id: "16" },
  { id: "386", title: "East Singhbhum", state_id: "16" },
  { id: "387", title: "Garhwa", state_id: "16" },
  { id: "388", title: "Giridih", state_id: "16" },
  { id: "389", title: "Godda", state_id: "16" },
  { id: "390", title: "Gumla", state_id: "16" },
  { id: "391", title: "Hazaribagh", state_id: "16" },
  { id: "392", title: "Jamtara", state_id: "16" },
  { id: "393", title: "Khunti", state_id: "16" },
  { id: "394", title: "Koderma", state_id: "16" },
  { id: "395", title: "Latehar", state_id: "16" },
  { id: "396", title: "Lohardaga", state_id: "16" },
  { id: "397", title: "Pakur", state_id: "16" },
  { id: "398", title: "Palamu", state_id: "16" },
  { id: "399", title: "Ramgarh", state_id: "16" },
  { id: "400", title: "Ranchi", state_id: "16" },
  { id: "401", title: "Sahibganj", state_id: "16" },
  { id: "402", title: "Seraikela-Kharsawan", state_id: "16" },
  { id: "403", title: "Simdega", state_id: "16" },
  { id: "404", title: "West Singhbhum", state_id: "16" },
  { id: "405", title: "Angul", state_id: "26" },
  { id: "406", title: "Balangir", state_id: "26" },
  { id: "407", title: "Baleswar", state_id: "26" },
  { id: "408", title: "Bargarh", state_id: "26" },
  { id: "409", title: "Bhadrak", state_id: "26" },
  { id: "410", title: "Boudh", state_id: "26" },
  { id: "411", title: "Cuttack", state_id: "26" },
  { id: "412", title: "Debagarh", state_id: "26" },
  { id: "413", title: "Dhenkanal", state_id: "26" },
  { id: "414", title: "Gajapati", state_id: "26" },
  { id: "415", title: "Ganjam", state_id: "26" },
  { id: "416", title: "Jagatsinghapur", state_id: "26" },
  { id: "417", title: "Jajapur", state_id: "26" },
  { id: "418", title: "Jharsuguda", state_id: "26" },
  { id: "419", title: "Kalahandi", state_id: "26" },
  { id: "420", title: "Kandhamal", state_id: "26" },
  { id: "421", title: "Kendrapara", state_id: "26" },
  { id: "422", title: "Kendujhar", state_id: "26" },
  { id: "423", title: "Khordha", state_id: "26" },
  { id: "424", title: "Koraput", state_id: "26" },
  { id: "425", title: "Malkangiri", state_id: "26" },
  { id: "426", title: "Mayurbhanj", state_id: "26" },
  { id: "427", title: "Nabarangapur", state_id: "26" },
  { id: "428", title: "Nayagarh", state_id: "26" },
  { id: "429", title: "Nuapada", state_id: "26" },
  { id: "430", title: "Puri", state_id: "26" },
  { id: "431", title: "Rayagada", state_id: "26" },
  { id: "432", title: "Sambalpur", state_id: "26" },
  { id: "433", title: "Subarnapur (Sonapur)", state_id: "26" },
  { id: "434", title: "Sundergarh", state_id: "26" },
  { id: "435", title: "Bastar", state_id: "7" },
  { id: "436", title: "Bijapur (Chhattisgarh)", state_id: "7" },
  { id: "437", title: "Bilaspur (Chhattisgarh)", state_id: "7" },
  { id: "438", title: "Dakshin Bastar Dantewada", state_id: "7" },
  { id: "439", title: "Dhamtari", state_id: "7" },
  { id: "440", title: "Durg", state_id: "7" },
  { id: "441", title: "Janjgir-Champa", state_id: "7" },
  { id: "442", title: "Jashpur", state_id: "7" },
  { id: "443", title: "Kabirdham (Kawardha)", state_id: "7" },
  { id: "444", title: "Korba", state_id: "7" },
  { id: "445", title: "Koriya", state_id: "7" },
  { id: "446", title: "Mahasamund", state_id: "7" },
  { id: "447", title: "Narayanpur", state_id: "7" },
  { id: "448", title: "Raigarh (Chhattisgarh)", state_id: "7" },
  { id: "449", title: "Raipur", state_id: "7" },
  { id: "450", title: "Rajnandgaon", state_id: "7" },
  { id: "451", title: "Surguja", state_id: "7" },
  { id: "452", title: "Uttar Bastar Kanker", state_id: "7" },
  { id: "453", title: "Alirajpur", state_id: "20" },
  { id: "454", title: "Anuppur", state_id: "20" },
  { id: "455", title: "Ashok Nagar", state_id: "20" },
  { id: "456", title: "Balaghat", state_id: "20" },
  { id: "457", title: "Barwani", state_id: "20" },
  { id: "458", title: "Betul", state_id: "20" },
  { id: "459", title: "Bhind", state_id: "20" },
  { id: "460", title: "Bhopal", state_id: "20" },
  { id: "461", title: "Burhanpur", state_id: "20" },
  { id: "462", title: "Chhatarpur", state_id: "20" },
  { id: "463", title: "Chhindwara", state_id: "20" },
  { id: "464", title: "Damoh", state_id: "20" },
  { id: "465", title: "Datia", state_id: "20" },
  { id: "466", title: "Dewas", state_id: "20" },
  { id: "467", title: "Dhar", state_id: "20" },
  { id: "468", title: "Dindori", state_id: "20" },
  { id: "469", title: "Guna", state_id: "20" },
  { id: "470", title: "Gwalior", state_id: "20" },
  { id: "471", title: "Harda", state_id: "20" },
  { id: "472", title: "Hoshangabad", state_id: "20" },
  { id: "473", title: "Indore", state_id: "20" },
  { id: "474", title: "Jabalpur", state_id: "20" },
  { id: "475", title: "Jhabua", state_id: "20" },
  { id: "476", title: "Katni", state_id: "20" },
  { id: "477", title: "Khandwa (East Nimar)", state_id: "20" },
  { id: "478", title: "Khargone (West Nimar)", state_id: "20" },
  { id: "479", title: "Mandla", state_id: "20" },
  { id: "480", title: "Mandsaur", state_id: "20" },
  { id: "481", title: "Morena", state_id: "20" },
  { id: "482", title: "Narsinghpur", state_id: "20" },
  { id: "483", title: "Neemuch", state_id: "20" },
  { id: "484", title: "Panna", state_id: "20" },
  { id: "485", title: "Raisen", state_id: "20" },
  { id: "486", title: "Rajgarh", state_id: "20" },
  { id: "487", title: "Ratlam", state_id: "20" },
  { id: "488", title: "Rewa", state_id: "20" },
  { id: "489", title: "Sagar", state_id: "20" },
  { id: "490", title: "Satna", state_id: "20" },
  { id: "491", title: "Sehore", state_id: "20" },
  { id: "492", title: "Seoni", state_id: "20" },
  { id: "493", title: "Shahdol", state_id: "20" },
  { id: "494", title: "Shajapur", state_id: "20" },
  { id: "495", title: "Sheopur", state_id: "20" },
  { id: "496", title: "Shivpuri", state_id: "20" },
  { id: "497", title: "Sidhi", state_id: "20" },
  { id: "498", title: "Singrauli", state_id: "20" },
  { id: "499", title: "Tikamgarh", state_id: "20" },
  { id: "500", title: "Ujjain", state_id: "20" },
  { id: "501", title: "Umaria", state_id: "20" },
  { id: "502", title: "Vidisha", state_id: "20" },
  { id: "503", title: "Ahmedabad", state_id: "12" },
  { id: "504", title: "Amreli", state_id: "12" },
  { id: "505", title: "Anand", state_id: "12" },
  { id: "506", title: "Banaskantha", state_id: "12" },
  { id: "507", title: "Bharuch", state_id: "12" },
  { id: "508", title: "Bhavnagar", state_id: "12" },
  { id: "509", title: "Dahod", state_id: "12" },
  { id: "510", title: "Gandhi Nagar", state_id: "12" },
  { id: "511", title: "Jamnagar", state_id: "12" },
  { id: "512", title: "Junagadh", state_id: "12" },
  { id: "513", title: "Kachchh", state_id: "12" },
  { id: "514", title: "Kheda", state_id: "12" },
  { id: "515", title: "Mahesana", state_id: "12" },
  { id: "516", title: "Narmada", state_id: "12" },
  { id: "517", title: "Navsari", state_id: "12" },
  { id: "518", title: "Panch Mahals", state_id: "12" },
  { id: "519", title: "Patan", state_id: "12" },
  { id: "520", title: "Porbandar", state_id: "12" },
  { id: "521", title: "Rajkot", state_id: "12" },
  { id: "522", title: "Sabarkantha", state_id: "12" },
  { id: "523", title: "Surat", state_id: "12" },
  { id: "524", title: "Surendra Nagar", state_id: "12" },
  { id: "525", title: "Tapi", state_id: "12" },
  { id: "526", title: "The Dangs", state_id: "12" },
  { id: "527", title: "Vadodara", state_id: "12" },
  { id: "528", title: "Valsad", state_id: "12" },
  { id: "529", title: "Daman", state_id: "9" },
  { id: "530", title: "Diu", state_id: "9" },
  { id: "531", title: "Dadra & Nagar Haveli", state_id: "8" },
  { id: "532", title: "Ahmed Nagar", state_id: "21" },
  { id: "533", title: "Akola", state_id: "21" },
  { id: "534", title: "Amravati", state_id: "21" },
  { id: "535", title: "Aurangabad", state_id: "21" },
  { id: "536", title: "Beed", state_id: "21" },
  { id: "537", title: "Bhandara", state_id: "21" },
  { id: "538", title: "Buldhana", state_id: "21" },
  { id: "539", title: "Chandrapur", state_id: "21" },
  { id: "540", title: "Dhule", state_id: "21" },
  { id: "541", title: "Gadchiroli", state_id: "21" },
  { id: "542", title: "Gondia", state_id: "21" },
  { id: "543", title: "Hingoli", state_id: "21" },
  { id: "544", title: "Jalgaon", state_id: "21" },
  { id: "545", title: "Jalna", state_id: "21" },
  { id: "546", title: "Kolhapur", state_id: "21" },
  { id: "547", title: "Latur", state_id: "21" },
  { id: "548", title: "Mumbai", state_id: "21" },
  { id: "549", title: "Mumbai Suburban", state_id: "21" },
  { id: "550", title: "Nagpur", state_id: "21" },
  { id: "551", title: "Nanded", state_id: "21" },
  { id: "552", title: "Nandurbar", state_id: "21" },
  { id: "553", title: "Nashik", state_id: "21" },
  { id: "554", title: "Osmanabad", state_id: "21" },
  { id: "555", title: "Parbhani", state_id: "21" },
  { id: "556", title: "Pune", state_id: "21" },
  { id: "557", title: "Raigarh (Maharashtra)", state_id: "21" },
  { id: "558", title: "Ratnagiri", state_id: "21" },
  { id: "559", title: "Sangli", state_id: "21" },
  { id: "560", title: "Satara", state_id: "21" },
  { id: "561", title: "Sindhudurg", state_id: "21" },
  { id: "562", title: "Solapur", state_id: "21" },
  { id: "563", title: "Thane", state_id: "21" },
  { id: "564", title: "Wardha", state_id: "21" },
  { id: "565", title: "Washim", state_id: "21" },
  { id: "566", title: "Yavatmal", state_id: "21" },
  { id: "567", title: "Adilabad", state_id: "2" },
  { id: "568", title: "Anantapur", state_id: "2" },
  { id: "569", title: "Chittoor", state_id: "2" },
  { id: "570", title: "East Godavari", state_id: "2" },
  { id: "571", title: "Guntur", state_id: "2" },
  { id: "572", title: "Hyderabad", state_id: "2" },
  { id: "573", title: "Kadapa (Cuddapah)", state_id: "2" },
  { id: "574", title: "Karim Nagar", state_id: "2" },
  { id: "575", title: "Khammam", state_id: "2" },
  { id: "576", title: "Krishna", state_id: "2" },
  { id: "577", title: "Kurnool", state_id: "2" },
  { id: "578", title: "Mahbubnagar", state_id: "2" },
  { id: "579", title: "Medak", state_id: "2" },
  { id: "580", title: "Nalgonda", state_id: "2" },
  { id: "581", title: "Nellore", state_id: "2" },
  { id: "582", title: "Nizamabad", state_id: "2" },
  { id: "583", title: "Prakasam", state_id: "2" },
  { id: "584", title: "Rangareddy", state_id: "2" },
  { id: "585", title: "Srikakulam", state_id: "2" },
  { id: "586", title: "Visakhapatnam", state_id: "2" },
  { id: "587", title: "Vizianagaram", state_id: "2" },
  { id: "588", title: "Warangal", state_id: "2" },
  { id: "589", title: "West Godavari", state_id: "2" },
  { id: "590", title: "Bagalkot", state_id: "17" },
  { id: "591", title: "Bangalore", state_id: "17" },
  { id: "592", title: "Bangalore Rural", state_id: "17" },
  { id: "593", title: "Belgaum", state_id: "17" },
  { id: "594", title: "Bellary", state_id: "17" },
  { id: "595", title: "Bidar", state_id: "17" },
  { id: "596", title: "Bijapur (Karnataka)", state_id: "17" },
  { id: "597", title: "Chamrajnagar", state_id: "17" },
  { id: "598", title: "Chickmagalur", state_id: "17" },
  { id: "599", title: "Chikkaballapur", state_id: "17" },
  { id: "600", title: "Chitradurga", state_id: "17" },
  { id: "601", title: "Dakshina Kannada", state_id: "17" },
  { id: "602", title: "Davanagere", state_id: "17" },
  { id: "603", title: "Dharwad", state_id: "17" },
  { id: "604", title: "Gadag", state_id: "17" },
  { id: "605", title: "Gulbarga", state_id: "17" },
  { id: "606", title: "Hassan", state_id: "17" },
  { id: "607", title: "Haveri", state_id: "17" },
  { id: "608", title: "Kodagu", state_id: "17" },
  { id: "609", title: "Kolar", state_id: "17" },
  { id: "610", title: "Koppal", state_id: "17" },
  { id: "611", title: "Mandya", state_id: "17" },
  { id: "612", title: "Mysore", state_id: "17" },
  { id: "613", title: "Raichur", state_id: "17" },
  { id: "614", title: "Ramanagara", state_id: "17" },
  { id: "615", title: "Shimoga", state_id: "17" },
  { id: "616", title: "Tumkur", state_id: "17" },
  { id: "617", title: "Udupi", state_id: "17" },
  { id: "618", title: "Uttara Kannada", state_id: "17" },
  { id: "619", title: "Yadgir", state_id: "17" },
  { id: "620", title: "North Goa", state_id: "11" },
  { id: "621", title: "South Goa", state_id: "11" },
  { id: "622", title: "Lakshadweep", state_id: "19" },
  { id: "623", title: "Alappuzha", state_id: "18" },
  { id: "624", title: "Ernakulam", state_id: "18" },
  { id: "625", title: "Idukki", state_id: "18" },
  { id: "626", title: "Kannur", state_id: "18" },
  { id: "627", title: "Kasaragod", state_id: "18" },
  { id: "628", title: "Kollam", state_id: "18" },
  { id: "629", title: "Kottayam", state_id: "18" },
  { id: "630", title: "Kozhikode", state_id: "18" },
  { id: "631", title: "Malappuram", state_id: "18" },
  { id: "632", title: "Palakkad", state_id: "18" },
  { id: "633", title: "Pathanamthitta", state_id: "18" },
  { id: "634", title: "Thiruvananthapuram", state_id: "18" },
  { id: "635", title: "Thrissur", state_id: "18" },
  { id: "636", title: "Wayanad", state_id: "18" },
  { id: "637", title: "Ariyalur", state_id: "31" },
  { id: "638", title: "Chennai", state_id: "31" },
  { id: "639", title: "Coimbatore", state_id: "31" },
  { id: "640", title: "Cuddalore", state_id: "31" },
  { id: "641", title: "Dharmapuri", state_id: "31" },
  { id: "642", title: "Dindigul", state_id: "31" },
  { id: "643", title: "Erode", state_id: "31" },
  { id: "644", title: "Kanchipuram", state_id: "31" },
  { id: "645", title: "Kanyakumari", state_id: "31" },
  { id: "646", title: "Karur", state_id: "31" },
  { id: "647", title: "Krishnagiri", state_id: "31" },
  { id: "648", title: "Madurai", state_id: "31" },
  { id: "649", title: "Nagapattinam", state_id: "31" },
  { id: "650", title: "Namakkal", state_id: "31" },
  { id: "651", title: "Nilgiris", state_id: "31" },
  { id: "652", title: "Perambalur", state_id: "31" },
  { id: "653", title: "Pudukkottai", state_id: "31" },
  { id: "654", title: "Ramanathapuram", state_id: "31" },
  { id: "655", title: "Salem", state_id: "31" },
  { id: "656", title: "Sivaganga", state_id: "31" },
  { id: "657", title: "Thanjavur", state_id: "31" },
  { id: "658", title: "Theni", state_id: "31" },
  { id: "659", title: "Thoothukudi (Tuticorin)", state_id: "31" },
  { id: "660", title: "Tiruchirappalli", state_id: "31" },
  { id: "661", title: "Tirunelveli", state_id: "31" },
  { id: "662", title: "Tiruppur", state_id: "31" },
  { id: "663", title: "Tiruvallur", state_id: "31" },
  { id: "664", title: "Tiruvannamalai", state_id: "31" },
  { id: "665", title: "Tiruvarur", state_id: "31" },
  { id: "666", title: "Vellore", state_id: "31" },
  { id: "667", title: "Viluppuram", state_id: "31" },
  { id: "668", title: "Virudhunagar", state_id: "31" },
  { id: "669", title: "Karaikal", state_id: "27" },
  { id: "670", title: "Mahe", state_id: "27" },
  { id: "671", title: "Puducherry (Pondicherry)", state_id: "27" },
  { id: "672", title: "Yanam", state_id: "27" },
  { id: "673", title: "Nicobar", state_id: "1" },
  { id: "674", title: "North And Middle Andaman", state_id: "1" },
  { id: "675", title: "South Andaman", state_id: "1" },
];
window.onload = () => {
  fsaMap = new google.maps.Map(document.getElementById("fsaLiveMap"), {
    zoom: 12,
    center: { lat: 22.5726, lng: 88.3639 },
    mapTypeControl: false,
  });
  routeMap = new google.maps.Map(document.getElementById("routeMap"), {
    zoom: 12,
    center: { lat: 22.5726, lng: 88.3639 },
    mapTypeControl: false,
  });
  directionsRenderer.setMap(routeMap);
  directionsRenderer2.setMap(routeMap);

  // Select Box Initialization
  //$("#selectEmployeeType1").empty();
  $("#selectStateName").empty();
  $("#selectEmptList").empty();
  $("#selectDistrictName").empty();
  $("#selectDistrictName1").empty();
  $("#selectZone").empty();
  for (let i = 0; i < EMP_TYPES.length; i++) {
    /*let o1 = document.createElement("option");
    o1.innerHTML = EMP_TYPES[i].name;
    o1.value = EMP_TYPES[i].id;*/
    let o1 =
      '<option val="' +
      EMP_TYPES[i].id +
      '">' +
      EMP_TYPES[i].name +
      "</option>";
    $("#selectEmployeeType").append(o1);
    $("#selectEmployeeType1").append(o1);
  }
  for (let i = 0; i < ZONES.length; i++) {
    let o3 =
      '<option val="' + ZONES[i].id + '">' + ZONES[i].title + "</option>";
    $("#selectZone").append(o3);
  }
  $("#selectZone").select3({ placeholder: " Zone", zIndex: 100 });
  $("#selectZone").bind("change", function () {
    if (isNaN(parseInt($(this).val()))) {
      for (let i = 0; i < ZONES.length; i++) {
        if ($(this).val() == ZONES[i].title) {
          sfaZone = ZONES[i].id;
          break;
        }
      }
    } else {
      sfaZone = $(this).val();
    }

    generateMap(sfaType, sfaState, sfaDistrict, sfaZone);
  });
  $("#selectEmployeeType").select3({
    placeholder: "Employee Type",
    zIndex: 100,
  });
  $("#selectEmployeeType").bind("change", function () {
    if (isNaN(parseInt($(this).val()))) {
      for (let i = 0; i < EMP_TYPES.length; i++) {
        if ($(this).val() == EMP_TYPES[i].name) {
          sfaType = EMP_TYPES[i].id;
          break;
        }
      }
    } else {
      sfaType = $(this).val();
    }

    generateMap(sfaType, sfaState, sfaDistrict, sfaZone);
  });
  $("#selectEmployeeType1").select3({
    placeholder: "Employee Type",
    zIndex: 100,
  });

  for (let i = 0; i < STATES.length; i++) {
    let o2 =
      '<option val="' + STATES[i].id + '">' + STATES[i].title + "</option>";
    $("#selectStateName").append(o2);
  }
  $("#selectStateName").select3({ placeholder: " State", zIndex: 100 });
  $("#selectStateName").bind("change", function () {
    if (isNaN(parseInt($(this).val()))) {
      for (let i = 0; i < STATES.length; i++) {
        if ($(this).val() == STATES[i].title.trim()) {
          sfaState = STATES[i].id;
          break;
        }
      }
    } else {
      sfaState = $(this).val();
    }

    generateMap(sfaType, sfaState, sfaDistrict, sfaZone);
    $("#selectDistrictName").empty();
    for (let i = 0; i < DISTRICTS.length; i++) {
      if (sfaState == DISTRICTS[i].state_id) {
        let o3 =
          '<option val="' +
          DISTRICTS[i].id +
          '">' +
          DISTRICTS[i].title +
          "</option>";
        $("#selectDistrictName").append(o3);
      }
    }
    $("#selectDistrictName").select3({ placeholder: " District", zIndex: 100 });
    $("#selectZone").empty();
    for (let i = 0; i < ZONES.length; i++) {
      if (ZONES[i].state_id == sfaState) {
        let o3 =
          '<option val="' + ZONES[i].id + '">' + ZONES[i].title + "</option>";
        $("#selectZone").append(o3);
      }
    }
    $("#selectZone").select3({ placeholder: " Zone", zIndex: 100 });
  });
  $("#selectDistrictName").bind("change", function () {
    if (isNaN(parseInt($(this).val()))) {
      for (let i = 0; i < DISTRICTS.length; i++) {
        if ($(this).val() == DISTRICTS[i].title.trim()) {
          sfaDistrict = DISTRICTS[i].id;
          break;
        }
      }
    } else {
      sfaDistrict = $(this).val();
    }

    generateMap(sfaType, sfaState, sfaDistrict, sfaZone);
    $("#selectZone").empty();
    for (let i = 0; i < ZONES.length; i++) {
      if (
        ZONES[i].state_id == sfaState &&
        ZONES[i].district_id == sfaDistrict
      ) {
        let o3 =
          '<option val="' + ZONES[i].id + '">' + ZONES[i].title + "</option>";
        $("#selectZone").append(o3);
      }
    }
    $("#selectZone").select3({ placeholder: " Zone", zIndex: 100 });
  });
  for (let i = 0; i < EMP_LIST.length; i++) {
    let o3 =
      '<option val="' + EMP_LIST[i].id + '">' + EMP_LIST[i].name + "</option>";
    $("#selectEmptList").append(o3);
  }
  $("#selectEmptList").select3({ placeholder: " Employee Name", zIndex: 100 });

  for (let i = 0; i < DISTRICTS.length; i++) {
    let o3 =
      '<option val="' +
      DISTRICTS[i].id +
      '">' +
      DISTRICTS[i].title +
      "</option>";
    $("#selectDistrictName").append(o3);
    $("#selectDistrictName1").append(o3);
  }
  $("#selectDistrictName").select3({ placeholder: " District", zIndex: 100 });
  $("#selectDistrictName1").select3({ placeholder: " District", zIndex: 100 });
  generateMap(sfaType, sfaState, sfaDistrict, sfaZone);
  /* $("#selectStateName").bind("change", function () {
    //alert($(this).val());
    
  });*/
  // sfaEmpList = getEmpployeeList(0, 0, 0, 0);
  // $("#fsaTotal").html(sfaEmpList.total);
  // $("#fsaPresent").html(sfaEmpList.present);
  // let abst = sfaEmpList.absent === 0 ? 0 : sfaEmpList.absent - 3;
  // let lev = sfaEmpList.absent === 0 ? 0 : 3;
  // $("#fsaAbsent").html(abst);
  // $("#fsaLeave").html(lev);
  // $("#fsaLate").html(sfaEmpList.late);
  // for (let i = 0; i < sfaEmpList.emp.length; i++) {
  //   if (
  //     sfaEmpList.emp[i].lat !== undefined &&
  //     sfaEmpList.emp[i].lng !== undefined
  //   ) {
  //     let myLatlng = new google.maps.LatLng(
  //       sfaEmpList.emp[i].lat,
  //       sfaEmpList.emp[i].lng
  //     );
  //     let marker = new google.maps.Marker({
  //       position: myLatlng,
  //       map: fsaMap,
  //       title: sfaEmpList.emp[i].name,
  //     });
  //     sfaMarker.push(marker);
  //   }
  // }
  // console.log(getElevenNumber());
};

function getEmpployeeList(type, state, district, zone) {
  let empList = [];
  let tEmpList = [];
  let multiplier = 41;
  let total = 0,
    present = 0,
    absent = 0,
    late = 0;
  let resp = {};
  if (type != 0) {
    for (let i = 0; i < EMP_LIST.length; i++) {
      console.log(type, EMP_LIST[i].emp_type_id);
      if (type == EMP_LIST[i].emp_type_id) {
        tEmpList.push(EMP_LIST[i]);
      }
    }
  } else {
    tEmpList = EMP_LIST;
  }
  empList = tEmpList;
  tEmpList = [];
  if (state != 0) {
    for (let i = 0; i < empList.length; i++) {
      if (state == empList[i].state_id) {
        tEmpList.push(empList[i]);
      }
    }
  } else {
    tEmpList = empList;
  }
  empList = tEmpList;
  tEmpList = [];
  if (district != 0) {
    for (let i = 0; i < empList.length; i++) {
      if (district == empList[i].district_id) {
        tEmpList.push(empList[i]);
      }
    }
  } else {
    tEmpList = empList;
  }
  empList = tEmpList;
  tEmpList = [];
  if (zone != 0) {
    for (let i = 0; i < empList.length; i++) {
      if (zone == empList[i].zone_id) {
        tEmpList.push(empList[i]);
      }
    }
  } else {
    tEmpList = empList;
  }
  empList = tEmpList;
  tEmpList = [];
  total = empList.length;
  for (let i = 0; i < empList.length; i++) {
    if (empList[i].isPresent === 1) {
      present++;
      if (empList[i].isLate === 1) {
        late++;
      }
    } else {
      absent++;
    }
  }
  resp["total"] = total * multiplier;
  resp["absent"] = absent * multiplier;
  resp["late"] = late * multiplier;
  resp["present"] = resp["total"] - resp["absent"];
  resp["emp"] = empList;
  return resp;
}

function generateMap(type, state, district, zone) {
  sfaEmpList = getEmpployeeList(type, state, district, zone);

  $("#fsaTotal").html(sfaEmpList.total);
  $("#fsaPresent").html(sfaEmpList.present);
  let abst = sfaEmpList.absent === 0 ? 0 : sfaEmpList.absent - 3;
  let lev = sfaEmpList.absent === 0 ? 0 : 3;
  $("#fsaAbsent").html(abst);
  $("#fsaLeave").html(lev);
  $("#fsaLate").html(sfaEmpList.late);
  for (let i = 0; i < sfaMarker.length; i++) {
    sfaMarker[i].setMap(null);
  }
  sfaMarker = [];
  for (let i = 0; i < sfaEmpList.emp.length; i++) {
    if (
      sfaEmpList.emp[i].lat !== undefined &&
      sfaEmpList.emp[i].lng !== undefined
    ) {
      let myLatlng = new google.maps.LatLng(
        sfaEmpList.emp[i].lat,
        sfaEmpList.emp[i].lng
      );
      let marker = new google.maps.Marker({
        position: myLatlng,
        map: fsaMap,
        title: sfaEmpList.emp[i].name,
      });

      let contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id="bodyContent">' +
        "<p><strong>Name : </strong>" +
        sfaEmpList.emp[i].name +
        "</p>" +
        "<p><strong>Phone : </strong>" +
        sfaEmpList.emp[i].phone +
        "</p>" +
        "<p><strong>Email : </strong>" +
        sfaEmpList.emp[i].email +
        "</p>" +
        "</div>" +
        "</div>";
      let infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener("mouseover", () => {
        infowindow.open({
          anchor: marker,
          map: fsaMap,
          shouldFocus: false,
        });
      });
      marker.addListener("mouseout", () => {
        infowindow.close();
      });
      marker.addListener("click", () => {
        clickRouteTab(sfaEmpList.emp[i]);
        //alert(JSON.stringify(sfaEmpList.emp[i]));
      });
      sfaMarker.push(marker);
    }
  }
}
function clickRouteTab(empDetails) {
  $("#selectEmployeeType1").select3({
    placeholder: "Employee Type",
    defaultvalue: EMP_TYPES[empDetails.emp_type_id - 1].name,
    zIndex: 100,
  });
  $("#selectEmptList").select3({
    placeholder: "Employee Name",
    defaultvalue: empDetails.name,
    zIndex: 100,
  });
  getRouteBeat(empDetails.emp_type_id, empDetails.id);
  clickTab("pills-beat");
}
function clickTab(tabId) {
  $("#pills-tab")
    .find("li")
    .each(function (index) {
      if ($(this).find("button").attr("data-bs-target") == "#" + tabId) {
        $(this).find("button").click();
      }
    });
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getElevenNumber() {
  let li1 = [];
  for (let i = 0; i < randomIntFromInterval(11, 15); i++) {
    let dd = randomIntFromInterval(1, 24);
    if ($.inArray(dd, li1) == -1) {
      li1.push(dd);
    } else {
      i--;
    }
  }
  return li1;
}
function getRouteBeat(type, name) {
  let empList = [],
    tempList = [],
    tshopList = [],
    pshopList = [],
    upshopList = [],
    pv = 0,
    uv = 0,
    cusDlr = 0,
    cusDst = 0,
    cusSd = 0,
    cusSdst = 0,
    ncusDlr = 0,
    ncusDst = 0,
    ncusSd = 0,
    ncusSdst = 0,
    nMas = 0,
    nIFB = 0,
    tMas = 0,
    tIFB = 0,
    resp = { planned: [], unplanned: [] };
  if (type == 0) {
    tempList = EMP_LIST;
  } else {
    for (let i = 0; i < EMP_LIST.length; i++) {
      if (type == EMP_LIST[i].emp_type_id) {
        tempList.push(EMP_LIST[i]);
      }
    }
  }
  empList = tempList;
  tempList = [];
  if (name == 0) {
    tempList = EMP_LIST;
  } else {
    for (let i = 0; i < EMP_LIST.length; i++) {
      if (name == EMP_LIST[i].id) {
        tempList.push(EMP_LIST[i]);
      }
    }
  }
  empList = tempList;
  tempList = [];
  let nn = getElevenNumber();
  for (let i = 0; i < nn.length; i++) {
    if (i < randomIntFromInterval(8, 11)) {
      pshopList.push(SHOP_LIST[nn[i] - 1]);
      upshopList.push(SHOP_LIST[nn[i] - 1]);
      pv++;
      if (SHOP_LIST[nn[i] - 1].type == "IFB") {
        tIFB++;
      }
      if (SHOP_LIST[nn[i] - 1].type == "Mason") {
        tMas++;
      }
      if (SHOP_LIST[nn[i] - 1].isNew === 1) {
        if (SHOP_LIST[nn[i] - 1].type == "Dealer") {
          ncusDlr++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Distributor") {
          ncusDst++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Sub Dealer") {
          ncusSd++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Sub Distributor") {
          ncusSdst++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "IFB") {
          nIFB++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Mason") {
          nMas++;
        }
      } else {
        if (SHOP_LIST[nn[i] - 1].type == "Dealer") {
          cusDlr++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Distributor") {
          cusDst++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Sub Dealer") {
          cusSd++;
        }
        if (SHOP_LIST[nn[i] - 1].type == "Sub Distributor") {
          cusSdst++;
        }
      }
    } else {
      upshopList.push(SHOP_LIST[nn[i] - 1]);
      uv++;
    }
  }

  resp["emp"] = empList;
  if (name == 0) {
    resp["planned"] = [];
    resp["unplanned"] = [];
    resp["pv"] = 0;
    resp["uv"] = 0;
    $("#pvCount").html("PV - 0");
    $("#uvcount").html("UPV - 0");
    cusDlr = 0;
    cusDst = 0;
    cusSd = 0;
    cusSdst = 0;
    ncusDlr = 0;
    ncusDst = 0;
    ncusSd = 0;
    ncusSdst = 0;
    nMas = 0;
    nIFB = 0;
    tMas = 0;
    tIFB = 0;
  } else {
    resp["planned"] = pshopList;
    resp["unplanned"] = upshopList;
    $("#pvCount").html("PV - " + pv);
    $("#uvcount").html("UPV - " + uv);
    resp["pv"] = pv;
    resp["uv"] = uv;
  }
  $("#cusDlr").html("DLR – " + cusDlr);
  $("#cusDst").html("DST – " + cusDst);
  $("#cusSd").html("SD – " + cusSd);
  $("#cusSdst").html("S DST – " + cusSdst);
  $("#ncusDlr").html("DLR – " + ncusDlr);
  $("#ncusDst").html("DST – " + ncusDst);
  $("#ncusSd").html("SD – " + ncusSd);
  $("#ncusSdst").html("S DST – " + ncusSdst);
  $("#nMas").html("Mason – " + nMas);
  $("#nIFB").html("IFB – " + nIFB);
  $("#tMas").html("Mason – " + tMas);
  $("#tIFB").html("IFB – " + tIFB);
  //console.log("dd", resp["planned"]);

  calculateAndDisplayRoute1(
    directionsService,
    directionsRenderer,
    resp["planned"],
    "#FF0000"
  );
  calculateAndDisplayRoute2(
    directionsService,
    directionsRenderer,
    resp["unplanned"],
    "#5DAC23"
  );

  return resp;
}

function calculateAndDisplayRoute1(
  directionsService1,
  directionsRenderer1,
  pp,
  lineColor
) {
  var plannedPoints = pp;
  var waypts = [];
  var flightPlanCoordinates = [];
  if (plannedPoints.length > 0) {
    var p4, p5;
    for (let i = 0; i < plannedPoints.length; i++) {
      if (i == 0) {
        p4 = plannedPoints[i];
      }
      if (i == plannedPoints.length - 1) {
        p5 = plannedPoints[i];
      }
      let p3 = plannedPoints[i];

      let ltlng = new google.maps.LatLng(p3.lat, p3.lng);
      waypts.push({
        location: ltlng,
        stopover: true,
      });
      flightPlanCoordinates.push({ lat: p3.lat, lng: p3.lng });
    }
    directionsService1
      .route({
        origin: new google.maps.LatLng(p4.lat, p4.lng),
        destination: new google.maps.LatLng(p5.lat, p5.lng),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer1.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));

    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: lineColor,
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(routeMap);
  }
}
function calculateAndDisplayRoute2(
  directionsService3,
  directionsRenderer3,
  pp,
  lineColor
) {
  var plannedPoints = pp;
  var waypts = [];
  var flightPlanCoordinates = [];
  if (plannedPoints.length > 0) {
    var p4, p5;
    for (let i = 0; i < plannedPoints.length; i++) {
      if (i == 0) {
        p4 = plannedPoints[i];
      }
      if (i == plannedPoints.length - 1) {
        p5 = plannedPoints[i];
      }
      let p3 = plannedPoints[i];

      let ltlng = new google.maps.LatLng(p3.lat, p3.lng);
      waypts.push({
        location: ltlng,
        stopover: true,
      });
      flightPlanCoordinates.push({ lat: p3.lat, lng: p3.lng });
    }
    directionsService2
      .route({
        origin: new google.maps.LatLng(p4.lat, p4.lng),
        destination: new google.maps.LatLng(p5.lat, p5.lng),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer2.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));

    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: lineColor,
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(routeMap);
  }
}
