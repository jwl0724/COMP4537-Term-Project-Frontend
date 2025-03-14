Utils.populateById({
    title: TITLE,
    login: LOGIN,
    signup: SIGNUP
});

const music = new MusicManager();
document.addEventListener("click", () => music.play());


// TODO: Add muting and unmuting later