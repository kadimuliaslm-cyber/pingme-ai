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


  // ===============================
  // Message Box
  // ===============================

  const messageBox =
    document.createElement("div");

  messageBox.className =
    "message-box";


  // ===============================
  // Message
  // ===============================

  const message =
    document.createElement("div");

  message.className =
    "message";

  message.innerText =
    text;


  messageBox.appendChild(
    message
  );


  // ===============================
  // AI Actions
  // ===============================

  if (sender === "ai") {

    const actions =
      document.createElement("div");

    actions.className =
      "message-actions";


    // ===============================
    // Copy Button
    // ===============================

    const copyBtn =
      document.createElement("button");

    copyBtn.type =
      "button";

    copyBtn.className =
      "message-action-btn";

    copyBtn.innerHTML =
      "📋 Copy";


    copyBtn.addEventListener(
      "click",
      async function() {

        try {

          await navigator.clipboard.writeText(
            text
          );

          copyBtn.innerHTML =
            "✓ Copied";

          setTimeout(
            function() {

              copyBtn.innerHTML =
                "📋 Copy";

            },
            1500
          );

        } catch (error) {

          console.error(
            "Copy failed:",
            error
          );

        }

      }
    );


    actions.appendChild(
      copyBtn
    );


    // ===============================
    // Copy Link Button
    // ===============================

    const linkBtn =
      document.createElement("button");

    linkBtn.type =
      "button";

    linkBtn.className =
      "message-action-btn";

    linkBtn.innerHTML =
      "🔗 Copy Link";


    linkBtn.addEventListener(
      "click",
      async function() {

        const urlMatch =
          text.match(
            /https?:\/\/[^\s]+/i
          );


        if (!urlMatch) {

          linkBtn.innerHTML =
            "No link";

          setTimeout(
            function() {

              linkBtn.innerHTML =
                "🔗 Copy Link";

            },
            1500
          );

          return;
        }


        try {

          await navigator.clipboard.writeText(
            urlMatch[0]
          );

          linkBtn.innerHTML =
            "✓ Link Copied";

          setTimeout(
            function() {

              linkBtn.innerHTML =
                "🔗 Copy Link";

            },
            1500
          );

        } catch (error) {

          console.error(
            "Link copy failed:",
            error
          );

        }

      }
    );


    actions.appendChild(
      linkBtn
    );


    messageBox.appendChild(
      actions
    );

  }


  row.appendChild(
    messageBox
  );


  chatArea.appendChild(
    row
  );


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


  row.appendChild(
    message
  );


  chatArea.appendChild(
    row
  );


  chatArea.scrollTop =
    chatArea.scrollHeight;


  return row;
}


// ===============================
// Wait For Models
// ===============================

async function waitForModels() {

  let attempts = 0;


  while (
    !window.pingMeAIModel1 &&
    !window.pingMeAIModel2 &&
    !window.pingMeAIModel3 &&
    !window.pingMeAIModel &&
    attempts < 100
  ) {

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          100
        )
    );

    attempts++;
  }


  const models = [

    window.pingMeAIModel1,

    window.pingMeAIModel2,

    window.pingMeAIModel3,

    window.pingMeAIModel

  ].filter(Boolean);


  if (!models.length) {

    throw new Error(
      "MODEL_NOT_FOUND"
    );

  }


  return models;
}


// ===============================
// Generate AI Response
// ===============================

async function generateAIResponse(
  prompt
) {

  const models =
    await waitForModels();


  let lastError =
    null;


  for (
    let i = 0;
    i < models.length;
    i++
  ) {

    try {

      console.log(
        "Trying PingMe AI model:",
        i + 1
      );


      const result =
        await models[i]
          .generateContent(
            prompt
          );


      const response =
        result.response;


      const answer =
        response.text();


      if (
        answer &&
        answer.trim()
      ) {

        console.log(
          "PingMe AI model",
          i + 1,
          "success"
        );


        return answer.trim();

      }


    } catch (error) {

      lastError =
        error;


      console.error(
        "PingMe AI model",
        i + 1,
        "failed:",
        error
      );

    }

  }


  throw (
    lastError ||
    new Error(
      "ALL_MODELS_FAILED"
    )
  );
}


// ===============================
// Send Message
// ===============================

async function sendMessage() {

  if (
    !messageInput ||
    !sendBtn
  ) {
    return;
  }


  const text =
    messageInput.value.trim();


  if (!text) {
    return;
  }


  // Prevent double sending
  sendBtn.disabled =
    true;


  // ===============================
  // User Message
  // ===============================

  addMessage(
    text,
    "user"
  );


  // ===============================
  // Clear Input
  // ===============================

  messageInput.value =
    "";

  messageInput.style.height =
    "auto";


  // ===============================
  // Thinking
  // ===============================

  const thinkingMessage =
    addThinkingMessage();


  try {

    const finalPrompt =
      PINGME_AI_INSTRUCTION +
      "\n\nUser message:\n" +
      text;


    // ===============================
    // AI Response
    // ===============================

    const answer =
      await generateAIResponse(
        finalPrompt
      );


    // Remove spinner
    if (
      thinkingMessage &&
      thinkingMessage.parentNode
    ) {

      thinkingMessage.remove();

    }


    // ===============================
    // AI Message
    // ===============================

    addMessage(
      answer ||
      "AI কোনো উত্তর দেয়নি।",
      "ai"
    );


  } catch (error) {

    console.error(
      "PingMe AI Error:",
      error
    );


    // Remove spinner
    if (
      thinkingMessage &&
      thinkingMessage.parentNode
    ) {

      thinkingMessage.remove();

    }


    const errorText =
      String(
        error?.message ||
        error ||
        ""
      );


    // ===============================
    // Quota Error
    // ===============================

    if (
      errorText.includes("429") ||
      errorText.includes("quota") ||
      errorText.includes(
        "Quota exceeded"
      ) ||
      errorText.includes(
        "generate_content_free_tier_requests"
      )
    ) {

      addMessage(
        "AI এখন সাময়িকভাবে ব্যস্ত। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );


    // ===============================
    // Model Error
    // ===============================

    } else if (
      errorText.includes(
        "MODEL_NOT_FOUND"
      )
    ) {

      addMessage(
        "PingMe AI এখন চালু হতে সমস্যা হচ্ছে। একটু পরে চেষ্টা কর।",
        "ai"
      );


    // ===============================
    // Other Error
    // ===============================

    } else {

      addMessage(
        "দুঃখিত, এই মুহূর্তে AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা কর।",
        "ai"
      );

    }


  } finally {

    sendBtn.disabled =
      false;

    messageInput.focus();

  }
}


// ===============================
// Send Button
// ===============================

if (sendBtn) {

  sendBtn.addEventListener(
    "click",
    function(event) {

      event.preventDefault();

      sendMessage();

    }
  );

}


// ===============================
// Enter Key
// ===============================

if (messageInput) {

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

}


// ===============================
// Suggestions
// ===============================

document
  .querySelectorAll(
    ".suggestion-item"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        function() {

          const textElement =
            this.querySelector(
              ".text"
            );


          messageInput.value =
            textElement
              ? textElement.innerText
              : this.innerText;


          messageInput.focus();


          messageInput.dispatchEvent(
            new Event("input")
          );

        }
      );

    }
  );


// ===============================
// Plus Button
// ===============================

if (plusBtn) {

  plusBtn.addEventListener(
    "click",
    function() {

      const menu =
        document.getElementById(
          "attachmentMenu"
        );


      if (menu) {

        menu.hidden =
          !menu.hidden;

      }

    }
  );

}


// ===============================
// Camera
// ===============================

if (cameraBtn) {

  cameraBtn.addEventListener(
    "click",
    function() {

      alert(
        "Camera feature আসছে।"
      );

    }
  );

}


// ===============================
// Microphone
// ===============================

if (micBtn) {

  micBtn.addEventListener(
    "click",
    function() {

      alert(
        "Voice input feature আসছে।"
      );

    }
  );

}


// ===============================
// Menu
// ===============================

if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    function() {

      alert(
        "PingMe AI menu আসছে।"
      );

    }
  );

}


// ===============================
// Attachment Options
// ===============================

const attachmentOptions = [
  "photoOption",
  "fileOption",
  "audioOption",
  "screenOption",
  "projectOption"
];


attachmentOptions.forEach(
  function(id) {

    const button =
      document.getElementById(id);


    if (button) {

      button.addEventListener(
        "click",
        function() {

          alert(
            "এই ফিচারটি শিগগিরই আসছে।"
          );

        }
      );

    }

  }
);
