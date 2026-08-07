export class Enemy {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.health = 100;

        this.hitTimer = 0;
    }

    update() {

    }

    takeDamage(damage) {
        this.health -= damage;

        this.hitTimer = 5;
    }

    draw(ctx){

    // corpo
    ctx.fillStyle = "red";
    ctx.fillRect(this.x,this.y,this.width,this.height);

    // barra
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x,this.y - 10,this.width,5);

    ctx.fillStyle = "lime";
    ctx.fillRect(
        this.x,
        this.y - 10,
        this.width * (this.health / 100),
        5
    );

}

}