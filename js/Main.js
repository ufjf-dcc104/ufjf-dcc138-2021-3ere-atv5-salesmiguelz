import Mapa from "./Mapa.js";
import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

const assets = new AssetManager();
assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("moeda", "assets/coin.wav");


const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas, assets);
canvas.width = 14*32;
canvas.height = 10*32;

const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);


const pc = new Sprite({x: 50, vx: 10});
const en1 = new Sprite({
    x: 160,
    vx: -10,
    color: "red"
});


cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({
    y: 70,
    color: "red"
}));

//Daqui pra cima tudo entendido
//Dificuldade esta sendo na parte da animacao
cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
        default:
            break;
    }
});
