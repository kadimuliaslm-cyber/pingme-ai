function addMessage(text, sender) {
  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }

  const row = document.createElement("div");

  row.className =
    sender === "user"
      ? "message-row user"
      : "message-row ai";

  const messageBox = document.createElement("div");

  messageBox.className = "message-box";

  const message = document.createElement("div");

  message.className = "message";
  message.innerText = text;

  messageBox.appendChild(message);

  // AI message actions
  if (sender === "ai") {
    const actions = document.createElement("div");

    actions.className = "message-actions";

    // Copy button
    const copyBtn = document.createElement("button");

    copyBtn.type = "button";
    copyBtn.className = "message-action-btn";
    copyBtn.innerHTML = "📋 Copy";

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML = "✓ Copied";

        setTimeout(() => {
          copyBtn.innerHTML = "📋 Copy";
        }, 1500);

      } catch (error) {
        console.error("Copy failed:", error);
      }
    });

    actions.appendChild(copyBtn);

    // Copy Link button
    const linkBtn = document.createElement("button");

    linkBtn.type = "button";
    linkBtn.className = "message-action-btn";
    linkBtn.innerHTML = "🔗 Copy Link";

    linkBtn.addEventListener("click", async () => {
      const urlMatch = text.match(
        /https?:\/\/[^\s]+/i
      );

      if (urlMatch) {
        try {
          await navigator.clipboard.writeText(
            urlMatch[0]
          );

          linkBtn.innerHTML = "✓ Link Copied";

          setTimeout(() => {
            linkBtn.innerHTML = "🔗 Copy Link";
          }, 1500);

        } catch (error) {
          console.error("Link copy failed:", error);
        }

      } else {
        linkBtn.innerHTML = "No link";

        setTimeout(() => {
          linkBtn.innerHTML = "🔗 Copy Link";
        }, 1500);
      }
    });

    actions.appendChild(linkBtn);

    messageBox.appendChild(actions);
  }

  row.appendChild(messageBox);

  chatArea.appendChild(row);

  chatArea.scrollTop = chatArea.scrollHeight;

  return row;
}
