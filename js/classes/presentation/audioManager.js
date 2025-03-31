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

    // Get a random preset audio from the stock list
    getRandomStockAudio() {
        return AudioManager.#stockAudio[Math.floor(Math.random() * AudioManager.#stockAudio.length)];
    }

    // Get the total duration of the current audio (in seconds)
    getAudioLength() {
        return this.#audioElement.duration;
    }


    // Get the current playback position of the audio (in seconds)
    getAudioPosition() {
        return this.#audioElement.currentTime;
    }

    // Play the specified audio file
    playSpeech(audio) {
        this.#audioElement.src = audio;
        this.#audioElement.play();
    }
}