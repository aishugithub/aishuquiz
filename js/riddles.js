// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async () => {
  const riddleQuestion = document.getElementById("riddleQuestion");
  const riddleAnswer = document.getElementById("riddleAnswer");
  const revealBtn = document.getElementById("revealBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const welcomeMessage = document.getElementById("welcomeMessage");

  // Retrieve user info
  const username = localStorage.getItem("username") || "Guest";
  const category = localStorage.getItem("category") || "general";
  const ageGroup = localStorage.getItem("ageGroup") || "6-10";

  welcomeMessage.textContent = `Hello, ${username}! Enjoy ${category} riddles for ages ${ageGroup}.`;

  // Fetch riddles from the JSON file
  let riddles = [];
  try {
    const response = await fetch("data/riddles.json");
    const data = await response.json();

    // Filter riddles based on category and age group
    riddles = data.filter(riddle => riddle.category === category && riddle.ageGroup === ageGroup);
  } catch (error) {
    console.error("Error fetching riddles:", error);
    riddleQuestion.textContent = "Failed to load riddles.";
    return;
  }

  let currentIndex = 0;

  // Display the current riddle
  const displayRiddle = () => {
    if (riddles.length === 0) {
      riddleQuestion.textContent = "No riddles found for this category and age group.";
      revealBtn.style.display = "none";
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }
    const currentRiddle = riddles[currentIndex];
    riddleQuestion.textContent = currentRiddle.question;
    riddleAnswer.textContent = currentRiddle.answer;
    riddleAnswer.style.display = "none";
  };

  // Event listeners
  revealBtn.addEventListener("click", () => {
    riddleAnswer.style.display = "block";
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayRiddle();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < riddles.length - 1) {
      currentIndex++;
      displayRiddle();
    }
  });

  // Initial display
  displayRiddle();
});
