

// Show greeting in the center
window.addEventListener("load", () => {
  const dateElement = document.getElementById("date");
  if (dateElement) {
    const today = new Date();
    const hours = today.getHours();
    let greeting = "";

    if (hours < 12) greeting = "☀️ Good Morning, Sunshine!";
    else if (hours < 18) greeting = "🌸 Good Afternoon, Dreamer!";
    else greeting = "🌙 Good Evening, Star!";

    dateElement.textContent = `${greeting} Today is ${today.toDateString()}.`;
  }

  applySavedSettings();
});

// Apply saved theme and color
function applySavedSettings() {
  const savedColor = localStorage.getItem("navbarColor");
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const navbar = document.querySelector(".navbar");
  const colorPicker = document.getElementById("color-picker");
  const darkModeBtn = document.getElementById("dark-mode-toggle");

  if (savedColor && navbar) {
    navbar.style.backgroundColor = savedColor;
    adjustNavbarTextColor(savedColor);
    if (colorPicker) colorPicker.value = savedColor;
  }

  if (savedDarkMode) {
    document.body.classList.add("dark-mode");
    if (darkModeBtn) darkModeBtn.textContent = "☀️ Light Mode";
  }
}

// Handle color picker
const colorPicker = document.getElementById("color-picker");
const navbar = document.querySelector(".navbar");

if (colorPicker && navbar) {
  colorPicker.addEventListener("input", () => {
    const selectedColor = colorPicker.value;
    navbar.style.backgroundColor = selectedColor;
    adjustNavbarTextColor(selectedColor);
    navbar.style.transition = "0.4s ease";
    localStorage.setItem("navbarColor", selectedColor);
  });
}

// Handle dark mode toggle
const darkModeBtn = document.getElementById("dark-mode-toggle");

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("darkMode", isDark);
  });
}

// 🌈 Automatically adjust navbar text color
function adjustNavbarTextColor(hexColor) {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calculate brightness (simple average)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Light color → use dark text, Dark color → use white text
  navbar.style.color = brightness > 155 ? "black" : "white";

  // Also fix links inside navbar
  navbar.querySelectorAll("a").forEach(link => {
    link.style.color = brightness > 155 ? "black" : "white";
  });
}
