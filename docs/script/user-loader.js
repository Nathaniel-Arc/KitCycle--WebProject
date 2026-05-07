/**
 * user-loader.js
 * Directive: Remove Hard-coded Names and Implement Dynamic User Loading
 */

document.addEventListener('DOMContentLoaded', () => {
    loadDynamicUser();
});

function loadDynamicUser() {
    let userJSON = localStorage.getItem('currentUser');
    let user;

    if (userJSON) {
        user = JSON.parse(userJSON);
    } else {
        // Fallback for existing sessions
        const name = localStorage.getItem('userName');
        const role = localStorage.getItem('userRole');
        const pic = localStorage.getItem('userPic');
        
        if (name && role) {
            user = {
                name: name,
                role: role,
                profilePic: pic || 'default_avatar.png'
            };
        }
    }
    
    // Default State: If no user is found, redirect to login
    if (!user) {
        console.warn("No user session found. Redirecting to login...");
        const path = window.location.pathname;
        const isInPages = path.includes('/pages/');
        
        if (isInPages) {
            const pathParts = path.split('/pages/');
            const subPath = pathParts[1];
            const depth = subPath.split('/').length - 1;
            window.location.href = '../'.repeat(depth) + 'login.html';
        } else {
            // Check if we are already at login.html
            if (!path.includes('login.html')) {
                window.location.href = 'pages/login.html';
            }
        }
        return;
    }

    updateUserUI(user);
}

function updateUserUI(user) {
    // Robust Path Resolution
    const path = window.location.pathname;
    let rootPrefix = '';
    
    if (!path.includes('/pages/')) {
        rootPrefix = '';
    } else {
        const pathParts = path.split('/pages/');
        const subPath = pathParts[1];
        const depth = subPath.split('/').length - 1;
        rootPrefix = '../'.repeat(depth + 1);
    }

    const fullImgPath = rootPrefix + 'images/' + user.profilePic;

    // Sidebar Elements
    const sidebarName = document.getElementById('sidebar-name');
    const sidebarRole = document.getElementById('sidebar-role');
    const sidebarAvatar = document.getElementById('sidebar-avatar');

    if (sidebarName) sidebarName.textContent = user.name;
    if (sidebarRole) sidebarRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    if (sidebarAvatar && user.profilePic) {
        sidebarAvatar.src = fullImgPath;
    }

    // Navigation Elements
    const navName = document.getElementById('nav-name');
    const navRole = document.getElementById('nav-role');
    const navAvatar = document.getElementById('nav-avatar');
    const navAvatarIcon = document.getElementById('nav-avatar-icon');

    if (navName) navName.textContent = user.name;
    if (navRole) navRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    if (navAvatar && user.profilePic) {
        navAvatar.src = fullImgPath;
        navAvatar.style.display = 'block';
        if (navAvatarIcon) navAvatarIcon.style.display = 'none';
    }
}
