const toggle = document.getElementById("themeToggle");

if(localStorage.theme === "dark"){
  document.body.classList.add("dark");
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
};
