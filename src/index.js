import './styles/app.css';
const backgroundMethods = require('../scripts/background');
const Background = backgroundMethods.Background;
// import Background from '../scripts/background';
import getStarted from '../scripts/questions';

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

