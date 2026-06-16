function triggerRoyalAlert() {
    // محرك النطق الصوتي السينمائي اللامع للزوار
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance("يا لورد، الفرصة بين يديك الآن، لا تتردد.");
        msg.lang = 'ar-SA';
        msg.volume = 1;
        window.speechSynthesis.speak(msg);
    }
    alert("تم توثيق طلب دخول المزاد الملكي بنجاح! يرجى إتمام التحقق الثلاثي عبر لوحة الأمان للعبور.");
}

// ⏳ ساعة الصفر التنازلية المطورة لإنعاش الحركة والحماس تلقائياً
let time = 60;
const timerEl = document.getElementById('timer');
const timerTitle = document.getElementById('timer-title');

if (timerEl && timerTitle) {
    const countdown = setInterval(() => {
        time--;
        timerEl.innerText = time;
        
        if (time <= 0) {
            // إعادة تدوير المزاد تلقائياً لصنع حركة قوية ومستمرة لا تنتهي
            time = 60;
            timerTitle.innerText = "ينتهي المزاد الملكي القادم بعد:";
        }
    }, 1000);
}
