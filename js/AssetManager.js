export default class AssetManager{
    constructor(mixer = null){
        this.aCarregar = 0;
        this.carregadas = 0;
        this.imagens = new Map();
        this.audios = new Map();
        this.mixer = mixer;
    }
    
    carregaImagem(chave, valor){
        const img = new Image();
        img.addEventListener("load", () => {
            this.carregadas++;
        });
        img.src = valor;
        this.imagens.set(chave, img);
        this.aCarregar++;
    }

    carregaAudio(chave, valor){
        const audio = new Audio();
        audio.addEventListener("loadeddata", () => {
            this.carregadas++;
        });
        audio.src = valor;
        this.audios.set(chave, audio);
        this.aCarregar++;
    }

    img(chave){
        return this.imagens.get(chave);
    }
    audio(chave){
        return this.audios.get(chave);
    }

    progresso(){
        if(this.aCarregar > 0){
            return `${(this.carregadas/this.aCarregar * 100).toFixed(2)}%`;
        }

        return "Nada a carregar!";
    }

    acabou(){
        return this.carregadas === this.aCarregar;
    }

    play(chave){
        this.mixer?.play(this.audio(chave));
    }
}