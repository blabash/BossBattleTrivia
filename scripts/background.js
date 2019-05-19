const utils = require('./canvas_utils');


const colorArray = [ //flame color palette
    "rgb(255, 0, 0, .11)",
    "rgb(255, 90, 0, .11)",
    "rgb(255, 154, 0, .11)"
];

const lavaColorArray = [ //flame color palette
    "#FBF063",
    "#FF822F",
    "#FF902E"
];

//interactivity for when mouse is near circle
    // const mouse = {
    //     x: undefined,
    //     y: undefined
    // }
// window.addEventListener('mousemove', (e) => {
//     console.log(e) 
//     mouse.x = e.x;
//     mouse.y = e.y;
// })

function Lava(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
        x: utils.randomIntFromRange(-4, -2),
        y: 3
    }
    this.friction = 0.4;
}

Lava.prototype.draw = function() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = 'rgba(255, 130, 47)';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

let gravity = 3;

function setGravity(g) {
    gravity = g;
}

Lava.prototype.update = function() {
    this.draw();

    if ((this.y + this.radius + this.velocity.y > canvas.height / 2) &&
        (this.x + this.radius > canvas.width / 5)) { //lava only bounces over designated horizontal part of the screen
            this.velocity.y = -this.velocity.y * this.friction;
            this.shatter()
    } else if ((this.y + this.radius + this.velocity.y > canvas.height) &&
        (this.x + this.radius < canvas.width / 5)) {
            this.velocity.y = -this.velocity.y * this.friction;        
            this.shatter()
    } else {
        this.velocity.y += gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
}

const miniLavasArray = [];
Lava.prototype.shatter = function() {
    this.radius -= 4;
    for(let i = 0; i < 4; i++) {
        miniLavasArray.push(new MiniLava(this.x, this.y, 2))
    }
}

function MiniLava(x, y, radius, color) {
    Lava.call(this, x, y, radius, color)
    this.velocity = {
        x: utils.randomIntFromRange(-5, 5),
        y: utils.randomIntFromRange(-15, 15)
    }
    this.friction = .9;
    this.ttl = 100; //time to live
    this.opacity = 1;
}

MiniLava.prototype.draw = function () {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 130, 47, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

MiniLava.prototype.update = function () {
    this.draw();

    if ((this.y + this.radius + this.velocity.y > canvas.height / 2) && 
        (this.x + this.radius > canvas.width / 5)) {
            this.velocity.y = -this.velocity.y * this.friction;
    } else if ((this.y + this.radius + this.velocity.y > canvas.height) && 
        (this.x + this.radius < canvas.width / 5)) {
            this.velocity.y = -this.velocity.y * this.friction;
    } else {
        this.velocity.y += gravity;
    }

    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
}

function Circle(x, y, dx, dy, radius, ctx) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.ctx = ctx;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.shadowColor = 'rgba(255, 130, 47)';
        this.ctx.shadowBlur = 40;
        this.ctx.fill();
        this.ctx.restore();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity when mouse is near a circle
        // if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        //     && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        //     if (this.radius < 40) {
        //         this.radius += 1;
        //     }
        // } else if (this.radius > 10) {
        //     this.radius -= 1;
        // }
        
        this.draw();
    }
}

let spawnRate = 75;
function setSpawnRate(rate) {
    spawnRate = rate
}

function Background(ctx) {
    this.ctx = ctx;
    const backgroundGradient = this.ctx.createLinearGradient(0, 0, 0, innerHeight)
    backgroundGradient.addColorStop(0, 'rgb(3, 0, 12)')
    backgroundGradient.addColorStop(1, 'rgb(60, 20, 2)')
    let ticker = 0;

    const circlesArray = [];
    
    for (let i = 0; i < 150; i++) {
        let radius = Math.random() * 20;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - .5) * 0.5;
        let dy = (Math.random() - .5) * 0.3;
    
        circlesArray.push(new Circle(x, y, dx, dy, radius, this.ctx));
    }

    const lavasArray = [];
    
    const animate = () => {
        requestAnimationFrame(animate);
        this.ctx.fillStyle = backgroundGradient;
        this.ctx.fillRect(0, 0, innerWidth, innerHeight);
    
        for (let i = 0; i < circlesArray.length; i++) {
            circlesArray[i].update();
        }

        for (let i = 0; i < lavasArray.length; i++) {
            lavasArray[i].update();
            if (lavasArray[i].radius === 0) {
                lavasArray.splice(i,  1)
            }
        }

        for (let i = 0; i < miniLavasArray.length; i++) {
            miniLavasArray[i].update();
            if (miniLavasArray[i].ttl === 0) {
                miniLavasArray.splice(i, 1)
            }
        }

        ticker++
        if (ticker % spawnRate === 0) {
            const x = Math.random() * innerWidth * 2/3;
            lavasArray.push(new Lava(x, -100, 12, utils.randomColor(lavaColorArray)))
            // spawnRate = utils.randomIntFromRange(2, 5);
        }
    }
    
    animate();
}

module.exports = {
    Background: Background, 
    setGravity: setGravity,
    setSpawnRate: setSpawnRate
};

//canvas example code
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