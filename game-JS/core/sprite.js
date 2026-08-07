export class Sprite {
    constructor(src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.loaded = false;
        this.error = false;

        this.image.onload = () => {
            this.loaded = true;
        };

        this.image.onerror = () => {
            this.error = true;
            console.warn(`Sprite não encontrado: ${src}`)
        }
    }

    draw(ctx, x, y, angle = 0) {

    ctx.save();

    ctx.translate(
        x + this.width / 2,
        y + this.height / 2
    );

    ctx.rotate(angle);

    if (this.loaded) {

        ctx.drawImage(
            this.image,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

    } else {

        ctx.fillStyle = "green";

        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.strokeStyle = "black";
        ctx.strokeRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(
            "SPRITE",
            -18,
            5
        );

    }

    ctx.restore();

}
}