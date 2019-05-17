


const colorArray = [ //flame color palette
    "rgb(255, 0, 0, .05)",
    "rgb(255, 90, 0, .05)",
    "rgb(255, 154, 0, .05)"
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


function Circle(x, y, dx, dy, radius, ctx) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.ctx = ctx;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
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


function Background(ctx) {
    this.ctx = ctx;

    const circleArray = [];
    
    for (let i = 0; i < 100; i++) {
        let radius = Math.random() * 30;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - .5) * 0.5;
        let dy = (Math.random() - .5) * 0.3;
    
        circleArray.push(new Circle(x, y, dx, dy, radius, this.ctx));
    }
    
    const animate = () => {
        requestAnimationFrame(animate);
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    
        for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    }
    
    animate();
}

module.exports = Background;