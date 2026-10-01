// --- APP CORE INITIALIZATION ENGINE ---

const chatInputField = document.getElementById('chatInputField');
const mainWidgetCard = document.getElementById('mainWidgetCard');
const arrowSubmitBtn = document.getElementById('arrowSubmitBtn');
const chatViewport = document.getElementById('chatViewport');

// ইনপুট ইন্টারঅ্যাকশনের জাভাস্ক্রিপ্ট লিসেনার অন করা (যা input.js থেকে আসছে)
setupInputInteraction(chatInputField, mainWidgetCard, arrowSubmitBtn);

// মেসেজ সাবমিট ও এপিআই অ্যাকশন হ্যান্ডলার লজিক
function triggerMessageDispatch() {
    const messageText = chatInputField.value.trim();
    if (messageText === "") return;

    // ১. ইউজারের মেসেজ বাবলটি স্ক্রিনের ডানপাশে যুক্ত করার লজিক
    const userBubble = document.createElement('div');
    userBubble.style.alignSelf = 'flex-end';
    userBubble.style.backgroundColor = '#f1f3f4';
    userBubble.style.color = '#0d0d0d';
    userBubble.style.padding = '12px 16px';
    userBubble.style.borderRadius = '18px 18px 4px 18px';
    userBubble.style.maxWidth = '80%';
    userBubble.style.fontSize = '16px';
    userBubble.style.lineHeight = '1.4';
    userBubble.style.wordBreak = 'break-word';
    userBubble.innerText = messageText;
    
    // মেসেজ কন্টেইনারে পুশ করা
    chatViewport.appendChild(userBubble);
    
    // স্ক্রিন অটো স্ক্রোল করে নিচে নামানো
    chatViewport.scrollTop = chatViewport.scrollHeight;

    // জেমিনি ব্যাকএন্ড বা আপনার সিক্রেট কোড এপিআই প্রসেস করার কনসোল ট্র্যাক
    console.log("PingMe AI Processing request using key via: " + currentActiveEngine);
    
    // সফলভাবে সাবমিটের পর ইনপুট উইজেট ও বাটন কালার রিসেট করা
    chatInputField.value = "";
    arrowSubmitBtn.classList.remove('typing-active-blue');
    chatInputField.blur();
    mainWidgetCard.classList.remove('popup-expanded-card');
}

// মাউস ক্লিক এবং কি-বোর্ডের এন্টার প্রেস বাইন্ডিং হ্যান্ডলার
arrowSubmitBtn.addEventListener('click', triggerMessageDispatch);
chatInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        triggerMessageDispatch();
    }
});
