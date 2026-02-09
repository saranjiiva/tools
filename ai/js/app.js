const themeToggle = document.getElementById("themeToggle");
let dark = false;

themeToggle.onclick = () => {
  dark = !dark;
  document.body.style.background = dark ? "#020617" : "#f8fafc";
  document.body.style.color = dark ? "#e5e7eb" : "#111827";
};
