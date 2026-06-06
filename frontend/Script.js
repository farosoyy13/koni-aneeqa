// نظام النداء الملكي
function triggerRoyalAlert() {
    const msg = new SpeechSynthesisUtterance("يا لورد، الفرصة بين يديك الآن، لا تتردد.");
    msg.lang = 'ar-SA';
    window.speechSynthesis.speak(msg);
    alert("تم تفعيل طلب المزاد بنجاح!");
}

// ساعة الصفر التنازلية
let time = 60;
const timerEl = document.getElementById('timer');
const timerTitle = document.getElementById('timer-title');

if(timerEl) {
    const countdown = setInterval(() => {
        time--;
        timerEl.innerText = time;
        if(time <= 0) {
            clearInterval(countdown);
            timerTitle.innerText = "انتهت الفرصة الملكية!";
        }
    }, 1000);
}
