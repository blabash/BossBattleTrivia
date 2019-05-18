import './styles/app.css';
import Background from '../scripts/background';
import getStarted from '../scripts/questions';

console.log("working");

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

Background(ctx);
getStarted();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

