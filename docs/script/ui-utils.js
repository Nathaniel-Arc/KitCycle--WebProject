/**
 * UI Utilities for WMSU KitCycle
 * Toast notifications, guest protection, shared animations
 */

window.UIUtils = {
    showToast: function(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const bgColor = type === 'success' ? '#800000' : '#334155';
        
        toast.style.cssText = `
            background: ${bgColor};
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        
        const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-info-circle"></i>';
        toast.innerHTML = `${icon} <span>${message}</span>`;
        
        container.appendChild(toast);
        
        setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 10);
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    },

    /** Check if user is logged in */
    isLoggedIn: function() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    /** Show the guest modal on the current page (if it exists) */
    showGuestModal: function() {
        const modal = document.getElementById('guestModal');
        if (modal) {
            modal.style.display = 'flex';
            return true;
        }
        return false;
    },

    /** Show a highly aesthetic custom modal replacing alert/prompt/confirm */
    showModal: function({ title, message, type = 'alert', inputPlaceholder = '', onConfirm = null }) {
        let overlay = document.getElementById('ui-modal-overlay');
        if(!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'ui-modal-overlay';
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
                display: flex; align-items: center; justify-content: center;
                z-index: 10000; opacity: 0; visibility: hidden;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(overlay);
        }

        const modalIcon = type === 'success' ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' 
                        : type === 'warning' ? '<i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>' 
                        : type === 'info' ? '<i class="fas fa-info-circle" style="color: #3b82f6;"></i>'
                        : '<i class="fas fa-bell" style="color: #800000;"></i>';

        const isPrompt = type === 'prompt';
        const isConfirm = type === 'confirm';

        overlay.innerHTML = `
            <div class="ui-modal-card" style="
                background: #fff; width: 90%; max-width: 400px;
                border-radius: 20px; padding: 30px 25px; text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                transform: scale(0.9); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
                <div style="font-size: 3rem; margin-bottom: 15px;">${modalIcon}</div>
                <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 1.3rem;">${title}</h3>
                <p style="color: #64748b; font-size: 0.95rem; margin: 0 0 20px 0; line-height: 1.5; white-space: pre-wrap;">${message}</p>
                
                ${isPrompt ? `<input type="text" id="ui-modal-input" placeholder="${inputPlaceholder}" style="
                    width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 10px;
                    margin-bottom: 20px; font-size: 0.95rem; outline: none; transition: 0.2s;
                " onfocus="this.style.borderColor='#800000'">` : ''}

                <div style="display: flex; gap: 10px; justify-content: center;">
                    ${(isConfirm || isPrompt) ? `<button id="ui-modal-cancel" style="
                        flex: 1; padding: 12px; background: #f1f5f9; color: #4b5563; border: none;
                        border-radius: 10px; font-weight: 700; cursor: pointer; transition: 0.2s;
                    ">Cancel</button>` : ''}
                    <button id="ui-modal-ok" style="
                        flex: 1; padding: 12px; background: #800000; color: #fff; border: none;
                        border-radius: 10px; font-weight: 700; cursor: pointer; transition: 0.2s;
                    ">${isConfirm ? 'Confirm' : 'OK'}</button>
                </div>
            </div>
        `;

        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            overlay.querySelector('.ui-modal-card').style.transform = 'scale(1)';
            if(isPrompt) document.getElementById('ui-modal-input').focus();
        }, 10);

        const closeModal = (val = null) => {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            overlay.querySelector('.ui-modal-card').style.transform = 'scale(0.9)';
            setTimeout(() => {
                if(onConfirm) onConfirm(val);
            }, 300); // Wait for transition
        };

        document.getElementById('ui-modal-ok').addEventListener('click', () => {
            let val = true;
            if(isPrompt) {
                const input = document.getElementById('ui-modal-input').value;
                if(!input.trim()) return; // Don't close if empty
                val = input;
            }
            closeModal(val);
        });

        const cancelBtn = document.getElementById('ui-modal-cancel');
        if(cancelBtn) {
            cancelBtn.addEventListener('click', () => closeModal(null));
        }
    }
};

// ---- Global click listener for Saved buttons ----
document.addEventListener('click', (e) => {
    const saveBtn = e.target.closest('.btn-save-mini');
    if (saveBtn) {
        e.stopPropagation();
        e.preventDefault();

        // GUEST PROTECTION: block saving for non-logged-in users
        if (!UIUtils.isLoggedIn()) {
            if (!UIUtils.showGuestModal()) {
                // Fallback if no modal exists on this page
                UIUtils.showToast("Please log in to save items", "info");
            }
            return; // stop — do NOT save
        }

        const icon = saveBtn.querySelector('i');
        const itemCard = saveBtn.closest('.item-card') || saveBtn.closest('.market-card');
        const itemName = itemCard ? (itemCard.querySelector('h3') || itemCard.querySelector('h4')).textContent : 'Item';
        
        const isSaved = icon.classList.contains('fas');
        let savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');

        if (isSaved) {
            icon.classList.replace('fas', 'far');
            saveBtn.style.color = 'inherit';
            savedItems = savedItems.filter(name => name !== itemName);
            UIUtils.showToast("Removed from Saved List", "info");
        } else {
            icon.classList.replace('far', 'fas');
            saveBtn.style.color = '#ef4444';
            if (!savedItems.includes(itemName)) savedItems.push(itemName);
            UIUtils.showToast("Item added to your Saved List");
        }

        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        window.dispatchEvent(new CustomEvent('savedItemsChanged'));
    }
});
