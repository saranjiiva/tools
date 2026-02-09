function copyCode(){
  navigator.clipboard.writeText(document.getElementById("codeOutput").textContent);
  alert("Copied!");
}

function downloadCode(){
  const code = document.getElementById("codeOutput").textContent;
  const blob = new Blob([code], {type:"text/html"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "generated.html";
  a.click();
}
