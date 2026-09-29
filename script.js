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

/* =========================
   MAIN APP
========================= */

.app {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

/* =========================
   TOP BAR
========================= */

.top-bar {
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #eeeeee;
  background: rgba(255, 255, 255, 0.96);
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
  font-weight: 700;
}

.brand span {
  display: block;
  margin-top: 1px;
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

.menu-btn:active {
  background: #f1f1f1;
}

/* =========================
   CHAT AREA
========================= */

.chat-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px 15px 15px;
  scroll-behavior: smooth;
}

.chat-area::-webkit-scrollbar {
  width: 4px;
}

.chat-area::-webkit-scrollbar-thumb {
  background: #dddddd;
  border-radius: 10px;
}

/* =========================
   WELCOME SCREEN
========================= */

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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.welcome-screen h2 {
  font-size: 24px;
  font-weight: 
