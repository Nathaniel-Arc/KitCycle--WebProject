// Student Data Management Layer — KitCycle v2 (Full Refactor)

const DEFAULT_SAVED_ITEMS = ['camera', 'calculator', 'stethoscope', 'tablet'];

const DEFAULT_LISTINGS = [
    {
        id: 'l1',
        name: 'Engineering Textbook Bundle',
        price: 50,
        category: 'Textbooks',
        condition: 'Good',
        status: 'Active',
        approvalStatus: 'Approved',
        visibility: true,
        image: '../../images/books.jpeg',
        photos: ['../../images/books.jpeg'],
        quantity: 3,
        description: 'Complete engineering textbook set: Thermodynamics, Fluid Mechanics, and Structural Analysis. All in good condition with minor highlighting.',
        location: 'CET Lobby',
        lenderWindow: {
            maxRentalDays: 14,
            unavailableDays: ['Saturday', 'Sunday']
        },
        socialDiscount: false,
        usageHistory: [
            { borrower: 'Miguel Tan', avatar: '../../images/juan_profile.png', date: 'Apr 10–Apr 17, 2026', conditionBefore: 'Good', conditionAfter: 'Good', rating: 5 },
            { borrower: 'Sarah Lee', avatar: '../../images/maria_profile.png', date: 'Mar 20–Mar 25, 2026', conditionBefore: 'Good', conditionAfter: 'Good', rating: 4 }
        ],
        conditionSnapshots: {
            before: '../../images/books.jpeg',
            after: null
        }
    },
    {
        id: 'l2',
        name: 'Laboratory Microscope',
        price: 120,
        category: 'Laboratory Equipment',
        condition: 'Excellent',
        status: 'Rented',
        approvalStatus: 'Approved',
        visibility: true,
        image: '../../images/microscope.jpeg',
        photos: ['../../images/microscope.jpeg'],
        quantity: 1,
        description: 'High-quality compound microscope with 4x, 10x, 40x, and 100x objectives. LED illumination. Perfect for Biology and Chemistry labs.',
        location: 'Science Lab A',
        lenderWindow: {
            maxRentalDays: 7,
            unavailableDays: []
        },
        socialDiscount: true,
        usageHistory: [
            { borrower: 'Elena Gomez', avatar: '../../images/elena_profile.png', date: 'Apr 5–Apr 8, 2026', conditionBefore: 'Excellent', conditionAfter: 'Excellent', rating: 5 }
        ],
        conditionSnapshots: {
            before: '../../images/microscope.jpeg',
            after: null
        }
    }
];

const DEFAULT_RATINGS = {
    average: 4.8,
    borrowerRating: 4.9,
    lenderRating: 4.7,
    totalReviews: 15,
    verifications: ['WMSU ID', 'University Email'],
    distribution: {
        5: 12,
        4: 2,
        3: 1,
        2: 0,
        1: 0
    },
    // Dual KPI System
    kpiBorrower: {
        punctuality: 4.9,
        itemCare: 4.8,
        paymentReliability: 5.0,
        overall: 4.9
    },
    kpiLender: {
        descriptionAccuracy: 4.7,
        responseSpeed: 4.6,
        handoverPunctuality: 4.8,
        overall: 4.7
    },
    reviews: [
        {
            user: 'Miguel Tan',
            rating: 5,
            role: 'Borrower',
            item: 'Engineering Books',
            date: '2 days ago',
            comment: 'Very reliable lender! The books were in great condition and he was very punctual during the handover.',
            avatar: '../../images/juan_profile.png',
            kpiDetails: { descriptionAccuracy: 5, responseSpeed: 5, handoverPunctuality: 5 }
        },
        {
            user: 'Sarah Lee',
            rating: 4,
            role: 'Borrower',
            item: 'Microscope',
            date: '1 week ago',
            comment: 'Smooth transaction. The microscope worked perfectly for my lab exam.',
            avatar: '../../images/maria_profile.png',
            kpiDetails: { descriptionAccuracy: 4, responseSpeed: 4, handoverPunctuality: 5 }
        },
        {
            user: 'Juan Dela Cruz',
            rating: 5,
            role: 'Lender',
            item: 'Canon DSLR',
            date: '2 weeks ago',
            comment: 'Nash returned the DSLR in perfect condition. Highly recommended borrower!',
            avatar: '../../images/juan_profile.png',
            kpiDetails: { punctuality: 5, itemCare: 5, paymentReliability: 5 }
        },
        {
            user: 'Elena Gomez',
            rating: 5,
            role: 'Lender',
            item: 'Microscope',
            date: '3 weeks ago',
            comment: 'Returned on time and in perfect condition. Very responsible borrower.',
            avatar: '../../images/elena_profile.png',
            kpiDetails: { punctuality: 5, itemCare: 5, paymentReliability: 5 }
        }
    ],
    givenReviews: [
        {
            user: 'Juan Dela Cruz',
            rating: 5,
            role: 'Lender',
            item: 'Canon DSLR',
            date: '2 weeks ago',
            comment: 'Excellent lender. Camera was exactly as described and Juan was very responsive.',
            avatar: '../../images/juan_profile.png'
        },
        {
            user: 'Maria Santos',
            rating: 4,
            role: 'Lender',
            item: 'Calculator',
            date: '1 month ago',
            comment: 'Good condition calculator. Maria was helpful and accommodating.',
            avatar: '../../images/maria_profile.png'
        }
    ]
};

const DEFAULT_REQUESTS = [
    {
        id: 'req1',
        user: 'Aria Montgomery',
        item: 'Engineering Textbook Bundle',
        date: 'Today, 10:30 AM',
        avatar: '../../images/elena_profile.png',
        quantity: 2,
        duration: '3 days',
        isSocialDiscount: false
    },
    {
        id: 'req2',
        user: 'Ezra Fitz',
        item: 'Laboratory Microscope',
        date: 'Yesterday',
        avatar: '../../images/Prof. Ace.jpg',
        quantity: 1,
        duration: '1 week',
        isSocialDiscount: true
    }
];

// Clearance / Negative List System
const DEFAULT_CLEARANCE = {
    status: 'Clear', // 'Clear', 'Hold', 'Flagged'
    unreturnedItems: [],
    unpaidFines: 0,
    disputes: [],
    negativeListEntries: []
};

// Active Rentals with full tracking
const DEFAULT_ACTIVE_RENTALS = [
    {
        id: 'ar1',
        item: 'Canon EOS 90D DSLR',
        image: '../../images/camera.jpg',
        borrower: 'Nash Arciaga',
        lender: 'Juan Dela Cruz',
        lenderAvatar: '../../images/juan_profile.png',
        location: 'Engineering Building',
        rate: 250,
        rateUnit: 'day',
        status: 'Active',
        startDate: '2026-05-01T08:00:00Z',
        dueDate: '2026-05-06T17:00:00Z',
        totalCost: 1750,
        quantityBorrowed: 1,
        quantityReturned: 0,
        conditionBefore: '../../images/camera.jpg',
        conditionAfter: null,
        damageReport: null
    },
    {
        id: 'ar2',
        item: 'Scientific Calculator TI-84',
        image: '../../images/calculator.jpg',
        borrower: 'Nash Arciaga',
        lender: 'Maria Santos',
        lenderAvatar: '../../images/maria_profile.png',
        location: 'Library Lobby',
        rate: 60,
        rateUnit: 'day',
        status: 'Pending Rating',
        startDate: '2026-05-01T10:00:00Z',
        dueDate: '2026-05-03T10:00:00Z',
        totalCost: 180,
        quantityBorrowed: 2,
        quantityReturned: 2,
        conditionBefore: '../../images/calculator.jpg',
        conditionAfter: '../../images/calculator.jpg',
        damageReport: null
    },
    {
        id: 'ar3',
        item: 'Engineering Textbook Bundle',
        image: '../../images/books.jpeg',
        borrower: 'Elena Gomez',
        lender: 'Nash Arciaga',
        lenderAvatar: '../../images/nash_profile.png',
        location: 'CET Lobby',
        rate: 50,
        rateUnit: 'day',
        status: 'Active',
        startDate: '2026-05-04T09:00:00Z',
        dueDate: '2026-05-10T17:00:00Z',
        totalCost: 250,
        quantityBorrowed: 1,
        quantityReturned: 0,
        conditionBefore: '../../images/books.jpeg',
        conditionAfter: null,
        damageReport: null
    },
    {
        id: 'ar4',
        item: 'Studio Lighting Kit',
        image: '../../images/lighting.jpeg',
        borrower: 'Nash Arciaga',
        lender: 'Creative Arts Dept',
        lenderAvatar: '../../images/maria_profile.png',
        location: 'Art Center',
        rate: 200,
        rateUnit: 'day',
        status: 'Completed',
        startDate: '2026-04-20T08:00:00Z',
        dueDate: '2026-04-25T17:00:00Z',
        totalCost: 1000,
        quantityBorrowed: 1,
        quantityReturned: 1,
        conditionBefore: '../../images/lighting.jpeg',
        conditionAfter: '../../images/lighting.jpeg',
        damageReport: null
    },
    {
        id: 'ar5',
        item: 'Laboratory Microscope',
        image: '../../images/microscope.jpeg',
        borrower: 'Nash Arciaga',
        lender: 'Dr. Pedro Cruz',
        lenderAvatar: '../../images/elena_profile.png',
        location: 'Science Lab A',
        rate: 150,
        rateUnit: 'day',
        status: 'Active',
        startDate: '2026-05-04T10:00:00Z',
        dueDate: '2026-05-08T17:00:00Z',
        totalCost: 600,
        quantityBorrowed: 1,
        quantityReturned: 0,
        conditionBefore: '../../images/microscope.jpeg',
        conditionAfter: null,
        damageReport: null
    },
    {
        id: 'ar6',
        item: 'Digital Drawing Tablet',
        image: '../../images/tablet.jpeg',
        borrower: 'Nash Arciaga',
        lender: 'Gabriel Lopez',
        lenderAvatar: '../../images/juan_profile.png',
        location: 'ICT Computer Lab',
        rate: 120,
        rateUnit: 'day',
        status: 'Active',
        startDate: '2026-05-05T09:00:00Z',
        dueDate: '2026-05-07T17:00:00Z',
        totalCost: 240,
        quantityBorrowed: 1,
        quantityReturned: 0,
        conditionBefore: '../../images/tablet.jpeg',
        conditionAfter: null,
        damageReport: null
    }
];

// Initialize Data
function initStudentData() {
    // Only set defaults if not already present to allow persistence
    if (!localStorage.getItem('student_saved_items')) {
        localStorage.setItem('student_saved_items', JSON.stringify(DEFAULT_SAVED_ITEMS));
    }
    if (!localStorage.getItem('student_listings')) {
        localStorage.setItem('student_listings', JSON.stringify(DEFAULT_LISTINGS));
    }
    if (!localStorage.getItem('active_rentals_v2')) {
        localStorage.setItem('active_rentals_v2', JSON.stringify(DEFAULT_ACTIVE_RENTALS));
    }
    if (!localStorage.getItem('student_ratings')) {
        localStorage.setItem('student_ratings', JSON.stringify(DEFAULT_RATINGS));
    }
    if (!localStorage.getItem('student_requests')) {
        localStorage.setItem('student_requests', JSON.stringify(DEFAULT_REQUESTS));
    }
    if (!localStorage.getItem('student_clearance')) {
        localStorage.setItem('student_clearance', JSON.stringify(DEFAULT_CLEARANCE));
    }
}

// Data Getters
function getSavedItems() {
    return JSON.parse(localStorage.getItem('student_saved_items') || '[]');
}

function getMyListings() {
    return JSON.parse(localStorage.getItem('student_listings') || '[]');
}

function getMyRatings() {
    return JSON.parse(localStorage.getItem('student_ratings') || '{}');
}

function getPendingRequests() {
    return JSON.parse(localStorage.getItem('student_requests') || '[]');
}

function getClearanceStatus() {
    return JSON.parse(localStorage.getItem('student_clearance') || '{}');
}

function getActiveRentals() {
    return JSON.parse(localStorage.getItem('active_rentals_v2') || '[]');
}

// Data Setters
function saveItems(items) {
    localStorage.setItem('student_saved_items', JSON.stringify(items));
}

function saveListings(listings) {
    localStorage.setItem('student_listings', JSON.stringify(listings));
}

function saveRequests(requests) {
    localStorage.setItem('student_requests', JSON.stringify(requests));
}

function saveClearance(data) {
    localStorage.setItem('student_clearance', JSON.stringify(data));
}

function saveActiveRentals(rentals) {
    localStorage.setItem('active_rentals_v2', JSON.stringify(rentals));
}

function saveRatings(ratings) {
    localStorage.setItem('student_ratings', JSON.stringify(ratings));
}

// Utility: Calculate dynamic progress
function calcRentalProgress(startDate, dueDate) {
    if (!startDate || !dueDate) return { percent: 0, color: '#10b981', timeLeft: 'Pending' };
    const now = Date.now();
    const start = new Date(startDate).getTime();
    const due = new Date(dueDate).getTime();
    const total = due - start;
    const elapsed = now - start;
    const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));
    const msLeft = due - now;
    const hoursLeft = Math.max(0, Math.floor(msLeft / (1000 * 60 * 60)));
    const minsLeft = Math.max(0, Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60)));
    
    let color = '#10b981'; // green
    if (percent > 75) color = '#ef4444'; // red
    else if (percent > 50) color = '#f59e0b'; // amber
    
    let timeLeft = '';
    if (msLeft <= 0) timeLeft = 'OVERDUE';
    else if (hoursLeft >= 24) timeLeft = Math.floor(hoursLeft / 24) + 'd : ' + (hoursLeft % 24) + 'h';
    else timeLeft = hoursLeft + 'h : ' + minsLeft + 'm';

    return { percent: Math.round(percent), color, timeLeft, isOverdue: msLeft <= 0 };
}

// Utility: Privacy mask for phone/email
function maskPrivateInfo(text) {
    // Mask phone numbers: 09XX-XXX-XXXX → 09XX-***-****
    text = text.replace(/(\d{4})[-\s]?(\d{3})[-\s]?(\d{4})/g, '$1-***-****');
    // Mask emails: user@domain → u***@domain
    text = text.replace(/([a-zA-Z0-9])[a-zA-Z0-9.]*@/g, '$1***@');
    return text;
}

// Social discount calculation
function applySocialDiscount(price, discountPercent = 10) {
    return Math.round(price * (1 - discountPercent / 100));
}

// Call init on load
initStudentData();
