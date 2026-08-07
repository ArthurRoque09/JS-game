import { Player } from "./entities/player.js";
import { Enemy } from "./entities/enemy.js";
import { Bullet } from "./weapons/bullet.js";
import { Map } from "./mapa.js";
import { Camera } from "./core/camera.js"

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};
const bullets = [];
const player = new Player(100, 180);

const camera = new Camera (canvas.width, canvas.height);

const map = new Map("./assets/Mapa.png")

let mouseX = 0;
let mouseY = 0;
let mousePressed = false;

canvas.addEventListener("mousemove", (e) => {

    const rect = canvas.getBoundingClientRect();

    mouseX = e.clientX - rect.left + camera.x;
    mouseY = e.clientY - rect.top + camera.y;

});

const enemies = [];

enemies.push(new Enemy(500, 500));

function updateEnemies(){

    for(let i = 0; i < enemies.length; i++){

        enemies[i].update();

        if(enemies[i].health <= 0){

            enemies.splice(i,1);

            i--;

        }

    }

}
function drawEnemies() {

    for (const enemy of enemies) {
        enemy.draw(ctx);
    }

}



let isReloading = false;
let reloadStartTime = 0;
const reloadDuration = 2000;

// controle de tiro
let lastShotTime = 0;
const shotCooldown = 250; // 0.5s em milissegundos
let ammo = 30; // limite inicial de munição
let maxAmmo = 30; // limite inicial de munição




window.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if (e.key.toLowerCase() === "r" && !isReloading && ammo < maxAmmo) {
        isReloading = true;
        reloadStartTime = Date.now();
    }
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

canvas.addEventListener("mousedown", () => {
    mousePressed = true;
});

canvas.addEventListener("mouseleave", () => {
    mousePressed = false;
});

canvas.addEventListener("mouseup", () => {
    mousePressed = false;
});

function shoot() {

    const now = Date.now();

    if (now - lastShotTime < shotCooldown)
        return;

    if (ammo <= 0)
        return;

    const centerX = player.x + 23;
    const centerY = player.y + 32;

    let dx = mouseX - centerX;
    let dy = mouseY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    dx /= distance;
    dy /= distance;

    const bulletSpeed = 8;

    bullets.push(
        new Bullet(
            centerX,
            centerY,
            dx * bulletSpeed,
            dy * bulletSpeed
        )
    );

    ammo--;
    lastShotTime = now;
}

function updateBullets(){

    for(let i = 0; i < bullets.length; i++){

        bullets[i].update();

        if(
            bullets[i].x < 0 ||
            bullets[i].x > 6020 ||
            bullets[i].y < 0 ||
            bullets[i].y > 3360
        ){

            bullets.splice(i,1);
            i--;

        }

    }

}

function drawBullets(){

    for(const bullet of bullets){

        bullet.draw(ctx);

    }

}

function checkBulletCollision() {

    for (let i = 0; i < bullets.length; i++) {

        const bullet = bullets[i];

        for (let j = 0; j < enemies.length; j++) {

            const enemy = enemies[j];

            if (

                bullet.x > enemy.x &&
                bullet.x < enemy.x + enemy.width &&
                bullet.y > enemy.y &&
                bullet.y < enemy.y + enemy.height

            ) {

                enemy.takeDamage(bullet.damage);

                bullets.splice(i, 1);

                i--;

                break;

            }

        }

    }

}

function drawHUD() {

    // Texto da munição
    ctx.fillStyle = ammo <= 5 ? "red" : "black";
    ctx.font = "20px Arial";
    ctx.fillText(
        "Munição: " + ammo + " / " + maxAmmo,
        20,
        30
    );

    // Barra de munição
    const barX = 20;
    const barY = 50;
    const barWidth = 200;
    const barHeight = 20;

    ctx.fillStyle = "gray";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    const ammoPercent = ammo / maxAmmo;

    ctx.fillStyle = ammoPercent > 0.2 ? "green" : "red";
    ctx.fillRect(barX, barY, barWidth * ammoPercent, barHeight);

    ctx.strokeStyle = "black";
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Barra de recarga
    if (isReloading) {

        const elapsed = Date.now() - reloadStartTime;
        const reloadPercent = Math.min(elapsed / reloadDuration, 1);

        ctx.fillStyle = "blue";
        ctx.fillRect(barX, barY, barWidth * reloadPercent, barHeight);

        if (reloadPercent >= 1) {
            ammo = maxAmmo;
            isReloading = false;
        }

    }

}

function update(){

    player.update(keys);

    player.lookAt(mouseX, mouseY);

    if(mousePressed && !isReloading){
        shoot();
    }

    camera.follow(player);

    updateBullets();

    updateEnemies();

    checkBulletCollision();

}

function render(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();

    ctx.translate(-camera.x,-camera.y);

    map.draw(ctx);

    player.draw(ctx);

    drawBullets();

    drawEnemies();

    ctx.restore();

    drawHUD();

}

function gameLoop(){

    update();

    render();

    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
