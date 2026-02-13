const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");
const music = document.getElementById("backgroundMusic");
const button = document.getElementById("valentinesButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = 500;
let colorrange = [0, 60, 240];
let starArray = [];
let frameNumber = 0;
let opacity = 0;
let secondOpacity = 0;
let thirdOpacity = 0;

// Cấu hình tốc độ (Có thể chỉnh tại đây)
const fadeSpeed = 0.02; // Tốc độ hiện chữ (tăng từ 0.01 lên 0.02)
const step = 150;       // Khoảng thời gian mỗi giai đoạn (rút ngắn để chuyển câu nhanh hơn)

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

const startHeartAndMusic = () => {
    music.currentTime = 20;
    music.volume = 0.5;
    music.play().catch(e => console.log("Trình duyệt chặn phát tự động"));
    if (typeof animationTimeline === "function") animationTimeline();
    window.removeEventListener("click", startHeartAndMusic);
};
window.addEventListener("click", startHeartAndMusic);

button.addEventListener("click", () => {
    button.textContent = "Đang mở món quà... ❤️";
    setTimeout(() => {
        window.location.href = "https://rchimmel29.github.io/Valentine1/"; 
    }, 500);
});

function drawStars() {
    for (let i = 0; i < stars; i++) {
        let star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    }
}

function updateStars() {
    for (let i = 0; i < stars; i++) {
        if (Math.random() > 0.99) starArray[i].opacity = Math.random();
    }
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    let fontSize = window.innerWidth < 600 ? Math.min(16, window.innerWidth / 20) : Math.min(30, window.innerWidth / 24);
    let lineHeight = 8;
    context.font = fontSize + "px Arial, sans-serif";
    context.textAlign = "center";
    context.shadowColor = "rgba(255, 255, 255, 0.8)";
    context.shadowBlur = 8;

    // Logic hiển thị chữ nhanh hơn
    if (frameNumber < step * 2) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Mỗi ngày, anh không thể tin được mình may mắn thế nào", canvas.width/2, canvas.height/2);
        if (frameNumber < step) opacity += fadeSpeed; else opacity -= fadeSpeed;

    } else if (frameNumber >= step * 2 && frameNumber < step * 4) {
        if (frameNumber === step * 2) opacity = 0;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        let text = window.innerWidth < 600 ? ["giữa hàng nghìn tỷ ngôi sao,", "qua hàng tỷ năm"] : "giữa hàng nghìn tỷ ngôi sao, qua hàng tỷ năm";
        if (Array.isArray(text)) drawTextWithLineBreaks(text, canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        else context.fillText(text, canvas.width/2, canvas.height/2);
        if (frameNumber < step * 3) opacity += fadeSpeed; else opacity -= fadeSpeed;

    } else if (frameNumber >= step * 4 && frameNumber < step * 6) {
        if (frameNumber === step * 4) opacity = 0;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("được sống, và được cùng em trải qua cuộc đời này", canvas.width/2, canvas.height/2);
        if (frameNumber < step * 5) opacity += fadeSpeed; else opacity -= fadeSpeed;

    } else if (frameNumber >= step * 6 && frameNumber < step * 8) {
        if (frameNumber === step * 6) opacity = 0;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("thật không thể tưởng tượng nổi, thật không thể tin được", canvas.width/2, canvas.height/2);
        if (frameNumber < step * 7) opacity += fadeSpeed; else opacity -= fadeSpeed;

    } else if (frameNumber >= step * 8 && frameNumber < step * 10) {
        if (frameNumber === step * 8) opacity = 0;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        let text = window.innerWidth < 600 ? ["và vậy mà anh lại có cơ hội", "không tưởng để được biết em"] : "và vậy mà anh lại có cơ hội không tưởng để được biết em";
        if (Array.isArray(text)) drawTextWithLineBreaks(text, canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        else context.fillText(text, canvas.width/2, canvas.height/2);
        if (frameNumber < step * 9) opacity += fadeSpeed; else opacity -= fadeSpeed;

    } else if (frameNumber >= step * 10) {
        if (frameNumber === step * 10) opacity = 0;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Anh yêu em, Đinh Thị Quỳnh Như ❤", canvas.width/2, canvas.height/2);
        if(opacity < 1) opacity += fadeSpeed;

        if (frameNumber >= step * 11) {
            context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
            context.fillText("Mãi yêu em ❤", canvas.width/2, (canvas.height/2 + 50));
            if(secondOpacity < 1) secondOpacity += fadeSpeed;
        }

        if (frameNumber >= step * 12) {
            context.fillStyle = `rgba(255, 255, 255, ${thirdOpacity})`;
            context.fillText("Chúc mừng ngày Valentine <3", canvas.width/2, (canvas.height/2 + 100));
            if(thirdOpacity < 1) thirdOpacity += fadeSpeed;
            button.style.display = "block";
        }
    }
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateStars();
    drawText();
    if (frameNumber < 99999) frameNumber++;
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);
