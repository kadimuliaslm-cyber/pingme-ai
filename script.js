const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const plusBtn = document.getElementById("plusBtn");
const cameraBtn = document.getElementById("cameraBtn");
const micBtn = document.getElementById("micBtn");
const menuBtn = document.getElementById("menuBtn");


// ===============================
// PingMe AI Identity
// ===============================

const PINGME_AI_INSTRUCTION = `
You are PingMe AI.

Your name is PingMe AI.
You are the AI of the PingMe AI platform.

IMPORTANT IDENTITY RULES:
- If the user asks your name, say your name is PingMe AI.
- Never introduce yourself as Gemini.
- Never say that your name is Google Gemini.
- Never claim that you are Google's AI.
- Do not use Gemini as your identity.
- Do not describe yourself as a generic assistant when talking about your identity.
- Always maintain the PingMe AI identity.

Answer naturally and helpfully.
Reply in the same language the user uses whenever possible.
If the user speaks Bangla, reply in Bangla.
If the user speaks English, reply in English.
`;


// ===============================
// Add message
// ===============================

function addMessage(text, sender) {

  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }

  const message = document.createElement("div");

  message.className =
    sender === "user"
      ? "message user-message"
      : "message ai-message";

  message.innerText = text;

  chatArea.appendChild(message);

  chatArea.scrollTop = chatArea.scrollHeight;

  return message;
}


// ===============================
// Send message
// ===============================

async function sendMessage() {

  const text = messageInput.value.trim();

  if (!text) return;

  addMessage(text, "user");

  messageInput.value = "";
  messageInput.style.height = "auto";

  const thinkingMessage =
    addMessage("ভাবছি...", "ai");

  try {

    // Wait for Firebase AI model
    let attempts = 0;

    while (!window.pingMeAIModel && attempts < 50) {

      await new Promise(resolve =>
        setTimeout(resolve, 100)
      );

      attempts++;
    }


    if (!window.pingMeAIModel) {

      throw new Error(
        "MODEL_NOT_FOUND"
      );

    }


    // ===============================
    // PingMe AI Prompt
    // ===============================

    const finalPrompt =
      PINGME_AI_INSTRUCTION +
      "\n\nUser message:\n" +
      text;


    // ===============================
    // Ask AI
    // ===============================

    const result =
      await window.pingMeAIModel.generateContent(
        finalPrompt
      );


    const response =
      result.response;


    const answer =
      response.text();


    thinkingMessage.remove();


    addMessage(
      answer || "AI কোনো উত্তর দেয়নি।",
      "ai"
    );

  }

  catch (error) {

    console.error(
      "PingMe AI Error:",
      error
    );


    // Remove "ভাবছি..."
    thinkingMessage.remove();


    // ===============================
    // Friendly Error Messages
    // ===============================

    const errorText =
      String(error?.message || error || "");


    // Quota / 429
    if (
      errorText.includes("429") ||
      errorText.includes("quota") ||
      errorText.includes("Quota exceeded") ||
      errorText.includes("generate_content_free_tier_requests")
    ) {

      addMessage(
        "AI এখন সাময়িকভাবে ব্যস্ত। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );

      return;
    }


    // Model not found
    if (
      errorText.includes("MODEL_NOT_FOUND")
    ) {

      addMessage(
        "PingMe AI এখন চালু হতে একটু সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );

      return;
    }


    // Other errors
    addMessage(
      "দুঃখিত, এই মুহূর্তে AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা কর।",
      "ai"
    );

  }

}


// ===============================
// Send button
// ===============================

sendBtn.addEventListener(
  "click",
  sendMessage
);


// ===============================
// Enter to send
// Shift + Enter = new line
// ===============================

messageInput.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }
);


// ===============================
// Auto resize
// ===============================

messageInput.addEventListener(
  "input",
  function() {

    this.style.height = "auto";

    this.style.height =
      Math.min(
        this.scrollHeight,
        140
      ) + "px";

  }
);


// ===============================
// Suggestions
// ===============================

document
  .querySelectorAll(".suggestion")
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        messageInput.value =
          this.innerText;

        messageInput.focus();

        messageInput.dispatchEvent(
          new Event("input")
        );

      }
    );

  });


// ===============================
// Plus
// ===============================

plusBtn.addEventListener(
  "click",
  function() {

    alert(
      "File attachment feature আসছে।"
    );

  }
);


// ===============================
// Camera
// ===============================

cameraBtn.addEventListener(
  "click",
  function() {

    alert(
      "Camera feature আসছে।"
    );

  }
);


// ===============================
// Microphone
// ===============================

micBtn.addEventListener(
  "click",
  function() {

    alert(
      "Voice input feature আসছে।"
    );

  }
);


// ===============================
// Menu
// ===============================

menuBtn.addEventListener(
  "click",
  function() {

    alert(
      "PingMe AI menu আসছে।"
    );

  }
);
