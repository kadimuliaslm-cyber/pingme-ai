* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background: #ffffff;
  color: #202123;
}

body {
  overflow: hidden;
}

button,
textarea {
  font-family: inherit;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}


/* ===============================
   APP
   =============================== */

.app {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}


/* ===============================
   TOP BAR
   =============================== */

.top-bar {
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111111;
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
}

.brand h1 {
  font-size: 17px;
  line-height: 20px;
}

.brand span {
  display: block;
  font-size: 11px;
  color: #777777;
}

.menu-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 25px;
  color: #555555;
}


/* ===============================
   CHAT AREA
   =============================== */

.chat-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px 15px 15px;
}


/* ===============================
   WELCOME SCREEN
   =============================== */

.welcome-screen {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 15px 60px;
}

.welcome-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111111;
  color: #ffffff;
  font-size: 31px;
  margin-bottom: 18px;
}

.welcome-screen h2 {
  font-size: 24px;
  margin-bottom: 9px;
}

.welcome-screen p {
  max-width: 300px;
  font-size: 14px;
  line-height: 21px;
  color: #777777;
}


/* ===============================
   SUGGESTIONS
   =============================== */

.suggestions {
  width: 100%;
  max-width: 390px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.suggestion {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #e7e7e7;
  border-radius: 14px;
  background: #ffffff;
  color: #333333;
  text-align: left;
  font-size: 13px;
}


/* ===============================
   MESSAGE ROW
   =============================== */

.message-row {
  width: 100%;
  display: flex;
  margin-bottom: 18px;
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.ai {
  justify-content: flex-start;
}


/* ===============================
   MESSAGE BUBBLE
   =============================== */

.message {
  max-width: 82%;
  padding: 12px 14px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 22px;
  white-space: pre-wrap;
  word-break: break-word;
}


/* USER MESSAGE - RIGHT */

.message-row.user .message {
  background: #111111;
  color: #ffffff;
  border-bottom-right-radius: 5px;
}


/* AI MESSAGE - LEFT */

.message-row.ai .message {
  background: #f3f3f3;
  color: #202123;
  border-bottom-left-radius: 5px;
}


/* ===============================
   AI THINKING SPINNER
   =============================== */

.thinking-message {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 8px 0 18px;
  padding-left: 6px;
}

.thinking-spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #e5e5e5;
  border-top-color: #111111;
  border-radius: 50%;
  animation: pingmeSpin 0.8s linear infinite;
}

@keyframes pingmeSpin {
  to {
    transform: rotate(360deg);
  }
}


/* ===============================
   COMPOSER
   =============================== */

.composer-wrapper {
  width: 100%;
  padding: 8px 12px 10px;
  background: #ffffff;
  border-top: 1px solid #eeeeee;
}

.composer {
  width: 100%;
  min-height: 52px;
  display: flex;
  align-items: flex-end;
  gap: 1px;
  padding: 6px;
  border: 1px solid #dddddd;
  border-radius: 27px;
  background: #ffffff;
}


/* ===============================
   ICON BUTTONS
   =============================== */

.icon-btn {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555555;
  font-size: 21px;
}

#plusBtn,
#micBtn {
  margin: 0;
}

#micBtn {
  margin-left: -2px;
}

#cameraBtn {
  font-size: 18px;
}

#micBtn {
  font-size: 17px;
}


/* ===============================
   MESSAGE INPUT
   =============================== */

#messageInput {
  flex: 1;
  width: 100%;
  min-height: 38px;
  max-height: 120px;
  padding: 9px 5px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  color: #202123;
  font-size: 15px;
  line-height: 20px;
}

#messageInput::placeholder {
  color: #999999;
}


/* ===============================
   SEND BUTTON
   =============================== */

.send-btn {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0;
}

.send-btn svg {
  width: 21px;
  height: 21px;
}


/* ===============================
   FOOTER NOTE
   =============================== */

.composer-note {
  padding-top: 6px;
  text-align: center;
  color: #999999;
  font-size: 9px;
}


/* ===============================
   MOBILE
   =============================== */

@media (max-width: 480px) {

  .top-bar {
    height: 60px;
    min-height: 60px;
    padding: 0 12px;
  }

  .brand-icon {
    width: 35px;
    height: 35px;
  }

  .brand h1 {
    font-size: 16px;
  }

  .chat-area {
    padding-left: 12px;
    padding-right: 12px;
  }

  .welcome-screen h2 {
    font-size: 22px;
  }

  .message {
    max-width: 86%;
  }

  .composer-wrapper {
    padding-left: 8px;
    padding-right: 8px;
  }

  .icon-btn,
  .send-btn {
    width: 36px;
    min-width: 36px;
  }

}
