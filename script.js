// 🔹 DOM
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

// 🔹 Memory
let chatMemory = JSON.parse(localStorage.getItem("hridoyMemory")) || [];

// 🔹 Show message
function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = `message ${cls}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// 🔹 Voice output
function speak(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.lang = "bn-BD";
  msg.text = text;
  window.speechSynthesis.speak(msg);
}

// 🔹 Typing Indicator
let typingDiv = null;
function showTyping() {
  typingDiv = document.createElement("div");
  typingDiv.className = "typing hridoy";
  typingDiv.innerHTML = "<span></span><span></span><span></span>";
  chat.appendChild(typingDiv);
  chat.scrollTop = chat.scrollHeight;
}
function hideTyping() {
  if (typingDiv) {
    typingDiv.remove();
    typingDiv = null;
  }
}

// 🔹 Hridoy Reply (Next Level)
function hridoyReply(userText) {
  const text = userText.toLowerCase();

  // Name
  if (
    text.includes("তোমার নাম") ||
    text.includes("নাম কি") ||
    text.includes("তুমি কে")
  ) return "আমার নাম হৃদয়।";

  // Education
  if (
    text.includes("কলেজ") ||
    text.includes("পড়াশুনা") ||
    text.includes("হরহঙ্গা")
  )
    return "আমি হরহঙ্গা কলেজ থেকে পড়াশুনা করেছি।";

  // Mood
  if (text.includes("কি খবর") || text.includes("কেমন আছ"))
    return ["ভালোই আছি।", "মোটামুটি।", "আজ একটু ক্লান্ত।", "ঠিকঠাক।"][Math.floor(Math.random()*4)];

  // Location
  if (text.includes("কোথায়") || text.includes("এখন কোথায়"))
    return ["বাসাতেই আছি।", "ঘরেই।", "এখন বাইরে না।"][Math.floor(Math.random()*3)];

  // Food
  if (text.includes("খাইছ") || text.includes("খাইছো"))
    return ["হ্যাঁ, খাইলাম।", "না, খাই নাই।", "চা খাইছিলাম।"][Math.floor(Math.random()*3)];
  if (text.includes("কি খাই")) return ["ভাত খাইলাম।","ডিম ভাজি।","হালকা কিছু।"][Math.floor(Math.random()*3)];

  // Why / How
  if (text.includes("কেন") || text.includes("কিভাবে"))
    return ["হতে পারে।","ঠিক জানি না।","সম্ভব।"][Math.floor(Math.random()*3)];

  // Short input
  if (userText.length < 3) return "হুম।";

  // Fallback
  return ["আচ্ছা।","বুঝছি।","ঠিক আছে।","দেখা যাক।","এমনই।"][Math.floor(Math.random()*5)];
}

// 🔹 Send Message
function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("তুমি: " + userText, "user");
  chatMemory.push("USER: " + userText);
  input.value = "";

  setTimeout(() => {
    showTyping();
    setTimeout(() => {
      hideTyping();
      const reply = hridoyReply(userText);
      addMessage(reply, "hridoy");
      speak(reply);
      chatMemory.push("HRIDOY: " + reply);
      if (chatMemory.length > 50) chatMemory = chatMemory.slice(-50);
      localStorage.setItem("hridoyMemory", JSON.stringify(chatMemory));
    }, 1000 + Math.random()*800);
  }, 400);
}

// 🔹 Voice Input
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("ভয়েস ইনপুট সাপোর্ট করে না।");

  const recognition = new SpeechRecognition();
  recognition.lang = "bn-BD";
  recognition.continuous = false;
  recognition.onresult = (event) => {
    input.value = event.results[0][0].transcript;
    sendMessage();
  };
  recognition.start();
}

// 🔹 Fake Online Status
setInterval(()=>{
  const status = document.getElementById("status");
  status.innerText = Math.random() > 0.8 ? "typing…" : "online";
}, 5000);
