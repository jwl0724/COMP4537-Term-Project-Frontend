const userRole = localStorage.getItem('role');

// window.onload = () => {
//     if (userRole !== 'admin') {
//         window.location.href = '/chat.html';
//     } 
// };



document.getElementById("logout").innerText = LOGOUT;
document.getElementById("chat").innerText = CHAT;
document.getElementById("admin").innerText = ADMIN;