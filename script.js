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

// 🔹 Hridoy-style daily response generator
function hridoyReply(userText) {
  const text = userText.toLowerCase();

  // =========================
  // BASIC IDENTITY
  // =========================
  if (
    text.includes("তোমার নাম") ||
    text.includes("নাম কি") ||
    text.includes("তুমি কে")
  ) {
    return "আমার নাম হৃদয়।";
  }

  // =========================
  // EDUCATION
  // =========================
  if (
    text.includes("কোথায় পড়ছ") ||
    text.includes("পড়াশুনা") ||
    text.includes("কলেজ") ||
    text.includes("হরহঙ্গা")
  ) {
    const eduReplies = [
      "আমি হরহঙ্গা কলেজ থেকে পড়াশুনা করেছি।",
      "হরহঙ্গা কলেজেই পড়েছি।",
      "পড়াশুনা হরহঙ্গা কলেজ থেকেই।"
    ];
    return eduReplies[Math.floor(Math.random() * eduReplies.length)];
  }

  // =========================
  // GREETINGS / MOOD
  // =========================
  if (
    text.includes("কি খবর") ||
    text.includes("কেমন আছ") ||
    text.includes("কেমন আছেন")
  ) {
    const moodReplies = [
      "মোটামুটি।",
      "ভালোই আছি।",
      "চলতেছে।",
      "আজ একটু ক্লান্ত।",
      "এখন ঠিকঠাক।"
    ];
    return moodReplies[Math.floor(Math.random() * moodReplies.length)];
  }

  // =========================
  // LOCATION
  // =========================
  if (text.includes("কোথায় আছ") || text.includes("এখন কোথায়")) {
    const locReplies = [
      "বাসাতেই আছি।",
      "এই পাশেই।",
      "এখন বাইরে না।",
      "ঘরেই।"
    ];
    return locReplies[Math.floor(Math.random() * locReplies.length)];
  }

  // =========================
  // FOOD
  // =========================
  if (text.includes("খাইছ") || text.includes("খাইছো")) {
    const foodReplies = [
      "হ্যাঁ, একটু আগে খাইলাম।",
      "না, এখনো খাই নাই।",
      "চা খাইছিলাম।",
      "আজ খাওয়ার ইচ্ছে কম।"
    ];
    return foodReplies[Math.floor(Math.random() * foodReplies.length)];
  }

  if (text.includes("কি খাই")) {
    const eatReplies = [
      "ভাত খাইলাম।",
      "ডিম ভাজি।",
      "হালকা কিছু।",
      "ঠিক মনে নাই।"
    ];
    return eatReplies[Math.floor(Math.random() * eatReplies.length)];
  }

  // =========================
  // TIME / DAY
  // =========================
  if (text.includes("আজ") || text.includes("দিনটা")) {
    const dayReplies = [
      "আজ দিনটা মোটামুটি।",
      "আজ একটু চাপ ছিল।",
      "আজ তাড়াতাড়ি শেষ হইলো দিন।",
      "আজ কিছুই করা হয় নাই।"
    ];
    return dayReplies[Math.floor(Math.random() * dayReplies.length)];
  }

  // =========================
  // WHY / HOW
  // =========================
  if (text.includes("কেন") || text.includes("কিভাবে")) {
    const whyReplies = [
      "হতে পারে।",
      "ঠিক জানি না।",
      "সম্ভব।",
      "মনে হয় তাই।",
      "এটা বলা মুশকিল।"
    ];
    return whyReplies[Math.floor(Math.random() * whyReplies.length)];
  }

  // =========================
  // SHORT / YES NO
  // =========================
  if (text === "হ্যাঁ" || text === "না" || text.length < 3) {
    const shortReplies = [
      "হুম।",
      "আচ্ছা।",
      "ঠিক আছে।"
    ];
    return shortReplies[Math.floor(Math.random() * shortReplies.length)];
  }

  // =========================
  // CONFUSION / ANGER
  // =========================
  if (
    text.includes("মিল") ||
    text.includes("বুঝ") ||
    text.includes("উল্টা")
  ) {
    const calmReplies = [
      "হতে পারে ঠিক মতো বোঝাতে পারি নাই।",
      "একটু এলোমেলো হইছে।",
      "আস্তে আস্তে বলো।"
    ];
    return calmReplies[Math.floor(Math.random() * calmReplies.length)];
  }

  // =========================
  // FALLBACK (SAFE DAILY CHAT)
  // =========================
  const fallbackReplies = [
    "আচ্ছা।",
    "বুঝছি।",
    "ঠিক আছে।",
    "দেখা যাক।",
    "এমনই।",
    "হুম।"
  ];
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
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
