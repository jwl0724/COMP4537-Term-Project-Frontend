const userRole = localStorage.getItem('role');




Utils.populateById({
    logout: LOGOUT,
    chat: CHAT,
    admin: ADMIN
});

HandleTable.renderUserTable();
HandleTable.renderApiTable();
HandleTable.renderEndpointTable();