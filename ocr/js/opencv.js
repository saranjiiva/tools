function detectEdgesHTML(img){
  const src = cv.imread(img);
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  cv.GaussianBlur(gray, gray, new cv.Size(5,5), 0);
  cv.Canny(gray, gray, 75, 200);

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(gray, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

  let maxArea = 0;
  let best = null;

  for(let i=0;i<contours.size();i++){
    const cnt = contours.get(i);
    const peri = cv.arcLength(cnt, true);
    const approx = new cv.Mat();
    cv.approxPolyDP(cnt, approx, 0.02*peri, true);
    if(approx.rows === 4){
      const area = cv.contourArea(cnt);
      if(area > maxArea){
        maxArea = area;
        best = approx;
      }
    }
  }

  return { src, contour: best };
}

function warpPerspectiveHTML(src, contour){
  const pts = [];
  for(let i=0;i<4;i++){
    pts.push({ x: contour.intAt(i,0), y: contour.intAt(i,1) });
  }

  const [tl,tr,br,bl] = orderPoints(pts);
  const widthA = Math.hypot(br.x-bl.x, br.y-bl.y);
  const widthB = Math.hypot(tr.x-tl.x, tr.y-tl.y);
  const maxWidth = Math.max(widthA,widthB);

  const heightA = Math.hypot(tr.x-br.x, tr.y-br.y);
  const heightB = Math.hypot(tl.x-bl.x, tl.y-bl.y);
  const maxHeight = Math.max(heightA,heightB);

  const dst = cv.matFromArray(4,1,cv.CV_32FC2,[
    0,0,
    maxWidth-1,0,
    maxWidth-1,maxHeight-1,
    0,maxHeight-1
  ]);

  const srcMat = cv.matFromArray(4,1,cv.CV_32FC2,[
    tl.x,tl.y,
    tr.x,tr.y,
    br.x,br.y,
    bl.x,bl.y
  ]);

  const M = cv.getPerspectiveTransform(srcMat, dst);
  const warped = new cv.Mat();
  cv.warpPerspective(src, warped, M, new cv.Size(maxWidth, maxHeight));

  return warped;
}

function orderPoints(pts){
  pts.sort((a,b)=>a.x+a.y - (b.x+b.y));
  const tl = pts[0];
  const br = pts[3];
  pts.sort((a,b)=>a.y-a.y);
  const tr = pts[1];
  const bl = pts[2];
  return [tl,tr,br,bl];
}
