import { ServiceCategory, Technician, Tutorial, StateLgaData, Conversation, ChatMessage, JobRequest } from '../types';

export const NIGERIAN_STATES: StateLgaData[] = [
  {
    state: 'Lagos',
    lgas: ['Ikeja', 'Eti-Osa (Lekki / VI)', 'Surulere', 'Lagos Mainland (Yaba)', 'Alimosho', 'Oshodi-Isolo', 'Kosofe (Ojota/Ketu)', 'Ikorodu', 'Agege', 'Apapa']
  },
  {
    state: 'Abuja (FCT)',
    lgas: ['Abuja Municipal (AMAC)', 'Garki', 'Wuse', 'Maitama', 'Asokoro', 'Bwari', 'Gwagwalada', 'Kubwa', 'Lugbe']
  },
  {
    state: 'Rivers',
    lgas: ['Port Harcourt City', 'Obio-Akpor', 'Eleme', 'Ikwerre', 'Oyigbo', 'Bonny']
  },
  {
    state: 'Oyo',
    lgas: ['Ibadan North (Bodija/Agodi)', 'Ibadan South-West (Ring Road)', 'Ibadan North-East', 'Oluyole', 'Oyo East', 'Ogbomoso North']
  },
  {
    state: 'Kano',
    lgas: ['Kano Municipal', 'Fagge', 'Nasarawa', 'Dala', 'Tarauni', 'Gwale']
  },
  {
    state: 'Enugu',
    lgas: ['Enugu North (Independence Layout)', 'Enugu South', 'Enugu East', 'Nsukka', 'Udi']
  },
  {
    state: 'Ogun',
    lgas: ['Abeokuta South', 'Abeokuta North', 'Ado-Odo/Ota', 'Sagamu', 'Ijebu Ode', 'Mowe/Ibafo']
  },
  {
    state: 'Delta',
    lgas: ['Warri South', 'Uvwie (Effurun)', 'Oshimili South (Asaba)', 'Sapele', 'Ughelli North']
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'phone-repair',
    name: 'Phone Repair',
    slug: 'phone-repair',
    description: 'Screen replacement, battery diagnosis, charging port soldering & board level diagnostics.',
    iconName: 'Smartphone',
    technician_count: 342,
    starting_price_naira: 5000,
    popular_issues: ['Broken Screen', 'Battery Drain', 'FaceID Repair', 'Water Damage']
  },
  {
    id: 'computer-repair',
    name: 'Computer Repair',
    slug: 'computer-repair',
    description: 'MacBook logic board repair, laptop screen fixes, OS recovery, and thermal paste upgrades.',
    iconName: 'Laptop',
    technician_count: 284,
    starting_price_naira: 8000,
    popular_issues: ['No Display', 'Keyboard Not Responding', 'Overheating Fan', 'Storage Upgrade']
  },
  {
    id: 'electrical-services',
    name: 'Electrical Services',
    slug: 'electrical-services',
    description: 'Residential wiring, distribution board rewiring, surge protection, and prepaid meter faults.',
    iconName: 'Zap',
    technician_count: 410,
    starting_price_naira: 7000,
    popular_issues: ['Short Circuit', 'Breaker Tripping', 'Changeover Switch', 'Earthing Installation']
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    slug: 'plumbing',
    description: 'Borehole submersible pump repair, pipe leak detection, water heater & bathroom fittings.',
    iconName: 'Wrench',
    technician_count: 220,
    starting_price_naira: 6000,
    popular_issues: ['Pipe Burst', 'Low Pressure', 'Soakaway System', 'Water Heater Fault']
  },
  {
    id: 'generator-repair',
    name: 'Generator Repair',
    slug: 'generator-repair',
    description: 'Carburetor cleaning, diesel fuel injection, AVR calibration, and scheduled servicing.',
    iconName: 'Cpu',
    technician_count: 365,
    starting_price_naira: 6500,
    popular_issues: ['Hard Starting', 'Voltage Fluctuating', 'Smoky Exhaust', 'Automatic Changeover Failure']
  },
  {
    id: 'air-conditioning',
    name: 'Air Conditioning',
    slug: 'air-conditioning',
    description: 'Split unit gas refilling, compressor troubleshooting, cleaning, and refrigerant leak sealing.',
    iconName: 'Wind',
    technician_count: 295,
    starting_price_naira: 7500,
    popular_issues: ['Not Cooling', 'Water Leaking Inside', 'Compressor Buzzing', 'Gas Leakage']
  },
  {
    id: 'electronics-repair',
    name: 'Electronics Repair',
    slug: 'electronics-repair',
    description: 'Smart TV backlights, home theater audio amplifiers, microwave magnetrons, and power supplies.',
    iconName: 'Tv',
    technician_count: 198,
    starting_price_naira: 6000,
    popular_issues: ['Sound But No Picture', 'HDMI Port Burnt', 'Dead Power Supply', 'Display Lines']
  },
  {
    id: 'home-services',
    name: 'Home Services',
    slug: 'home-services',
    description: 'Inverter & solar installation, CCTV setup, smart door locks, and appliance maintenance.',
    iconName: 'Home',
    technician_count: 250,
    starting_price_naira: 10000,
    popular_issues: ['Battery Bank Balancing', 'Inverter Error Code', 'CCTV Offline', 'Solar Panel Cleaning']
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    user_id: 'user-tech-1',
    full_name: 'Emeka Okafor',
    title: 'Certified Generator & Solar Inverter Engineer',
    category: 'Generator Repair',
    state: 'Lagos',
    lga: 'Ikeja',
    city: 'Opebi / Allen',
    rating: 4.95,
    reviews_count: 148,
    jobs_completed: 215,
    hourly_rate_naira: 7500,
    bio: 'Over 9 years of hands-on experience troubleshooting Mikano, Firman, Sumec, and Luminous solar hybrid setups. Certified with Federal Ministry of Labour trade test. Fast response across Ikeja, Maryland, and Victoria Island.',
    avatar_url: '/src/assets/images/technician_avatar_emeka_1794306643103.jpg',
    verified: true,
    phone: '+234 803 456 7890',
    available: true,
    skills: ['AVR Replacement', 'Diesel Fuel Injection', 'Carburetor Rebuild', 'Hybrid Inverter Sizing', 'Changeover Panels'],
    services: [
      { id: 's1', name: 'Comprehensive Generator Diagnostic & Minor Tune-up', price_naira: 8000, duration_estimate: '1.5 hrs' },
      { id: 's2', name: 'Carburetor Overhaul & Ultrasonic Cleaning', price_naira: 6500, duration_estimate: '1 hr' },
      { id: 's3', name: 'AVR & Alternator Coil Diagnostic', price_naira: 10000, duration_estimate: '2 hrs' },
      { id: 's4', name: 'Automatic Transfer Switch (ATS) Installation', price_naira: 25000, duration_estimate: '3.5 hrs' }
    ],
    verification_doc_status: 'verified',
    nin_verified: true,
    joined_date: 'March 2023'
  },
  {
    id: 'tech-2',
    user_id: 'user-tech-2',
    full_name: 'Amara Nwosu',
    title: 'Lead MacBook & Logic Board Specialist',
    category: 'Computer Repair',
    state: 'Lagos',
    lga: 'Lagos Mainland (Yaba)',
    city: 'Yaba / Sabo',
    rating: 4.92,
    reviews_count: 112,
    jobs_completed: 184,
    hourly_rate_naira: 9000,
    bio: 'Micro-soldering specialist focusing on Apple MacBooks, Lenovo ThinkPads, and Dell XPS systems. Expert in short-circuit detection on 3.3V/5V power rails, display flexgate repairs, and thermal engineering.',
    avatar_url: '/src/assets/images/technician_avatar_amara_1794306644639.jpg',
    verified: true,
    phone: '+234 812 345 6789',
    available: true,
    skills: ['Micro-soldering', 'Logic Board Schematics', 'MacBook Liquid Damage Treatment', 'Thermal Throttling Solutions'],
    services: [
      { id: 's5', name: 'Logic Board Short Circuit Diagnostic & Repair', price_naira: 22000, duration_estimate: '2 days' },
      { id: 's6', name: 'MacBook Ultrasonic Board Clean & Corrosion Removal', price_naira: 15000, duration_estimate: '24 hrs' },
      { id: 's7', name: 'Screen Assembly Replacement (OEM Spec)', price_naira: 18000, duration_estimate: '3 hrs' },
      { id: 's8', name: 'SSD Data Recovery from Damaged Mac', price_naira: 30000, duration_estimate: '2 days' }
    ],
    verification_doc_status: 'verified',
    nin_verified: true,
    joined_date: 'January 2023'
  },
  {
    id: 'tech-3',
    user_id: 'user-tech-3',
    full_name: 'Engr. Tunde Balogun',
    title: 'Master Residential & Industrial Electrician',
    category: 'Electrical Services',
    state: 'Lagos',
    lga: 'Eti-Osa (Lekki / VI)',
    city: 'Lekki Phase 1',
    rating: 4.88,
    reviews_count: 94,
    jobs_completed: 130,
    hourly_rate_naira: 8500,
    bio: 'COREN registered electrical engineer handling residential distribution boards, heavy industrial phase balance, surge diversion, and conduit piping for homes and commercial buildings.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    verified: true,
    phone: '+234 802 888 1234',
    available: true,
    skills: ['Distribution Board Wiring', 'Surge Arrestors', 'Three-Phase Balancing', 'Earthing Pit Resistance Testing'],
    services: [
      { id: 's9', name: 'Electrical Fault Tracing & Earthing Check', price_naira: 12000, duration_estimate: '2 hrs' },
      { id: 's10', name: 'Distribution Board Reconfiguration', price_naira: 28000, duration_estimate: '4 hrs' },
      { id: 's11', name: 'Whole-house Surge Protection Device Setup', price_naira: 20000, duration_estimate: '2.5 hrs' }
    ],
    verification_doc_status: 'verified',
    nin_verified: true,
    joined_date: 'June 2023'
  },
  {
    id: 'tech-4',
    user_id: 'user-tech-4',
    full_name: 'Ibrahim Garba',
    title: 'HVAC & Inverter Air Conditioner Technician',
    category: 'Air Conditioning',
    state: 'Abuja (FCT)',
    lga: 'Abuja Municipal (AMAC)',
    city: 'Wuse 2 & Maitama',
    rating: 4.90,
    reviews_count: 86,
    jobs_completed: 120,
    hourly_rate_naira: 7000,
    bio: 'HVAC technician specializing in modern DC Inverter split systems (Panasonic, Daikin, LG, Gree). Precision nitrogen pressure testing and vacuum-pump refrigerant recharge.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    verified: true,
    phone: '+234 809 777 5544',
    available: false,
    skills: ['R410A & R32 Refrigerant Sourcing', 'Electronic Expansion Valve Testing', 'Condenser Coil Acid Cleansing'],
    services: [
      { id: 's12', name: 'Chemical Coil Wash & Deep Service', price_naira: 8500, duration_estimate: '1 hr' },
      { id: 's13', name: 'Nitrogen Leak Test & Gas Refill (R410a/R32)', price_naira: 18000, duration_estimate: '2 hrs' },
      { id: 's14', name: 'Inverter PCB Board Repair', price_naira: 24000, duration_estimate: '24 hrs' }
    ],
    verification_doc_status: 'verified',
    nin_verified: true,
    joined_date: 'August 2023'
  },
  {
    id: 'tech-5',
    user_id: 'user-tech-5',
    full_name: 'Chidinma Eze',
    title: 'iPhone & Android Board Level Specialist',
    category: 'Phone Repair',
    state: 'Lagos',
    lga: 'Ikeja',
    city: 'Computer Village / Medical Road',
    rating: 4.96,
    reviews_count: 220,
    jobs_completed: 310,
    hourly_rate_naira: 6500,
    bio: '10 years located in Computer Village Ikeja. Renowned for micro-jumping traces, IC reballing (Baseband, Audio IC, Tristar), and genuine OLED screen restorations with TrueTone retention.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    verified: true,
    phone: '+234 818 999 4321',
    available: true,
    skills: ['BGA Reballing', 'Short Detection via Thermal Camera', 'Flex Cable Laser Bonding', 'TrueTone Programming'],
    services: [
      { id: 's15', name: 'Charging Port & Tristar IC Repair', price_naira: 14000, duration_estimate: '3 hrs' },
      { id: 's16', name: 'Original Screen Replacement with Calibration', price_naira: 15000, duration_estimate: '1 hr' },
      { id: 's17', name: 'Audio IC / Speaker Line Jumper Repair', price_naira: 12000, duration_estimate: '2 hrs' }
    ],
    verification_doc_status: 'verified',
    nin_verified: true,
    joined_date: 'November 2022'
  },
  {
    id: 'tech-6',
    user_id: 'user-tech-6',
    full_name: 'Musa Aliyu',
    title: 'Plumbing & Borehole Pumping Systems Expert',
    category: 'Plumbing',
    state: 'Rivers',
    lga: 'Port Harcourt City',
    city: 'GRA Phase 2',
    rating: 4.85,
    reviews_count: 67,
    jobs_completed: 89,
    hourly_rate_naira: 6000,
    bio: 'Specialist in deep well submersible water pumps, Italian DAB automated pressure boosters, PPR pipe fusion welding, and leak detection with acoustic sounders.',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    verified: true,
    phone: '+234 805 112 3344',
    available: true,
    skills: ['Submersible Pump Retrieval', 'Pressure Control Switch Calibration', 'PPR Pipe Fusion', 'Water Filtration Setup'],
    services: [
      { id: 's18', name: 'Borehole Control Box & Capacitor Replacement', price_naira: 9500, duration_estimate: '1.5 hrs' },
      { id: 's19', name: 'Water Pressure Booster Pump Installation', price_naira: 22000, duration_estimate: '3 hrs' },
      { id: 's20', name: 'Underground Concealed Pipe Leak Detection', price_naira: 16000, duration_estimate: '2.5 hrs' }
    ],
    verification_doc_status: 'verified',
    nin_verified: true,
    joined_date: 'February 2024'
  }
];

export const INITIAL_TUTORIALS: Tutorial[] = [
  {
    id: 'tut-1',
    title: 'Diagnosing Why Your Generator Won’t Start: 5-Step Ignition & Carburetor Checklist',
    type: 'video',
    category: 'Generator Repair',
    read_time: '7 min watch',
    author: {
      id: 'tech-1',
      name: 'Emeka Okafor',
      title: 'Generator & Solar Specialist',
      avatar_url: '/src/assets/images/technician_avatar_emeka_1794306643103.jpg',
      verified: true
    },
    likes_count: 342,
    comments_count: 48,
    views_count: 4180,
    cover_image: '/src/assets/images/generator_solar_repair_1794306643540.jpg',
    excerpt: 'Before paying for unnecessary parts, follow this diagnostic sequence to test for spark plug carbon buildup, stale fuel, and needle valve blockage.',
    content: `When a generator cranks continuously without firing, over 80% of faults come down to three simple variables: air, spark, or fuel flow. In this practical tutorial, I break down the exact sequence you should follow before calling an engineer or replacing costly components.

Always ensure the generator is switched off and cool before starting any diagnostic checks. Have a dry rag, an 8mm/10mm spanner, and a spark plug wrench on hand.`,
    steps: [
      {
        step: 1,
        title: 'Inspect the Engine Oil Level Sensor',
        detail: 'Most modern generators (Firman, Tiger, Sumec) feature a low-oil shutoff switch. If oil is below the safe threshold or the wire has shorted against the casing, the spark plug will not generate current.',
        tip: 'Check with the dipstick on level ground. Top up with 20W-50 engine oil if dry.'
      },
      {
        step: 2,
        title: 'Check the Spark Plug for Carbon & Wet Gas',
        detail: 'Remove the plug cap and unscrew the spark plug. Hold the metal thread against the generator frame while pulling the recoil starter. Observe if a blue spark jumps the 0.7mm gap.',
        tip: 'A black wet plug indicates flooding. Clean with fine sandpaper and blow dry.'
      },
      {
        step: 3,
        title: 'Test Fuel Flow from Petcock to Carburetor Bowl',
        detail: 'Turn the fuel tap on and loosen the 10mm drain bolt at the base of the carburetor float bowl. Fresh gasoline should flow freely.',
        tip: 'If only droplets emerge, the in-tank filter screen is clogged with debris or water condensation.'
      },
      {
        step: 4,
        title: 'Clear the Pilot Jet and Idle Screw',
        detail: 'Unscrew the plastic throttle stop screw on top of the carburetor. Use a single copper wire strand from an electrical cable to gently clear the pilot jet hole.',
        tip: 'Never use hard steel pins or drill bits as they enlarge the precision orifice.'
      }
    ],
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    published_at: '2 days ago',
    comments: [
      {
        id: 'c1',
        user_name: 'Babajide Adeleke',
        content: 'Step 1 saved me today! My Firman was completely dead until I topped up the engine oil. Excellent guide Emeka!',
        created_at: 'Yesterday',
        likes: 12
      },
      {
        id: 'c2',
        user_name: 'Ngozi Okoli',
        content: 'Very clear explanation. Can you make a follow-up video on converting standard generators to LPG cooking gas?',
        created_at: '6 hours ago',
        likes: 5
      }
    ]
  },
  {
    id: 'tut-2',
    title: 'MacBook Liquid Spill First Aid: How to Prevent Permanent Logic Board Corrosion',
    type: 'article',
    category: 'Computer Repair',
    read_time: '5 min read',
    author: {
      id: 'tech-2',
      name: 'Amara Nwosu',
      title: 'Logic Board Engineer',
      avatar_url: '/src/assets/images/technician_avatar_amara_1794306644639.jpg',
      verified: true
    },
    likes_count: 289,
    comments_count: 34,
    views_count: 3620,
    cover_image: '/src/assets/images/hero_technician_repair_1794306643365.jpg',
    excerpt: 'Never put your laptop in a bag of rice. Learn why rice worsens electrochemical electrolysis and what you must immediately do within the first 60 seconds.',
    content: `Putting a liquid-damaged MacBook in rice is the single biggest mistake people make. Rice does not absorb moisture trapped under SMD microchips, but its powdery starch mixes with liquid to form an acidic paste that dissolves copper traces while the battery remains charged.

When liquid hits a live motherboard, electrolysis occurs instantly. The 12.6V battery rail starts eating away microscopic vias and chip legs. Here is the technician-approved emergency protocol.`,
    steps: [
      {
        step: 1,
        title: 'Force Immediate Power Shutdown',
        detail: 'Hold the power/Touch ID button down for at least 10 seconds until the screen and fans go completely dark. Do NOT try to safely save files.',
        tip: 'Every second the motherboard is powered accelerates trace oxidation.'
      },
      {
        step: 2,
        title: 'Disconnect Charging Cable Immediately',
        detail: 'Unplug the MagSafe or USB-C charger. Never connect power to test if "it still turns on". That test is usually what blows the power management IC.',
        tip: 'Keep chargers locked away until an ultrasonic bath has been completed.'
      },
      {
        step: 3,
        title: 'Tent the Laptop in a 90-Degree V-Shape',
        detail: 'Open the display to 90 degrees and place the laptop upside down on a dry towel like a tent roof. This prevents liquid pooling toward the motherboard logic board.',
        tip: 'Leave it in this position in a well-ventilated room with an air conditioner or fan running.'
      },
      {
        step: 4,
        title: 'Bring to a Board-Level Workshop with Ultrasonic Cleaning',
        detail: 'A certified technician must open the back cover, disconnect the battery connector, and wash the board in 99.9% Isopropyl Alcohol.',
        tip: 'FixNaija verified technicians can perform this decontamination on the same day.'
      }
    ],
    published_at: '4 days ago',
    comments: [
      {
        id: 'c3',
        user_name: 'Kunle Shonibare',
        content: 'I wish I saw this before using the rice myth last year! Great insights Amara.',
        created_at: '2 days ago',
        likes: 8
      }
    ]
  },
  {
    id: 'tut-3',
    title: 'Sizing Inverter Battery Banks for 24/7 Power in Nigeria (Without Overspending)',
    type: 'guide',
    category: 'Home Services',
    read_time: '8 min read',
    author: {
      id: 'tech-1',
      name: 'Emeka Okafor',
      title: 'Solar & Electrical Specialist',
      avatar_url: '/src/assets/images/technician_avatar_emeka_1794306643103.jpg',
      verified: true
    },
    likes_count: 512,
    comments_count: 73,
    views_count: 6890,
    cover_image: '/src/assets/images/generator_solar_repair_1794306643540.jpg',
    excerpt: 'Detailed comparison of Tubular Deep-Cycle Lead Acid vs Lithium Iron Phosphate (LiFePO4) batteries with actual Nigerian Naira cost per kilowatt-hour.',
    content: `With petrol prices fluctuating and power supply unpredictable, having the right inverter setup is essential for Nigerian households. However, many buyers fall victim to oversized inverters paired with under-capacity battery banks, destroying their batteries in under 12 months.

In this practical engineering breakdown, we walk through calculating your actual continuous wattage load and why Lithium Iron Phosphate (LiFePO4) is rapidly becoming more cost-effective than Tubular batteries over a 5-year cycle.`,
    steps: [
      {
        step: 1,
        title: 'Audit Your True Night-Time Running Load',
        detail: 'Separate essential loads (ceiling fans, LED bulbs, Wi-Fi router, laptops, TV) from inductive spike loads (refrigerators, water pumps, irons).',
        tip: 'A standard 3-bedroom flat typically needs only 400W–650W continuous nighttime power if energy-efficient bulbs are used.'
      },
      {
        step: 2,
        title: 'Calculate Required Amp-Hour Capacity at 24V or 48V',
        detail: 'Always prefer 24V or 48V architectures over 12V for installations above 1.5kVA. This cuts cable heating and amperage in half.',
        tip: 'Formula: (Daily Watt-hours) / (System Voltage x Depth of Discharge) = Required Ah capacity.'
      },
      {
        step: 3,
        title: 'Understand Depth of Discharge (DoD) Limits',
        detail: 'Tubular batteries can only be safely discharged to 50% without shortening their 2-year lifespan. Lithium LiFePO4 batteries can safely cycle to 85–90% DoD for 10 years.',
        tip: 'A single 5.12kWh 48V Lithium battery replaces four bulky 220Ah Tubular batteries in physical footprint.'
      }
    ],
    published_at: '1 week ago',
    comments: [
      {
        id: 'c4',
        user_name: 'Dr. Chimaobi Udoka',
        content: 'This formula broke down what three solar vendors could not explain to me. Hired Emeka through FixNaija last month and my system runs 24/7!',
        created_at: '3 days ago',
        likes: 19
      }
    ]
  },
  {
    id: 'tut-4',
    title: 'Why Your Split AC Blows Warm Air: How to Spot Refrigerant Leaks & Frozen Coils',
    type: 'guide',
    category: 'Air Conditioning',
    read_time: '6 min read',
    author: {
      id: 'tech-4',
      name: 'Ibrahim Garba',
      title: 'HVAC Specialist',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      verified: true
    },
    likes_count: 175,
    comments_count: 22,
    views_count: 2450,
    cover_image: '/src/assets/images/hero_technician_repair_1794306643365.jpg',
    excerpt: 'Technicians often just add gas without fixing the flare nut leak. Here is how to verify if you have an active copper joint pinhole.',
    content: `Air conditioners operate in a sealed closed loop. Refrigerant gas never "burns off" or "gets used up". If your AC is low on gas, it has a physical leak that must be brazed or tightened before refilling.`,
    steps: [
      {
        step: 1,
        title: 'Check the Indoor Filter for Airflow Starvation',
        detail: 'Pop open the front plastic visor. If the dust mesh is thick with grime, airflow drops and causes the evaporator coil to freeze into a block of ice.',
        tip: 'Wash the plastic filters under running tap water every 3 weeks.'
      },
      {
        step: 2,
        title: 'Inspect the Outdoor Brass Flare Joints for Oil Stains',
        detail: 'Refrigerant carries compressor lubricating oil. Where gas escapes, an oily dirt patch forms around the brass nuts on the outdoor unit.',
        tip: 'Use soapy water with a sponge. Bubbles confirm an active leak.'
      }
    ],
    published_at: '2 weeks ago',
    comments: []
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant_id: 'tech-1',
    participant_name: 'Emeka Okafor',
    participant_title: 'Generator & Solar Specialist',
    participant_avatar: '/src/assets/images/technician_avatar_emeka_1794306643103.jpg',
    category: 'Generator Repair',
    last_message: 'Good day! I have genuine Mikano AVRs in stock. I can inspect your generator by 2:00 PM in Ikeja.',
    last_message_time: '10:42 AM',
    unread_count: 1,
    is_online: true
  },
  {
    id: 'conv-2',
    participant_id: 'tech-2',
    participant_name: 'Amara Nwosu',
    participant_title: 'MacBook Logic Board Specialist',
    participant_avatar: '/src/assets/images/technician_avatar_amara_1794306644639.jpg',
    category: 'Computer Repair',
    last_message: 'Please do not try powering it on again. Bring it to our Sabo workshop so we can ultrasonic bath the board.',
    last_message_time: 'Yesterday',
    unread_count: 0,
    is_online: true
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm1',
      conversation_id: 'conv-1',
      sender_id: 'user-current',
      sender_name: 'You',
      recipient_id: 'tech-1',
      content: 'Hello Engr. Emeka, my 8.5kVA generator cranks but the voltage meter is fluctuating between 140V and 260V. Can you come check it today?',
      timestamp: '10:35 AM',
      status: 'read'
    },
    {
      id: 'm2',
      conversation_id: 'conv-1',
      sender_id: 'tech-1',
      sender_name: 'Emeka Okafor',
      recipient_id: 'user-current',
      content: 'Good day! That sounds like an AVR voltage regulator failure or a loose carbon brush in the alternator assembly.',
      timestamp: '10:39 AM',
      status: 'read'
    },
    {
      id: 'm3',
      conversation_id: 'conv-1',
      sender_id: 'tech-1',
      sender_name: 'Emeka Okafor',
      recipient_id: 'user-current',
      content: 'Good day! I have genuine Mikano AVRs in stock. I can inspect your generator by 2:00 PM in Ikeja.',
      timestamp: '10:42 AM',
      status: 'delivered'
    }
  ],
  'conv-2': [
    {
      id: 'm4',
      conversation_id: 'conv-2',
      sender_id: 'user-current',
      sender_name: 'You',
      recipient_id: 'tech-2',
      content: 'Hi Amara, some water spilled near my M1 MacBook Air trackpad 30 minutes ago. What should I do?',
      timestamp: 'Yesterday 3:15 PM',
      status: 'read'
    },
    {
      id: 'm5',
      conversation_id: 'conv-2',
      sender_id: 'tech-2',
      sender_name: 'Amara Nwosu',
      recipient_id: 'user-current',
      content: 'Please do not try powering it on again. Bring it to our Sabo workshop so we can ultrasonic bath the board.',
      timestamp: 'Yesterday 3:20 PM',
      status: 'read'
    }
  ]
};

export const INITIAL_JOB_REQUESTS: JobRequest[] = [
  {
    id: 'job-101',
    hirer_id: 'user-hirer-1',
    hirer_name: 'Olumide Bakare',
    hirer_phone: '+234 803 111 2233',
    technician_id: 'tech-1',
    technician_name: 'Emeka Okafor',
    category: 'Generator Repair',
    service_title: 'Firman 6500 AVR Replacement & Carburetor Tune-up',
    description: 'Generator stalls under load when air conditioner turns on. Voltage dips heavily.',
    state: 'Lagos',
    lga: 'Ikeja',
    address: '14 Toyin Street, Ikeja',
    budget_naira: 15000,
    status: 'pending',
    created_at: 'Today, 9:15 AM',
    preferred_date: 'Tomorrow morning'
  },
  {
    id: 'job-102',
    hirer_id: 'user-hirer-2',
    hirer_name: 'Blessing Daniel',
    hirer_phone: '+234 814 555 7788',
    technician_id: 'tech-1',
    technician_name: 'Emeka Okafor',
    category: 'Generator Repair',
    service_title: 'Diesel Generator Scheduled 250-Hour Oil & Filter Service',
    description: 'Change oil filter, fuel separator filter, and clean air element.',
    state: 'Lagos',
    lga: 'Eti-Osa (Lekki / VI)',
    address: 'Admiralty Way, Lekki Phase 1',
    budget_naira: 35000,
    status: 'accepted',
    created_at: 'Yesterday',
    preferred_date: 'Thursday'
  }
];
