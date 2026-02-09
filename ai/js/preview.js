function previewCode(){
  const code = document.getElementById("codeOutput").textContent;
  const iframe = document.getElementById("previewFrame");
  iframe.srcdoc = code;
}
