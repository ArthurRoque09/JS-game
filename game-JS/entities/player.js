import { Sprite } from "../core/sprite.js";

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 3;

        this.angle = 0;

        this.spritePlayer = new Sprite("Player.png", 64, 46);
    }

    update(keys) {
        if (keys["ArrowRight"] || keys["d"]) {
            this.x += this.speed;
        }
        if (keys["ArrowLeft"] || keys["a"]) {
            this.x -= this.speed;
        }
        if (keys["ArrowUp"] || keys["w"]) {
            this.y -= this.speed;
        }
        if (keys["ArrowDown"] || keys["s"]) {
            this.y += this.speed;
        }
    }

    draw(ctx){
        this.spritePlayer.draw(
        ctx,
        this.x,
        this.y,
        this.angle
        );
    }

    lookAt(mouseX, mouseY) {

        const centerX = this.x + this.spritePlayer.width / 2;
        const centerY = this.y + this.spritePlayer.height / 2;
    
        this.angle = Math.atan2(
            mouseY - centerY,
            mouseX - centerX
        );
    
    }
}
