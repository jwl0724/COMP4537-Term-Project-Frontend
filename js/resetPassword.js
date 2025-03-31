Utils.populateById({
  title: TITLE,
  submit: SUBMIT,
  "password-label": PASSWORD_LABEL,
  "confirmPassword-label": PASSWORD_CONFIRM_LABEL,
});

const form = document.getElementById("reset-password");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (password !== confirmPassword) {
    Utils.populateResponseMessage(errorMessage, ERROR_PASSWORD_MISMATCH);
    return;
  }

  // Input is valid
  Utils.setButtonState(submitButton, SENDING, true);
  try {
    const data = await APIHub.reset(token, password);
    if (!data.error) Utils.populateResponseMessage(errorMessage, SUCCESS_MESSAGE, style.greenText, style.redText);
    else Utils.populateResponseMessage(errorMessage, ERROR_SERVER, style.redText, style.greenText);

  } catch (error) {
    Utils.populateResponseMessage(errorMessage, ERROR_NETWORK, style.redText, style.greenText);
  } finally {
    Utils.setButtonState(submitButton, SUBMIT, false);
  }
}
);

