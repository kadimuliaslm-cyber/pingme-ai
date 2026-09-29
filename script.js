const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const plusBtn = document.getElementById("plusBtn");
const cameraBtn = document.getElementById("cameraBtn");
const micBtn = document.getElementById("micBtn");
const menuBtn = document.getElementById("menuBtn");

const PINGME_AI_INSTRUCTION = `
You are PingMe AI.

Your name is PingMe AI.
You are the AI of the PingMe AI platform.

IMPORTANT IDENTITY RULES:
- If the user asks your name, say your name is PingMe AI.
- Never introduce yourself as Gemini.
- Never say that your name is Google Gemini.
- Never claim that you are Google's AI.
- Always maintain the PingMe AI identity.

Answer naturally and helpfully.
Reply in the same language the user uses whenever possible.
If the user speaks Bangla, reply in Bangla.
If the user speaks English, reply in English.
`;


/* ===============================
   ADD NORMAL MESSAGE
   =============================== */

function addMessage(text, sender) {
  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }

  const row = document.createElement("div");

  row.className =
    sender === "user"
      ? "message-row user"
      : "message-row ai";

  const message = document.createElement("div");

  message.className = "message";
  message.innerText = text;

  row.appendChild(message);
  chatArea.appendChild(row);

  chatArea.scrollTop = chatArea.scrollHeight;

  return row;
}


/* ===============================
   THINKING SPINNER
   =============================== */

function addThinkingMessage() {
  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }

  const row = document.createElement("div");

  row.className = "message-row ai thinking-message";

  const spinner = document.createElement("div");

  spinner.className = "thinking-spinner";

  row.appendChild(spinner);
  chatArea.appendChild(row);

  chatArea.scrollTop = chatArea.scrollHeight;

  return row;
}


/* ===============================
   WAIT FOR FIREBASE MODELS
   =============================== */

async function waitForModels() {
  let attempts = 0;

  while (
    !window.pingMeAIModel1 &&
    !window.pingMeAIModel2 &&
    !window.pingMeAIModel3 &&
    attempts < 100
  ) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (
    !window.pingMeAIModel1 &&
    !window.pingMeAIModel2 &&
    !window.pingMeAIModel3
  ) {
    throw new Error("MODEL_NOT_FOUND");
  }
}


/* ===============================
   GENERATE AI RESPONSE
   3 MODEL FALLBACK
   =============================== */

async function generateAIResponse(prompt) {
  await waitForModels();

  const models = [
    window.pingMeAIModel1,
    window.pingMeAIModel2,
    window.pingMeAIModel3
  ].filter(Boolean);

  let lastError = null;

  for (let i = 0; i < models.length; i++) {
    try {
      console.log("Trying PingMe AI model:", i + 1);

      const result = await models[i].generateContent(prompt);

      const response = result.response;

      const answer = response.text();

      if (answer && answer.trim()) {
        console.log("PingMe AI model", i + 1, "success");
        return answer.trim();
      }

    } catch (error) {
      lastError = error;

      console.error(
        "PingMe AI model",
        i + 1,
        "failed:",
        error
      );

      // Try next model
    }
  }

  throw lastError || new Error("ALL_MODELS_FAILED");
}


/* ===============================
   SEND MESSAGE
   =============================== */

async function sendMessage() {

  const text = messageInput.value.trim();

  if (!text) {
    return;
  }

  // Prevent double sending
  sendBtn.disabled = true;

  // User message
  addMessage(text, "user");

  // Clear input
  messageInput.value = "";
  messageInput.style.height = "auto";

  // AI thinking spinner
  const thinkingMessage = addThinkingMessage();

  try {

    const finalPrompt =
      PINGME_AI_INSTRUCTION +
      "\n\nUser message:\n" +
      text;

    const answer = await generateAIResponse(finalPrompt);

    // Remove spinner
    thinkingMessage.remove();

    // AI response
    addMessage(
      answer || "AI কোনো উত্তর দেয়নি।",
      "ai"
    );

  } catch (error) {

    console.error("PingMe AI Error:", error);

    // Remove spinner
    if (thinkingMessage) {
      thinkingMessage.remove();
    }

    const errorText =
      String(error?.message || error || "");

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

    } else if (
      errorText.includes("MODEL_NOT_FOUND")
    ) {

      addMessage(
        "PingMe AI এখন চালু হতে সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );

    } else {

      addMessage(
        "দুঃখিত, এই মুহূর্তে AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );
    }

  } finally {

    // Enable send button again
    sendBtn.disabled = false;

    messageInput.focus();
  }
}


/* ===============================
   SEND BUTTON
   =============================== */

if (sendBtn) {
  sendBtn.addEventListener("click", function(event) {
    event.preventDefault();
    sendMessage();
  });
}


/* ===============================
   ENTER TO SEND
   =============================== */

if (messageInput) {
  messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      sendMessage();
    }

  });


  /* ===============================
     AUTO RESIZE INPUT
     =============================== */

  messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
      Math.min(this.scrollHeight, 120) + "px";

  });
}


/* ===============================
   SUGGESTIONS
   =============================== */

document
  .querySelectorAll(".suggestion-item, .suggestion")
  .forEach(button => {

    button.addEventListener("click", function() {

      messageInput.value =
        this.innerText.trim();

      messageInput.focus();

      messageInput.dispatchEvent(
        new Event("input")
      );

    });

  });


/* ===============================
   PLUS BUTTON
   =============================== */

if (plusBtn) {

  plusBtn.addEventListener("click", function() {

    const menu =
      document.getElementById("attachmentMenu");

    if (menu) {
      menu.hidden = !menu.hidden;
    }

  });

}


/* ===============================
   CAMERA
   =============================== */

if (cameraBtn) {

  cameraBtn.addEventListener("click", function() {

    alert("Camera feature আসছে।");

  });

}


/* ===============================
   MIC
   =============================== */

if (micBtn) {

  micBtn.addEventListener("click", function() {

    alert("Voice input feature আসছে।");

  });

}


/* ===============================
   MENU
   =============================== */

if (menuBtn) {

  menuBtn.addEventListener("click", function() {

    alert("PingMe AI menu আসছে।");

  });

}


/* ===============================
   FILE OPTIONS
   =============================== */

const fileOptions = [
  "photoOption",
  "fileOption",
  "audioOption",
  "screenOption",
  "projectOption"
];

fileOptions.forEach(id => {

  const button = document.getElementById(id);

  if (button) {

    button.addEventListener("click", function() {

      alert("এই ফিচারটি শিগগিরই আসছে।");

    });

  }

});
