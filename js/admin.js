const userRole = localStorage.getItem('role');

if(userRole !== 'admin') {
    alert(NOT_AUTHORIZED);
    window.location.href = '/chat.html';   
}


Utils.populateById({
    logout: LOGOUT,
    chat: CHAT,
    admin: ADMIN
});

HandleTable.renderUserTable();
HandleTable.renderApiTable();