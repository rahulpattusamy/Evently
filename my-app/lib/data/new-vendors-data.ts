import { Vendor, CitySlug, EventTypeSlug } from "@/lib/types";

const rawData = {
  "wedding_planners": [
    {
      "id": "wp001",
      "name": "Dream Knot Weddings",
      "category": "Wedding Planners",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 128,
      "startingPrice": 75000,
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "wp002",
      "name": "Forever Moments",
      "category": "Wedding Planners",
      "location": "Adyar, Chennai",
      "rating": 4.8,
      "reviews": 96,
      "startingPrice": 60000,
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
      "id": "wp003",
      "name": "The Wedding Story",
      "category": "Wedding Planners",
      "location": "Anna Nagar, Chennai",
      "rating": 4.9,
      "reviews": 154,
      "startingPrice": 90000,
      "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
    },
    {
      "id": "wp004",
      "name": "Marry Me Events",
      "category": "Wedding Planners",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 83,
      "startingPrice": 55000,
      "image": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
    },
    {
      "id": "wp005",
      "name": "Royal Wedding Co.",
      "category": "Wedding Planners",
      "location": "Alwarpet, Chennai",
      "rating": 4.9,
      "reviews": 117,
      "startingPrice": 120000,
      "image": "https://images.unsplash.com/photo-1507504031003-b417219a0fde"
    },
    {
      "id": "wp006",
      "name": "Blissful Beginnings",
      "category": "Wedding Planners",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 74,
      "startingPrice": 65000,
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "wp007",
      "name": "Golden Knot Events",
      "category": "Wedding Planners",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 142,
      "startingPrice": 100000,
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
      "id": "wp008",
      "name": "Elegant Vows",
      "category": "Wedding Planners",
      "location": "Tambaram, Chennai",
      "rating": 4.6,
      "reviews": 61,
      "startingPrice": 50000,
      "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
    },
    {
      "id": "wp009",
      "name": "Shaadi Moments",
      "category": "Wedding Planners",
      "location": "Chromepet, Chennai",
      "rating": 4.8,
      "reviews": 91,
      "startingPrice": 70000,
      "image": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
    },
    {
      "id": "wp010",
      "name": "Perfect Day Weddings",
      "category": "Wedding Planners",
      "location": "OMR, Chennai",
      "rating": 4.9,
      "reviews": 108,
      "startingPrice": 85000,
      "image": "https://images.unsplash.com/photo-1507504031003-b417219a0fde"
    }
  ],
  "event_planners": [
    {
      "id": "ep001",
      "name": "Celebration Crew",
      "category": "Event Planners",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 87,
      "startingPrice": 25000,
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ep002",
      "name": "Chennai Event Works",
      "category": "Event Planners",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 63,
      "startingPrice": 20000,
      "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },
    {
      "id": "ep003",
      "name": "Grand Events Studio",
      "category": "Event Planners",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 119,
      "startingPrice": 35000,
      "image": "https://images.unsplash.com/photo-1505236858219-8359eb29e329"
    },
    {
      "id": "ep004",
      "name": "Celebrate Chennai",
      "category": "Event Planners",
      "location": "Adyar, Chennai",
      "rating": 4.8,
      "reviews": 75,
      "startingPrice": 28000,
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ep005",
      "name": "Moments & More",
      "category": "Event Planners",
      "location": "Mylapore, Chennai",
      "rating": 4.6,
      "reviews": 54,
      "startingPrice": 18000,
      "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },
    {
      "id": "ep006",
      "name": "Event Aura",
      "category": "Event Planners",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 101,
      "startingPrice": 40000,
      "image": "https://images.unsplash.com/photo-1505236858219-8359eb29e329"
    },
    {
      "id": "ep007",
      "name": "Party People Chennai",
      "category": "Event Planners",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 68,
      "startingPrice": 15000,
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ep008",
      "name": "Urban Celebrations",
      "category": "Event Planners",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 92,
      "startingPrice": 30000,
      "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },
    {
      "id": "ep009",
      "name": "Event Junction",
      "category": "Event Planners",
      "location": "Pallikaranai, Chennai",
      "rating": 4.9,
      "reviews": 134,
      "startingPrice": 45000,
      "image": "https://images.unsplash.com/photo-1505236858219-8359eb29e329"
    },
    {
      "id": "ep010",
      "name": "Celebrate Together",
      "category": "Event Planners",
      "location": "Porur, Chennai",
      "rating": 4.7,
      "reviews": 59,
      "startingPrice": 22000,
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    }
  ],
  "decorators": [
    {
      "id": "dec001",
      "name": "Floral Fantasy Decor",
      "category": "Decorators",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 145,
      "startingPrice": 15000,
      "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      "id": "dec002",
      "name": "Elegant Decor Studio",
      "category": "Decorators",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 97,
      "startingPrice": 20000,
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865"
    },
    {
      "id": "dec003",
      "name": "Dreamy Decorations",
      "category": "Decorators",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 121,
      "startingPrice": 25000,
      "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      "id": "dec004",
      "name": "Petal & Pearl Decor",
      "category": "Decorators",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 76,
      "startingPrice": 12000,
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865"
    },
    {
      "id": "dec005",
      "name": "Royal Stage Decor",
      "category": "Decorators",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 88,
      "startingPrice": 30000,
      "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      "id": "dec006",
      "name": "Bloom Events Decor",
      "category": "Decorators",
      "location": "Chromepet, Chennai",
      "rating": 4.6,
      "reviews": 53,
      "startingPrice": 10000,
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865"
    },
    {
      "id": "dec007",
      "name": "The Decor House",
      "category": "Decorators",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 110,
      "startingPrice": 35000,
      "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      "id": "dec008",
      "name": "Marigold Moments",
      "category": "Decorators",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 69,
      "startingPrice": 14000,
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865"
    },
    {
      "id": "dec009",
      "name": "Backdrop Bliss",
      "category": "Decorators",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 82,
      "startingPrice": 18000,
      "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
    },
    {
      "id": "dec010",
      "name": "Celebrate Decor",
      "category": "Decorators",
      "location": "OMR, Chennai",
      "rating": 4.9,
      "reviews": 126,
      "startingPrice": 22000,
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865"
    }
  ],
  "caterers": [
    {
      "id": "cat001",
      "name": "Annapoorna Catering",
      "category": "Caterers",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 187,
      "pricePerPlate": 250,
      "image": "https://images.unsplash.com/photo-1555244162-803834f70033"
    },
    {
      "id": "cat002",
      "name": "Banana Leaf Caterers",
      "category": "Caterers",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 143,
      "pricePerPlate": 220,
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      "id": "cat003",
      "name": "Grand Feast Catering",
      "category": "Caterers",
      "location": "Anna Nagar, Chennai",
      "rating": 4.9,
      "reviews": 116,
      "pricePerPlate": 350,
      "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
    },
    {
      "id": "cat004",
      "name": "Sri Lakshmi Caterers",
      "category": "Caterers",
      "location": "Adyar, Chennai",
      "rating": 4.7,
      "reviews": 91,
      "pricePerPlate": 200,
      "image": "https://images.unsplash.com/photo-1555244162-803834f70033"
    },
    {
      "id": "cat005",
      "name": "Royal Taste Catering",
      "category": "Caterers",
      "location": "Velachery, Chennai",
      "rating": 4.8,
      "reviews": 105,
      "pricePerPlate": 300,
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      "id": "cat006",
      "name": "Madras Food Fiesta",
      "category": "Caterers",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 132,
      "pricePerPlate": 275,
      "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
    },
    {
      "id": "cat007",
      "name": "Home Feast Caterers",
      "category": "Caterers",
      "location": "Tambaram, Chennai",
      "rating": 4.6,
      "reviews": 64,
      "pricePerPlate": 180,
      "image": "https://images.unsplash.com/photo-1555244162-803834f70033"
    },
    {
      "id": "cat008",
      "name": "Taste Buds Catering",
      "category": "Caterers",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 84,
      "pricePerPlate": 240,
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      "id": "cat009",
      "name": "South Spice Caterers",
      "category": "Caterers",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 73,
      "pricePerPlate": 210,
      "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
    },
    {
      "id": "cat010",
      "name": "Feast & Flavours",
      "category": "Caterers",
      "location": "OMR, Chennai",
      "rating": 4.9,
      "reviews": 119,
      "pricePerPlate": 325,
      "image": "https://images.unsplash.com/photo-1555244162-803834f70033"
    }
  ],
  "bakers": [
    {
      "id": "bak001",
      "name": "The Cake Studio",
      "category": "Bakers",
      "location": "Anna Nagar, Chennai",
      "rating": 4.9,
      "reviews": 214,
      "startingPrice": 650,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
      "id": "bak002",
      "name": "Sweet Cravings",
      "category": "Bakers",
      "location": "T. Nagar, Chennai",
      "rating": 4.8,
      "reviews": 156,
      "startingPrice": 550,
      "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    },
    {
      "id": "bak003",
      "name": "Buttercream House",
      "category": "Bakers",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 132,
      "startingPrice": 750,
      "image": "https://images.unsplash.com/photo-1535254973040-607b474cb50d"
    },
    {
      "id": "bak004",
      "name": "Bake My Day",
      "category": "Bakers",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 98,
      "startingPrice": 500,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
      "id": "bak005",
      "name": "Sugar Bloom",
      "category": "Bakers",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 121,
      "startingPrice": 700,
      "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    },
    {
      "id": "bak006",
      "name": "Crumb & Cream",
      "category": "Bakers",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 167,
      "startingPrice": 850,
      "image": "https://images.unsplash.com/photo-1535254973040-607b474cb50d"
    },
    {
      "id": "bak007",
      "name": "Cakes & Bakes Chennai",
      "category": "Bakers",
      "location": "Tambaram, Chennai",
      "rating": 4.6,
      "reviews": 76,
      "startingPrice": 450,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
      "id": "bak008",
      "name": "Sweet Celebration",
      "category": "Bakers",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 109,
      "startingPrice": 600,
      "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    },
    {
      "id": "bak009",
      "name": "Fondant Dreams",
      "category": "Bakers",
      "location": "Chromepet, Chennai",
      "rating": 4.9,
      "reviews": 93,
      "startingPrice": 800,
      "image": "https://images.unsplash.com/photo-1535254973040-607b474cb50d"
    },
    {
      "id": "bak010",
      "name": "Chennai Cake Corner",
      "category": "Bakers",
      "location": "OMR, Chennai",
      "rating": 4.7,
      "reviews": 88,
      "startingPrice": 550,
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    }
  ],
  "speciality_food_vendors": [
    {
      "id": "sfv001",
      "name": "Live Flavours",
      "category": "Speciality Food Vendors",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 128,
      "startingPrice": 8000,
      "description": "Live counters and unique cuisines for special occasions",
      "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de"
    },
    {
      "id": "sfv002",
      "name": "Chaat Junction",
      "category": "Speciality Food Vendors",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 94,
      "startingPrice": 5000,
      "description": "Authentic Indian chaat and street food counters",
      "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },
    {
      "id": "sfv003",
      "name": "Dosa Live Counter",
      "category": "Speciality Food Vendors",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 87,
      "startingPrice": 6000,
      "description": "Fresh dosa varieties prepared live at your event",
      "image": "https://images.unsplash.com/photo-1630383249896-424e482df921"
    },
    {
      "id": "sfv004",
      "name": "Dessert Dreams",
      "category": "Speciality Food Vendors",
      "location": "Velachery, Chennai",
      "rating": 4.8,
      "reviews": 76,
      "startingPrice": 7000,
      "description": "Premium dessert and sweet counters",
      "image": "https://images.unsplash.com/photo-1551024606-0bccd828d307"
    },
    {
      "id": "sfv005",
      "name": "Pizza Live",
      "category": "Speciality Food Vendors",
      "location": "Nungambakkam, Chennai",
      "rating": 4.7,
      "reviews": 65,
      "startingPrice": 9000,
      "description": "Fresh wood-fired pizza and Italian food counters",
      "image": "https://images.unsplash.com/photo-1579751626657-72bc17010498"
    },
    {
      "id": "sfv006",
      "name": "Pani Puri House",
      "category": "Speciality Food Vendors",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 103,
      "startingPrice": 4500,
      "description": "Interactive pani puri and street food experience",
      "image": "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7"
    },
    {
      "id": "sfv007",
      "name": "South Indian Tiffin Bar",
      "category": "Speciality Food Vendors",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 58,
      "startingPrice": 5500,
      "description": "Traditional South Indian live food counters",
      "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"
    },
    {
      "id": "sfv008",
      "name": "Mocktail Station",
      "category": "Speciality Food Vendors",
      "location": "OMR, Chennai",
      "rating": 4.9,
      "reviews": 112,
      "startingPrice": 6500,
      "description": "Creative mocktails, juices and beverage counters",
      "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd"
    },
    {
      "id": "sfv009",
      "name": "BBQ Live Grill",
      "category": "Speciality Food Vendors",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 81,
      "startingPrice": 10000,
      "description": "Live grilled snacks and barbecue counters",
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947"
    },
    {
      "id": "sfv010",
      "name": "Ice Cream Cart",
      "category": "Speciality Food Vendors",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 69,
      "startingPrice": 5000,
      "description": "Premium ice cream and dessert carts for events",
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb"
    }
  ],
  "photographers": [
    {
      "id": "pho001",
      "name": "Moments Photography",
      "category": "Photographers",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 215,
      "startingPrice": 25000,
      "description": "Candid wedding and event photography",
      "image": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
    },
    {
      "id": "pho002",
      "name": "Frame Story Studio",
      "category": "Photographers",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 167,
      "startingPrice": 20000,
      "description": "Creative photography for weddings and celebrations",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
      "id": "pho003",
      "name": "Candid Tales",
      "category": "Photographers",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 142,
      "startingPrice": 30000,
      "description": "Natural candid moments captured beautifully",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
      "id": "pho004",
      "name": "Shutter Stories",
      "category": "Photographers",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 96,
      "startingPrice": 18000,
      "description": "Wedding, birthday and event photography",
      "image": "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac"
    },
    {
      "id": "pho005",
      "name": "The Wedding Frame",
      "category": "Photographers",
      "location": "Mylapore, Chennai",
      "rating": 4.9,
      "reviews": 188,
      "startingPrice": 35000,
      "description": "Premium wedding photography and portraits",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "pho006",
      "name": "Pixel Moments",
      "category": "Photographers",
      "location": "Nungambakkam, Chennai",
      "rating": 4.8,
      "reviews": 124,
      "startingPrice": 22000,
      "description": "Modern event photography and cinematic portraits",
      "image": "https://images.unsplash.com/photo-1520854221256-17451cc331bf"
    },
    {
      "id": "pho007",
      "name": "Forever Frames",
      "category": "Photographers",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 83,
      "startingPrice": 16000,
      "description": "Affordable photography for every celebration",
      "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
      "id": "pho008",
      "name": "Lens & Love",
      "category": "Photographers",
      "location": "OMR, Chennai",
      "rating": 4.9,
      "reviews": 153,
      "startingPrice": 28000,
      "description": "Candid and cinematic wedding photography",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "pho009",
      "name": "Event Lens Studio",
      "category": "Photographers",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 105,
      "startingPrice": 19000,
      "description": "Professional photography for events and parties",
      "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
    },
    {
      "id": "pho010",
      "name": "Golden Hour Photography",
      "category": "Photographers",
      "location": "Chromepet, Chennai",
      "rating": 4.9,
      "reviews": 136,
      "startingPrice": 24000,
      "description": "Elegant portraits and memorable event photography",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552"
    }
  ],
  "makeup_artists": [
    {
      "id": "mua001",
      "name": "Glow Beauty Studio",
      "category": "Makeup Artists",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 182,
      "startingPrice": 8000,
      "description": "Bridal and party makeup by professional artists",
      "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    {
      "id": "mua002",
      "name": "Blush & Beauty",
      "category": "Makeup Artists",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 126,
      "startingPrice": 6500,
      "description": "Elegant bridal and event makeup services",
      "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
    },
    {
      "id": "mua003",
      "name": "Makeup By Meera",
      "category": "Makeup Artists",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 148,
      "startingPrice": 9000,
      "description": "Professional bridal makeup and styling",
      "image": "https://images.unsplash.com/photo-1487412912498-0447578fcca8"
    },
    {
      "id": "mua004",
      "name": "Glam Studio Chennai",
      "category": "Makeup Artists",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 93,
      "startingPrice": 6000,
      "description": "Party, reception and engagement makeup",
      "image": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937"
    },
    {
      "id": "mua005",
      "name": "Bridal Glow",
      "category": "Makeup Artists",
      "location": "Mylapore, Chennai",
      "rating": 4.9,
      "reviews": 201,
      "startingPrice": 12000,
      "description": "Premium bridal makeup and hair styling",
      "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
    },
    {
      "id": "mua006",
      "name": "Makeup Magic",
      "category": "Makeup Artists",
      "location": "Nungambakkam, Chennai",
      "rating": 4.8,
      "reviews": 117,
      "startingPrice": 7500,
      "description": "Modern makeup looks for weddings and parties",
      "image": "https://images.unsplash.com/photo-1500840216050-6ffa99d75160"
    },
    {
      "id": "mua007",
      "name": "Radiant Faces",
      "category": "Makeup Artists",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 76,
      "startingPrice": 5500,
      "description": "Affordable professional makeup services",
      "image": "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43"
    },
    {
      "id": "mua008",
      "name": "The Glam Artist",
      "category": "Makeup Artists",
      "location": "OMR, Chennai",
      "rating": 4.9,
      "reviews": 134,
      "startingPrice": 10000,
      "description": "Luxury bridal and event makeup",
      "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
    },
    {
      "id": "mua009",
      "name": "Beauty Bloom",
      "category": "Makeup Artists",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 89,
      "startingPrice": 7000,
      "description": "Soft glam and traditional bridal makeup",
      "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    {
      "id": "mua010",
      "name": "Makeup Lounge",
      "category": "Makeup Artists",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 71,
      "startingPrice": 6000,
      "description": "Makeup services for weddings and celebrations",
      "image": "https://images.unsplash.com/photo-1487412912498-0447578fcca8"
    }
  ],
  "mehendi_artists": [
    {
      "id": "meh001",
      "name": "Henna Tales",
      "category": "Mehendi Artists",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 156,
      "startingPrice": 2500,
      "description": "Intricate bridal mehendi and traditional designs",
      "image": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65"
    },
    {
      "id": "meh002",
      "name": "Mehendi Magic",
      "category": "Mehendi Artists",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 124,
      "startingPrice": 2000,
      "description": "Bridal and party mehendi designs",
      "image": "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7"
    },
    {
      "id": "meh003",
      "name": "Bridal Henna Studio",
      "category": "Mehendi Artists",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 138,
      "startingPrice": 3500,
      "description": "Premium detailed bridal mehendi",
      "image": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65"
    },
    {
      "id": "meh004",
      "name": "Henna Art Chennai",
      "category": "Mehendi Artists",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 87,
      "startingPrice": 1800,
      "description": "Traditional and contemporary henna art",
      "image": "https://images.unsplash.com/photo-1610173827043-5d4f6f6f6f6f"
    },
    {
      "id": "meh005",
      "name": "Mehendi By Priya",
      "category": "Mehendi Artists",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 109,
      "startingPrice": 2200,
      "description": "Personalized bridal mehendi designs",
      "image": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65"
    },
    {
      "id": "meh006",
      "name": "Henna Dreams",
      "category": "Mehendi Artists",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 143,
      "startingPrice": 3000,
      "description": "Creative bridal and Arabic mehendi",
      "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },
    {
      "id": "meh007",
      "name": "Arabic Henna Art",
      "category": "Mehendi Artists",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 68,
      "startingPrice": 1500,
      "description": "Beautiful Arabic and simple mehendi designs",
      "image": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65"
    },
    {
      "id": "meh008",
      "name": "The Henna Artist",
      "category": "Mehendi Artists",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 97,
      "startingPrice": 2500,
      "description": "Detailed wedding and engagement mehendi",
      "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },
    {
      "id": "meh009",
      "name": "Mehendi Moments",
      "category": "Mehendi Artists",
      "location": "Porur, Chennai",
      "rating": 4.9,
      "reviews": 115,
      "startingPrice": 2800,
      "description": "Bridal mehendi with customized couple designs",
      "image": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65"
    },
    {
      "id": "meh010",
      "name": "Henna Elegance",
      "category": "Mehendi Artists",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 73,
      "startingPrice": 1700,
      "description": "Elegant mehendi for weddings and celebrations",
      "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    }
  ],
  "djs": [
    {
      "id": "dj001",
      "name": "DJ BeatBox",
      "category": "DJs",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 187,
      "startingPrice": 12000,
      "description": "High-energy DJ music for weddings and parties",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj002",
      "name": "DJ Vibe Chennai",
      "category": "DJs",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 143,
      "startingPrice": 10000,
      "description": "Party DJ with professional sound and lighting",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj003",
      "name": "DJ Rhythm",
      "category": "DJs",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 126,
      "startingPrice": 15000,
      "description": "Wedding and corporate event DJ services",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj004",
      "name": "DJ Pulse",
      "category": "DJs",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 91,
      "startingPrice": 9000,
      "description": "Professional DJ for birthdays and private parties",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj005",
      "name": "DJ Night Owl",
      "category": "DJs",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 108,
      "startingPrice": 11000,
      "description": "Bollywood, Tamil and international party music",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj006",
      "name": "DJ Spark",
      "category": "DJs",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 155,
      "startingPrice": 18000,
      "description": "Premium DJ and lighting experience",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj007",
      "name": "DJ Groove",
      "category": "DJs",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 76,
      "startingPrice": 8000,
      "description": "Affordable DJ services for celebrations",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj008",
      "name": "DJ Xtreme",
      "category": "DJs",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 117,
      "startingPrice": 13000,
      "description": "Modern DJ setup for weddings and parties",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj009",
      "name": "DJ Beats Chennai",
      "category": "DJs",
      "location": "Porur, Chennai",
      "rating": 4.9,
      "reviews": 132,
      "startingPrice": 14000,
      "description": "Complete DJ, sound and lighting packages",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    },
    {
      "id": "dj010",
      "name": "DJ Celebration",
      "category": "DJs",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 84,
      "startingPrice": 9500,
      "description": "DJ music for every type of celebration",
      "image": "https://images.unsplash.com/photo-1571266028243-d220c9c3b7b0"
    }
  ],
  "bridal_wear": [
    {
      "id": "bw001",
      "name": "Sri Bridal Studio",
      "category": "Bridal Wear",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 184,
      "startingPrice": 15000,
      "description": "Designer bridal sarees and traditional wedding collections",
      "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
    },
    {
      "id": "bw002",
      "name": "Bridal Elegance",
      "category": "Bridal Wear",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 126,
      "startingPrice": 18000,
      "description": "Elegant bridal sarees and wedding outfits",
      "image": "https://images.unsplash.com/photo-1583391733956-6c78276477e2"
    },
    {
      "id": "bw003",
      "name": "Kanchipuram Silks",
      "category": "Bridal Wear",
      "location": "Mylapore, Chennai",
      "rating": 4.9,
      "reviews": 215,
      "startingPrice": 22000,
      "description": "Traditional Kanchipuram silk sarees for brides",
      "image": "https://images.unsplash.com/photo-1610030469668-8e9a9a9c8e5a"
    },
    {
      "id": "bw004",
      "name": "The Bridal Closet",
      "category": "Bridal Wear",
      "location": "Adyar, Chennai",
      "rating": 4.7,
      "reviews": 98,
      "startingPrice": 12000,
      "description": "Contemporary bridal outfits and designer sarees",
      "image": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c"
    },
    {
      "id": "bw005",
      "name": "Royal Bride Collection",
      "category": "Bridal Wear",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 163,
      "startingPrice": 25000,
      "description": "Luxury bridal lehengas and wedding sarees",
      "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
    },
    {
      "id": "bw006",
      "name": "Silk & Style",
      "category": "Bridal Wear",
      "location": "Velachery, Chennai",
      "rating": 4.8,
      "reviews": 117,
      "startingPrice": 16000,
      "description": "Traditional and modern bridal collections",
      "image": "https://images.unsplash.com/photo-1583391733956-6c78276477e2"
    },
    {
      "id": "bw007",
      "name": "Bridal Couture Chennai",
      "category": "Bridal Wear",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 91,
      "startingPrice": 20000,
      "description": "Customized bridal outfits and designer wear",
      "image": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c"
    },
    {
      "id": "bw008",
      "name": "Lakshmi Bridal House",
      "category": "Bridal Wear",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 84,
      "startingPrice": 11000,
      "description": "Affordable traditional bridal sarees",
      "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
    },
    {
      "id": "bw009",
      "name": "Wedding Wardrobe",
      "category": "Bridal Wear",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 105,
      "startingPrice": 14500,
      "description": "Complete bridal wardrobe for wedding celebrations",
      "image": "https://images.unsplash.com/photo-1583391733956-6c78276477e2"
    },
    {
      "id": "bw010",
      "name": "The Saree Gallery",
      "category": "Bridal Wear",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 72,
      "startingPrice": 10000,
      "description": "Beautiful silk sarees and bridal collections",
      "image": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c"
    }
  ],
  "groom_wear": [
    {
      "id": "gw001",
      "name": "The Groom Studio",
      "category": "Groom Wear",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 156,
      "startingPrice": 12000,
      "description": "Designer sherwanis and wedding suits for grooms",
      "image": "https://images.unsplash.com/photo-1598808503746-f34c53b9323e"
    },
    {
      "id": "gw002",
      "name": "Royal Groom Wear",
      "category": "Groom Wear",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 113,
      "startingPrice": 15000,
      "description": "Premium sherwanis and traditional groom outfits",
      "image": "https://images.unsplash.com/photo-1555069519-127aadedf1ee"
    },
    {
      "id": "gw003",
      "name": "Gentleman's Wardrobe",
      "category": "Groom Wear",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 142,
      "startingPrice": 18000,
      "description": "Luxury suits and tuxedos for special occasions",
      "image": "https://images.unsplash.com/photo-1598808503746-f34c53b9323e"
    },
    {
      "id": "gw004",
      "name": "Sherwani House",
      "category": "Groom Wear",
      "location": "Mylapore, Chennai",
      "rating": 4.7,
      "reviews": 87,
      "startingPrice": 10000,
      "description": "Traditional sherwanis and Indo-western outfits",
      "image": "https://images.unsplash.com/photo-1516826957135-700dedea698c"
    },
    {
      "id": "gw005",
      "name": "The Wedding Suit",
      "category": "Groom Wear",
      "location": "Adyar, Chennai",
      "rating": 4.8,
      "reviews": 95,
      "startingPrice": 14000,
      "description": "Custom wedding suits and formal groom wear",
      "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
    },
    {
      "id": "gw006",
      "name": "Groom Couture",
      "category": "Groom Wear",
      "location": "Velachery, Chennai",
      "rating": 4.9,
      "reviews": 108,
      "startingPrice": 16000,
      "description": "Modern groom outfits with custom tailoring",
      "image": "https://images.unsplash.com/photo-1598808503746-f34c53b9323e"
    },
    {
      "id": "gw007",
      "name": "Royal Sherwani Studio",
      "category": "Groom Wear",
      "location": "OMR, Chennai",
      "rating": 4.7,
      "reviews": 69,
      "startingPrice": 11000,
      "description": "Stylish sherwanis and wedding accessories",
      "image": "https://images.unsplash.com/photo-1516826957135-700dedea698c"
    },
    {
      "id": "gw008",
      "name": "The Groom Gallery",
      "category": "Groom Wear",
      "location": "Tambaram, Chennai",
      "rating": 4.8,
      "reviews": 81,
      "startingPrice": 9500,
      "description": "Complete groom styling and wedding outfits",
      "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
    },
    {
      "id": "gw009",
      "name": "Elite Men Wear",
      "category": "Groom Wear",
      "location": "Porur, Chennai",
      "rating": 4.8,
      "reviews": 74,
      "startingPrice": 13000,
      "description": "Premium ethnic and western groom wear",
      "image": "https://images.unsplash.com/photo-1598808503746-f34c53b9323e"
    },
    {
      "id": "gw010",
      "name": "Wedding Menswear",
      "category": "Groom Wear",
      "location": "Chromepet, Chennai",
      "rating": 4.7,
      "reviews": 63,
      "startingPrice": 8500,
      "description": "Affordable wedding outfits for grooms and family",
      "image": "https://images.unsplash.com/photo-1516826957135-700dedea698c"
    }
  ],
  "invitation_designers": [
    {
      "id": "inv001",
      "name": "Invite Studio",
      "category": "Invitation Designers",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 134,
      "startingPrice": 1500,
      "description": "Custom wedding invitations and digital invites",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "inv002",
      "name": "Paper & Pearl",
      "category": "Invitation Designers",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 98,
      "startingPrice": 2000,
      "description": "Elegant printed wedding invitation designs",
      "image": "https://images.unsplash.com/photo-1523438885200-e635ba2c371e"
    },
    {
      "id": "inv003",
      "name": "Digital Invites Chennai",
      "category": "Invitation Designers",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 117,
      "startingPrice": 1000,
      "description": "Modern animated and digital wedding invitations",
      "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    },
    {
      "id": "inv004",
      "name": "Elegant Invites",
      "category": "Invitation Designers",
      "location": "Mylapore, Chennai",
      "rating": 4.8,
      "reviews": 86,
      "startingPrice": 1800,
      "description": "Traditional and premium invitation cards",
      "image": "https://images.unsplash.com/photo-1523438885200-e635ba2c371e"
    },
    {
      "id": "inv005",
      "name": "InviteCraft",
      "category": "Invitation Designers",
      "location": "Velachery, Chennai",
      "rating": 4.7,
      "reviews": 72,
      "startingPrice": 1200,
      "description": "Creative invitations for weddings and celebrations",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "inv006",
      "name": "Wedding Invite Co.",
      "category": "Invitation Designers",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 145,
      "startingPrice": 2500,
      "description": "Luxury wedding stationery and invitation suites",
      "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    },
    {
      "id": "inv007",
      "name": "Creative Cards Studio",
      "category": "Invitation Designers",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 81,
      "startingPrice": 1300,
      "description": "Personalized wedding and event invitations",
      "image": "https://images.unsplash.com/photo-1523438885200-e635ba2c371e"
    },
    {
      "id": "inv008",
      "name": "Royal Invitation House",
      "category": "Invitation Designers",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 63,
      "startingPrice": 900,
      "description": "Affordable traditional wedding invitations",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
    },
    {
      "id": "inv009",
      "name": "The Invite Boutique",
      "category": "Invitation Designers",
      "location": "Porur, Chennai",
      "rating": 4.9,
      "reviews": 107,
      "startingPrice": 2200,
      "description": "Luxury customized invitations and stationery",
      "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    },
    {
      "id": "inv010",
      "name": "Celebrate Invitations",
      "category": "Invitation Designers",
      "location": "Chromepet, Chennai",
      "rating": 4.8,
      "reviews": 76,
      "startingPrice": 1100,
      "description": "Digital and printed invitations for every occasion",
      "image": "https://images.unsplash.com/photo-1523438885200-e635ba2c371e"
    }
  ],
  "banner_designers": [
    {
      "id": "ban001",
      "name": "Banner Works",
      "category": "Banner Designers",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 98,
      "startingPrice": 800,
      "description": "Custom event banners and welcome boards",
      "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
    {
      "id": "ban002",
      "name": "Creative Banner Studio",
      "category": "Banner Designers",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 81,
      "startingPrice": 600,
      "description": "Professional banners for weddings and events",
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ban003",
      "name": "Event Print Hub",
      "category": "Banner Designers",
      "location": "Adyar, Chennai",
      "rating": 4.7,
      "reviews": 64,
      "startingPrice": 500,
      "description": "Event printing, banners and signage",
      "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
    {
      "id": "ban004",
      "name": "Grand Banner Designs",
      "category": "Banner Designers",
      "location": "Mylapore, Chennai",
      "rating": 4.9,
      "reviews": 112,
      "startingPrice": 900,
      "description": "Premium wedding and celebration banners",
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ban005",
      "name": "Pixel Banner Studio",
      "category": "Banner Designers",
      "location": "Velachery, Chennai",
      "rating": 4.8,
      "reviews": 73,
      "startingPrice": 700,
      "description": "Creative digital banner designs and printing",
      "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
    {
      "id": "ban006",
      "name": "Celebration Prints",
      "category": "Banner Designers",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 126,
      "startingPrice": 1000,
      "description": "Customized event banners and backdrops",
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ban007",
      "name": "Welcome Board Studio",
      "category": "Banner Designers",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 59,
      "startingPrice": 450,
      "description": "Wedding welcome boards and signage",
      "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
    {
      "id": "ban008",
      "name": "Event Graphics",
      "category": "Banner Designers",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 84,
      "startingPrice": 750,
      "description": "Professional event branding and banners",
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      "id": "ban009",
      "name": "Banner Craft",
      "category": "Banner Designers",
      "location": "Porur, Chennai",
      "rating": 4.7,
      "reviews": 68,
      "startingPrice": 550,
      "description": "Affordable custom banners for all occasions",
      "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
    {
      "id": "ban010",
      "name": "Print & Celebrate",
      "category": "Banner Designers",
      "location": "Chromepet, Chennai",
      "rating": 4.8,
      "reviews": 77,
      "startingPrice": 650,
      "description": "Complete event printing and banner solutions",
      "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    }
  ],
  "gifts_and_favors": [
    {
      "id": "gf001",
      "name": "Giftique Chennai",
      "category": "Gifts & Favors",
      "location": "T. Nagar, Chennai",
      "rating": 4.9,
      "reviews": 143,
      "startingPrice": 300,
      "description": "Curated wedding gifts and return favors",
      "image": "https://images.unsplash.com/photo-1512909006721-3d6018887383"
    },
    {
      "id": "gf002",
      "name": "The Gift Basket",
      "category": "Gifts & Favors",
      "location": "Anna Nagar, Chennai",
      "rating": 4.8,
      "reviews": 108,
      "startingPrice": 400,
      "description": "Premium gift hampers for weddings and celebrations",
      "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
    },
    {
      "id": "gf003",
      "name": "Return Gift House",
      "category": "Gifts & Favors",
      "location": "Mylapore, Chennai",
      "rating": 4.7,
      "reviews": 91,
      "startingPrice": 150,
      "description": "Affordable return gifts for every occasion",
      "image": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
    },
    {
      "id": "gf004",
      "name": "Elegant Favors",
      "category": "Gifts & Favors",
      "location": "Adyar, Chennai",
      "rating": 4.9,
      "reviews": 117,
      "startingPrice": 350,
      "description": "Elegant personalized wedding favors",
      "image": "https://images.unsplash.com/photo-1512909006721-3d6018887383"
    },
    {
      "id": "gf005",
      "name": "Personalized Gifts Studio",
      "category": "Gifts & Favors",
      "location": "Velachery, Chennai",
      "rating": 4.8,
      "reviews": 126,
      "startingPrice": 250,
      "description": "Customized gifts and personalized favors",
      "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
    },
    {
      "id": "gf006",
      "name": "Wedding Hamper Co.",
      "category": "Gifts & Favors",
      "location": "Nungambakkam, Chennai",
      "rating": 4.9,
      "reviews": 154,
      "startingPrice": 750,
      "description": "Luxury wedding hampers and curated gifts",
      "image": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
    },
    {
      "id": "gf007",
      "name": "Sweet Favors",
      "category": "Gifts & Favors",
      "location": "Tambaram, Chennai",
      "rating": 4.7,
      "reviews": 73,
      "startingPrice": 180,
      "description": "Sweet boxes and traditional return gifts",
      "image": "https://images.unsplash.com/photo-1512909006721-3d6018887383"
    },
    {
      "id": "gf008",
      "name": "Eco Gift Studio",
      "category": "Gifts & Favors",
      "location": "OMR, Chennai",
      "rating": 4.8,
      "reviews": 89,
      "startingPrice": 300,
      "description": "Eco-friendly gifts and sustainable event favors",
      "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
    },
    {
      "id": "gf009",
      "name": "Royal Return Gifts",
      "category": "Gifts & Favors",
      "location": "Porur, Chennai",
      "rating": 4.9,
      "reviews": 101,
      "startingPrice": 275,
      "description": "Traditional and premium return gifts",
      "image": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
    },
    {
      "id": "gf010",
      "name": "Celebrate Gifts",
      "category": "Gifts & Favors",
      "location": "Chromepet, Chennai",
      "rating": 4.8,
      "reviews": 82,
      "startingPrice": 200,
      "description": "Personalized gifts and favors for celebrations",
      "image": "https://images.unsplash.com/photo-1512909006721-3d6018887383"
    }
  ]
};

function mapItem(item: any, categorySlug: string, portfolioSet: string): Vendor {
  const price = item.startingPrice ?? item.pricePerPlate ?? 0;
  const area = item.location.split(",")[0].trim();
  const citySlug: CitySlug = "chennai";
  
  let services: string[] = [];
  let eventTypes: EventTypeSlug[] = [];
  let packageUnit = "event";
  
  if (categorySlug === "wedding-planners") {
    services = ["Full Planning", "Day-of Coordination", "Vendor Management", "Budgeting"];
    eventTypes = ["weddings", "engagements", "family-functions"];
    packageUnit = "wedding planning";
  } else if (categorySlug === "event-planners") {
    services = ["Corporate Events", "Theme Parties", "Product Launches", "Birthdays"];
    eventTypes = ["birthdays", "baby-showers", "private-parties", "office-parties"];
    packageUnit = "event planning";
  } else if (categorySlug === "decorators") {
    services = ["Stage Decor", "Entrance Setup", "Floral Arches", "Balloon Art"];
    eventTypes = ["weddings", "engagements", "birthdays", "family-functions"];
    packageUnit = "decor setup";
  } else if (categorySlug === "caterers") {
    services = ["South Indian Buffet", "North Indian Specialties", "Live Food counters", "Dessert stations"];
    eventTypes = ["weddings", "birthdays", "private-parties", "family-functions"];
    packageUnit = "per-plate catering";
  } else if (categorySlug === "bakers") {
    services = ["Custom Cakes", "Theme Cupcakes", "Dessert Tables", "Macarons"];
    eventTypes = ["weddings", "birthdays", "baby-showers", "private-parties"];
    packageUnit = "cake order";
  } else if (categorySlug === "specialty-food-vendors") {
    services = ["Live Counters", "Chaat Counters", "Unique Cuisines", "Special Food setups"];
    eventTypes = ["birthdays", "private-parties", "family-functions"];
    packageUnit = "specialty counter";
  } else if (categorySlug === "photographers") {
    services = ["Candid Photography", "Traditional Photography", "Portraits", "Event Albums"];
    eventTypes = ["weddings", "engagements", "birthdays", "family-functions"];
    packageUnit = "photography setup";
  } else if (categorySlug === "makeup-artists") {
    services = ["Bridal Makeup", "Party Makeup", "Styling & Hair", "Saree Draping"];
    eventTypes = ["weddings", "engagements", "family-functions"];
    packageUnit = "makeup session";
  } else if (categorySlug === "mehendi-artists") {
    services = ["Bridal Mehendi", "Arabic Designs", "Traditional patterns", "Guest henna stations"];
    eventTypes = ["weddings", "engagements", "family-functions"];
    packageUnit = "henna session";
  } else if (categorySlug === "djs") {
    services = ["Live DJ sets", "Sound System", "Lighting setups", "Bollywood/Tamil mixes"];
    eventTypes = ["birthdays", "private-parties", "weddings", "office-parties"];
    packageUnit = "DJ performance";
  } else if (categorySlug === "bridal-wear") {
    services = ["Bridal Sarees", "Designer Lehengas", "Custom stitching", "Wedding outfits"];
    eventTypes = ["weddings", "engagements", "family-functions"];
    packageUnit = "bridal wear package";
  } else if (categorySlug === "groom-wear") {
    services = ["Sherwanis", "Suits & Tuxedos", "Traditional wear", "Custom tailoring"];
    eventTypes = ["weddings", "engagements", "family-functions"];
    packageUnit = "groom wear package";
  } else if (categorySlug === "invitation-designers") {
    services = ["Custom printed cards", "Digital invitations", "Animated e-invites", "Wedding stationery"];
    eventTypes = ["weddings", "engagements", "birthdays", "family-functions"];
    packageUnit = "invitation design";
  } else if (categorySlug === "banner-designers") {
    services = ["Custom event banners", "Welcome boards", "Backdrop prints", "Signages"];
    eventTypes = ["birthdays", "conferences", "weddings", "family-functions"];
    packageUnit = "banner design";
  } else if (categorySlug === "gifts") {
    services = ["Curated gift boxes", "Return favors", "Personalized gifts", "Hampers"];
    eventTypes = ["weddings", "birthdays", "baby-showers", "family-functions"];
    packageUnit = "gift order";
  }

  return {
    id: item.id,
    businessName: item.name,
    ownerName: "Manager",
    categorySlug,
    citySlug,
    address: item.location,
    tagline: `Professional ${categorySlug.replace("-", " ")} services in ${area}`,
    description: item.description ?? `${item.name} is a verified ${categorySlug.replace("-", " ")} based in ${item.location}, with a rating of ${item.rating} stars based on ${item.reviews} customer reviews.`,
    startingPrice: price,
    rating: item.rating,
    reviewCount: item.reviews,
    verified: true,
    premium: item.rating >= 4.8,
    coverImage: item.image,
    logoImage: item.image,
    portfolio: [item.image, item.image, item.image],
    services,
    packages: [
      {
        name: "Essential",
        price: price,
        features: [`Core ${packageUnit} package`, "Up to 4 hours", "1 coordinator on-site", "Standard add-ons available"],
      },
      {
        name: "Premium",
        price: Math.round(price * 1.8),
        features: [
          `Extended ${packageUnit} package`,
          "Up to 8 hours",
          "Dedicated team on-site",
          "Priority scheduling",
          "Complimentary consultation",
        ],
      },
      {
        name: "Luxe",
        price: Math.round(price * 3.2),
        features: [
          `Full-day ${packageUnit} package`,
          "Unlimited revisions",
          "Senior specialist assigned",
          "Premium materials & add-ons",
          "Post-event support",
        ],
      },
    ],
    eventTypes,
    yearsInBusiness: 6,
    responseTime: "Under 2 hours",
  };
}

export const newMappedVendors: Vendor[] = [
  ...rawData.wedding_planners.map(item => mapItem(item, "wedding-planners", "planning")),
  ...rawData.event_planners.map(item => mapItem(item, "event-planners", "planning")),
  ...rawData.decorators.map(item => mapItem(item, "decorators", "decor")),
  ...rawData.caterers.map(item => mapItem(item, "caterers", "food")),
  ...rawData.bakers.map(item => mapItem(item, "bakers", "food")),
  ...rawData.speciality_food_vendors.map(item => mapItem(item, "specialty-food-vendors", "food")),
  ...rawData.photographers.map(item => mapItem(item, "photographers", "photo")),
  ...rawData.makeup_artists.map(item => mapItem(item, "makeup-artists", "beauty")),
  ...rawData.mehendi_artists.map(item => mapItem(item, "mehendi-artists", "beauty")),
  ...rawData.djs.map(item => mapItem(item, "djs", "entertainment")),
  ...rawData.bridal_wear.map(item => mapItem(item, "bridal-wear", "beauty")),
  ...rawData.groom_wear.map(item => mapItem(item, "groom-wear", "beauty")),
  ...rawData.invitation_designers.map(item => mapItem(item, "invitation-designers", "design")),
  ...rawData.banner_designers.map(item => mapItem(item, "banner-designers", "design")),
  ...rawData.gifts_and_favors.map(item => mapItem(item, "gifts", "design")),
];
