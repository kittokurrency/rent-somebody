import { TaskItem, ProviderItem, RoadshowScenario, ChatMessage } from '../types';

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: '🌿 Quest: Water 16 Rare Monsteras & Orchids (Plant Caretaker)',
    category: 'plants',
    categoryLabel: 'Plant Caretaker',
    description: 'Going on an away quest for 4 days! Need a skilled Plant Druid who understands soil moisture meters and humidity foliage misting.',
    budget: 45,
    xpReward: 180,
    estimatedHours: 1.5,
    location: 'Upper West Side, Manhattan',
    distance: '0.8 mi away',
    urgency: 'today',
    postedBy: {
      name: 'Clara Chen',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Clara&backgroundColor=b6e3f4,c0aede,ffd5dc',
      rating: 4.95,
      tasksPosted: 14,
      playerLevel: 12,
    },
    bidsCount: 4,
    status: 'open',
    zeroCommissionNotice: true,
    createdAt: '18m ago',
  },
  {
    id: 'task-2',
    title: '🔨 Quest: Assemble Heavy 6-Drawer Dresser & Clean Boxes',
    category: 'assembly',
    categoryLabel: 'Furniture Assembly',
    description: 'Boxes delivered this morning! Need an Assembly Warrior with power screwdriver to build it solidly and crush cardboard recycling.',
    budget: 75,
    xpReward: 320,
    estimatedHours: 2.0,
    location: 'Williamsburg, Brooklyn',
    distance: '1.4 mi away',
    urgency: 'urgent',
    postedBy: {
      name: 'Marcus Vance',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Marcus&backgroundColor=d1d4f9,ffd5dc',
      rating: 5.0,
      tasksPosted: 6,
      playerLevel: 9,
    },
    bidsCount: 7,
    status: 'open',
    zeroCommissionNotice: true,
    createdAt: '35m ago',
  },
  {
    id: 'task-3',
    title: '🍎 Quest: Whole Foods Grocery Run & Fridge Restock',
    category: 'errands',
    categoryLabel: 'Grocery & Errands',
    description: 'Grocery checklist loaded in app! Collect fresh organic produce, deliver to 4th floor walk-up and arrange into fridge.',
    budget: 40,
    xpReward: 150,
    estimatedHours: 1.0,
    location: 'Midtown East, NY',
    distance: '2.1 mi away',
    urgency: 'today',
    postedBy: {
      name: 'Elena Rostova',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Elena&backgroundColor=b6e3f4,ffdfbf',
      rating: 4.88,
      tasksPosted: 22,
      playerLevel: 19,
    },
    bidsCount: 3,
    status: 'open',
    zeroCommissionNotice: true,
    createdAt: '1h ago',
  },
  {
    id: 'task-4',
    title: '🥐 Quest: Stand in Line for Supreme Bakery Drop (Levain & Croissant)',
    category: 'queuing',
    categoryLabel: 'Queue & Line Proxy',
    description: 'Need a patient Line Guard to hold queue position for 50 mins. Pastry purchase will be 100% reimbursed instantly via smart escrow.',
    budget: 50,
    xpReward: 200,
    estimatedHours: 1.5,
    location: 'SoHo, Broadway',
    distance: '0.5 mi away',
    urgency: 'flexible',
    postedBy: {
      name: 'David Kim',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=David&backgroundColor=ffd5dc,d1d4f9',
      rating: 4.9,
      tasksPosted: 9,
      playerLevel: 14,
    },
    bidsCount: 5,
    status: 'open',
    zeroCommissionNotice: true,
    createdAt: '2h ago',
  },
  {
    id: 'task-5',
    title: '📦 Quest: Help Move 8 Heavy Boxes Down to Van',
    category: 'moving',
    categoryLabel: 'Heavy Lifting & Move',
    description: 'Moving boxes sealed and labeled. Need extra muscle and stamina to load building elevator and downstairs van.',
    budget: 65,
    xpReward: 260,
    estimatedHours: 1.5,
    location: 'Astoria, Queens',
    distance: '3.0 mi away',
    urgency: 'flexible',
    postedBy: {
      name: 'Sarah Jenkins',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah&backgroundColor=c0aede,b6e3f4',
      rating: 4.97,
      tasksPosted: 18,
      playerLevel: 16,
    },
    bidsCount: 6,
    status: 'open',
    zeroCommissionNotice: true,
    createdAt: '3h ago',
  },
  {
    id: 'task-6',
    title: '✨ Quest: Deep Scrub Range Hood, Oven & Kitchen Backsplash',
    category: 'cleaning',
    categoryLabel: 'Deep Cleaning',
    description: 'Post-dinner party grease cleanup. Supplies provided or bring your favorite tools. Sparkly clean finish wanted!',
    budget: 85,
    xpReward: 350,
    estimatedHours: 2.5,
    location: 'Gramercy Park, NY',
    distance: '1.2 mi away',
    urgency: 'today',
    postedBy: {
      name: 'Oliver Thorne',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Oliver&backgroundColor=ffdfbf,ffd5dc',
      rating: 4.92,
      tasksPosted: 4,
      playerLevel: 8,
    },
    bidsCount: 8,
    status: 'open',
    zeroCommissionNotice: true,
    createdAt: '4h ago',
  }
];

export const TOP_PROVIDERS: ProviderItem[] = [
  {
    id: 'prov-1',
    name: 'Julian Vance',
    handle: '@julian_cares',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JulianHero&backgroundColor=b6e3f4,ffd5dc',
    roleTitle: 'Master Plant Druid & Senior Caretaker',
    heroClass: 'Botanical Druid',
    playerLevel: 48,
    rank: 1,
    rating: 5.0,
    reviewsCount: 312,
    hourlyRate: 35,
    completedTasks: 428,
    onTimeRate: 99.8,
    badges: ['🥇 Server #1 Hero', '🌿 Botanical Legend', '🔑 Master Keyholder'],
    specialties: ['Plant Care & Revival', 'Pet Sitting', 'Home Check-ins', 'Delicate Errands'],
    equipment: ['🌱 Golden Moisture Meter', '💧 Cloud Mister', '🎒 Herbology Satchel'],
    bio: 'Former botanical garden associate. Keeps tropical monstera foliage lush, hydrates roots properly, and treats your apartment with legendary care.',
    verifiedIdentity: true,
    isVipExclusive: true,
  },
  {
    id: 'prov-2',
    name: 'Maya Lin',
    handle: '@mayal_organize',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=MayaHero&backgroundColor=d1d4f9,c0aede',
    roleTitle: 'Speed Furniture Alchemist & Closet Architect',
    heroClass: 'Crafting Alchemist',
    playerLevel: 42,
    rank: 2,
    rating: 4.98,
    reviewsCount: 247,
    hourlyRate: 32,
    completedTasks: 356,
    onTimeRate: 99.5,
    badges: ['⚡ Sonic Speed Builder', '🛡️ Zero Damage Record', '📐 Precision Pro'],
    specialties: ['IKEA Speed Assembly', 'Deep Decluttering', 'Express Errand Runs'],
    equipment: ['⚡ 18V Impact Driver +3', '📏 Laser Level', '📦 Box Slicer Pro'],
    bio: 'Turns chaotic flatpack boxes into pristine furniture in record time. Over 350+ assemblies without a single missing dowel or scratched surface.',
    verifiedIdentity: true,
    isVipExclusive: true,
  },
  {
    id: 'prov-3',
    name: 'Darius Cole',
    handle: '@darius_heavy',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DariusHero&backgroundColor=ffdfbf,ffd5dc',
    roleTitle: 'Titan Mover & Logistics Paladin',
    heroClass: 'Atlas Paladin',
    playerLevel: 39,
    rank: 3,
    rating: 4.97,
    reviewsCount: 189,
    hourlyRate: 38,
    completedTasks: 270,
    onTimeRate: 99.1,
    badges: ['🏋️‍♂️ High Stamina', '🛞 Heavy Dolly Equipped', '🛡️ Doorway Guard'],
    specialties: ['Heavy Box Moving', 'Appliance Hauling', 'Hardware Assembly'],
    equipment: ['🛞 500lb Convertible Hand Truck', '🧤 Grip Gauntlets', '🧱 Corner Protectors'],
    bio: 'Equipped with heavy-duty lifting straps and convertible dolly. Fast, polite, and treats wood floors like glass.',
    verifiedIdentity: true,
    isVipExclusive: true,
  },
  {
    id: 'prov-4',
    name: 'Sophie Moreau',
    handle: '@sophie_errands',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SophieHero&backgroundColor=b6e3f4,c0aede',
    roleTitle: 'VIP Concierge & Queue Ranger',
    heroClass: 'Swift Courier',
    playerLevel: 34,
    rank: 4,
    rating: 4.96,
    reviewsCount: 164,
    hourlyRate: 30,
    completedTasks: 215,
    onTimeRate: 98.9,
    badges: ['🏃‍♀️ Swift Scout', '🥐 Bakery Snatcher', '📱 Instant Responder'],
    specialties: ['Queue Sitting', 'Boutique Shopping', 'Event Stand-In'],
    equipment: ['🪑 Ultra-light Camp Chair', '⚡ Powerbank 20,000mAh', '☂️ Stormproof Umbrella'],
    bio: 'Master of lines and boutique drops. Knows the secret schedules across SoHo and Brooklyn.',
    verifiedIdentity: true,
    isVipExclusive: false,
  },
  {
    id: 'prov-5',
    name: 'Leo Thorne',
    handle: '@leofixes',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=LeoHero&backgroundColor=d1d4f9,ffdfbf',
    roleTitle: 'Smart Home Wizard & Cable Mage',
    heroClass: 'Cyber Wizard',
    playerLevel: 31,
    rank: 5,
    rating: 4.94,
    reviewsCount: 142,
    hourlyRate: 40,
    completedTasks: 198,
    onTimeRate: 98.4,
    badges: ['🧙‍♂️ Wi-Fi Wizard', '📡 Signal Booster', '📺 TV Wall Master'],
    specialties: ['Mesh Wi-Fi Setup', 'TV Wall Mounting', 'Smart Lock Installation'],
    equipment: ['📡 Wi-Fi Analyzer Kit', '🔌 Stud Finder Deluxe', '🧰 Precision Screwdriver Set'],
    bio: 'Software engineer by day, home gadget fixer on weekends. Can configure smart locks and tame unruly wires.',
    verifiedIdentity: true,
    isVipExclusive: false,
  }
];

export const ROADSHOW_SCENARIOS: RoadshowScenario[] = [
  {
    id: 'scenario-plant-care',
    title: '🌿 Episode 1: The Panic Flight & Plant Rescue',
    subtitle: 'From weekend catastrophe to peaceful vacation in 3 minutes!',
    persona: 'Clara (Busy Designer & Ficus Parent)',
    tagline: 'Make your to-do lists disappear quicker, by asking someone else to do it for you',
    duration: '2 hours total mission',
    timeSaved: '⏱️ Saved 3 Hours & Rescued $400 in Tropical Plants!',
    steps: [
      {
        stage: 'Stage 1: The Boss Battle (Panic)',
        actor: 'Clara (Quest Giver)',
        action: 'Flight boards in 2 hours! 16 delicate Monsteras are drying up in summer heat.',
        dialogue: '"Oh no! If I fly away for 5 days without watering, my rare Monsteras will perish! Help!"',
        visualIcon: 'AlertTriangle'
      },
      {
        stage: 'Stage 2: Broadcast Quest Bounty',
        actor: 'Clara via Rent-Somebody',
        action: 'Flashes phone, snaps photo of plant shelf. Sets bounty to $45 gold + 180 XP. 0% platform fee!',
        dialogue: '"Bounty Posted: Need Plant Druid this afternoon! Keys in smart lockbox."',
        visualIcon: 'Send'
      },
      {
        stage: 'Stage 3: Hero Summoned!',
        actor: 'Julian Vance (Rank #1 Druid)',
        action: 'Julian, 0.6 miles away, accepts the quest card instantly with a triumphant chime!',
        dialogue: '"Quest accepted! I have my moisture probe and humidity mister ready. Arriving in 10 mins!"',
        visualIcon: 'CheckCircle2'
      },
      {
        stage: 'Stage 4: Live Quest Execution',
        actor: 'Julian (Hero on Site)',
        action: 'Enters via lockbox, tests soil moisture, mists leaves, sends timestamped verification photo.',
        dialogue: '"All 16 plants watered with organic drops! Soil reading perfect 65% moisture."',
        visualIcon: 'Camera'
      },
      {
        stage: 'Stage 5: Quest Victory & Loot Drop',
        actor: 'Clara & Julian',
        action: 'Clara approves proof with 1 tap at the gate. Escrow $45 releases with celebratory confetti!',
        dialogue: '"VICTORY! Gold transferred to Julian with 0% fee. 5 Stars + $10 Tip awarded!"',
        visualIcon: 'Sparkles'
      }
    ]
  },
  {
    id: 'scenario-dresser-assembly',
    title: '🔨 Episode 2: The IKEA Flatpack Dungeon',
    subtitle: 'Turn a 4-hour weekend nightmare into an effortless coffee break!',
    persona: 'Marcus (Financial Analyst & Non-Handy Buyer)',
    tagline: 'People who want to spend money meet people who got time',
    duration: '1.5 hours completion',
    timeSaved: '⏱️ Saved 4.5 Hours of Frustrating Labor!',
    steps: [
      {
        stage: 'Stage 1: The Nightmare Boxes',
        actor: 'Marcus (Quest Giver)',
        action: 'Stares at 3 giant flat-pack boxes, 140 screws, and a 42-page manual on sunny Saturday.',
        dialogue: '"I just want to play games and drink coffee, not fight 140 tiny screws with an Allen key!"',
        visualIcon: 'Clock'
      },
      {
        stage: 'Stage 2: Post Assembly Bounty',
        actor: 'Marcus',
        action: 'Selects "Furniture Assembly", offers $75 gold + 320 XP. Free trial 0% fee activated.',
        dialogue: '"Posting assembly bounty! Power tools preferred for high speed."',
        visualIcon: 'Wrench'
      },
      {
        stage: 'Stage 3: Pro Alchemist Claims It',
        actor: 'Maya Lin (Rank #2 Alchemist)',
        action: 'Maya uses her 18V impact driver. Claims the bounty in 45 seconds.',
        dialogue: '"Accepted! Built this exact dresser 12 times. On my way with impact drill!"',
        visualIcon: 'Zap'
      },
      {
        stage: 'Stage 4: Speed Crafting',
        actor: 'Maya',
        action: 'Builds all 6 drawers in 70 mins, levels rails smoothly, bundles flat cardboard neatly.',
        dialogue: '"All complete! Dresser leveled and wall safety anchor secured."',
        visualIcon: 'CheckCircle2'
      },
      {
        stage: 'Stage 5: Double Thumbs Up!',
        actor: 'Marcus & Maya',
        action: 'Marcus returns from cafe to a spotless bedroom and showroom-ready dresser.',
        dialogue: '"Level complete! Best $75 I ever spent in this game!"',
        visualIcon: 'ThumbsUp'
      }
    ]
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'system',
    senderName: '🛡️ Rent-Somebody Escrow Vault',
    text: '🪙 Quest Escrow locked: $45.00 safe in vault. 0% platform fee applied (Free Trial Promo)!',
    timestamp: '2:15 PM',
  },
  {
    id: 'msg-2',
    sender: 'buyer',
    senderName: 'Clara Chen (Lvl 12)',
    text: 'Hi Julian! Thank you so much for taking my quest! Lockbox code is 4821#. The watering can and plant vitamins are right under the kitchen sink 🌱',
    timestamp: '2:16 PM',
  },
  {
    id: 'msg-3',
    sender: 'seller',
    senderName: 'Julian Vance (Rank #1 Druid)',
    text: 'Quest accepted Clara! Unlocked the door safely. I have my calibrated moisture probe to test soil hydration first 💧',
    timestamp: '2:22 PM',
  },
  {
    id: 'msg-4',
    sender: 'seller',
    senderName: 'Julian Vance (Rank #1 Druid)',
    text: 'Done with all 16 Monsteras and the Ficus Lyrata! They were definitely thirsty! Here is the photo proof for quest clearance 📸',
    timestamp: '2:40 PM',
    attachmentUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop&q=80',
    attachmentCaption: '✨ 16 Plants Watered, Misted & Dusted'
  },
  {
    id: 'msg-5',
    sender: 'buyer',
    senderName: 'Clara Chen (Lvl 12)',
    text: 'OMG they look so lush and green! You are a hero Julian! Releasing escrow gold and awarding you a big tip right now! ⭐⭐⭐⭐⭐',
    timestamp: '2:42 PM',
  }
];

export const AI_FAQS = [
  {
    q: 'How does the Free Trial with 0% commissions work?',
    a: 'During the trial event, 0% platform loot tax is deducted! Quest Givers pay exact chore price, and Task Heroes keep 100% of gold earned.'
  },
  {
    q: 'How does the Paywalled Leaderboard ranking work?',
    a: 'Our Pro Hall of Heroes ranks top 1% vetted players who maintain >99% on-time records and pass identity quests. Subscribers unlock instant 1-click hire!'
  },
  {
    q: 'How are payments protected between buyers and sellers?',
    a: 'Every quest uses Rent-Somebody Smart Escrow Vault. Gold is held safely until photo proof is submitted and approved.'
  },
  {
    q: 'What kind of chores can I delegate or earn money from?',
    a: 'Plant watering & tree care, furniture assembly, line holding, grocery delivery, dog walking, heavy lifting, closet organization, and tech wizardry!'
  },
  {
    q: 'Can I switch between Quest Giver and Task Hero?',
    a: 'Yes! Toggle your hero class between "Spend $ (Quest Giver)" and "Got Time (Task Hero)" in 1 tap from the top bar!'
  }
];
