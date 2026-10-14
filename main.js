// ===== Navigation ของ DailyMe =====

function goHome(){
    window.location.href = "index.html";
}

function goOutfit(){
    window.location.href = "outfit.html";
}

function goBag(){
    window.location.href = "bag.html";
}

function goMood(){
    window.location.href = "mood.html";
}

function goWeather(){
    window.location.href = "weather.html";
}

// ปุ่มย้อนกลับ
function goBack(){
    history.back();
}

// ปุ่มไปหน้าถัดไป
function goNext(page){
    window.location.href = page;
}