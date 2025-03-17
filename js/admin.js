const userRole = localStorage.getItem('role');

// window.onload = () => {
//     if (userRole !== 'admin') {
//         window.location.href = '/chat.html';
//     } 
// };


Utils.populateById({
    logout: LOGOUT,
    chat: CHAT,
    admin: ADMIN
});

HandleUser.renderUserTable();