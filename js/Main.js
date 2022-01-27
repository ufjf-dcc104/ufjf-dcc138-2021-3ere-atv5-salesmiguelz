import Mapa from "./Mapa.js";
import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
});

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");



const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas, assets);
canvas.width = 14*32;
canvas.height = 10*32;

const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);


const pc = new Sprite({x: 50, vx: 10});
pc.controlar = function(dt){
    if(input.comandos.get("MOVE_ESQUERDA")){
        this.vx = -50;
    } else if(input.comandos.get("MOVE_DIREITA")){
        this.vx = +50;
    } else{
        this.vx = 0;
    }

    if(input.comandos.get("MOVE_CIMA")){
        this.vy = -50;
    } else if(input.comandos.get("MOVE_BAIXO")){
        this.vy = +50;
    } else{
        this.vy = 0;
    }
}

const en1 = new Sprite({
    x: 160,
    vx: -10,
    color: "red"
});


cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({
    x: 115,
    y: 50,
    vy: 10,
    color: "green"
}));

cena1.adicionar(new Sprite({
    x: 115,
    y: 160,
    vy: -10,
    color: "red"
}));

cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
        default:
            break;
    }
});
