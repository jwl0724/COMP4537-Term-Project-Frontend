class HandleUser{
    static renderTable(id,data) {
        const table = document.getElementById(id);
        table.innerHTML = '';
        let insertContent = '';
        const headerList = Object.keys(data[0]);

        insertContent += `<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>`
        for (const header of headerList) {
            insertContent += `<th scope="col" class="px-6 py-3">${header}</th>`;
        }
        insertContent += "</tr></><tbody>"
        for (const row of data) {
            insertContent += '<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">';

            for (const header of headerList) {
                insertContent += `<td class='px-6 py-4'>${row[header]}</td>`;
            }
            insertContent += '</tr>';
        }
        insertContent += '</tbody></table>';
        table.innerHTML = insertContent;
    }

    static async renderUserTable() {
        const data = await APIHub.getAllUsers();

        HandleUser.renderTable('user-table', data);
    }


}