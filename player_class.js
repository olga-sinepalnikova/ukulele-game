class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    update() {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (!keyboardDown && canvas.height - this.height >= this.y >= 0 && canvas.width - this.width >= this.x >= 0) {
            // switch (noteElem.innerText) {
            //     case 'D':
            //         this.y -= this.height;
            //         break;
            //     case 'F':
            //         this.x -= this.width;
            //         break;
            //     case 'B':
            //         this.y += this.height;
            //         break;
            //     case 'C':
            //         this.x += this.width;
            //         break;
            // }
            var d = keyboardControl();
            console.log(d);
            switch (d) {
                case 'D':
                    this.y -= this.height;
                    break;
                case 'F':
                    this.x -= this.width;
                    break;
                case 'B':
                    this.y += this.height;
                    break;
                case 'C':
                    this.x += this.width;
                    break;
            }
            //должен быть другой способ
        }
    }
}

var player = new Player()