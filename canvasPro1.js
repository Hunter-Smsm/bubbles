const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined,
};

const maxRadius = 40;
const range = 60;
const colorArray = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"];

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Circle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.lineWidth = 1;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
    }
    update() {
        if (this.x + this.radius > innerWidth || this.x <= this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y <= this.radius) {
            this.dy = -this.dy;
        }
        if (
            mouse.x - this.x < range &&
            mouse.x - this.x > -range &&
            mouse.y - this.y < range &&
            mouse.y - this.y > -range
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

let arr = [];

function init() {
    arr = [];
    for (let i = 0; i < 800; i++) {
        const radius = Math.random() * 20 + 1;
        const x = Math.random() * (innerWidth - radius * 2) + radius;
        const y = Math.random() * (innerHeight - radius * 2) + radius;
        const dx = Math.random() - 0.5;
        const dy = Math.random() - 0.5;
        arr.push(new Circle(x, y, radius, dx, dy));
        new Circle(x, y, radius, dx, dy);
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    arr.forEach((ele) => {
        ele.draw();
        ele.update();
    });
}

init();
animate();
