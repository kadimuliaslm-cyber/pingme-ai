const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const plusBtn = document.getElementById("plusBtn");
const cameraBtn = document.getElementById("cameraBtn");
const micBtn = document.getElementById("micBtn");
const menuBtn = document.getElementById("menuBtn");


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
        "Firebase AI model পাওয়া যায়নি।"
      );

    }


    // Ask Gemini
    const result =
      await window.pingMeAIModel.generateContent(text);


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

    thinkingMessage.innerText =
      "দুঃখিত, AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে।\n\n" +
      error.message;

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
