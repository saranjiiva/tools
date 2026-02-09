async function imageToCode(){
  const apiKey = document.getElementById("apiKey").value.trim();
  const file = document.getElementById("imageInput").files[0];
  if(!apiKey || !file) return alert("Enter API key and image");

  document.getElementById("codeOutput").textContent = "Analyzing image...";

  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(",")[1];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + apiKey
      },
      body:JSON.stringify({
        model:"gpt-4.1-mini",
        messages:[
          {role:"system", content:"Convert this UI image into HTML/CSS/JS code."},
          {
            role:"user",
            content:[
              {type:"text", text:"Generate frontend code for this UI"},
              {type:"image_url", image_url:{url:"data:image/png;base64,"+base64}}
            ]
          }
        ]
      })
    });

    const data = await res.json();
    document.getElementById("codeOutput").textContent =
      data.choices[0].message.content;
  };
  reader.readAsDataURL(file);
}
