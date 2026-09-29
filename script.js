const GEMINI_API_KEY = "AQ.Ab8RN6IDLRBaJ2DfPJOTKBuU9TpXxfIWaxerE9HzJmX_JZax9A";
const MODEL_NAME = "gemini-3.8-flash";

const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let conversation = [];

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "message " + type;
    message.textContent = text;

    chatArea.appendChild(message);
    chatArea.scrollTop = chatArea.scrollHeight;

    return message;
}

async function sendMessage() {
    const text = messageInput.value.trim();

    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";

    const thinkingMessage = addMessage("ভাবছি...", "ai");

    conversation.push({
        role: "user",
        parts: [
            {
                text: text
            }
        ]
    });

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/" +
            MODEL_NAME +
            ":generateContent",
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

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(
                "API Error " +
                response.status +
                ": " +
                errorText
            );
        }

        const data = await response.json();

        const aiText =
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0]
                ? data.candidates[0].content.parts[0].text
                : null;

        if (!aiText) {
            throw new Error("AI কোনো উত্তর দেয়নি।");
        }

        thinkingMessage.textContent = aiText;

        conversation.push({
            role: "model",
            parts: [
                {
                    text: aiText
                }
            ]
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        thinkingMessage.textContent =
            "দুঃখিত, AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে।\n\n" +
            error.message;
    }

    chatArea.scrollTop = chatArea.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
