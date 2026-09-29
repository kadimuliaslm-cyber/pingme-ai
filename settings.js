
const chatArea =
  document.getElementById("chatArea");

const welcomeScreen =
  document.getElementById("welcomeScreen");

const messageInput =
  document.getElementById("messageInput");

const sendBtn =
  document.getElementById("sendBtn");

const plusBtn =
  document.getElementById("plusBtn");

const cameraBtn =
  document.getElementById("cameraBtn");

const micBtn =
  document.getElementById("micBtn");

const menuBtn =
  document.getElementById("menuBtn");


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
- Always maintain the PingMe AI identity.

Answer naturally and helpfully.

Reply in the same language the user uses whenever possible.

If the user speaks Bangla,
reply in Bangla.

If the user speaks English,
reply in English.
`;


// ===============================
// Add Message
// ===============================

function addMessage(text, sender) {

  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }


  const row =
    document.createElement("div");


  row.className =
    sender === "user"
      ? "message-row user"
      : "message-row ai";


  const message =
    document.createElement("div");


  message.className = "message";


  message.innerText = text;


  row.appendChild(message);


  chatArea.appendChild(row);


  chatArea.scrollTop =
    chatArea.scrollHeight;


  return row;
}


// ===============================
// Thinking Spinner
// ===============================

function addThinkingMessage() {

  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }


  const row =
    document.createElement("div");


  row.className =
    "message-row ai thinking-row";


  const message =
    document.createElement("div");


  message.className =
    "message thinking-message";


  message.innerHTML = `
    <div class="thinking-spinner"></div>
  `;


  row.appendChild(message);


  chatArea.appendChild(row);


  chatArea.scrollTop =
    chatArea.scrollHeight;


  return row;
}


// ===============================
// Send Message
// ===============================

async function sendMessage() {

  const text =
    messageInput.value.trim();


  if (!text) {
    return;
  }


  // User message
  addMessage(
    text,
    "user"
  );


  // Clear input
  messageInput.value = "";

  messageInput.style.height =
    "auto";


  // Thinking spinner
  const thinkingMessage =
    addThinkingMessage();


  try {

    // ===============================
    // Wait for AI Model
    // ===============================

    let attempts = 0;


    while (
      !window.pingMeAIModel &&
      attempts < 50
    ) {

      await new Promise(
        resolve =>
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
    // Prompt
    // ===============================

    const finalPrompt =
      PINGME_AI_INSTRUCTION +
      "\n\nUser message:\n" +
      text;


    // ===============================
    // AI Request
    // ===============================

    const result =
      await window
        .pingMeAIModel
        .generateContent(
          finalPrompt
        );


    const response =
      result.response;


    const answer =
      response.text();


    // Remove spinner
    thinkingMessage.remove();


    // AI message
    addMessage(
      answer ||
      "AI কোনো উত্তর দেয়নি।",
      "ai"
    );

  }

  catch (error) {

    console.error(
      "PingMe AI Error:",
      error
    );


    // Remove spinner
    thinkingMessage.remove();


    const errorText =
      String(
        error?.message ||
        error ||
        ""
      );


    // ===============================
    // Quota
    // ===============================

    if (
      errorText.includes("429") ||
      errorText.includes("quota") ||
      errorText.includes("Quota exceeded") ||
      errorText.includes(
        "generate_content_free_tier_requests"
      )
    ) {

      addMessage(
        "AI এখন সাময়িকভাবে ব্যস্ত। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );

      return;
    }


    // ===============================
    // Model Error
    // ===============================

    if (
      errorText.includes(
        "MODEL_NOT_FOUND"
      )
    ) {

      addMessage(
        "PingMe AI এখন চালু হতে একটু সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );

      return;
    }


    // ===============================
    // Other Error
    // ===============================

    addMessage(
      "দুঃখিত, এই মুহূর্তে AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা কর।",
      "ai"
    );

  }
}


// ===============================
// Send Button
// ===============================

sendBtn.addEventListener(
  "click",
  sendMessage
);


// ===============================
// Enter
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
// Auto Resize
// ===============================

messageInput.addEventListener(
  "input",
  function() {

    this.style.height =
      "auto";


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
  .querySelectorAll(
    ".suggestion-item"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        messageInput.value =
          this.querySelector(
            ".text"
          )?.innerText ||
          this.innerText;


        messageInput.focus();


        messageInput.dispatchEvent(
          new Event("input")
        );

      }
    );

  });


// ===============================
// Plus Button
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
