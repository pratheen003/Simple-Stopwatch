let hrs = 0, mins = 0, secs = 0, tens = 0;
let interval = null;
let running = false;


const displayEl = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function updateDisplay() {
  let h = hrs.toString().padStart(2, '0');
  let m = mins.toString().padStart(2, '0');
  let s = secs.toString().padStart(2, '0');
  let t = tens.toString().padStart(2, '0');
  displayEl.textContent = `${h}:${m}:${s}:${t}`;
}

function startTimer() {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;

  interval = setInterval(() => {
    tens++;
    if (tens >= 100) {
      tens = 0;
      secs++;
    }
    if (secs >= 60) {
      secs = 0;
      mins++;
    }
    if (mins >= 60) {
      mins = 0;
      hrs++;
    }
    updateDisplay();
  }, 10);
}

function stopTimer() {
  if (!running) return;
  running = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
  clearInterval(interval);
}

function resetTimer() {
  stopTimer();
  hrs = mins = secs = tens = 0;
  updateDisplay();
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
}

function recordLap() {
  let lapTime = displayEl.textContent;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(li);
}


// Event listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

// Initialize display
updateDisplay();


