// ============================================================
// PingMe AI - Conversation Memory
// File: conversation-memory.js
// ============================================================

const pingMeConversationMemory = [];


// ------------------------------------------------------------
// Add a message
// ------------------------------------------------------------

function addPingMeMemoryMessage(role, text) {
  if (!text || !String(text).trim()) {
    return;
  }

  pingMeConversationMemory.push({
    role: role,
    text: String(text).trim(),
    time: Date.now()
  });
}


// ------------------------------------------------------------
// Get recent conversation
// ------------------------------------------------------------

function getPingMeRecentMemory(limit = 20) {
  return pingMeConversationMemory.slice(-limit);
}


// ------------------------------------------------------------
// Convert memory into a prompt
// ------------------------------------------------------------

function getPingMeMemoryPrompt(limit = 20) {
  const messages = getPingMeRecentMemory(limit);

  if (!messages.length) {
    return "";
  }

  return messages
    .map(message => {
      const speaker =
        message.role === "user"
          ? "User"
          : "PingMe AI";

      return `${speaker}: ${message.text}`;
    })
    .join("\n");
}


// ------------------------------------------------------------
// Clear current conversation memory
// ------------------------------------------------------------

function clearPingMeMemory() {
  pingMeConversationMemory.length = 0;
}


// ------------------------------------------------------------
// Memory status
// ------------------------------------------------------------

function getPingMeMemoryCount() {
  return pingMeConversationMemory.length;
}


// ------------------------------------------------------------
// Expose functions globally
// ------------------------------------------------------------

window.addPingMeMemoryMessage =
  addPingMeMemoryMessage;

window.getPingMeRecentMemory =
  getPingMeRecentMemory;

window.getPingMeMemoryPrompt =
  getPingMeMemoryPrompt;

window.clearPingMeMemory =
  clearPingMeMemory;

window.getPingMeMemoryCount =
  getPingMeMemoryCount;


console.log(
  "PingMe AI Conversation Memory loaded."
);