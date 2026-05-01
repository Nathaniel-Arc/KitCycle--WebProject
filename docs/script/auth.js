/**
 * ============================================================
 *  WMSU KitCycle — Authentication & Session Management (v2)
 *  Single, modular file. Link with <script src="…/auth.js" defer>
 * ============================================================
 */

window.AuthSystem = {

    /* ── Hardcoded credential store ─────────────────────────── */
    _accounts: [
        { email: 'student@wmsu.edu.ph', password: 'student', role: 'student', name: 'Nash Arciaga', profilePic: 'nash_profile.png' },
        { email: 'maria@wmsu.edu.ph',   password: 'student', role: 'student', name: 'Maria Santos', profilePic: 'maria_profile.png' },
        { email: 'juan@wmsu.edu.ph',    password: 'student', role: 'student', name: 'Juan Dela Cruz', profilePic: 'juan_profile.png' },
        { email: 'elena@wmsu.edu.ph',   password: 'student', role: 'student', name: 'Elena Rodriguez', profilePic: 'elena_profile.png' },
        { email: 'admin@wmsu.edu.ph',   password: 'admin',   role: 'admin',   name: 'Admin Officer',  profilePic: null },
        { email: 'faculty@wmsu.edu.ph', password: 'faculty', role: 'faculty', name: 'Prof. Gomez',    profilePic: 'faculty_avatar.png' }
    ],

    /* ── 1. Authenticate — validates email + password ──────── */
    authenticate: function (email, password) {
        const trimmedEmail = email.trim().toLowerCase();
        const account = this._accounts.find(
            a => a.email === trimmedEmail && a.password === password
        );
        if (!account) return null;
        return account;
    },

    /* ── 2. Login — saves session & redirects ──────────────── */
    loginUser: function (account) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName',   account.name);
        localStorage.setItem('userRole',   account.role);
        localStorage.setItem('userEmail',  account.email);
        localStorage.setItem('userPic',    account.profilePic || '');
        localStorage.setItem('isVerified', 'true'); // Hardcoded accounts are verified by default

        // Build the correct path to the dashboard folders
        const isInPages = window.location.pathname.includes('/pages/');
        const prefix    = isInPages ? '' : 'pages/';

        switch (account.role) {
            case 'student':
                window.location.href = prefix + 'student-interface html/student-dashboard.html';
                break;
            case 'faculty':
                window.location.href = prefix + 'faculty-interface html/faculty-dashboard.html';
                break;
            case 'admin':
                window.location.href = prefix + 'admin-interface html/admin-dashboard.html';
                break;
            default:
                window.location.href = isInPages ? '../index.html' : 'index.html';
        }
    },

    /* ── 3. Logout — clears storage, back to guest home ────── */
    logoutUser: function () {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPic');
        localStorage.removeItem('isVerified');

        // Resolve path back to root index.html
        const isAtRoot = !window.location.pathname.includes('/pages/');
        if (isAtRoot) {
            window.location.href = 'index.html';
        } else {
            const pathParts = window.location.pathname.split('/pages/');
            const subPath = pathParts[1];
            const depth = subPath.split('/').length - 1;
            window.location.href = '../'.repeat(depth + 1) + 'index.html';
        }
    },

    /* ── 3b. Confirm Logout — aesthetic centered modal ────── */
    confirmLogout: function () {
        if (typeof UIUtils !== 'undefined' && UIUtils.showModal) {
            UIUtils.showModal({
                title: 'Log Out of WMSU KitCycle?',
                message: 'Are you sure you want to log out? You will need to sign in again to access your dashboard, rentals, and listings.',
                type: 'confirm',
                onConfirm: (val) => {
                    if (val) {
                        localStorage.clear();
                        // Small delay so user sees transition
                        setTimeout(() => {
                            const isAtRoot = !window.location.pathname.includes('/pages/');
                            if (isAtRoot) {
                                window.location.href = 'index.html';
                            } else {
                                const pathParts = window.location.pathname.split('/pages/');
                                const subPath = pathParts[1];
                                const depth = subPath.split('/').length - 1;
                                window.location.href = '../'.repeat(depth + 1) + 'index.html';
                            }
                        }, 300);
                    }
                }
            });
        } else {
            // Fallback if UIUtils not loaded
            if (confirm('Are you sure you want to log out of WMSU KitCycle?')) {
                localStorage.clear();
                const isAtRoot = !window.location.pathname.includes('/pages/');
                if (isAtRoot) {
                    window.location.href = 'index.html';
                } else {
                    const pathParts = window.location.pathname.split('/pages/');
                    const subPath = pathParts[1];
                    const depth = subPath.split('/').length - 1;
                    window.location.href = '../'.repeat(depth + 1) + 'index.html';
                }
            }
        }
    },

    /* ── 4. Global State Check — runs on every page load ──── */
    updateNavbar: function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userName   = localStorage.getItem('userName');
        const userRole   = localStorage.getItem('userRole');
        let userPic      = localStorage.getItem('userPic');
        const authBtns   = document.querySelector('.auth-buttons');

        if (!authBtns) return;                  // no navbar on this page

        if (isLoggedIn && userName) {
            // Fallback for demo: if it's Nash and pic is missing, set it
            if (userName === 'Nash Arciaga' && !userPic) {
                userPic = 'nash_profile.png';
                localStorage.setItem('userPic', userPic);
            }

            // Determine root and pages prefix based on directory depth
            let rootPrefix = '';
            let pagesPrefix = '';
            const isAtRoot = !window.location.pathname.includes('/pages/');
            
            if (isAtRoot) {
                rootPrefix = '';
                pagesPrefix = 'pages/';
            } else {
                const pathParts = window.location.pathname.split('/pages/');
                const subPath = pathParts[1];
                const depth = subPath.split('/').length - 1;
                rootPrefix = '../'.repeat(depth + 1);
                pagesPrefix = '../'.repeat(depth);
            }

            const imgPath = userPic ? rootPrefix + 'images/' + userPic : '';
            let dashboardHref = '#';

            if (userRole === 'student') {
                dashboardHref = pagesPrefix + 'student-interface html/student-dashboard.html';
            } else if (userRole === 'faculty') {
                dashboardHref = pagesPrefix + 'faculty-interface html/faculty-dashboard.html';
            } else if (userRole === 'admin') {
                dashboardHref = pagesPrefix + 'admin-interface html/admin-dashboard.html';
            }

            const isVerified = localStorage.getItem('isVerified') === 'true';
            const verifiedBadge = isVerified ? ' <i class="fas fa-shield-alt" style="color: #800000; font-size: 0.85rem; margin-left: 5px;" title="Verified Student"></i>' : '';

            // Check for real notifications
            const notifications = JSON.parse(localStorage.getItem('kitcycle_notifications') || '[]');
            const unreadCount = notifications.filter(n => !n.read).length;
            const hasNotifications = unreadCount > 0;

            authBtns.innerHTML = `
                <!-- Messages Icon with Red Badge -->
                <div class="nav-msg-container">
                    <button class="nav-msg-btn" onclick="window.location.href='${pagesPrefix}student-interface html/student-messages.html'">
                        <i class="far fa-comments"></i>
                        <div class="msg-badge ${hasNotifications ? 'active' : ''}" id="navMsgBadge"></div>
                    </button>
                </div>

                <!-- Notifications -->
                <div class="nav-notification-container">
                    <button class="nav-notification-btn" onclick="AuthSystem.toggleNotifs(event)">
                        <i class="far fa-bell"></i>
                    </button>
                    <div class="notif-dropdown" id="authNotifDropdown">
                        <div class="notif-header">Notifications</div>
                        <div id="notifItemsList">
                            ${notifications.length > 0 ? notifications.slice(0, 3).map(n => `
                                <div class="notif-item">
                                    <p><strong>${n.title}</strong> ${n.message}</p>
                                    <span>${n.time}</span>
                                </div>
                            `).join('') : `
                                <div class="notif-item">
                                    <p>No new notifications.</p>
                                </div>
                            `}
                        </div>
                        <div class="notif-view-all" onclick="window.location.href='${pagesPrefix}student-interface html/student-notifications.html'">See All Notifications</div>
                    </div>
                </div>

                <div class="user-nav-profile" id="userNavProfile">
                    <a href="${dashboardHref}" class="user-avatar-link" title="Go to Dashboard">
                        <span class="user-avatar-circle">
                            ${userPic ? `<img src="${imgPath}" alt="${userName}" class="nav-profile-img-circle">` : `<i class="fas fa-user"></i>`}
                        </span>
                    </a>
                    <div class="user-meta">
                        <span class="user-display-name">${userName}${verifiedBadge}</span>
                        <span class="user-role-badge">${userRole}</span>
                    </div>
                    <button id="logoutBtn" class="btn-logout-nav" title="Logout">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            `;

            document.getElementById('logoutBtn')
                .addEventListener('click', (e) => {
                    e.preventDefault();
                    AuthSystem.confirmLogout();
                });

            // --- Sidebar Profile Update ---
            const sidebarName = document.getElementById('sidebarUserName');
            const sidebarRole = document.getElementById('sidebarUserRole');
            const sidebarImg = document.getElementById('sidebarProfileImg');
            
            if (sidebarName) sidebarName.innerHTML = userName + verifiedBadge;
            if (sidebarRole) sidebarRole.textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);
            if (sidebarImg && userPic) sidebarImg.src = imgPath;
        }
    },

    /* ── 5. Notification Toggle ─────────────────────── */
    /* ── 5. Notification Toggle ─────────────────────── */
    toggleNotifs: function (e) {
        if (e) e.stopPropagation();
        const dropdown = document.getElementById('authNotifDropdown');
        if (!dropdown) return;

        const isActive = dropdown.classList.contains('active');
        
        if (!isActive) {
            dropdown.classList.add('active');
            
            // Mark as read logic
            const notifications = JSON.parse(localStorage.getItem('kitcycle_notifications') || '[]');
            notifications.forEach(n => n.read = true);
            localStorage.setItem('kitcycle_notifications', JSON.stringify(notifications));
            
            const badge = document.getElementById('navMsgBadge');
            if (badge) badge.classList.remove('active');

            // Close when clicking outside - delayed to avoid immediate closure
            setTimeout(() => {
                const closeHandler = (ev) => {
                    if (!dropdown.contains(ev.target)) {
                        dropdown.classList.remove('active');
                        document.removeEventListener('click', closeHandler);
                    }
                };
                document.addEventListener('click', closeHandler);
            }, 10);
        } else {
            dropdown.classList.remove('active');
        }
    },

    /* ── 6. Add Notification (Helper) ────────────────── */
    addNotification: function(title, message) {
        const notifications = JSON.parse(localStorage.getItem('kitcycle_notifications') || '[]');
        notifications.unshift({
            title: title,
            message: message,
            time: 'Just now',
            read: false
        });
        localStorage.setItem('kitcycle_notifications', JSON.stringify(notifications));
        this.updateNavbar(); // Refresh UI
    }
};

/* ── Auto-init on every page ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    AuthSystem.updateNavbar();
});

/* ── Inject portable CSS for the auth UI ──────────────────── */
(function injectAuthStyles() {
    const css = `
    /* ── Auth Navbar Profile ─────────────────────── */
    .user-nav-profile {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .user-avatar-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #800000 0%, #a52a2a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFD700;
        font-size: 0.95rem;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(128,0,0,0.25);
        overflow: hidden;
    }
    .nav-profile-img-circle {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .user-avatar-link:hover .user-avatar-circle {
        transform: scale(1.08);
        box-shadow: 0 4px 12px rgba(128,0,0,0.35);
    }
    .user-meta {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
    }
    .user-display-name {
        font-size: 0.88rem;
        font-weight: 700;
        color: #1f2937;
    }
    .user-role-badge {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #800000;
        background: #fef2f2;
        padding: 1px 8px;
        border-radius: 4px;
        width: fit-content;
        margin-top: 2px;
    }
    .btn-logout-nav {
        background: #f8fafc;
        color: #64748b;
        border: 1px solid #e2e8f0;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .btn-logout-nav:hover {
        background: #fef2f2;
        color: #ef4444;
        border-color: #fecaca;
        transform: scale(1.05);
    }

    /* ── Messages & Notifications Icons ──────────── */
    .nav-msg-container, .nav-notification-container {
        position: relative;
        margin-right: 5px;
    }
    .nav-msg-btn, .nav-notification-btn {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        border: 1.5px solid #e2e8f0;
        background: #fff;
        color: #64748b;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .nav-msg-btn:hover, .nav-notification-btn:hover {
        background: #f8fafc;
        color: #800000;
        border-color: #800000;
        transform: translateY(-2px);
    }

    /* Message Badge (Crimson Circle) */
    .msg-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 12px;
        height: 12px;
        background: #800000; /* WMSU Crimson */
        border: 2px solid #fff;
        border-radius: 50%;
        display: none;
        z-index: 10;
        box-shadow: 0 2px 4px rgba(128,0,0,0.3);
    }
    .msg-badge.active {
        display: block;
        animation: pulseBadge 2s infinite;
    }
    @keyframes pulseBadge {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(128,0,0,0.4); }
        70% { transform: scale(1.2); box-shadow: 0 0 0 6px rgba(128,0,0,0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(128,0,0,0); }
    }

    /* ── Notification Dropdown (Stable & Smooth) ──── */
    .notif-dropdown {
        position: absolute;
        top: 45px;
        right: -10px;
        width: 320px;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        z-index: 9999;
        overflow: hidden;
        
        /* Stable State Management */
        visibility: hidden;
        opacity: 0;
        transform: translateY(10px) scale(0.95);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }
    .notif-dropdown.active {
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
    }

    .notif-header {
        padding: 15px 20px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        font-weight: 800;
        font-size: 0.9rem;
        color: #1f2937;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    .notif-item {
        padding: 15px 20px;
        border-bottom: 1px solid #f1f5f9;
        cursor: pointer;
        transition: 0.2s;
    }
    .notif-item:hover { background: #f9fafb; border-left: 3px solid #800000; padding-left: 17px; }
    .notif-item p { margin: 0; font-size: 0.85rem; color: #4b5563; line-height: 1.5; }
    .notif-item span { font-size: 0.72rem; color: #9ca3af; margin-top: 6px; display: block; font-weight: 500; }
    .notif-view-all {
        padding: 15px;
        text-align: center;
        font-size: 0.85rem;
        color: #800000;
        font-weight: 700;
        cursor: pointer;
        background: #fff;
        transition: background 0.2s;
    }
    .notif-view-all:hover { background: #fff1f2; text-decoration: underline; }

    /* ── Login Error Toast ────────────────────────── */
    .login-error-toast {
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #991b1b;
        padding: 12px 18px;
        border-radius: 10px;
        font-size: 0.88rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 18px;
        animation: shakeToast 0.4s ease;
    }
    .login-error-toast i {
        font-size: 1.1rem;
        color: #ef4444;
    }
    @keyframes shakeToast {
        0%, 100% { transform: translateX(0); }
        20%      { transform: translateX(-6px); }
        40%      { transform: translateX(6px); }
        60%      { transform: translateX(-4px); }
        80%      { transform: translateX(4px); }
    }
    `;
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
})();
