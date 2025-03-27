class UserHandler {
  static async toggleRole(email, newRole) {
    try {
      const response = await APIHub.updateRole(email, newRole);
      if (response) {
        alert(SUCCESS_UPDATE_ROLE_WINDOW);
      } else {
        alert(FAILED_UPDATE_ROLE_WINDOW);
      }
    } catch (error) {
      alert(FAILED_UPDATE_WINDOW);
    }
  }

  static async deleteUser(email) {
    const rowElement = document.getElementById(email);
    if (rowElement) {
      try {
        const response = await APIHub.deleteUser(email);
        if (response) {
          rowElement.remove();
          alert(SUCCESS_DELETE_WINDOW);
        } else {
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
    if (newApiValue < 0) {
      alert(FORBIDDEN_UPDATE_WITH_NEGATIVE_API);
      return;
    }

    try {
      const response = await APIHub.updateApiCalls(email, newApiValue);
      if (response) {
        const apiCell = rowElement.querySelector('.api_calls_left');
        apiCell.innerHTML = newApiValue;

        const editButton = rowElement.querySelector(`.edit-button`);
        const saveButton = rowElement.querySelector(`.save-button`);
        editButton.classList.remove('hidden');
        saveButton.classList.add('hidden');
        alert(SUCCESS_UPDATE_API_WINDOW);
      } else {
        alert(FAILED_UPDATE_API_WINDOW);
      }
    } catch (error) {
      alert(FAILED_UPDATE_API_WINDOW);
    }



  }
}