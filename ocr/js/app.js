const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const preview = document.getElementById("preview");
const extractBtn = document.getElementById("extractBtn");
const output = document.getElementById("output");

// Drag & Drop
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.style.background = "#eff6ff";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "";
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.style.background = "";
  handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener("change", () => {
  handleFile(fileInput.files[0]);
});

function handleFile(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.hidden = false;
    extractBtn.hidden = false;
    output.value = "";
  };
  reader.readAsDataURL(file);
}

extractBtn.onclick = async () => {
  extractBtn.innerText = "Processing...";
  output.value = "";

  const worker = await Tesseract.createWorker("eng+tam+hin", 1);

  const { data:{ text } } = await worker.recognize(preview.src);

  await worker.terminate();
  output.value = text.trim();
  extractBtn.innerText = "Extract Text";
};
