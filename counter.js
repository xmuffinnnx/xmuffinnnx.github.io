// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb2oESmtwSM2K3K7SAwZIQs3VoBwNHSPs",
    authDomain: "sighcounter.firebaseapp.com",
    projectId: "sighcounter",
    storageBucket: "sighcounter.appspot.com",
    messagingSenderId: "565321262229",
    appId: "1:565321262229:web:d42fd153bd70cdafaba79c",
    measurementId: "G-926FFZ66EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Define initial counts
const counts = {
    xinze: 0,
    jolin: 0,
    joshua: 0,
    sean: 0,
    jon: 0,
    darius: 0
};

// Load counts from Firebase
for (const person in counts) {
    const countRef = database.ref(person);
    countRef.on('value', (snapshot) => {
        counts[person] = snapshot.val() || 0;
        updateCount(person);
        updateTotalCount();
    });
}

// Function to increment sigh count
function incrementSighCount(person) {
    counts[person]++;
    updateCount(person);
    updateTotalCount();
    // Save counts to Firebase
    database.ref(person).set(counts[person]);
}

// Function to decrement sigh count
function decrementSighCount(person) {
    if (counts[person] > 0) {
        counts[person]--;
        updateCount(person);
        updateTotalCount();
        // Save counts to Firebase
        database.ref(person).set(counts[person]);
    }
}

// Function to update count display
function updateCount(person) {
    const countElement = document.getElementById(`count-${person}`);
    countElement.textContent = counts[person];
}

// Function to update total count
function updateTotalCount() {
    const totalCountElement = document.getElementById('total-count');
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
    totalCountElement.textContent = totalCount;
}