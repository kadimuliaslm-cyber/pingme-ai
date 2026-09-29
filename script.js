// ================================
// PingMe AI - Main JavaScript
// ================================

const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const plusBtn = document.getElementById("plusBtn");
const cameraBtn = document.getElementById("cameraBtn");
const micBtn = document.getElementById("micBtn");
const menuBtn = document.getElementById("menuBtn");


// ================================
// SEND MESSAGE
// ================================

function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  // Hide welcome screen
  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }

  // Add user message
  addMessage(text, "user");

  // Clear input
  messageInput.value = "";

  // Reset textarea height
  messageInput.style.height = "38px";

  // Temporary AI reply
  setTimeout(() => {
    addMessage(
      "তোর মেসেজ পেয়েছি। 😊\n\nএখন PingMe AI-এর chat system কাজ করছে। পরের ধাপে এখানে আসল AI যুক্ত করা হবে।",
      "ai"
    );
  }, 600);
}


// ================================
// ADD MESSAGE
// ================================

function addMessage(text, type) {
  const row = document.createElement("div");
  row.className = `message-row ${type}`;

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = text;

  row.appendChild(message);
  chatArea.appendChild(row);

  scrollToBottom();
}


// ================================
// SCROLL TO BOTTOM
// ================================

function scrollToBottom() {
  setTimeout(() => {
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 50);
}


// ================================
// SEND BUTTON
// ================================

sendBtn.addEventListener("click", sendMessage);


// ================================
// ENTER TO SEND
// ================================

messageInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }

});


// ================================
// AUTO RESIZE TEXTAREA
// ================================

messageInput.addEventListener("input", function () {

  this.style.height = "38px";

  this.style.height =
    Math.min(this.scrollHeight, 120) + "px";

});


// ================================
// SUGGESTION BUTTONS
// ================================

document.querySelectorAll(".suggestion").forEach(button => {

  button.addEventListener("click", () => {

    const text = button.textContent
      .replace("✨", "")
      .replace("💡", "")
      .replace("🌐", "")
      .trim();

    messageInput.value = text;

    messageInput.focus();

  });

});


// ================================
// PLUS BUTTON
// ================================

plusBtn.addEventListener("click", () => {

  alert("📎 Attachment feature will be added soon.");

});


// ================================
// CAMERA BUTTON
// ================================

cameraBtn.addEventListener("click", () => {

  alert("📷 Camera feature will be added soon.");

});


// ================================
// MICROPHONE BUTTON
// ================================

micBtn.addEventListener("click", () => {

  alert("🎤 Voice input will be added soon.");

});


// ================================
// MENU BUTTON
// ================================

menuBtn.addEventListener("click", () => {

  alert("☰ Menu and chat history will be added soon.");

});


// ================================
// START
// ================================

console.log("PingMe AI is ready.");
