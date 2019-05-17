import './styles/app.css';
import Background from '../scripts/background';

console.log("working");

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

Background(ctx);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


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
