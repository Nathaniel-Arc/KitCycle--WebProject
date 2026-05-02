// Student Data Management Layer

const DEFAULT_SAVED_ITEMS = [
    {
        id: 's1',
        name: 'Laboratory Microscope',
        price: 150,
        owner: 'Dr. Pedro Cruz',
        rating: 4.7,
        image: '../../images/microscope.jpeg',
        availability: { status: 'available', text: 'Available Now' },
        comparisonTag: 'Best Value for Science'
    },
    {
        id: 's2',
        name: 'Studio Lighting Kit',
        price: 200,
        owner: 'Creative Arts Dept',
        rating: 4.8,
        image: '../../images/lighting.jpeg',
        availability: { status: 'due', text: 'Due back: May 2' },
        comparisonTag: 'Lowest Price'
    },
    {
        id: 's3',
        name: 'Nikon D3500 Kit',
        price: 180,
        owner: 'John Smith',
        rating: 4.9,
        image: '../../images/camera.jpg',
        availability: { status: 'available', text: 'Available Now' },
        comparisonTag: null
    },
    {
        id: 's4',
        name: 'Graphing Calculator',
        price: 60,
        owner: 'Math Society',
        rating: 4.6,
        image: '../../images/calculator.jpg',
        availability: { status: 'due', text: 'Due back: Today' },
        comparisonTag: 'Best Value for Math'
    }
];

const DEFAULT_LISTINGS = [
    {
        id: 'l1',
        name: 'Engineering Textbook Bundle',
        price: 50,
        category: 'Books',
        status: 'Active',
        visibility: true,
        image: '../../images/books.jpeg'
    },
    {
        id: 'l2',
        name: 'Laboratory Microscope',
        price: 120,
        category: 'Science',
        status: 'Rented',
        visibility: true,
        image: '../../images/microscope.jpeg'
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
    reviews: [
        {
            user: 'Miguel Tan',
            rating: 5,
            role: 'Borrower',
            item: 'Engineering Books',
            date: '2 days ago',
            comment: 'Very reliable lender! The books were in great condition and he was very punctual during the handover.',
            avatar: '../../images/juan_profile.png'
        },
        {
            user: 'Sarah Lee',
            rating: 4,
            role: 'Borrower',
            item: 'Microscope',
            date: '1 week ago',
            comment: 'Smooth transaction. The microscope worked perfectly for my lab exam.',
            avatar: '../../images/maria_profile.png'
        },
        {
            user: 'Juan Dela Cruz',
            rating: 5,
            role: 'Lender',
            item: 'Canon DSLR',
            date: '2 weeks ago',
            comment: 'Nash returned the DSLR in perfect condition. Highly recommended borrower!',
            avatar: '../../images/juan_profile.png'
        }
    ]
};

const DEFAULT_REQUESTS = [
    {
        id: 'req1',
        user: 'Aria Montgomery',
        item: 'Engineering Textbook Bundle',
        date: 'Today, 10:30 AM',
        avatar: '../../images/elena_profile.png'
    },
    {
        id: 'req2',
        user: 'Ezra Fitz',
        item: 'Laboratory Microscope',
        date: 'Yesterday',
        avatar: '../../images/Prof. Ace.jpg'
    }
];

// Initialize Data
function initStudentData() {
    if (!localStorage.getItem('student_saved_items')) {
        localStorage.setItem('student_saved_items', JSON.stringify(DEFAULT_SAVED_ITEMS));
    }
    if (!localStorage.getItem('student_listings')) {
        localStorage.setItem('student_listings', JSON.stringify(DEFAULT_LISTINGS));
    }
    if (!localStorage.getItem('student_ratings')) {
        localStorage.setItem('student_ratings', JSON.stringify(DEFAULT_RATINGS));
    }
    if (!localStorage.getItem('student_requests')) {
        localStorage.setItem('student_requests', JSON.stringify(DEFAULT_REQUESTS));
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

// Call init on load
initStudentData();
