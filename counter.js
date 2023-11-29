// Define initial counts
const counts = {
    xinze: 0,
    jolin: 0,
    joshua: 0,
    sean: 0,
    jon: 0,
    darius: 0
};

// Load counts from localStorage if available
for (const person in counts) {
    if (localStorage.getItem(person)) {
        counts[person] = parseInt(localStorage.getItem(person));
        updateCount(person);
    }
}

// Function to increment sigh count
function incrementSighCount(person) {
    counts[person]++;
    updateCount(person);
    // Save counts to localStorage
    localStorage.setItem(person, counts[person]);
}

// Function to update count display
function updateCount(person) {
    const countElement = document.getElementById(`count-${person}`);
    countElement.textContent = counts[person];
}
