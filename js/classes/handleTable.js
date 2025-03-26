class HandleTable {
    static createTable(id, data, add_edit = false) {
        const table = document.getElementById(id);
        table.innerHTML = '';
        let insertContent = '';
        const headerList = Object.keys(data[0]);

        insertContent += `<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>`
        for (const header of headerList) {
            insertContent += `<th scope="col" class="px-6 py-3">${header}</th>`;

        }
        if (add_edit) {
            insertContent += `<th scope="col" class="px-6 py-3">${CONTROL_BUTTONS_COL_TEXT}</th>`;
        }
        insertContent += "</tr></thead><tbody>"
        for (const row of data) {
            insertContent += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" id='${row["email"]}'>`;

            for (const header of headerList) {
                insertContent += `<td class='px-6 py-4 ${header}'>${row[header]}</td>`;
            }
            if (add_edit) {
                console.log(row["email"]);
                insertContent += `<td class='px-6 py-4 flex justify-between' id='${row[1]}'>
                <button class='text-blue-700 edit-button' onClick="HandleTable.editUser('${row["email"]}')">${EDIT_BUTTON_TEXT}</button>
                <button class='text-blue-700 save-button hidden' onClick="HandleTable.saveUser('${row["email"]}')">${SAVE_BUTTON_TEXT}</button>
                <button class='text-red-500' onClick="HandleTable.deleteUser('${row["email"]}')">${DELETE_BUTTON_TEXT}</button>
                </td>`;
            }
            insertContent += "</tr>";
        }
        insertContent += '</tbody></table>';
        table.innerHTML = insertContent;
    }

    static async deleteUser(email) {
        const rowElement = document.getElementById(email);
        if (rowElement) {
            try{
                const response = await APIHub.deleteUser(email);
                if(response){
                    rowElement.remove();
                    alert(SUCCESS_DELETE_WINDOW);
                }else{
                    alert(FAILED_DELETE_WINDOW);
                }
            } catch (error) {
                alert(FAILED_DELETE_WINDOW);
            }


        }
    }

    static async editUser(email) {
        const rowElement = document.getElementById(email);
        const apiCell = rowElement.querySelector('.api_calls_left'); 

        const apiValue = apiCell.textContent;
        apiCell.innerHTML = `<input type="number" value="${apiValue}" class="api-input w-20 px-2 py-1 border border-gray-300 rounded"/>`;

        const editButton = rowElement.querySelector(`.edit-button`);
        const saveButton = rowElement.querySelector(`.save-button`);
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
    }

    static async saveUser(email) {
        const rowElement = document.getElementById(email);
        const apiInput = rowElement.querySelector('.api-input');  
        const newApiValue = apiInput.value;  

        try{
            const response = await APIHub.updateUser(email, { api_calls_left: newApiValue });
            if(response){
                        const apiCell = rowElement.querySelector('.api_calls_left');
                        apiCell.innerHTML = newApiValue; 
                
                        const editButton = rowElement.querySelector(`.edit-button`);
                        const saveButton = rowElement.querySelector(`.save-button`);
                        editButton.classList.remove('hidden');
                        saveButton.classList.add('hidden');
                        alert(SUCCESS_UPDATE_WINDOW);
            }else{
                alert(FAILED_UPDATE_WINDOW);
            }
        }catch(error){
            alert(FAILED_UPDATE_WINDOW);
        }

        

    }

    static async renderUserTable() {
        const data = await APIHub.getAllUsers();
        HandleTable.createTable('user-table', data, true);
    }

    static async renderApiTable() {
        const data = await APIHub.getApiStats();
        HandleTable.createTable('api-table', data);
    }


}