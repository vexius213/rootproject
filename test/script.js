// Get DOM elements
const button = document.getElementById('clickMe');
const greeting = document.getElementById('greeting');
const counterDisplay = document.getElementById('counter');

let clickCount = 0;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateGreeting(count) {
    if (count === 1) {
        greeting.textContent = "You clicked once!";
    } else if (count < 5) {
        greeting.textContent = `Clicked ${count} times. Keep going!`;
    } else {
        greeting.textContent = "Wow, you're really clicking fast!";
    }
}

button.addEventListener('click', () => {

    clickCount++;
    counterDisplay.textContent = `Button clicked: ${clickCount} times`;

    updateGreeting(clickCount);

    button.style.backgroundColor = getRandomColor();
});

const hour = new Date().getHours();
if (hour < 12) {
    greeting.textContent = "Good morning! Click the button to start your day!";
} else if (hour < 18) {
    greeting.textContent = "Good afternoon! Click the button to continue!";
} else {
    greeting.textContent = "Good evening! Click the button to relax!";
}
