const GEMINI_API_KEY = "AQ.Ab8RN6IDLRBaJ2DfPJOTKBuU9TpXxfIWaxerE9HzJmX_JZax9A";
const MODEL_NAME = "gemini-3.8-flash";

const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let previousInteractionId = null;

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

    try {
        const body = {
            model: MODEL_NAME,
            input: text
        };

        if (previousInteractionId) {
            body.previous_interaction_id = previousInteractionId;
        }

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": GEMINI_API_KEY
                },
                body: JSON.stringify(body)
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

        previousInteractionId = data.id || null;

        let aiText = data.output_text || "";

        if (!aiText && Array.isArray(data.steps)) {
            for (let i = data.steps.length - 1; i >= 0; i--) {
                const step = data.steps[i];

                if (
                    step.type === "model_output" &&
                    Array.isArray(step.content)
                ) {
                    const textPart = step.content.find(
                        part => part.type === "text"
                    );

                    if (textPart && textPart.text) {
                        aiText = textPart.text;
                        break;
                    }
                }
            }
        }

        if (!aiText && Array.isArray(data.outputs)) {
            const textPart = data.outputs.find(
                part => part.type === "text"
            );

            if (textPart && textPart.text) {
                aiText = textPart.text;
            }
        }

        if (!aiText) {
            console.log("Gemini response:", data);
            throw new Error(
                "AI কোনো উত্তর দেয়নি। Response console-এ দেখানো হয়েছে।"
            );
        }

        thinkingMessage.textContent = aiText;

    } catch (error) {
        console.error("Gemini Error:", error);

        thinkingMessage.textContent =
            "দুঃখিত, AI-এর সাথে সংযোগ করতে সমস্যা হয়েছে.\n\n" +
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
