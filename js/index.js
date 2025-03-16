Utils.populateById({
    title: TITLE,
    login: LOGIN,
    signup: SIGNUP
});

const music = new MusicManager();
document.addEventListener("click", () => music.play());

document.getElementById("spongebob").src = images.happy;





// TODO: Add muting and unmuting later