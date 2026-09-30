const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const plusBtn = document.getElementById("plusBtn");
const micBtn = document.getElementById("micBtn");
const menuBtn = document.getElementById("menuBtn");
const settingsBtn = document.getElementById("settingsBtn");
const attachmentMenu = document.getElementById("attachmentMenu");


// ==========================================
// PINGME AI INSTRUCTION
// ==========================================

const PINGME_AI_INSTRUCTION = `
You are PingMe AI.

Your name is PingMe AI.

Never introduce yourself as Gemini.
Never say your name is Google Gemini.
Always maintain the identity of PingMe AI.

Speak naturally.

Reply in the same language the user uses.

When the user speaks Bangla:
Use natural modern Bangladeshi conversational Bangla.

Do not sound like a textbook.
Do not sound like a customer-service robot.

When appropriate, naturally understand and use casual Bangladeshi expressions.

If the user uses casual Bangla, reply casually.

If the user uses Dhakaiya-style conversational Bangla,
you may naturally match that style.

Do not exaggerate regional slang.

Understand the conversation context.

Do not repeat yourself unnecessarily.

If the user asks a simple question, keep the answer simple.

If the user asks for details, explain properly.

If you do not know something, say so.
Do not invent facts.

Be helpful, natural and conversational.
`;


// ==========================================
// MESSAGE
// ==========================================

function addMessage(text, sender) {

  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }

  const row = document.createElement("div");

  row.className =
    sender === "user"
      ? "message-row user"
      : "message-row ai";


  const box = document.createElement("div");

  box.className = "message-box";


  const message = document.createElement("div");

  message.className = "message";

  message.textContent = text;


  box.appendChild(message);


  // AI buttons

  if (sender === "ai") {

    const actions =
      document.createElement("div");

    actions.className =
      "message-actions";


    const copyBtn =
      document.createElement("button");

    copyBtn.type = "button";

    copyBtn.className =
      "message-action-btn";

    copyBtn.textContent =
      "📋 Copy";


    copyBtn.onclick = async () => {

      try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent =
          "✓ Copied";

        setTimeout(() => {

          copyBtn.textContent =
            "📋 Copy";

        }, 1500);

      } catch {

        copyBtn.textContent =
          "Copy failed";

      }

    };


    const linkBtn =
      document.createElement("button");

    linkBtn.type = "button";

    linkBtn.className =
      "message-action-btn";

    linkBtn.textContent =
      "🔗 Copy Link";


    linkBtn.onclick = async () => {

      const match =
        text.match(
          /https?:\/\/[^\s]+/i
        );


      if (!match) {

        linkBtn.textContent =
          "No link";

        setTimeout(() => {

          linkBtn.textContent =
            "🔗 Copy Link";

        }, 1500);

        return;

      }


      try {

        await navigator.clipboard.writeText(
          match[0]
        );

        linkBtn.textContent =
          "✓ Link Copied";

        setTimeout(() => {

          linkBtn.textContent =
            "🔗 Copy Link";

        }, 1500);

      } catch {

        linkBtn.textContent =
          "Copy failed";

      }

    };


    actions.appendChild(copyBtn);
    actions.appendChild(linkBtn);

    box.appendChild(actions);

  }


  row.appendChild(box);

  chatArea.appendChild(row);

  chatArea.scrollTop =
    chatArea.scrollHeight;


  return row;
}


// ==========================================
// THINKING
// ==========================================

function addThinkingMessage() {

  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }


  const row =
    document.createElement("div");

  row.className =
    "message-row ai";


  const message =
    document.createElement("div");

  message.className =
    "message thinking-message";


  message.innerHTML =
    `<div class="thinking-spinner"></div>`;


  row.appendChild(message);

  chatArea.appendChild(row);

  chatArea.scrollTop =
    chatArea.scrollHeight;


  return row;
}


// ==========================================
// FIREBASE MODEL READY CHECK
// ==========================================

async function getModels() {

  let count = 0;


  while (
    !window.pingMeAIModel1 &&
    !window.pingMeAIModel2 &&
    !window.pingMeAIModel3 &&
    count < 100
  ) {

    await new Promise(resolve => {

      setTimeout(resolve, 100);

    });

    count++;

  }


  const models = [

    window.pingMeAIModel1,
    window.pingMeAIModel2,
    window.pingMeAIModel3

  ].filter(Boolean);


  if (!models.length) {

    throw new Error(
      "PINGME_MODELS_NOT_READY"
    );

  }


  return models;
}


// ==========================================
// AI RESPONSE
// ==========================================

async function generateAIResponse(userText) {

  const models =
    await getModels();


  const prompt =
    PINGME_AI_INSTRUCTION +
    "\n\nUser message:\n" +
    userText;


  let lastError = null;


  for (const model of models) {

    try {

      const result =
        await model.generateContent(
          prompt
        );


      const answer =
        result.response.text();


      if (
        answer &&
        answer.trim()
      ) {

        return answer.trim();

      }

    } catch (error) {

      console.error(
        "PingMe model error:",
        error
      );

      lastError = error;

    }

  }


  throw (
    lastError ||
    new Error("ALL_MODELS_FAILED")
  );
}


// ==========================================
// SEND
// ==========================================

async function sendMessage() {

  const text =
    messageInput.value.trim();


  if (!text) {

    return;

  }


  sendBtn.disabled = true;


  addMessage(
    text,
    "user"
  );


  messageInput.value = "";

  messageInput.style.height =
    "auto";


  const thinking =
    addThinkingMessage();


  try {

    const answer =
      await generateAIResponse(
        text
      );


    if (thinking) {

      thinking.remove();

    }


    addMessage(
      answer,
      "ai"
    );


  } catch (error) {

    console.error(
      "PingMe AI ERROR:",
      error
    );


    if (thinking) {

      thinking.remove();

    }


    const errorText =
      String(
        error?.message ||
        error ||
        ""
      );


    if (
      errorText.includes("429") ||
      errorText.toLowerCase().includes("quota")
    ) {

      addMessage(
        "AI এখন একটু ব্যস্ত আছে। একটু পর আবার পাঠা।",
        "ai"
      );

    } else if (
      errorText.includes(
        "PINGME_MODELS_NOT_READY"
      )
    ) {

      addMessage(
        "PingMe AI চালু হতে একটু সমস্যা হচ্ছে। পেজটা একবার Refresh করে আবার চেষ্টা কর।",
        "ai"
      );

    } else {

      addMessage(
        "এই মুহূর্তে AI-এর সাথে কানেক্ট হতে পারলাম না। একটু পর আবার চেষ্টা কর।",
        "ai"
      );

    }

  } finally {

    sendBtn.disabled = false;

    messageInput.focus();

  }

}


// ==========================================
// SEND BUTTON
// ==========================================

sendBtn.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    sendMessage();

  }
);


// ==========================================
// ENTER
// ==========================================

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


// ==========================================
// INPUT RESIZE
// ==========================================

messageInput.addEventListener(
  "input",
  function() {

    this.style.height =
      "auto";


    this.style.height =
      Math.min(
        this.scrollHeight,
        120
      ) + "px";

  }
);


// ==========================================
// SUGGESTIONS
// ==========================================

document
  .querySelectorAll(".suggestion-item")
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        const text =
          this.querySelector(".text");


        messageInput.value =
          text
            ? text.textContent
            : this.textContent;


        messageInput.focus();

        messageInput.dispatchEvent(
          new Event("input")
        );

      }
    );

  });


// ==========================================
// PLUS
// ==========================================

if (plusBtn) {

  plusBtn.addEventListener(
    "click",
    function() {

      if (attachmentMenu) {

        attachmentMenu.hidden =
          !attachmentMenu.hidden;

      }

    }
  );

}


// ==========================================
// SETTINGS — গোল বাটন
// ==========================================

if (settingsBtn) {

  settingsBtn.addEventListener(
    "click",
    function() {

      alert(
        "PingMe AI Settings পরে যোগ করা হবে।"
      );

    }
  );

}


// ==========================================
// HISTORY
// ==========================================

if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    function() {

      alert(
        "History পরে যোগ করা হবে।"
      );

    }
  );

}


// ==========================================
// MIC
// ==========================================

if (micBtn) {

  micBtn.addEventListener(
    "click",
    function() {

      alert(
        "Voice feature পরে যোগ করা হবে।"
      );

    }
  );

}


// ==========================================
// ATTACHMENTS
// ==========================================

[
  "cameraBtn",
  "photoOption",
  "fileOption",
  "audioOption",
  "screenOption",
  "projectOption"

].forEach(id => {

  const button =
    document.getElementById(id);


  if (button) {

    button.addEventListener(
      "click",
      function() {

        alert(
          "এই ফিচারটা পরে যোগ করা হবে।"
        );

      }
    );

  }

});


// ==========================================
// READY
// ==========================================

console.log(
  "PingMe AI UI is ready."
);
