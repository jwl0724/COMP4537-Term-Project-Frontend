class AudioManager {

    #audioElement;

    constructor() {
        this.#audioElement = document.getElementById("speech");
    }

    playSpeech(audio) {
        this.#audioElement.src = audio;
        this.#audioElement.play();
    }
}