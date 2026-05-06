/**
 * Central Data Store for KitCycle Items
 */
window.KitCycleData = {
    items: [
        {
            id: 'camera',
            name: 'Canon EOS 90D DSLR',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 250,
            hourlyPrice: 40,
            weeklyPrice: 1500,
            monthlyPrice: 5000,
            location: 'Engineering Lobby',
            rating: 4.9,
            rentals: 12,
            lender: 'Maria Santos',
            lenderPic: '../../images/maria_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 2,
            description: 'Professional DSLR camera perfect for photography projects, events, or student portfolios.',
            included: ['32.5 Megapixel CMOS sensor', '4K video recording', '18-55mm kit lens included'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/canon_dslr_90d.png',
            galleryImages: [
                '../../images/canon_dslr_90d.png', // Front View
                '../../images/camera.jpg',          // Back View placeholder
                '../../images/clean_dslr.png',     // Side View placeholder
                '../../images/canon_dslr_90d.png', // Capturing Photo placeholder
                '../../images/camera.jpg',          // Lens Detail placeholder
                '../../images/clean_dslr.png'      // Top View placeholder
            ],
            meetupSlots: ['Mon/Wed 1:00 PM - 3:00 PM at CET Lobby'],
            qa: [{ q: "Does this include the SD card?", a: "Yes, a 32GB card is included." }]
        },
        {
            id: 'calculator',
            name: 'Scientific Calculator TI-84',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 50,
            hourlyPrice: 10,
            weeklyPrice: 200,
            monthlyPrice: 600,
            location: 'Science Building 2F',
            rating: 5.0,
            rentals: 45,
            lender: 'Juan Dela Cruz',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Essential for engineering and math students. Perfect for exams.',
            included: ['Graphing capabilities', 'Color display', 'Rechargeable battery'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/calculator.jpg',
            galleryImages: [
                '../../images/calculator.jpg', // Front
                '../../images/calculator.jpg', // Back
                '../../images/calculator.jpg', // Side
                '../../images/calculator.jpg', // Display On
                '../../images/calculator.jpg'  // Battery Bay
            ],
            meetupSlots: ['Daily 12:00 PM - 1:00 PM at SC Building Cafe'],
            qa: [{ q: "Is this allowed for CET department exams?", a: "Yes, it's the standard model." }]
        },
        {
            id: 'calcset',
            name: 'Engineering Calculator Set',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 75,
            hourlyPrice: 15,
            weeklyPrice: 400,
            monthlyPrice: 1200,
            location: 'CET Study Area',
            rating: 4.6,
            rentals: 28,
            lender: 'Sarah Jane',
            lenderPic: '../../images/maria_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 3,
            description: 'A set of two scientific calculators and a ruler for engineering students.',
            included: ['2 Scientific Calculators', 'Engineering Ruler'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/calc-set.png',
            galleryImages: [
                '../../images/calc-set.png', // Layout
                '../../images/calc-set.png', // Calculator 1
                '../../images/calc-set.png', // Calculator 2
                '../../images/calc-set.png', // Ruler Detail
                '../../images/calc-set.png'  // Case
            ],
            meetupSlots: ['Mon-Fri 12:00 PM - 2:00 PM at CET'],
            qa: [{ q: "Are both functional?", a: "Yes, both have new batteries." }]
        },
        {
            id: 'stethoscope',
            name: 'Medical Stethoscope',
            category: 'Laboratory Equipment',
            categoryClass: 'lab',
            price: 80,
            hourlyPrice: 15,
            weeklyPrice: 400,
            monthlyPrice: 1000,
            location: 'College of Nursing',
            rating: 5.0,
            rentals: 15,
            lender: 'Lisa Manoban',
            lenderPic: '../../images/elena_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'High-quality medical stethoscope for nursing and medical students.',
            included: ['Dual-head stethoscope', 'Spare ear tips'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/stethoscope.png',
            galleryImages: [
                '../../images/stethoscope.png', // Full view
                '../../images/stethoscope.png', // Chest piece
                '../../images/stethoscope.png', // Ear tips
                '../../images/stethoscope.png', // Tubing detail
                '../../images/stethoscope.png'  // In use
            ],
            meetupSlots: ['Mon-Fri 8:00 AM - 12:00 PM at Nursing'],
            qa: [{ q: "Is it a Littmann?", a: "It's a high-quality alternative." }]
        },
        {
            id: 'drafting',
            name: 'Drafting Tools Set',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 40,
            hourlyPrice: 10,
            weeklyPrice: 200,
            monthlyPrice: 600,
            location: 'Architecture Building',
            rating: 4.5,
            rentals: 19,
            lender: 'Rafael Santiago',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 2,
            description: 'Complete set of drafting tools for architecture and engineering students.',
            included: ['T-square', 'Set squares', 'Compass set'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/calc-set.png',
            galleryImages: [
                '../../images/calc-set.png', // Full set
                '../../images/calc-set.png', // T-Square
                '../../images/calc-set.png', // Compass
                '../../images/calc-set.png', // Case
                '../../images/calc-set.png'  // Ruler
            ],
            meetupSlots: ['Mon-Fri 10:00 AM - 11:00 AM at Architecture'],
            qa: [{ q: "Is the T-square wooden?", a: "It's clear plastic." }]
        },
        {
            id: 'tablet',
            name: 'Digital Drawing Tablet',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 120,
            hourlyPrice: 25,
            weeklyPrice: 600,
            monthlyPrice: 2000,
            location: 'ICT Computer Lab 3',
            rating: 4.9,
            rentals: 38,
            lender: 'Gabriel Lopez',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Graphics tablet for digital art and design projects.',
            included: ['Drawing tablet', 'Stylus pen'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/tablet.jpeg',
            galleryImages: [
                '../../images/tablet.jpeg', // Front
                '../../images/tablet.jpeg', // Back
                '../../images/tablet.jpeg', // Pen Detail
                '../../images/tablet.jpeg', // Screen On
                '../../images/tablet.jpeg'  // Ports
            ],
            meetupSlots: ['Mon-Fri 1:00 PM - 5:00 PM at ICT'],
            qa: [{ q: "Is it compatible with Mac?", a: "Yes, it is." }]
        },
        {
            id: 'laptop-mac',
            name: 'MacBook Air M1',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 500,
            hourlyPrice: 80,
            weeklyPrice: 3000,
            monthlyPrice: 10000,
            location: 'Main Library',
            rating: 4.9,
            rentals: 5,
            lender: 'Clara Bella',
            lenderPic: '../../images/maria_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Powerful laptop for video editing and programming.',
            included: ['MacBook Air', 'USB-C Charger'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/canon_dslr_90d.png',
            galleryImages: [
                '../../images/canon_dslr_90d.png', // Lid
                '../../images/canon_dslr_90d.png', // Keyboard
                '../../images/canon_dslr_90d.png', // Side ports
                '../../images/canon_dslr_90d.png', // Screen On
                '../../images/canon_dslr_90d.png'  // Bottom
            ],
            meetupSlots: ['Tue/Thu 10:00 AM at Library'],
            qa: [{ q: "How long is the battery?", a: "Around 12-15 hours." }]
        },
        {
            id: 'nursing-uniform',
            name: 'Nursing Uniform (Male)',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 100,
            hourlyPrice: 20,
            weeklyPrice: 500,
            monthlyPrice: 1500,
            location: 'CON Building',
            rating: 4.8,
            rentals: 3,
            lender: 'Miguel Rivera',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Standard WMSU Nursing uniform for clinical duties.',
            included: ['White Top', 'Pants'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/microscope.jpeg',
            galleryImages: [
                '../../images/microscope.jpeg', // Full Set
                '../../images/microscope.jpeg', // Top
                '../../images/microscope.jpeg', // Pants
                '../../images/microscope.jpeg', // Patch Detail
                '../../images/microscope.jpeg'  // Fabric close-up
            ],
            meetupSlots: ['Daily 4:00 PM at CON Lobby'],
            qa: [{ q: "What size?", a: "Medium." }]
        },
        {
            id: 'art-easel',
            name: 'Professional Art Easel',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 60,
            hourlyPrice: 15,
            weeklyPrice: 350,
            monthlyPrice: 1000,
            location: 'CLA Arts Dept',
            rating: 4.7,
            rentals: 8,
            lender: 'Sophie Turner',
            lenderPic: '../../images/maria_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 2,
            description: 'Sturdy wooden easel for painting and sketching.',
            included: ['Easel', 'Clip board'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/lighting.jpeg',
            galleryImages: [
                '../../images/lighting.jpeg', // Front
                '../../images/lighting.jpeg', // Folded
                '../../images/lighting.jpeg', // Height adjust
                '../../images/lighting.jpeg', // Leg detail
                '../../images/lighting.jpeg'  // Clip detail
            ],
            meetupSlots: ['Mon-Fri 2:00 PM at CLA'],
            qa: [{ q: "Is it foldable?", a: "Yes, easily fits in a car." }]
        },
        {
            id: 'crim-boots',
            name: 'Tactical Boots (CCJE)',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 150,
            hourlyPrice: 30,
            weeklyPrice: 800,
            monthlyPrice: 2500,
            location: 'CCJE Building',
            rating: 5.0,
            rentals: 12,
            lender: 'Rico Blanco',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Durable boots for CCJE training and formation.',
            included: ['Pair of Boots'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/microscope.jpeg',
            galleryImages: [
                '../../images/microscope.jpeg', // Side
                '../../images/microscope.jpeg', // Sole
                '../../images/microscope.jpeg', // Back
                '../../images/microscope.jpeg', // Top
                '../../images/microscope.jpeg'  // Laces
            ],
            meetupSlots: ['Sat 8:00 AM at Grandstand'],
            qa: [{ q: "What is the size?", a: "US Size 9." }]
        },
        {
            id: 'headset-mic',
            name: 'Noise Cancelling Headset',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 80,
            hourlyPrice: 15,
            weeklyPrice: 450,
            monthlyPrice: 1500,
            location: 'ICT Center',
            rating: 4.6,
            rentals: 20,
            lender: 'Joy Santos',
            lenderPic: '../../images/elena_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 3,
            description: 'Great for online presentations or study sessions.',
            included: ['Headset', 'Protective case'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/video-camera.png',
            galleryImages: [
                '../../images/video-camera.png', // Side view
                '../../images/video-camera.png', // Mic detail
                '../../images/video-camera.png', // Ear pads
                '../../images/video-camera.png', // Control buttons
                '../../images/video-camera.png'  // Cable
            ],
            meetupSlots: ['Daily 12:00 PM at ICT'],
            qa: [{ q: "Is it USB or jack?", a: "Both, it has an adapter." }]
        },
        {
            id: 'guitar-acoustic',
            name: 'Acoustic Guitar',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 150,
            hourlyPrice: 25,
            weeklyPrice: 900,
            monthlyPrice: 2500,
            location: 'Music Hall',
            rating: 4.9,
            rentals: 15,
            lender: 'Paolo Benjamin',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Warm sounding acoustic guitar for practice or performance.',
            included: ['Guitar', 'Gig bag', 'Pick'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/lighting.jpeg',
            galleryImages: [
                '../../images/lighting.jpeg', // Front View
                '../../images/lighting.jpeg', // Back View
                '../../images/lighting.jpeg', // Headstock
                '../../images/lighting.jpeg', // Fretboard
                '../../images/lighting.jpeg'  // Bridge detail
            ],
            meetupSlots: ['Fri 5:00 PM at Music Hall'],
            qa: [{ q: "Are strings new?", a: "Yes, just replaced last week." }]
        },
        {
            id: 'physics-kit',
            name: 'Physics Lab Experiment Kit',
            category: 'Laboratory Equipment',
            categoryClass: 'lab',
            price: 40,
            hourlyPrice: 10,
            weeklyPrice: 200,
            monthlyPrice: 600,
            location: 'Science Building',
            rating: 4.5,
            rentals: 6,
            lender: 'Einstein Dela Cruz',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 5,
            description: 'Handy kit for first-year physics experiments.',
            included: ['Weights', 'Spring balance', 'Pulley'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/microscope.jpeg',
            galleryImages: [
                '../../images/microscope.jpeg', // Case
                '../../images/microscope.jpeg', // Weights
                '../../images/microscope.jpeg', // Scale
                '../../images/microscope.jpeg', // Pulley
                '../../images/microscope.jpeg'  // Setup
            ],
            meetupSlots: ['Daily 8:00 AM at SC Lab'],
            qa: [{ q: "Is the manual included?", a: "Yes, PDF version." }]
        },
        {
            id: 'white-coat-med',
            name: 'Medical White Coat',
            category: 'Laboratory Equipment',
            categoryClass: 'lab',
            price: 50,
            hourlyPrice: 10,
            weeklyPrice: 250,
            monthlyPrice: 800,
            location: 'Nursing Lobby',
            rating: 5.0,
            rentals: 2,
            lender: 'Dra. Vicky Belo',
            lenderPic: '../../images/elena_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Clean and pressed white coat for medical students.',
            included: ['White Coat'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/microscope.jpeg',
            galleryImages: [
                '../../images/microscope.jpeg', // Front
                '../../images/microscope.jpeg', // Back
                '../../images/microscope.jpeg', // Pocket detail
                '../../images/microscope.jpeg', // Collar
                '../../images/microscope.jpeg'  // Fabric
            ],
            meetupSlots: ['Mon-Wed 10:00 AM at Nursing'],
            qa: [{ q: "Does it have the WMSU patch?", a: "No, it's plain." }]
        },
        {
            id: 'tripod-stand',
            name: 'Camera Tripod',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 40,
            hourlyPrice: 10,
            weeklyPrice: 200,
            monthlyPrice: 600,
            location: 'Engineering Steps',
            rating: 4.8,
            rentals: 14,
            lender: 'Ben&Ben Fan',
            lenderPic: '../../images/maria_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 2,
            description: 'Stable tripod for cameras and smartphones.',
            included: ['Tripod', 'Phone Holder'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/lighting.jpeg',
            galleryImages: [
                '../../images/lighting.jpeg', // Full height
                '../../images/lighting.jpeg', // Folded
                '../../images/lighting.jpeg', // Head mount
                '../../images/lighting.jpeg', // Leg lock
                '../../images/lighting.jpeg'  // Phone holder
            ],
            meetupSlots: ['Daily 5:00 PM at Engineering'],
            qa: [{ q: "How high can it go?", a: "Up to 5 feet." }]
        },
        {
            id: 'drawing-table',
            name: 'Foldable Drawing Table',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 90,
            hourlyPrice: 20,
            weeklyPrice: 500,
            monthlyPrice: 1500,
            location: 'Architecture Studio',
            rating: 4.7,
            rentals: 9,
            lender: 'Arch. Pedro',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Compact drawing table for architecture drafting.',
            included: ['Table'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/calc-set.png',
            galleryImages: [
                '../../images/calc-set.png', // Surface
                '../../images/calc-set.png', // Side profile
                '../../images/calc-set.png', // Folded
                '../../images/calc-set.png', // Height dial
                '../../images/calc-set.png'  // Leg support
            ],
            meetupSlots: ['Mon-Fri 9:00 AM at Arch Studio'],
            qa: [{ q: "Is the height adjustable?", a: "Yes, 3 levels." }]
        },
        {
            id: 'lab-scale',
            name: 'Digital Lab Scale',
            category: 'Laboratory Equipment',
            categoryClass: 'lab',
            price: 30,
            hourlyPrice: 5,
            weeklyPrice: 150,
            monthlyPrice: 500,
            location: 'Chemistry Dept',
            rating: 4.6,
            rentals: 7,
            lender: 'Marie Curie',
            lenderPic: '../../images/elena_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 2,
            description: 'Precise digital scale for small measurements.',
            included: ['Scale', 'Batteries'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/microscope.jpeg',
            galleryImages: [
                '../../images/microscope.jpeg', // Top View
                '../../images/microscope.jpeg', // Display Detail
                '../../images/microscope.jpeg', // Weight Plate
                '../../images/microscope.jpeg', // Battery Bay
                '../../images/microscope.jpeg'  // Protective Cover
            ],
            meetupSlots: ['Daily 11:00 AM at Chem Lab'],
            qa: [{ q: "What is the max weight?", a: "500 grams." }]
        },
        {
            id: 'power-bank',
            name: 'High Capacity Power Bank',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 50,
            hourlyPrice: 10,
            weeklyPrice: 250,
            monthlyPrice: 800,
            location: 'Social Hall',
            rating: 4.9,
            rentals: 25,
            lender: 'Tech Guru',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 5,
            description: '30,000mAh power bank to keep your devices charged all day.',
            included: ['Power Bank', 'Charging Cable'],
            condition: 'Excellent',
            availability: 'Available Now',
            image: '../../images/video-camera.png',
            galleryImages: [
                '../../images/video-camera.png', // Front ports
                '../../images/video-camera.png', // Capacity indicator
                '../../images/video-camera.png', // Side view
                '../../images/video-camera.png', // USB-C detail
                '../../images/video-camera.png'  // Back label
            ],
            meetupSlots: ['Daily 1:00 PM at Social Hall'],
            qa: [{ q: "Can it charge a laptop?", a: "Yes, via USB-C PD." }]
        },
        {
            id: 'ruler-set',
            name: 'Architecture Ruler Set',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 20,
            hourlyPrice: 5,
            weeklyPrice: 100,
            monthlyPrice: 300,
            location: 'CET Hallway',
            rating: 5.0,
            rentals: 18,
            lender: 'Draftsman Dan',
            lenderPic: '../../images/maria_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 10,
            description: 'Professional scale rulers and templates.',
            included: ['Scale Ruler', 'Protractor', 'Circle Template'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/calc-set.png',
            galleryImages: [
                '../../images/calc-set.png', // Full set
                '../../images/calc-set.png', // Scale ruler
                '../../images/calc-set.png', // Protractor
                '../../images/calc-set.png', // Template
                '../../images/calc-set.png'  // Engraving detail
            ],
            meetupSlots: ['Daily 10:00 AM at CET'],
            qa: [{ q: "Are they metal?", a: "Yes, aluminum." }]
        },
        {
            id: 'whiteboard-small',
            name: 'Portable Whiteboard',
            category: 'Academic Tools',
            categoryClass: 'tools',
            price: 25,
            hourlyPrice: 5,
            weeklyPrice: 120,
            monthlyPrice: 400,
            location: 'Study Area',
            rating: 4.4,
            rentals: 4,
            lender: 'Tutor Tom',
            lenderPic: '../../images/juan_profile.png',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 3,
            description: 'Small whiteboard for group studies or notes.',
            included: ['Whiteboard', '2 Markers', 'Eraser'],
            condition: 'Good',
            availability: 'Available Now',
            image: '../../images/books.jpeg',
            galleryImages: [
                '../../images/books.jpeg', // Front view
                '../../images/books.jpeg', // Back View
                '../../images/books.jpeg', // Marker detail
                '../../images/books.jpeg', // Eraser
                '../../images/books.jpeg'  // Frame detail
            ],
            meetupSlots: ['Daily 3:00 PM at Study Area'],
            qa: [{ q: "Does it have a stand?", a: "No, but it has a handle." }]
        },
        {
            id: 'faculty-projector',
            name: 'Epson Portable Projector',
            category: 'Media Equipment',
            categoryClass: 'media',
            price: 300,
            hourlyPrice: 50,
            weeklyPrice: 1800,
            monthlyPrice: 6000,
            location: 'CET Faculty Office',
            rating: 5.0,
            rentals: 2,
            lender: 'Engr. Ace Lorenz (Faculty)',
            lenderPic: '../../images/Prof. Ace.jpg',
            lenderVerified: true,
            propertyTag: 'Personal',
            quantity: 1,
            description: 'Personal portable projector, great for presentations and outdoor movie nights.',
            included: ['Projector', 'HDMI Cable', 'Remote', 'Tripod'],
            condition: 'Mint',
            availability: 'Available Now',
            image: '../../images/video-camera.png',
            galleryImages: [
                '../../images/video-camera.png', // Front lens
                '../../images/video-camera.png', // Control panel
                '../../images/video-camera.png', // Rear ports
                '../../images/video-camera.png', // Remote
                '../../images/video-camera.png'  // Projected image
            ],
            meetupSlots: ['Mon-Fri 4:00 PM at CET Faculty Office'],
            qa: [{ q: "How many lumens?", a: "3600 Lumens." }]
        }
    ],

    getItemById: function(id) {
        return this.items.find(item => item.id === id);
    }
};
