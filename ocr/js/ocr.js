async function runOCR(blob, lang, mode){
  const worker = await Tesseract.createWorker(lang, 1, {
    logger:m=>console.log(m)
  });

  if(mode === "handwriting"){
    await worker.setParameters({
      tessedit_pageseg_mode: 6,
      classify_bln_numeric_mode: 0
    });
  }

  const { data:{ text } } = await worker.recognize(blob);
  await worker.terminate();
  return text;
}
