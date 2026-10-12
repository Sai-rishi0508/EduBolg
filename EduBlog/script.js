// ========== THEME TOGGLE ==========
const toggleBtn = document.getElementById("toggleMode");
const toggleIcon = document.getElementById("toggleIcon");

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark-theme");
  toggleIcon.classList.toggle("fa-moon");
  toggleIcon.classList.toggle("fa-sun");
};

// ========== AUTH LOGIC ==========
function toggleForm(type) {
  document.getElementById("authForms").style.display = "block";
}

function handleAuth() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password.");
    return;
  }

  localStorage.setItem("loggedInUser", user);
  showLoggedInUser();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function showLoggedInUser() {
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    document.getElementById("authSection").style.display = "none";

    const actions = document.querySelector(".actions");
    if (!document.getElementById("logoutBtnNav")) {
      const logoutBtn = document.createElement("button");
      logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
      logoutBtn.id = "logoutBtnNav";
      logoutBtn.classList.add("logout-btn");
      logoutBtn.onclick = logout;
      actions.appendChild(logoutBtn);
    }

    const welcome = document.getElementById("welcomeUser");
    if (welcome) welcome.textContent = `Welcome, ${user}`;
  }
}
showLoggedInUser();

// ========== COMMENT POSTING ==========
function postComment() {
  const text = document.getElementById("commentInput").value.trim();
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    alert("Please log in first.");
    return;
  }

  if (!text) return;

  const commentBox = document.createElement("div");
  commentBox.className = "comment-bubble";
  commentBox.innerHTML = `<strong>${user}</strong><p>${text}</p>`;
  document.getElementById("commentSection").appendChild(commentBox);
  document.getElementById("commentInput").value = "";
}

// ========== BLOG SEARCH ==========
document.getElementById("searchInput").addEventListener("input", function () {
  const term = this.value.toLowerCase();
  const cards = document.querySelectorAll(".blog-card");
  const blogList = document.getElementById("blogList");

  let matchFound = false;

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(term)) {
      card.style.display = "block";
      matchFound = true;
    } else {
      card.style.display = "none";
    }
  });

  blogList.style.display = matchFound ? "grid" : "none";
});
