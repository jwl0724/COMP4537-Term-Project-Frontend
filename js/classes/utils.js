class Utils {
    static populateById(pairings) {
        for (const [id, text] of Object.entries(pairings)) {
            document.getElementById(id).innerText = text;
        }
    }

    static populatePlaceholderById(pairings) {
        for (const [id, text] of Object.entries(pairings)) {
            document.getElementById(id).placeholder = text;
        }
    }

    static populateResponseMessage(element, text, color, ...remove) {
        element.textContent = text;
        if (color) element.classList.add(color);
        if (remove) remove.forEach(property => element.classList.remove(property));
    }

    static setButtonState(button, text, disable) {
        button.textContent = text;
        button.disabled = disable;
    }
}