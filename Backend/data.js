export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password_123", 
    evModel: "Tata Nexon EV",
    chargingPortType: "CCS",
    type: "user",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "hashed_password_456",
    evModel: "MG ZS EV",
    chargingPortType: "Type 1",
    type: "user",
  },
   {
    id: "3",
    name: "Satyaki Batabyal",
    email: "satyakibatabyal97@gmail.com",
    password: "1234",
    evModel: "MG ZS EV",
    chargingPortType: "Type 3",
    type: "user",
  },
 
];

export const kolkataStations = [
  {
    id: "KS1",
    name: "Biswa Bangla EV Hub",
    operator: "Powerbank / WBHIDCO",
    location: {
      city: "Kolkata",
      address: "Biswa Bangla Convention Centre, New Town, Rajarhat",
      lat: 22.5824,
      lng: 88.4743,
    },
    chargers: [
      { type: "CCS", power: "60kW", available: true },
      { type: "Type 2", power: "22kW", available: true },
    ],
    pricePerKWh: 18,
  },
  {
    id: "KS2",
    name: "India Power Green EV Station",
    operator: "India Power + ChargET",
    location: {
      city: "Kolkata",
      address: "Salt Lake, Sector V, Kolkata",
      lat: 22.5745,
      lng: 88.4338,
    },
    chargers: [
      { type: "CCS", power: "30kW", available: true },
      { type: "Type 2", power: "7kW", available: false },
    ],
    pricePerKWh: 16,
  },
  {
    id: "KS3",
    name: "NKDA Fast Charging Station",
    operator: "NKDA",
    location: {
      city: "Kolkata",
      address: "Axis Mall, New Town",
      lat: 22.5829,
      lng: 88.4626,
    },
    chargers: [
      { type: "CCS", power: "50kW", available: true },
      { type: "CHAdeMO", power: "25kW", available: true },
    ],
    pricePerKWh: 20,
  },
  {
    id: "KS4",
    name: "KMC EV Charging - Beleghata",
    operator: "Kolkata Municipal Corporation",
    location: {
      city: "Kolkata",
      address: "Beleghata Main Road, Kolkata",
      lat: 22.5675,
      lng: 88.3919,
    },
    chargers: [
      { type: "Type 2", power: "15kW", available: true },
    ],
    pricePerKWh: 15,
  },
  {
    id: "KS5",
    name: "KMC EV Charging - Gariahat",
    operator: "Kolkata Municipal Corporation",
    location: {
      city: "Kolkata",
      address: "Gariahat, Ballygunge, Kolkata",
      lat: 22.5206,
      lng: 88.3659,
    },
    chargers: [
      { type: "CCS", power: "30kW", available: false },
    ],
    pricePerKWh: 17,
  },
  {
    id: "KS6",
    name: "Esplanade EV Station",
    operator: "Tata Power EZ Charge",
    location: {
      city: "Kolkata",
      address: "Esplanade, Central Kolkata",
      lat: 22.5667,
      lng: 88.3516,
    },
    chargers: [
      { type: "Type 2", power: "11kW", available: true },
    ],
    pricePerKWh: 14,
  },
  {
    id: "KS7",
    name: "Park Circus EV Station",
    operator: "Private",
    location: {
      city: "Kolkata",
      address: "Park Circus, Kolkata",
      lat: 22.5416,
      lng: 88.3702,
    },
    chargers: [
      { type: "CCS", power: "20kW", available: true },
    ],
    pricePerKWh: 16,
  },
  {
    id: "KS8",
    name: "Ho Chi Minh Sarani EV Station",
    operator: "Tata Power EZ Charge",
    location: {
      city: "Kolkata",
      address: "Ho Chi Minh Sarani, Kolkata",
      lat: 22.5456,
      lng: 88.3512,
    },
    chargers: [
      { type: "Type 2", power: "22kW", available: true },
    ],
    pricePerKWh: 18,
  },
];
export const hosts = [
  {
    id: "KS1",
    name: "Host 1",
    email: "host1@evhub.com",
    password: "hostpass1", 
  },
  {
    id: "KS2",
    name: "Host 2",
    email: "host2@evhub.com",
    password: "hostpass2",
  },
  {
    id: "KS3",
    name: "Host 3",
    email: "host3@evhub.com",
    password: "hostpass3",
  },
  {
    id: "KS4",
    name: "Host 4",
    email: "host4@evhub.com",
    password: "hostpass4",
  },
  {
    id: "KS5",
    name: "Host 5",
    email: "host5@evhub.com",
    password: "hostpass5",
  },
  {
    id: "KS6",
    name: "Host 6",
    email: "host6@evhub.com",
    password: "hostpass6",
  },
  {
    id: "KS7",
    name: "Host 7",
    email: "host7@evhub.com",
    password: "hostpass7",
  },
  {
    id: "KS8",
    name: "Host 8",
    email: "host8@evhub.com",
    password: "hostpass8",
  },
];