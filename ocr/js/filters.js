function applyFilter(mat, mode){
  const dst = new cv.Mat();

  if(mode === "bw"){
    cv.cvtColor(mat, dst, cv.COLOR_RGBA2GRAY);
    cv.adaptiveThreshold(dst, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C,
      cv.THRESH_BINARY, 15, 5);
  }
  else if(mode === "enhance"){
    cv.cvtColor(mat, dst, cv.COLOR_RGBA2GRAY);
    cv.equalizeHist(dst, dst);
  }
  else if(mode === "sharpen"){
    const kernel = cv.matFromArray(3,3,cv.CV_32F,[0,-1,0,-1,5,-1,0,-1,0]);
    cv.filter2D(mat, dst, cv.CV_8U, kernel);
  }
  else{
    mat.copyTo(dst);
  }

  return dst;
}
