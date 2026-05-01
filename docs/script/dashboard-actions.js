/**
 * Dashboard Actions Logic (v2)
 * Handles Extend Rental, Initiate Return, QR Scanning, Logic Lock, Dynamic Duration
 */

window.DashboardActions = {

    // ── Rental Data Store ──
    _getRentals: function() {
        const defaults = [
            { id: 'r1', item: 'Canon EOS 90D DSLR', lender: 'Juan Dela Cruz', location: 'Engineering Building', rate: 75, rateUnit: 'hour', status: 'Active', hoursLeft: 5, totalCost: 1750, image: '../../images/camera.jpg' },
            { id: 'r2', item: 'Scientific Calculator TI-84', lender: 'Maria Santos', location: 'Library Lobby', rate: 10, rateUnit: 'hour', status: 'Pending Pickup', hoursLeft: 24, totalCost: 0, image: '../../images/calculator.jpg' }
        ];
        if (!localStorage.getItem('kitcycle_rentals')) {
            localStorage.setItem('kitcycle_rentals', JSON.stringify(defaults));
        }
        return JSON.parse(localStorage.getItem('kitcycle_rentals'));
    },
    _saveRentals: function(data) { localStorage.setItem('kitcycle_rentals', JSON.stringify(data)); },

    _getLendings: function() {
        const defaults = [
            { id: 'le1', item: 'Engineering Textbook Bundle', borrower: 'Miguel Tan', location: 'Level 2 Library', rate: 10, rateUnit: 'hour', status: 'With Borrower', totalCost: 50, image: '../../images/books.jpeg' },
            { id: 'le2', item: 'Laboratory Microscope', borrower: 'Sarah Lee', location: 'Science Lab A', rate: 25, rateUnit: 'hour', status: 'On My Hand', totalCost: 0, image: '../../images/microscope.jpeg' }
        ];
        if (!localStorage.getItem('kitcycle_lendings')) {
            localStorage.setItem('kitcycle_lendings', JSON.stringify(defaults));
        }
        return JSON.parse(localStorage.getItem('kitcycle_lendings'));
    },
    _saveLendings: function(data) { localStorage.setItem('kitcycle_lendings', JSON.stringify(data)); },

    // ── 1. Extend Rental (Dynamic Dropdown) ──
    extendRental: function(btnElement) {
        const card = btnElement.closest('.compact-rental-item, .rental-horizontal-card');
        const itemName = card ? (card.querySelector('h4, h3') || {}).textContent || 'this item' : 'this item';
        const rentals = this._getRentals();
        const rental = rentals.find(r => itemName.includes(r.item.split(' ')[0])) || rentals[0];
        const rate = rental ? rental.rate : 10;
        const unit = rental ? rental.rateUnit : 'hour';

        const options = [
            { label: '1 hour', hours: 1 },
            { label: '2 hours', hours: 2 },
            { label: '3 hours', hours: 3 },
            { label: '6 hours', hours: 6 },
            { label: '12 hours', hours: 12 },
            { label: '1 day (24h)', hours: 24 }
        ];

        let overlay = document.getElementById('extend-rental-overlay');
        if (overlay) overlay.remove();

        overlay = document.createElement('div');
        overlay.id = 'extend-rental-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        const optionsHtml = options.map(o => {
            const cost = o.hours * rate;
            return `<option value="${o.hours}" data-cost="${cost}">${o.label} — +₱${cost.toLocaleString()}</option>`;
        }).join('');

        overlay.innerHTML = `
            <div style="background:#fff;width:90%;max-width:420px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);">
                <div style="text-align:center;margin-bottom:20px;">
                    <div style="width:60px;height:60px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-clock" style="font-size:1.5rem;color:#800000;"></i></div>
                    <h3 style="margin:0;color:#1e293b;font-size:1.2rem;">Extend Rental</h3>
                    <p style="color:#64748b;font-size:0.85rem;margin-top:5px;">${itemName}</p>
                    <p style="color:#800000;font-weight:700;font-size:0.85rem;">Rate: ₱${rate}/${unit}</p>
                </div>
                <label style="display:block;font-weight:700;color:#1e293b;margin-bottom:8px;font-size:0.9rem;">How much longer?</label>
                <select id="extendDurationSelect" style="width:100%;padding:12px 15px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.95rem;outline:none;margin-bottom:10px;cursor:pointer;" onchange="DashboardActions._updateExtendCost()">
                    ${optionsHtml}
                </select>
                <div id="extendCostPreview" style="background:#f8fafc;border-radius:10px;padding:12px;text-align:center;margin-bottom:20px;">
                    <span style="font-size:0.85rem;color:#64748b;">Additional cost: </span>
                    <span id="extendCostValue" style="font-size:1.1rem;font-weight:800;color:#800000;">₱${(1 * rate).toLocaleString()}</span>
                </div>
                <div style="display:flex;gap:10px;">
                    <button id="extendCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Cancel</button>
                    <button id="extendRequestBtn" style="flex:1;padding:12px;background:#800000;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Request Extension</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('extendCancelBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

        document.getElementById('extendRequestBtn').onclick = () => {
            const sel = document.getElementById('extendDurationSelect');
            const hours = parseInt(sel.value);
            const cost = hours * rate;

            if (rental) {
                rental.hoursLeft += hours;
                rental.totalCost += cost;
                this._saveRentals(rentals);
            }

            overlay.remove();
            btnElement.textContent = 'Extension Pending';
            btnElement.style.background = '#64748b';
            btnElement.style.color = '#fff';
            btnElement.style.pointerEvents = 'none';

            AuthSystem.addNotification('Extension Requested', `You requested ${hours} more hour(s) for ${itemName}. +₱${cost} added. Awaiting lender approval.`);
            UIUtils.showToast(`Extension of ${hours}h requested (+₱${cost}). Waiting for lender approval.`, 'info');
        };
    },

    _updateExtendCost: function() {
        const sel = document.getElementById('extendDurationSelect');
        const opt = sel.options[sel.selectedIndex];
        const cost = opt.getAttribute('data-cost');
        document.getElementById('extendCostValue').textContent = '₱' + parseInt(cost).toLocaleString();
    },

    // ── 2. Initiate Return (QR Code + Notification) ──
    initiateReturn: function(btnElement) {
        const card = btnElement.closest('.compact-rental-item, .rental-horizontal-card');
        const itemName = card ? (card.querySelector('h4, h3') || {}).textContent || 'this item' : 'this item';
        const lenderEl = card ? card.querySelector('p') : null;
        const lenderText = lenderEl ? lenderEl.textContent : '';
        const lenderMatch = lenderText.match(/(?:Lender|from):?\s*([A-Z][a-z]+ [A-Z][a-z]+)/i);
        const lenderName = lenderMatch ? lenderMatch[1] : 'the lender';
        const locationMatch = lenderText.match(/•\s*(.+?)(?:\s*$)/);
        const meetLocation = locationMatch ? locationMatch[1].trim() : 'campus meetup point';

        UIUtils.showModal({
            title: 'Initiate Return',
            message: `Ready to return "${itemName}"?\n\nA Return QR Code will be generated. Meet ${lenderName} at ${meetLocation} to scan and complete the return.`,
            type: 'confirm',
            onConfirm: (val) => {
                if (val) {
                    const userName = localStorage.getItem('userName') || 'Student';
                    const returnCode = 'KC-' + Date.now().toString(36).toUpperCase();

                    // Update rental status
                    const rentals = this._getRentals();
                    const rental = rentals.find(r => itemName.includes(r.item.split(' ')[0]));
                    if (rental) { rental.status = 'Return Initiated'; this._saveRentals(rentals); }

                    // Show Return QR modal
                    this._showReturnQR(itemName, returnCode, lenderName, meetLocation);

                    btnElement.innerHTML = '<i class="fas fa-check"></i> Return Initiated';
                    btnElement.style.background = '#10b981';
                    btnElement.style.color = '#fff';
                    btnElement.style.borderColor = '#10b981';
                    btnElement.style.pointerEvents = 'none';

                    // Disable extend button on same card
                    const extendBtn = card ? card.querySelector('[onclick*="extendRental"]') : null;
                    if (extendBtn) {
                        extendBtn.style.opacity = '0.4';
                        extendBtn.style.pointerEvents = 'none';
                        extendBtn.textContent = 'Return in Progress';
                    }

                    AuthSystem.addNotification('Return Initiated', `${userName} is ready to return "${itemName}". Meet at ${meetLocation} to scan the return QR.`);
                    UIUtils.showToast('Return process initiated. Show the QR to the lender.', 'success');
                }
            }
        });
    },

    _showReturnQR: function(itemName, code, lender, location) {
        let overlay = document.getElementById('return-qr-overlay');
        if (overlay) overlay.remove();

        overlay = document.createElement('div');
        overlay.id = 'return-qr-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10001;';

        overlay.innerHTML = `
            <div style="background:#fff;width:90%;max-width:380px;border-radius:20px;padding:30px;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.25);">
                <div style="width:60px;height:60px;background:#ecfdf5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 15px;"><i class="fas fa-qrcode" style="font-size:1.5rem;color:#10b981;"></i></div>
                <h3 style="margin:0 0 5px;color:#1e293b;">Return QR Code</h3>
                <p style="color:#64748b;font-size:0.85rem;margin-bottom:15px;">${itemName}</p>
                <div style="width:180px;height:180px;margin:0 auto 15px;background:linear-gradient(135deg,#f8fafc,#e2e8f0);border-radius:15px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid #cbd5e1;">
                    <i class="fas fa-qrcode" style="font-size:4rem;color:#1e293b;margin-bottom:8px;"></i>
                    <span style="font-family:monospace;font-size:0.8rem;font-weight:700;color:#800000;">${code}</span>
                </div>
                <div style="background:#f8fafc;border-radius:10px;padding:12px;margin-bottom:15px;text-align:left;font-size:0.8rem;">
                    <p style="margin:0 0 4px;color:#4b5563;"><i class="fas fa-user" style="color:#800000;width:16px;"></i> Meet: <strong>${lender}</strong></p>
                    <p style="margin:0;color:#4b5563;"><i class="fas fa-map-marker-alt" style="color:#800000;width:16px;"></i> Location: <strong>${location}</strong></p>
                </div>
                <button onclick="document.getElementById('return-qr-overlay').remove()" style="width:100%;background:#800000;color:#fff;border:none;padding:12px;border-radius:10px;font-weight:700;cursor:pointer;">Close</button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    },

    // ── 3. Generate Pickup QR ──
    generateQR: function() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'flex';
            AuthSystem.addNotification('QR Generated', 'Pickup QR code generated successfully.');
        } else {
            UIUtils.showToast('QR generation failed. Modal missing.', 'error');
        }
    },
    closeQR: function() {
        const modal = document.getElementById('qrModal');
        if (modal) modal.style.display = 'none';
    },

    // ── 4. Contact Student ──
    contactStudent: function(name) {
        const chatWindow = document.getElementById('quickChat');
        if (chatWindow) { chatWindow.style.display = 'block'; }
        else { window.location.href = 'student-messages.html'; }
    },

    // ── 5. Scan Return QR (Real-time Status → Returned) ──
    scanQR: function(btnElement) {
        const card = btnElement.closest('.lending-item-v2');
        const itemName = card ? (card.querySelector('h4') || {}).textContent || 'Item' : 'Item';

        UIUtils.showModal({
            title: 'Scan Return QR',
            message: `Scanning QR code for "${itemName}"...\n\nPoint your camera at the borrower's QR code to confirm the return.`,
            type: 'confirm',
            onConfirm: (val) => {
                if (val) {
                    UIUtils.showToast('Scanning QR code...', 'info');
                    setTimeout(() => {
                        // Update lending status to Returned
                        const lendings = this._getLendings();
                        const lending = lendings.find(l => itemName.includes(l.item.split(' ')[0]));
                        if (lending) { lending.status = 'Returned'; this._saveLendings(lendings); }

                        // Update UI: button
                        btnElement.innerHTML = '<i class="fas fa-check-circle"></i> Returned';
                        btnElement.style.background = '#10b981';
                        btnElement.style.pointerEvents = 'none';

                        // Update status text
                        const statusNode = card.querySelector('[class*="fa-user-check"], [class*="fa-hand-holding"]');
                        if (statusNode) {
                            const parent = statusNode.parentNode;
                            parent.innerHTML = '<i class="fas fa-check-circle"></i> Status: Returned';
                            parent.style.color = '#64748b';
                        }

                        // Logic Lock: disable/hide Extend Rental button
                        const extendBtn = card.querySelector('.btn-extension, [onclick*="addHours"], [onclick*="extendLending"]');
                        if (extendBtn) {
                            extendBtn.disabled = true;
                            extendBtn.style.opacity = '0.3';
                            extendBtn.style.pointerEvents = 'none';
                            extendBtn.style.cursor = 'not-allowed';
                            extendBtn.textContent = 'Returned';
                            extendBtn.style.borderColor = '#94a3b8';
                            extendBtn.style.color = '#94a3b8';
                        }

                        // Gray out the card
                        card.style.opacity = '0.7';
                        card.style.filter = 'grayscale(0.3)';

                        AuthSystem.addNotification('Item Returned', `${itemName} has been successfully returned and verified.`);
                        UIUtils.showToast(`${itemName} returned and verified!`, 'success');
                    }, 1500);
                }
            }
        });
    },

    // ── 6. Extend Rental for Lending Items (Dynamic Duration) ──
    extendLending: function(btnElement) {
        const card = btnElement.closest('.lending-item-v2');
        const itemName = card ? (card.querySelector('h4') || {}).textContent || 'Item' : 'Item';

        // Check if returned — Logic Lock
        const lendings = this._getLendings();
        const lending = lendings.find(l => itemName.includes(l.item.split(' ')[0]));
        if (lending && lending.status === 'Returned') {
            UIUtils.showToast("Can't extend a returned item.", 'error');
            return;
        }

        const rate = lending ? lending.rate : 10;
        const options = [
            { label: '1 hour', hours: 1 },
            { label: '2 hours', hours: 2 },
            { label: '3 hours', hours: 3 },
            { label: '6 hours', hours: 6 },
            { label: '12 hours', hours: 12 },
            { label: '1 day (24h)', hours: 24 }
        ];

        let overlay = document.getElementById('extend-lending-overlay');
        if (overlay) overlay.remove();
        overlay = document.createElement('div');
        overlay.id = 'extend-lending-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;';

        const optionsHtml = options.map(o => `<option value="${o.hours}" data-cost="${o.hours * rate}">${o.label} — +₱${(o.hours * rate).toLocaleString()}</option>`).join('');

        overlay.innerHTML = `
            <div style="background:#fff;width:90%;max-width:420px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);">
                <div style="text-align:center;margin-bottom:20px;">
                    <div style="width:60px;height:60px;background:#eff6ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-plus-circle" style="font-size:1.5rem;color:#1d4ed8;"></i></div>
                    <h3 style="margin:0;color:#1e293b;">Extend Rental</h3>
                    <p style="color:#64748b;font-size:0.85rem;margin-top:5px;">${itemName}</p>
                    <p style="color:#800000;font-weight:700;font-size:0.85rem;">Rate: ₱${rate}/hour</p>
                </div>
                <label style="display:block;font-weight:700;color:#1e293b;margin-bottom:8px;font-size:0.9rem;">How much longer?</label>
                <select id="extendLendingSelect" style="width:100%;padding:12px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.95rem;outline:none;margin-bottom:10px;cursor:pointer;">
                    ${optionsHtml}
                </select>
                <div style="background:#f8fafc;border-radius:10px;padding:12px;text-align:center;margin-bottom:20px;">
                    <span style="font-size:0.85rem;color:#64748b;">Additional cost: </span>
                    <span id="extendLendingCost" style="font-size:1.1rem;font-weight:800;color:#800000;">₱${rate}</span>
                </div>
                <div style="display:flex;gap:10px;">
                    <button id="elCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Cancel</button>
                    <button id="elRequestBtn" style="flex:1;padding:12px;background:#800000;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Request</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const sel = document.getElementById('extendLendingSelect');
        sel.onchange = () => {
            const cost = sel.options[sel.selectedIndex].getAttribute('data-cost');
            document.getElementById('extendLendingCost').textContent = '₱' + parseInt(cost).toLocaleString();
        };

        document.getElementById('elCancelBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

        document.getElementById('elRequestBtn').onclick = () => {
            const hours = parseInt(sel.value);
            const cost = hours * rate;
            if (lending) { lending.totalCost += cost; this._saveLendings(lendings); }
            overlay.remove();

            btnElement.textContent = 'Extension Sent';
            btnElement.style.opacity = '0.6';
            btnElement.style.pointerEvents = 'none';

            const borrowerName = lending ? lending.borrower : 'the borrower';
            AuthSystem.addNotification('Extension Request Sent', `${borrowerName} requested +${hours}h for ${itemName}. Additional ₱${cost} will be added.`);
            UIUtils.showToast(`Extension of ${hours}h (+₱${cost}) sent for approval.`, 'success');
        };
    },

    // ── 7. Confirm Handover ──
    confirmHandover: function(btnElement) {
        UIUtils.showModal({
            title: 'Confirm Handover',
            message: 'Have you handed over the item to the borrower?',
            type: 'confirm',
            onConfirm: (val) => {
                if (val) {
                    btnElement.innerHTML = '<i class="fas fa-check"></i> Handover Confirmed';
                    btnElement.style.background = '#10b981';
                    btnElement.style.pointerEvents = 'none';

                    const statusNode = btnElement.closest('.lending-item-v2').querySelector('.fa-hand-holding');
                    if (statusNode) {
                        statusNode.parentNode.innerHTML = '<i class="fas fa-user-check"></i> Status: With Borrower';
                        statusNode.parentNode.style.color = '#10b981';
                    }

                    AuthSystem.addNotification('Handover Complete', 'Item is now with the borrower.');
                    UIUtils.showToast('Handover confirmed successfully.', 'success');
                }
            }
        });
    },

    // ── 8. Verify Student ID ──
    verifyId: function() {
        const isVerified = localStorage.getItem('isVerified') === 'true';
        if (isVerified) { UIUtils.showToast('Your Student ID is already verified.', 'info'); }
        else {
            UIUtils.showToast('Verification request sent to admin.', 'success');
            localStorage.setItem('isVerified', 'true');
            AuthSystem.addNotification('Verification', 'Your Student ID verification has been approved.');
            AuthSystem.updateNavbar();
        }
    },

    // ── 9. Refer Student ──
    referStudent: function() {
        UIUtils.showModal({
            title: 'Refer a Student',
            message: "Enter the student's WMSU email address:",
            type: 'prompt',
            inputPlaceholder: 'student@wmsu.edu.ph',
            onConfirm: (email) => {
                if (email && email.includes('@wmsu.edu.ph')) {
                    UIUtils.showToast(`Invitation sent to ${email}`, 'success');
                    AuthSystem.addNotification('Referral Sent', `You referred ${email}.`);
                } else if (email) {
                    UIUtils.showToast('Please enter a valid WMSU email.', 'error');
                }
            }
        });
    },

    // ── 10. Contact Campus Safety ──
    contactSafety: function() {
        UIUtils.showModal({
            title: 'Campus Safety',
            message: 'WMSU Campus Safety Emergency Contact:\n\nHotline: (062) 991-1234\nLocal: 112\n\nSecurity personnel have been notified of your inquiry.',
            type: 'warning'
        });
        AuthSystem.addNotification('Safety Alert', 'You accessed the Campus Safety contact info.');
    },

    // ── 11. Rent Again ──
    rentAgain: function(itemId) {
        window.location.href = `../item-details html/item-details.html?id=${itemId}`;
    }
};

// Global handlers
window.openQRModal = DashboardActions.generateQR;
window.closeQRModal = DashboardActions.closeQR;
window.toggleChat = function() {
    const chat = document.getElementById('quickChat');
    if (chat) chat.style.display = chat.style.display === 'block' ? 'none' : 'block';
};

// Inject animation keyframes
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalPop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);
})();
