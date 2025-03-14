class Utils {
    static populateById(pairings) {
        for(const [id, text] of Object.entries(pairings)) {
            document.getElementById(id).innerHTML = text;
        }
    }

    static populatePlaceholderById(pairings) {
        for(const [id, text] of Object.entries(pairings)) {
            document.getElementById(id).placeholder = text;
        }
    }
}