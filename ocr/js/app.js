const fileInput = document.getElementById("fileInput");
const previewArea = document.getElementById("previewArea");
const ocrBtn = document.getElementById("ocrBtn");
const pdfBtn = document.getElementById("pdfBtn");
const copyBtn = document.getElementById("copyBtn");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const filterSelect = document.getElementById("filterSelect");
const langSelect = document.getElementById("langSelect");
const modeSelect = document.getElementById("modeSelect");
const output = document.getElementById("output");

let pages = [];

fileInput.onchange = handleFiles;
pdfBtn.onclick = ()=>exportPDF(pages);
copyBtn.onclick = ()=>navigator.clipboard.writeText(output.value);
saveBtn.onclick = ()=>saveHistory(output.value, pages[0]);
clearBtn.onclick = clearAll;

window.addEventListener("cameraCaptured", e=>{
  handleImage(e.detail);
});

function handleFiles(){
  [...fileInput.files].forEach(file=>{
    const reader = new FileReader();
    reader.onload = ()=>handleImage(reader.result);
    reader.readAsDataURL(file);
  });
}

async function handleImage(dataURL){
  const img = new Image();
  img.src = dataURL;
  await img.decode();

  const { src, contour } = detectEdgesHTML(img);
  let processed = src;

  if(contour){
    processed = warpPerspectiveHTML(src, contour);
  }

  const filtered = applyFilter(processed, filterSelect.value);

  const canvas = document.createElement("canvas");
  cv.imshow(canvas, filtered);
  const finalImg = canvas.toDataURL("image/png");

  pages.push(finalImg);
  previewArea.appendChild(Object.assign(new Image(), { src: finalImg }));

  src.delete();
  filtered.delete();
}

ocrBtn.onclick = async ()=>{
  output.value = "";
  for(const img of pages){
    const blob = await fetch(img).then(r=>r.blob());
    const text = await runOCR(blob, langSelect.value, modeSelect.value);
    output.value += text + "\n\n";
  }
};

function clearAll(){
  pages = [];
  previewArea.innerHTML = "";
  output.value = "";
}
