async function exportPDF(images){
  if(!images.length) return alert("No pages to export");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for(let i=0;i<images.length;i++){
    if(i>0) pdf.addPage();
    pdf.addImage(images[i], "PNG", 10, 10, 190, 260);
  }

  pdf.save("scan.pdf");
}
