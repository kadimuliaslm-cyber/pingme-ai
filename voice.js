// PingMe AI - Voice Input
// voice.js

const micBtn = document.getElementById("micBtn");
const messageInput = document.getElementById("messageInput");

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition && micBtn && messageInput) {

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "bn-BD";

  let listening = false;

  micBtn.addEventListener("click", () => {

    if (listening) {
      recognition.stop();
      return;
    }

    try {
      recognition.start();
    } catch (error) {
      console.log("Voice already running.");
    }

  });

  recognition.onstart = () => {

    listening = true;

    micBtn.classList.add("listening");

  };

  recognition.onresult = (event) => {

    let text = "";

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {

      text += event.results[i][0].transcript;

    }

    messageInput.value = text.trim();

    messageInput.dispatchEvent(
      new Event("input", {
        bubbles: true
      })
    );

  };

  recognition.onend = () => {

    listening = false;

    micBtn.classList.remove("listening");

  };

  recognition.onerror = (event) => {

    console.log(
      "Voice error:",
      event.error
    );

    listening = false;

    micBtn.classList.remove("listening");

  };

} else {

  console.log(
    "Speech Recognition is not supported."
  );

}
