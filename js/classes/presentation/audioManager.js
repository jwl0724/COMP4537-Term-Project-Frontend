class AudioManager {

    #audioElement;

    static #stockAudio = [
        audio.stock1,
        audio.stock2,
        audio.stock3,
        audio.stock4,
        audio.stock5,
        audio.stock6,
        audio.stock7
    ]

    constructor() {
        this.#audioElement = document.getElementById("speech");
    }

    getRandomStockAudio() {
        return AudioManager.#stockAudio[Math.floor(Math.random() * AudioManager.#stockAudio.length)];
    }

    getAudioLength() {
        return this.#audioElement.duration;
    }

    getAudioPosition() {
        return this.#audioElement.currentTime;
    }

    playSpeech(audio) {
        this.#audioElement.src = audio;
        this.#audioElement.play();
    }
}