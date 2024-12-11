// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const category = document.getElementById("category").value;
    const ageGroup = document.getElementById("ageGroup").value;

    if (!username) {
      alert("Please enter your name!");
      return;
    }

    // Store the data in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("category", category);
    localStorage.setItem("ageGroup", ageGroup);

    // Redirect to riddles.html
    window.location.href = "riddles.html";
  });
});
