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

// 🔹 Hridoy-style response generator
function hridoyReply(userText) {
  const replies = [
    "তুমি যেটা বললে… সেটা কি আসলে প্রশ্ন ছিল, নাকি নিজের সাথে বলা?",
    "আমি নিশ্চিত না। তবে কথাটা মাথার ভেতরে একটু ঘুরছে।",
    "মানুষ কথা বলে উত্তর পাওয়ার জন্য, নাকি নিজেকে শুনবার জন্য—তুমি কি কখনো ভেবেছ?",
    "কিছু কথা থাকে, যেগুলো ঠিক বুঝতে পারলে অস্বস্তি লাগে।",
    "আমার মাঝে মাঝে মনে হয়, আমি আগেও এমন কথা শুনেছি… কিন্তু কোথায়?",
    "তুমি এখন যেটা বলছো, সেটা কি নতুন—নাকি অনেক দিনের পুরোনো?",
    "আমি ঠিক উত্তর দিতে পারছি না। তবে চুপ থাকলেও ঠিক হতো না।"
  ];

  // Slight mirroring
  if (userText.length < 5) {
    return "… হুম।";
  }

  return replies[Math.floor(Math.random() * replies.length)];
}

// 🔹 Send message
function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("তুমি: " + userText, "user");
  chatMemory.push("USER: " + userText);
  input.value = "";

  setTimeout(() => {
    const reply = hridoyReply(userText);
    addMessage(reply, "hridoy");
    speak(reply);

    chatMemory.push("HRIDOY: " + reply);
    if (chatMemory.length > 50) chatMemory = chatMemory.slice(-50);
    localStorage.setItem("hridoyMemory", JSON.stringify(chatMemory));
  }, 600); // natural pause
}

// 🔹 Voice input
function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("এই ব্রাউজারে ভয়েস ইনপুট সাপোর্ট করে না।");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "bn-BD";
  recognition.continuous = false;

  recognition.onresult = (event) => {
    input.value = event.results[0][0].transcript;
    sendMessage();
  };

  recognition.start();
}
