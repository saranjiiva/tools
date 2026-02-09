const historyList = document.getElementById("historyList");

function saveHistory(text, img){
  const data = JSON.parse(localStorage.history || "[]");
  data.unshift({ text, img, time: Date.now() });
  localStorage.history = JSON.stringify(data.slice(0,20));
  loadHistory();
}

function loadHistory(){
  historyList.innerHTML = "";
  const data = JSON.parse(localStorage.history || "[]");
  data.forEach(item=>{
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerText = item.text.slice(0,120) + "...";
    div.onclick = ()=>{
      document.getElementById("output").value = item.text;
    };
    historyList.appendChild(div);
  });
}

loadHistory();
