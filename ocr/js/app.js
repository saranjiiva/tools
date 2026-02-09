const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const extractBtn = document.getElementById("extractBtn");
const output = document.getElementById("output");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.hidden = false;
    extractBtn.hidden = false;
    output.value = "";
  };
  reader.readAsDataURL(file);
});

extractBtn.addEventListener("click", async () => {
  extractBtn.innerText = "Processing...";
  extractBtn.disabled = true;

  const worker = await Tesseract.createWorker("eng+tam+hin");
  const { data:{ text } } = await worker.recognize(preview.src);
  await worker.terminate();

  output.value = text.trim();
  extractBtn.innerText = "Extract Text";
  extractBtn.disabled = false;
});
