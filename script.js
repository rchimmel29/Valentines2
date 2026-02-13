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

// Khởi tạo sao
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

// Logic bắt đầu khi click vào màn hình (theo yêu cầu của bạn)
const startHeartAndMusic = () => {
    music.currentTime = 20; // Chạy từ giây 30
    music.volume = 0.5;
    music.play().catch(e => console.log("Trình duyệt chặn phát tự động"));
    
    // Nếu bạn có hàm animationTimeline() ở file khác, hãy đảm bảo nó tồn tại
    if (typeof animationTimeline === "function") {
        animationTimeline();
    }
    
    window.removeEventListener("click", startHeartAndMusic);
};
window.addEventListener("click", startHeartAndMusic);

// Logic xử lý Button (Gửi mail + Chuyển trang)
button.addEventListener("click", () => {
    // Thay đổi text để tạo hiệu ứng phản hồi cho người dùng
    button.textContent = "Đang mở món quà... ❤️";
    
    // Chuyển trang ngay lập tức sau một khoảng trễ ngắn (800ms) để người dùng kịp thấy hiệu ứng
    setTimeout(() => {
        window.location.href = "https://rchimmel29.github.io/Valentine1/"; 
    }, 800);
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
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
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

    context.font = fontSize + "px Arial, sans-serif"; // Đã rút gọn font để tránh lỗi nếu thiếu font custom
    context.textAlign = "center";
    context.shadowColor = "rgba(255, 255, 255, 0.8)";
    context.shadowBlur = 8;

    // Hiệu ứng chữ xuất hiện theo frameNumber
    if (frameNumber < 250) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Mỗi ngày, anh không thể tin được mình may mắn thế nào", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    } else if (frameNumber >= 250 && frameNumber < 500) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Mỗi ngày, anh không thể tin được mình may mắn thế nào", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    } else if (frameNumber == 500) {
        opacity = 0;
    } else if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["giữa hàng nghìn tỷ ngôi sao,", "qua hàng tỷ năm"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("giữa hàng nghìn tỷ ngôi sao, qua hàng tỷ năm", canvas.width/2, canvas.height/2);
        }
        opacity += 0.01;
    } else if (frameNumber >= 750 && frameNumber < 1000) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["giữa hàng nghìn tỷ ngôi sao,", "qua hàng tỷ năm"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("giữa hàng nghìn tỷ ngôi sao, qua hàng tỷ năm", canvas.width/2, canvas.height/2);
        }
        opacity -= 0.01;
    } else if (frameNumber == 1000) {
        opacity = 0;
    } else if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("được sống, và được cùng em trải qua cuộc đời này", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    } else if (frameNumber >= 1250 && frameNumber < 1500) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("được sống, và được cùng em trải qua cuộc đời này", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    } else if (frameNumber == 1500) {
        opacity = 0;
    } else if (frameNumber > 1500 && frameNumber < 1750) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("thật không thể tưởng tượng nổi, thật không thể tin được", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    } else if (frameNumber >= 1750 && frameNumber < 2000) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("thật không thể tưởng tượng nổi, thật không thể tin được", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    } else if (frameNumber == 2000) {
        opacity = 0;
    } else if (frameNumber > 2000 && frameNumber < 2500) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        let text = window.innerWidth < 600 ? ["và vậy mà anh lại có cơ hội", "không tưởng để được biết em"] : ["và vậy mà anh lại có cơ hội không tưởng để được biết em"];
        if (window.innerWidth < 600) drawTextWithLineBreaks(text, canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        else context.fillText(text[0], canvas.width/2, canvas.height/2);
        
        if(frameNumber < 2250) opacity += 0.01;
        else opacity -= 0.01;
    } else if (frameNumber >= 2500) {
        // Kết thúc: Hiện thông điệp cuối
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Anh yêu em, Đinh Thị Quỳnh Như ❤", canvas.width/2, canvas.height/2);
        if(opacity < 1) opacity += 0.01;

        if (frameNumber >= 2750) {
            context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
            context.fillText("Mãi yêu em ❤", canvas.width/2, (canvas.height/2 + 50));
            if(secondOpacity < 1) secondOpacity += 0.01;
        }

        if (frameNumber >= 3000) {
            context.fillStyle = `rgba(255, 255, 255, ${thirdOpacity})`;
            context.fillText("Chúc mừng ngày Valentine <3", canvas.width/2, (canvas.height/2 + 100));
            if(thirdOpacity < 1) thirdOpacity += 0.01;
            button.style.display = "block"; // Hiện nút bấm
        }
    }

    context.shadowColor = "transparent";
    context.shadowBlur = 0;
}

function draw() {
    // Thay vì dùng getImageData, dùng clearRect để mượt hơn
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Bắt đầu vòng lặp
window.requestAnimationFrame(draw);