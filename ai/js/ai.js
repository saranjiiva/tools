async function generateCode(){
  const apiKey = document.getElementById("apiKey").value.trim();
  const prompt = document.getElementById("promptInput").value.trim();
  if(!apiKey || !prompt) return alert("Enter API key and prompt");

  document.getElementById("codeOutput").textContent = "Generating...";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + apiKey
    },
    body:JSON.stringify({
      model:"gpt-4.1-mini",
      messages:[
        {role:"system", content:"Generate clean HTML/CSS/JS code only."},
        {role:"user", content:prompt}
      ]
    })
  });

  const data = await res.json();
  document.getElementById("codeOutput").textContent =
    data.choices[0].message.content;
}
