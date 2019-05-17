import './styles/app.css';
import Background from '../scripts/background';

console.log("working");

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

Background(ctx); 

//rectangle/square
// ctx.fillStyle = "rgba(255, 0, 0, .5";
// ctx.fillRect(100, 100, 100, 100); //rectangle takes the fillstyle that precedes it
// ctx.fillStyle = "rgba(0, 255, 0, .5";
// ctx.fillRect(200, 200, 100, 100);
// ctx.fillStyle = "rgba(0, 0, 255, .5";
// ctx.fillRect(300, 300, 100, 100);

// //line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = "#fa34a3"
// ctx.stroke();

//arc/circle
// ctx.beginPath()
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "blue";
// ctx.stroke();
// const COLORS = ["blue", "red", "green"];

// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
//     ctx.stroke();
// }

window.addEventListener('mousemove', () => {
    
})

// function Circle(x, y, dx, dy, radius) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;

//     this.draw = function() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         ctx.fillStyle = "rgba(255, 0, 0, .1";
//         ctx.fill();
//     }

//     this.update = function() {
//         if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//             this.dx = -this.dx;
//         }

//         if (this.y + radius > innerHeight || this.y - radius < 0) {
//             this.dy = -this.dy;
//         }
//         this.x += this.dx;
//         this.y += this.dy;

//         this.draw();
//     }
// }

// const circleArray = [];

// for (let i = 0; i < 100; i++) {
//     let radius = Math.random() * 30;
//     let x = Math.random() * (innerWidth - radius * 2) + radius;
//     let y = Math.random() * (innerHeight - radius * 2) + radius;
//     let dx = (Math.random() - .5) * 0.8;
//     let dy = (Math.random() - .5) * 2;

//     circleArray.push(new Circle(x, y, dx, dy, radius));
// }

// const animate = () => {
//     requestAnimationFrame(animate);
//     ctx.clearRect(0, 0, innerWidth, innerHeight);

//     for (let i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }
// }

// animate();