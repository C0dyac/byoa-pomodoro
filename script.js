let timeLeft = 25 * 60;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');
// const pauseButton = document.getElementById('pause');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    
    // Update the display elements
    minutesDisplay.textContent = minutesStr;
    secondsDisplay.textContent = secondsStr;
    
    // Update the page title
    document.title = `${minutesStr}:${secondsStr} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        startButton.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work time is over! Take a break!' : 'Break is over! Time to work!');
                resetTimer();
                toggleMode();
            }
        }, 1000);
    } else {
        pauseTimer();
        startButton.textContent = 'Start';
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    modeToggleButton.textContent = isWorkMode ? 'Rest Mode' : 'Work Mode';
    modeToggleButton.className = isWorkMode ? 'work-mode' : 'rest-mode';
    resetTimer();
}

// Event listeners
startButton.addEventListener('click', startTimer);
// pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

// Initialize
resetTimer(); 