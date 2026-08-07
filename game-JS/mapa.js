export class Map {

    constructor(src) {

        this.image = new Image();
        this.image.src = src;

        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
        };
    }

    draw(ctx){

        if(this.loaded){
    
            ctx.drawImage(this.image,0,0,558 *6, 447*6);
    
        }else{
    
            ctx.fillStyle = "gray";
            ctx.fillRect(0,0,6020,3360);
    
        }
    
    }

}