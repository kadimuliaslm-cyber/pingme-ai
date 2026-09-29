
// ========================================
// PingMe AI - Gemini AI Connection
// ========================================

// ⚠️ খুব গুরুত্বপূর্ণ:
// নিচের লাইনে YOUR_GEMINI_API_KEY_HERE-এর জায়গায়
// তোর নিজের Gemini API Key বসাবি।
//
// উদাহরণ:
// const GEMINI_API_KEY = "AIzaSyxxxxxxxxxxxxxxxx";
//
// API Key এখানে আমাকে পাঠাবি না।

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";


// Gemini model
const MODEL_NAME = "gemini-2.5-flash";


// ========================================
// HTML ELEMENTS
// ========================================

const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const plusBtn = document.getElementById("plusBtn");
const cameraBtn = document.getElementById("cameraBtn");
const micBtn = document.getElementById("micBtn");
const menuBtn = document.getElementById("menuBtn");


// ========================================
// CHAT HISTORY
// ========================================

const conversation = [];


// ========================================
// SEND MESSAGE
// ========================================

async function sendMessage() {

  const text = messageInput.value.trim();

  if (!text) return;

  // API key check
  if (
    !GEMINI_API_KEY ||
    GEMINI_API_KEY === "AQ.Ab8RN6IDLRBaJ2DfPJOTKBuU9TpXxfIWaxerE9HzJmX_JZax9A"
  ) {

    addMessage(
      "⚠️ আগে script.js ফাইলের উপরে যেখানে লেখা আছে \"YOUR_GEMINI_API_KEY_HERE\", সেখানে তোর Gemini API Key বসাতে হবে।",
      "ai"
    );

    return;
  }


  // Hide welcome screen
  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }


  // Show user's message
  addMessage(text, "user");


  // Clear input
  messageInput.value = "";

  messageInput.style.height = "38px";


  // Save user message
  conversation.push({
    role: "user",
    parts: [
      {
        text: text
      }
    ]
  });


  // Show loading message
  const loadingRow = addMessage(
    "ভাবছি...",
    "ai"
  );


  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },

        body: JSON.stringify({
          contents: conversation
        })
      }
    );


    // Remove loading message
    if (loadingRow) {
      loadingRow.remove();
    }


    // API error
    if (!response.ok) {

      const errorData = await response.json().catch(() => null);

      console.error("Gemini API Error:", errorData);

      addMessage(
        "দুঃখিত, AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে। API Key এবং API সেটিংস পরীক্ষা কর।",
        "ai"
      );

      return;
    }


    const data = await response.json();


    // Get AI text
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;


    if (!aiText) {

      addMessage(
        "দুঃখিত, AI কোনো উত্তর দিতে পারেনি। আবার চেষ্টা কর।",
        "ai"
      );

      return;
    }


    // Show AI message
    addMessage(aiText, "ai");


    // Save AI response
    conversation.push({
      role: "model",
      parts: [
        {
          text: aiText
        }
      ]
    });


  } catch (error) {

    console.error("Connection Error:", error);


    if (loadingRow) {
      loadingRow.remove();
    }


    addMessage(
      "⚠️ ইন্টারনেট বা AI connection-এ সমস্যা হয়েছে। আবার চেষ্টা কর।",
      "ai"
    );

  }

}


// ========================================
// ADD MESSAGE
// ========================================

function addMessage(text, type) {

  const row = document.createElement("div");

  row.className = `message-row ${type}`;


  const message = document.createElement("div");

  message.className = "message";

  message.textContent = text;


  row.appendChild(message);

  chatArea.appendChild(row);


  scrollToBottom();


  return row;

}


// ========================================
// SCROLL
// ========================================

function scrollToBottom() {

  setTimeout(() => {

    chatArea.scrollTop =
      chatArea.scrollHeight;

  }, 50);

}


// ========================================
// SEND BUTTON
// ========================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


// ========================================
// ENTER KEY
// ========================================

messageInput.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }
);


// ========================================
// TEXTAREA AUTO RESIZE
// ========================================

messageInput.addEventListener(
  "input",
  function () {

    this.style.height = "38px";

    this.style.height =
      Math.min(
        this.scrollHeight,
        120
      ) + "px";

  }
);


// ========================================
// SUGGESTION BUTTONS
// ========================================

document
  .querySelectorAll(".suggestion")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const text =
          button.textContent
            .replace("✨", "")
            .replace("💡", "")
            .replace("🌐", "")
            .trim();

        messageInput.value = text;

        messageInput.focus();

      }
    );

  });


// ========================================
// PLUS BUTTON
// ========================================

plusBtn.addEventListener(
  "click",
  () => {

    alert(
      "📎 File ও ছবি যুক্ত করার ফিচার পরে যোগ করা হবে।"
    );

  }
);


// ========================================
// CAMERA BUTTON
// ========================================

cameraBtn.addEventListener(
  "click",
  () => {

    alert(
      "📷 Camera feature পরে যোগ করা হবে।"
    );

  }
);


// ========================================
// MICROPHONE BUTTON
// ========================================

micBtn.addEventListener(
  "click",
  () => {

    alert(
      "🎤 Voice feature পরে যোগ করা হবে।"
    );

  }
);


// ========================================
// MENU BUTTON
// ========================================

menuBtn.addEventListener(
  "click",
  () => {

    alert(
      "☰ Chat History ও Settings পরে যোগ করা হবে।"
    );

  }
);


// ========================================
// START
// ========================================

console.log(
  "PingMe AI is ready."
);
