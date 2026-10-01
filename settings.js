// --- GLOBAL CONFIGURATION SETTINGS ---

// ৩টি এআই মডেল অপশন সেটিংস (ব্যাকএন্ডে জেমিনি এপিআই সচল রাখার জন্য আসল টেকনিক্যাল নাম)
const CONFIG_AI_MODELS = {
    m1: "gpt-4o",
    m2: "gemini-1.5-pro",
    m3: "claude-3-5-sonnet"
};

// আপনার অ্যাপের নিজস্ব ব্র্যান্ডিং এবং পরিচয়ের সেটিংস (CUSTOM IDENTITY)
const AI_IDENTITY = {
    nickname: "pingme",
    companyName: "pingme-ai"
};

// আপনার অ্যাপে বর্তমানে যে এআই মডেলটি সচল থাকবে (আপনার চাবির জন্য Gemini ডিফল্ট)
let currentActiveEngine = CONFIG_AI_MODELS.m2; 

// সিক্রেট এপিআই কোড বা চাবি বসানোর প্রধান জায়গা (API KEY HERE)
const SECURITY_API_KEY = "AIzaSyB4dAUhxEao415YdVg4l4WYJ21hQ9V-tyk";
