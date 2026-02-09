const cameraSection = document.getElementById("cameraSection");
const scanSection = document.getElementById("scanSection");
const video = document.getElementById("camera");
const canvas = document.getElementById("cameraCanvas");
const captureBtn = document.getElementById("captureBtn");
const closeCameraBtn = document.getElementById("closeCameraBtn");
let stream;

document.getElementById("openCameraBtn").onclick = openCamera;
closeCameraBtn.onclick = closeCamera;
captureBtn.onclick = captureFrame;

async function openCamera(){
  cameraSection.hidden = false;
  scanSection.hidden = true;
  stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:"environment" } });
  video.srcObject = stream;
}

function closeCamera(){
  cameraSection.hidden = true;
  scanSection.hidden = false;
  if(stream) stream.getTracks().forEach(t => t.stop());
}

function captureFrame(){
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video,0,0);
  const dataURL = canvas.toDataURL("image/png");
  window.dispatchEvent(new CustomEvent("cameraCaptured",{ detail:dataURL }));
  closeCamera();
}
