Utils.populateById({
    title: TITLE,
    'username-label': USERNAME_LABEL,
    'email-label': EMAIL_LABEL,
    'password-label': PASSWORD_LABEL,
    'confirmation-label': CONFIRMATION_LABEL,
    submit: SUBMIT
});

Utils.populatePlaceholderById({
    username: USERNAME_LABEL,
    email: EMAIL,
    password: PASSWORD,
    confirmation: CONFIRMATION
});

const credentialClass = new Credentials();