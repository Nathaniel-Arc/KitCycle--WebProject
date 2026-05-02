/**
 * Faculty Actions Logic
 * Handles Add Equipment, Approvals, Messaging, Terms & Conditions, and all faculty dashboard interactions
 */

window.FacultyActions = {

    /* ── Equipment Data Store ── */
    _getEquipment: function() {
        if (!localStorage.getItem('kitcycle_faculty_equipment')) {
            const defaults = [
                { id: 'eq1', name: 'Engineering Microscope Set', category: 'Laboratory Equipment', quantity: 5, available: 3, borrowed: 2, condition: 'Excellent', location: 'Engineering Lab Room 301', lastMaintained: '2/15/2026', price: 150, image: '../../images/microscope.jpeg', description: 'High-quality binocular microscope suitable for biology and chemistry lab work.' },
                { id: 'eq2', name: 'Scientific Calculators', category: 'Academic Tools', quantity: 10, available: 7, borrowed: 3, condition: 'Good', location: 'Engineering Department Office', lastMaintained: '2/20/2026', price: 50, image: '../../images/calculator.jpg', description: 'TI-84 Plus scientific calculators for advanced mathematics.' },
                { id: 'eq3', name: 'Video Recording Equipment', category: 'Media Equipment', quantity: 3, available: 0, borrowed: 3, condition: 'Excellent', location: 'Media Lab Room 205', lastMaintained: '2/10/2026', price: 300, image: '../../images/camera.jpg', description: 'Complete video recording kit with tripod and microphone.' },
                { id: 'eq4', name: 'Digital Multimeters', category: 'Laboratory Equipment', quantity: 8, available: 5, borrowed: 3, condition: 'Good', location: 'Electronics Lab', lastMaintained: '2/25/2026', price: 80, image: '../../images/calc-set.png', description: 'Essential multimeters for electronics and circuit testing.' },
                { id: 'eq5', name: 'Engineering Reference Books', category: 'Textbooks', quantity: 15, available: 12, borrowed: 3, condition: 'Good', location: 'Department Library', lastMaintained: '1/15/2026', price: 70, image: '../../images/books.jpeg', description: 'Reference books for mechanical and civil engineering.' },
                { id: 'eq6', name: 'Oscilloscopes', category: 'Laboratory Equipment', quantity: 4, available: 2, borrowed: 2, condition: 'Excellent', location: 'Advanced Electronics Lab', lastMaintained: '3/1/2026', price: 200, image: '../../images/stethoscope.png', description: 'Digital oscilloscopes for signal analysis and testing.' }
            ];
            localStorage.setItem('kitcycle_faculty_equipment', JSON.stringify(defaults));
        }
        return JSON.parse(localStorage.getItem('kitcycle_faculty_equipment'));
    },
    _saveEquipment: function(data) { localStorage.setItem('kitcycle_faculty_equipment', JSON.stringify(data)); },

    /* ── Approval Request Data Store ── */
    _getRequests: function() {
        if (!localStorage.getItem('kitcycle_faculty_requests')) {
            const defaults = [
                { id: 'req1', student: 'Maria Santos', studentId: '2024-12345', item: 'Engineering Microscope Set', duration: '3 days', purpose: 'Materials Science Lab Project', date: '3/5/2026', priority: 'HIGH', status: 'Pending' },
                { id: 'req2', student: 'Juan Reyes', studentId: '2024-12346', item: 'Scientific Calculator', duration: '1 week', purpose: 'Advanced Calculus Course', date: '3/4/2026', priority: 'MEDIUM', status: 'Pending' },
                { id: 'req3', student: 'Anna Cruz', studentId: '2024-12347', item: 'Video Recording Equipment', duration: '2 days', purpose: 'Thesis Documentation', date: '3/3/2026', priority: 'HIGH', status: 'Pending' },
                { id: 'req4', student: 'Mark Tan', studentId: '2024-12348', item: 'Digital Multimeters', duration: '5 days', purpose: 'Circuit Analysis Lab', date: '3/6/2026', priority: 'LOW', status: 'Pending' },
                { id: 'req5', student: 'Sara Lim', studentId: '2024-12349', item: 'Engineering Reference Books', duration: '2 weeks', purpose: 'Research Paper Reference', date: '3/2/2026', priority: 'MEDIUM', status: 'Pending' }
            ];
            localStorage.setItem('kitcycle_faculty_requests', JSON.stringify(defaults));
        }
        return JSON.parse(localStorage.getItem('kitcycle_faculty_requests'));
    },
    _saveRequests: function(data) { localStorage.setItem('kitcycle_faculty_requests', JSON.stringify(data)); },

    /* ── Terms and Conditions Modal ── */
    showTermsModal: function(onAccept) {
        const existing = document.getElementById('terms-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'terms-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        overlay.innerHTML = `
            <div style="background:#fff;width:95%;max-width:600px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);max-height:90vh;display:flex;flex-direction:column;">
                <div style="text-align:center;margin-bottom:15px;">
                    <div style="width:60px;height:60px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-file-contract" style="font-size:1.5rem;color:#800000;"></i></div>
                    <h3 style="margin:0;color:#1e293b;font-size:1.3rem;">Terms & Conditions</h3>
                    <p style="color:#64748b;font-size:0.85rem;margin-top:5px;">Please read before proceeding</p>
                </div>
                <div style="flex:1;overflow-y:auto;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:20px;font-size:0.88rem;color:#374151;line-height:1.7;">
                    <h4 style="color:#800000;margin-bottom:8px;font-size:0.95rem;"><i class="fas fa-handshake"></i> 1. Rental Agreement</h4>
                    <p>All rental transactions are agreements between the faculty (item owner) and the student (renter). Equipment must be returned in the same condition as received.</p>

                    <h4 style="color:#800000;margin:15px 0 8px;font-size:0.95rem;"><i class="fas fa-money-bill-wave"></i> 2. Payment Terms</h4>
                    <ul style="padding-left:18px;margin:5px 0;">
                        <li>Rental fees are calculated per day or per hour as set by the faculty.</li>
                        <li>Advance payment may be required before item pickup.</li>
                        <li>Down payment options are available for extended rentals.</li>
                        <li>Full payment is collected upon item pickup.</li>
                    </ul>

                    <h4 style="color:#800000;margin:15px 0 8px;font-size:0.95rem;"><i class="fas fa-exchange-alt"></i> 3. Lost or Damaged Items</h4>
                    <p>If a rented item is lost, the student must either swap it with an equivalent item or replace it with a new one of the same model. Failure to do so will result in full compensation at current market value.</p>

                    <h4 style="color:#800000;margin:15px 0 8px;font-size:0.95rem;"><i class="fas fa-clock"></i> 4. Late Return Policy</h4>
                    <p>Late returns incur an additional penalty fee of 50% of the daily rate per day overdue. Extended delays may result in suspension of borrowing privileges.</p>

                    <h4 style="color:#800000;margin:15px 0 8px;font-size:0.95rem;"><i class="fas fa-tags"></i> 5. Discounts (Huggle)</h4>
                    <p>Faculty may offer discounts (Huggle) to students at their discretion. Discounts apply to the base rental rate and cannot be combined with other promotions.</p>

                    <h4 style="color:#800000;margin:15px 0 8px;font-size:0.95rem;"><i class="fas fa-shield-alt"></i> 6. Platform Responsibility</h4>
                    <p>WMSU KitCycle acts as a facilitator and is not liable for disputes between users. All exchanges must occur at designated WMSU campus meetup locations.</p>
                </div>
                <label style="display:flex;align-items:center;gap:10px;margin-bottom:15px;cursor:pointer;font-size:0.9rem;font-weight:600;color:#1e293b;">
                    <input type="checkbox" id="termsCheckbox" style="width:18px;height:18px;accent-color:#800000;cursor:pointer;">
                    I have read and agree to the Terms & Conditions
                </label>
                <div style="display:flex;gap:10px;">
                    <button id="termsCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:0.9rem;">Cancel</button>
                    <button id="termsAcceptBtn" style="flex:1;padding:12px;background:#800000;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:0.9rem;opacity:0.5;pointer-events:none;">Accept & Continue</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const checkbox = document.getElementById('termsCheckbox');
        const acceptBtn = document.getElementById('termsAcceptBtn');
        checkbox.onchange = () => {
            if (checkbox.checked) {
                acceptBtn.style.opacity = '1';
                acceptBtn.style.pointerEvents = 'auto';
            } else {
                acceptBtn.style.opacity = '0.5';
                acceptBtn.style.pointerEvents = 'none';
            }
        };

        document.getElementById('termsCancelBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        acceptBtn.onclick = () => { overlay.remove(); if (onAccept) onAccept(); };
    },

    /* ── Rejection Reason Modal ── */
    showRejectModal: function(requestId, onReject) {
        const existing = document.getElementById('reject-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'reject-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        overlay.innerHTML = `
            <div style="background:#fff;width:95%;max-width:480px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);">
                <div style="text-align:center;margin-bottom:20px;">
                    <div style="width:60px;height:60px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-times-circle" style="font-size:1.5rem;color:#ef4444;"></i></div>
                    <h3 style="margin:0;color:#1e293b;font-size:1.2rem;">Reject Request</h3>
                    <p style="color:#64748b;font-size:0.85rem;margin-top:5px;">Select a reason for rejection</p>
                </div>
                <div id="rejectReasonOptions" style="display:flex;flex-direction:column;gap:8px;margin-bottom:15px;">
                    <label class="reject-reason-option" style="display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:0.2s;font-size:0.9rem;" data-reason="Equipment unavailable">
                        <input type="radio" name="rejectReason" value="Equipment unavailable" style="accent-color:#800000;">
                        Equipment unavailable for requested dates
                    </label>
                    <label class="reject-reason-option" style="display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:0.2s;font-size:0.9rem;" data-reason="Item under maintenance">
                        <input type="radio" name="rejectReason" value="Item under maintenance" style="accent-color:#800000;">
                        Item currently under maintenance
                    </label>
                    <label class="reject-reason-option" style="display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:0.2s;font-size:0.9rem;" data-reason="Insufficient student clearance">
                        <input type="radio" name="rejectReason" value="Insufficient student clearance" style="accent-color:#800000;">
                        Insufficient student clearance/verification
                    </label>
                    <label class="reject-reason-option" style="display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:0.2s;font-size:0.9rem;" data-reason="Duration too long">
                        <input type="radio" name="rejectReason" value="Duration too long" style="accent-color:#800000;">
                        Rental duration exceeds maximum limit
                    </label>
                    <label class="reject-reason-option" style="display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:0.2s;font-size:0.9rem;" data-reason="Conflicting reservation">
                        <input type="radio" name="rejectReason" value="Conflicting reservation" style="accent-color:#800000;">
                        Conflicting reservation
                    </label>
                </div>
                <div style="margin-bottom:20px;">
                    <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Additional Notes (Optional)</label>
                    <textarea id="rejectNotes" style="width:100%;padding:10px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.88rem;resize:vertical;min-height:70px;outline:none;font-family:inherit;" placeholder="Add any additional details..."></textarea>
                </div>
                <div style="display:flex;gap:10px;">
                    <button id="rejectCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Cancel</button>
                    <button id="rejectConfirmBtn" style="flex:1;padding:12px;background:#ef4444;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;opacity:0.5;pointer-events:none;">Confirm Rejection</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const options = overlay.querySelectorAll('.reject-reason-option');
        const radios = overlay.querySelectorAll('input[name="rejectReason"]');
        const confirmBtn = document.getElementById('rejectConfirmBtn');

        function resetHighlights() {
            options.forEach(opt => {
                opt.style.borderColor = '#e2e8f0';
                opt.style.background = '#fff';
            });
        }

        radios.forEach((radio, idx) => {
            radio.onchange = () => {
                resetHighlights();
                options[idx].style.borderColor = '#800000';
                options[idx].style.background = '#fef2f2';
                confirmBtn.style.opacity = '1';
                confirmBtn.style.pointerEvents = 'auto';
            };
            options[idx].onclick = (e) => {
                if (e.target !== radio) {
                    radio.checked = true;
                    radio.onchange();
                }
            };
        });

        document.getElementById('rejectCancelBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

        confirmBtn.onclick = () => {
            const selected = overlay.querySelector('input[name="rejectReason"]:checked');
            if (!selected) return;
            const reason = selected.value;
            const notes = document.getElementById('rejectNotes').value;
            overlay.remove();
            if (onReject) onReject(reason, notes);
        };
    },

    /* ── Add Equipment Modal ── */
    showAddEquipmentModal: function(onSave) {
        const existing = document.getElementById('add-equipment-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'add-equipment-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        overlay.innerHTML = `
            <div style="background:#fff;width:95%;max-width:620px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);max-height:90vh;overflow-y:auto;">
                <div style="text-align:center;margin-bottom:20px;">
                    <div style="width:60px;height:60px;background:#eff6ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-plus-circle" style="font-size:1.5rem;color:#1d4ed8;"></i></div>
                    <h3 style="margin:0;color:#1e293b;font-size:1.3rem;">Add New Equipment</h3>
                    <p style="color:#64748b;font-size:0.85rem;margin-top:5px;">List details of the item for students to rent</p>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;">
                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;"><i class="fas fa-camera" style="color:#800000;margin-right:5px;"></i>Equipment Photos</label>
                        <div id="photoPreviewGrid" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px;min-height:40px;"></div>
                        <label style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:#f1f5f9;border:1.5px dashed #cbd5e1;border-radius:10px;cursor:pointer;font-size:0.85rem;font-weight:600;color:#4b5563;transition:0.2s;">
                            <i class="fas fa-upload"></i> Upload Photos
                            <input type="file" id="equipmentPhotos" accept="image/*" multiple style="display:none;" onchange="FacultyActions._handlePhotoUpload(this)">
                        </label>
                        <p style="font-size:0.75rem;color:#9ca3af;margin-top:4px;">Upload 1 or more photos showing the item</p>
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Item Name *</label>
                        <input type="text" id="eqName" placeholder="e.g. Engineering Microscope Set" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Category *</label>
                        <select id="eqCategory" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;cursor:pointer;background:#fff;">
                            <option value="">Select a category</option>
                            <option value="Academic Tools">Academic Tools</option>
                            <option value="Media Equipment">Media Equipment</option>
                            <option value="Laboratory Equipment">Laboratory Equipment</option>
                            <option value="Textbooks">Textbooks</option>
                        </select>
                    </div>

                    <div style="display:flex;gap:12px;">
                        <div style="flex:1;">
                            <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Total Quantity *</label>
                            <input type="number" id="eqQuantity" min="1" value="1" placeholder="1" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                        </div>
                        <div style="flex:1;">
                            <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Price per Day (₱) *</label>
                            <input type="number" id="eqPrice" min="0" placeholder="150" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                        </div>
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Storage Location</label>
                        <input type="text" id="eqLocation" placeholder="e.g. Engineering Lab Room 301" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Description</label>
                        <textarea id="eqDescription" placeholder="Describe the equipment, included accessories, usage guidelines..." style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;resize:vertical;min-height:80px;outline:none;font-family:inherit;"></textarea>
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Condition</label>
                        <select id="eqCondition" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;cursor:pointer;background:#fff;">
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>
                </div>

                <div style="display:flex;gap:10px;margin-top:20px;">
                    <button id="addEqCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Cancel</button>
                    <button id="addEqSaveBtn" style="flex:1;padding:12px;background:#800000;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Add Equipment</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        window._facultyUploadedPhotos = [];

        document.getElementById('addEqCancelBtn').onclick = () => { overlay.remove(); window._facultyUploadedPhotos = []; };
        overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); window._facultyUploadedPhotos = []; } };

        document.getElementById('addEqSaveBtn').onclick = () => {
            const name = document.getElementById('eqName').value.trim();
            const category = document.getElementById('eqCategory').value;
            const quantity = parseInt(document.getElementById('eqQuantity').value) || 1;
            const price = parseInt(document.getElementById('eqPrice').value) || 0;
            const location = document.getElementById('eqLocation').value.trim() || 'Faculty Storage';
            const description = document.getElementById('eqDescription').value.trim();
            const condition = document.getElementById('eqCondition').value;

            if (!name) { alert('Please enter an item name.'); return; }
            if (!category) { alert('Please select a category.'); return; }
            if (price <= 0) { alert('Please enter a valid price.'); return; }

            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

            const image = window._facultyUploadedPhotos.length > 0 ? window._facultyUploadedPhotos[0] : '';

            const equipment = {
                id: 'eq_' + Date.now(),
                name: name,
                category: category,
                quantity: quantity,
                available: quantity,
                borrowed: 0,
                condition: condition,
                location: location,
                lastMaintained: dateStr,
                price: price,
                image: image,
                images: [...window._facultyUploadedPhotos],
                description: description,
                published: true
            };

            overlay.remove();
            window._facultyUploadedPhotos = [];
            if (onSave) onSave(equipment);
        };
    },

    /* ── Photo Upload Handler ── */
    _handlePhotoUpload: function(input) {
        const files = input.files;
        const grid = document.getElementById('photoPreviewGrid');
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                window._facultyUploadedPhotos.push(e.target.result);
                const idx = window._facultyUploadedPhotos.length - 1;
                const thumb = document.createElement('div');
                thumb.style.cssText = 'width:80px;height:80px;border-radius:10px;overflow:hidden;position:relative;border:1.5px solid #e2e8f0;';
                thumb.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;"><button onclick="FacultyActions._removePhoto(${idx}, this)" style="position:absolute;top:3px;right:3px;width:20px;height:20px;border-radius:50%;background:#ef4444;color:#fff;border:none;cursor:pointer;font-size:0.6rem;display:flex;align-items:center;justify-content:center;">x</button>`;
                grid.appendChild(thumb);
            };
            reader.readAsDataURL(files[i]);
        }
        input.value = '';
    },

    _removePhoto: function(idx, btn) {
        window._facultyUploadedPhotos[idx] = null;
        btn.parentElement.remove();
    },

    /* ── Approve Request ── */
    approveRequest: function(requestId) {
        const requests = this._getRequests();
        const req = requests.find(r => r.id === requestId);
        if (!req) return;

        if (typeof UIUtils !== 'undefined' && UIUtils.showModal) {
            UIUtils.showModal({
                title: 'Approve Request',
                message: `Approve "${req.item}" rental for ${req.student}?\n\nThis will notify the student that their request has been approved.`,
                type: 'confirm',
                onConfirm: (val) => {
                    if (val) {
                        req.status = 'Approved';
                        this._saveRequests(requests);
                        this._refreshApprovals();
                        if (typeof UIUtils !== 'undefined' && UIUtils.showToast) UIUtils.showToast(`${req.item} approved for ${req.student}`, 'success');
                    }
                }
            });
        } else {
            if (confirm(`Approve "${req.item}" for ${req.student}?`)) {
                req.status = 'Approved';
                this._saveRequests(requests);
                this._refreshApprovals();
                alert('Request approved!');
            }
        }
    },

    /* ── Reject Request ── */
    rejectRequest: function(requestId) {
        this.showRejectModal(requestId, (reason, notes) => {
            const requests = this._getRequests();
            const req = requests.find(r => r.id === requestId);
            if (!req) return;

            req.status = 'Rejected';
            req.rejectReason = reason;
            req.rejectNotes = notes;
            this._saveRequests(requests);
            this._refreshApprovals();
            if (typeof UIUtils !== 'undefined' && UIUtils.showToast) UIUtils.showToast(`${req.item} rejected: ${reason}`, 'error');
        });
    },

    /* ── Refresh Approvals UI ── */
    _refreshApprovals: function() {
        const requests = this._getRequests();
        const pending = requests.filter(r => r.status === 'Pending');
        const approved = requests.filter(r => r.status === 'Approved');
        const rejected = requests.filter(r => r.status === 'Rejected');

        const requestsStack = document.querySelector('.requests-stack');
        if (requestsStack) {
            if (pending.length === 0) {
                requestsStack.innerHTML = '<div style="text-align:center;padding:40px;color:#64748b;"><i class="fas fa-check-circle" style="font-size:3rem;color:#10b981;margin-bottom:15px;display:block;"></i><h4 style="color:#374151;margin-bottom:5px;">All Caught Up!</h4><p>No pending requests at this time.</p></div>';
            } else {
                requestsStack.innerHTML = pending.map(r => `
                    <div class="request-panel" id="${r.id}">
                        <div class="panel-header">
                            <div>
                                <span class="priority-pill ${r.priority === 'HIGH' ? 'high' : r.priority === 'MEDIUM' ? 'medium' : 'low'}">${r.priority}</span>
                                <span class="status-pill warning">Pending</span>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="student-meta">
                                <h4>${r.student}</h4>
                                <p>Student ID: <span>${r.studentId}</span></p>
                            </div>
                            <div class="item-specs">
                                <p><strong>Item:</strong> ${r.item}</p>
                                <p><strong>Duration:</strong> ${r.duration}</p>
                                <p><strong>Purpose:</strong> ${r.purpose}</p>
                                <p class="timestamp"><i class="far fa-clock"></i> Requested on ${r.date}</p>
                            </div>
                        </div>
                        <div class="panel-actions">
                            <button class="btn-action-light" onclick="FacultyActions.viewEquipmentDetails('${r.id}')"><i class="far fa-eye"></i> View Details</button>
                            <button class="btn-action-approve" onclick="FacultyActions.approveRequest('${r.id}')"><i class="fas fa-check"></i> Approve</button>
                            <button class="btn-action-reject" onclick="FacultyActions.rejectRequest('${r.id}')"><i class="fas fa-times"></i> Reject</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        const pendingCount = document.querySelector('.stat-cards-grid .stat-card:first-child h3');
        if (pendingCount) pendingCount.textContent = pending.length;

        const decisionsStack = document.querySelector('.decisions-stack');
        if (decisionsStack) {
            const recent = [...approved, ...rejected].slice(-5).reverse();
            decisionsStack.innerHTML = recent.map(d => `
                <div class="decision-log">
                    <div class="log-info">
                        <h4>${d.student} <span class="status-pill ${d.status === 'Approved' ? 'success' : 'danger'}">${d.status.toUpperCase()}</span></h4>
                        <p>Item: ${d.item}</p>
                        ${d.rejectReason ? `<span class="reason-note">Reason: ${d.rejectReason}</span>` : ''}
                        <span class="timestamp">${d.date} • Decided by You</span>
                    </div>
                    <i class="fas fa-${d.status === 'Approved' ? 'check-circle success-text' : 'times-circle danger-text'} log-icon"></i>
                </div>
            `).join('') || '<p style="text-align:center;color:#9ca3af;padding:20px;">No decisions yet.</p>';
        }

        const badge = document.getElementById('sidebarReqBadge');
        if (badge) badge.textContent = pending.length;
    },

    /* ── Render Equipment Grid ── */
    renderEquipmentGrid: function() {
        const equipment = this._getEquipment();
        const grid = document.querySelector('.inventory-grid');
        if (!grid) return;

        grid.innerHTML = equipment.map(eq => `
            <div class="gear-card" id="${eq.id}">
                <div class="gear-image">
                    ${eq.image ? `<img src="${eq.image}" alt="${eq.name}">` : `<div style="width:100%;height:200px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#9ca3af;"><i class="fas fa-box" style="font-size:3rem;"></i></div>`}
                    <span class="stock-badge ${eq.available > 0 ? 'available' : 'unavailable'}">${eq.available > 0 ? 'Available' : 'Unavailable'}</span>
                    ${eq.available === 0 ? '<div class="all-borrowed-overlay">All Borrowed</div>' : ''}
                </div>
                <div class="gear-info">
                    <div class="gear-top">
                        <span class="gear-type">${eq.category}</span>
                    </div>
                    <h3>${eq.name}</h3>
                    <div class="gear-metrics">
                        <p>Total Quantity: <span>${eq.quantity}</span></p>
                        <p>Available: <span class="${eq.available > 0 ? 'success-text' : 'danger-text'}">${eq.available}</span></p>
                        <p>Borrowed: <span>${eq.borrowed}</span></p>
                        <p>Condition: <span class="${eq.condition === 'Excellent' ? 'success-text' : eq.condition === 'Good' ? 'info-text' : 'warning-text'}">${eq.condition}</span></p>
                    </div>
                    <div class="gear-location">
                        <p><i class="fas fa-map-marker-alt"></i> Location: ${eq.location}</p>
                        <p><i class="fas fa-calendar-alt"></i> Last maintained: ${eq.lastMaintained}</p>
                    </div>
                    <div class="gear-actions">
                        <button class="btn-edit" onclick="FacultyActions.editEquipment('${eq.id}')"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn-details" onclick="FacultyActions.viewEquipment('${eq.id}')"><i class="far fa-eye"></i> Details</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /* ── Edit Equipment ── */
    editEquipment: function(id) {
        const equipment = this._getEquipment();
        const eq = equipment.find(e => e.id === id);
        if (!eq) return;

        const existing = document.getElementById('edit-equipment-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'edit-equipment-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        overlay.innerHTML = `
            <div style="background:#fff;width:95%;max-width:620px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);max-height:90vh;overflow-y:auto;">
                <div style="text-align:center;margin-bottom:20px;">
                    <div style="width:60px;height:60px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-edit" style="font-size:1.5rem;color:#800000;"></i></div>
                    <h3 style="margin:0;color:#1e293b;font-size:1.3rem;">Edit Equipment</h3>
                    <p style="color:#64748b;font-size:0.85rem;margin-top:5px;">Update the details of this item</p>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;">
                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;"><i class="fas fa-camera" style="color:#800000;margin-right:5px;"></i>Equipment Photos</label>
                        <div id="editPhotoPreviewGrid" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px;min-height:40px;"></div>
                        <label style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:#f1f5f9;border:1.5px dashed #cbd5e1;border-radius:10px;cursor:pointer;font-size:0.85rem;font-weight:600;color:#4b5563;transition:0.2s;">
                            <i class="fas fa-upload"></i> Upload Photos
                            <input type="file" id="editEquipmentPhotos" accept="image/*" multiple style="display:none;" onchange="FacultyActions._handleEditPhotoUpload(this)">
                        </label>
                        <p style="font-size:0.75rem;color:#9ca3af;margin-top:4px;">Upload 1 or more photos showing the item</p>
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Item Name *</label>
                        <input type="text" id="editEqName" value="${eq.name}" placeholder="e.g. Engineering Microscope Set" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Category *</label>
                        <select id="editEqCategory" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;cursor:pointer;background:#fff;">
                            <option value="Academic Tools" ${eq.category === 'Academic Tools' ? 'selected' : ''}>Academic Tools</option>
                            <option value="Media Equipment" ${eq.category === 'Media Equipment' ? 'selected' : ''}>Media Equipment</option>
                            <option value="Laboratory Equipment" ${eq.category === 'Laboratory Equipment' ? 'selected' : ''}>Laboratory Equipment</option>
                            <option value="Textbooks" ${eq.category === 'Textbooks' ? 'selected' : ''}>Textbooks</option>
                        </select>
                    </div>

                    <div style="display:flex;gap:12px;">
                        <div style="flex:1;">
                            <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Total Quantity *</label>
                            <input type="number" id="editEqQuantity" min="1" value="${eq.quantity}" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                        </div>
                        <div style="flex:1;">
                            <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Price per Day (₱) *</label>
                            <input type="number" id="editEqPrice" min="0" value="${eq.price}" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                        </div>
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Available Quantity</label>
                        <input type="number" id="editEqAvailable" min="0" max="${eq.quantity}" value="${eq.available}" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Storage Location</label>
                        <input type="text" id="editEqLocation" value="${eq.location}" placeholder="e.g. Engineering Lab Room 301" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;">
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Description</label>
                        <textarea id="editEqDescription" placeholder="Describe the equipment..." style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;resize:vertical;min-height:80px;outline:none;font-family:inherit;">${eq.description || ''}</textarea>
                    </div>

                    <div>
                        <label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Condition</label>
                        <select id="editEqCondition" style="width:100%;padding:12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;cursor:pointer;background:#fff;">
                            <option value="Excellent" ${eq.condition === 'Excellent' ? 'selected' : ''}>Excellent</option>
                            <option value="Good" ${eq.condition === 'Good' ? 'selected' : ''}>Good</option>
                            <option value="Fair" ${eq.condition === 'Fair' ? 'selected' : ''}>Fair</option>
                        </select>
                    </div>
                </div>

                <div style="display:flex;gap:10px;margin-top:20px;">
                    <button id="editEqCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Cancel</button>
                    <button id="editEqDeleteBtn" style="flex:1;padding:12px;background:#ef4444;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;"><i class="fas fa-trash"></i> Delete</button>
                    <button id="editEqSaveBtn" style="flex:1;padding:12px;background:#800000;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Save Changes</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        window._editEqId = id;
        window._editUploadedPhotos = eq.images ? [...eq.images].filter(Boolean) : [];

        const grid = document.getElementById('editPhotoPreviewGrid');
        if (window._editUploadedPhotos.length > 0) {
            window._editUploadedPhotos.forEach((src, idx) => {
                if (!src) return;
                const thumb = document.createElement('div');
                thumb.style.cssText = 'width:80px;height:80px;border-radius:10px;overflow:hidden;position:relative;border:1.5px solid #e2e8f0;';
                thumb.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;"><button onclick="FacultyActions._removeEditPhoto(${idx}, this)" style="position:absolute;top:3px;right:3px;width:20px;height:20px;border-radius:50%;background:#ef4444;color:#fff;border:none;cursor:pointer;font-size:0.6rem;display:flex;align-items:center;justify-content:center;">x</button>`;
                grid.appendChild(thumb);
            });
        }

        document.getElementById('editEqCancelBtn').onclick = () => { overlay.remove(); window._editUploadedPhotos = []; };
        overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); window._editUploadedPhotos = []; } };

        document.getElementById('editEqDeleteBtn').onclick = () => {
            if (confirm(`Delete "${eq.name}"? This action cannot be undone.`)) {
                const updated = equipment.filter(e => e.id !== id);
                this._saveEquipment(updated);
                this.renderEquipmentGrid();
                overlay.remove();
                window._editUploadedPhotos = [];
                if (typeof UIUtils !== 'undefined' && UIUtils.showToast) UIUtils.showToast('Equipment deleted.', 'error');
            }
        };

        document.getElementById('editEqSaveBtn').onclick = () => {
            const name = document.getElementById('editEqName').value.trim();
            const category = document.getElementById('editEqCategory').value;
            const quantity = parseInt(document.getElementById('editEqQuantity').value) || 1;
            const price = parseInt(document.getElementById('editEqPrice').value) || 0;
            const available = parseInt(document.getElementById('editEqAvailable').value) || 0;
            const location = document.getElementById('editEqLocation').value.trim() || 'Faculty Storage';
            const description = document.getElementById('editEqDescription').value.trim();
            const condition = document.getElementById('editEqCondition').value;

            if (!name) { alert('Please enter an item name.'); return; }
            if (!category) { alert('Please select a category.'); return; }
            if (price <= 0) { alert('Please enter a valid price.'); return; }

            const borrowed = quantity - available;
            const image = window._editUploadedPhotos.length > 0 ? window._editUploadedPhotos[0] : '';

            const idx = equipment.findIndex(e => e.id === id);
            if (idx === -1) return;

            equipment[idx] = {
                ...equipment[idx],
                name: name,
                category: category,
                quantity: quantity,
                available: Math.min(available, quantity),
                borrowed: Math.max(0, borrowed),
                condition: condition,
                location: location,
                price: price,
                image: image || equipment[idx].image,
                images: [...window._editUploadedPhotos.filter(Boolean)],
                description: description
            };

            this._saveEquipment(equipment);
            this.renderEquipmentGrid();
            overlay.remove();
            window._editUploadedPhotos = [];
            if (typeof UIUtils !== 'undefined' && UIUtils.showToast) UIUtils.showToast('Equipment updated successfully!', 'success');
        };
    },

    _handleEditPhotoUpload: function(input) {
        const files = input.files;
        const grid = document.getElementById('editPhotoPreviewGrid');
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                window._editUploadedPhotos.push(e.target.result);
                const idx = window._editUploadedPhotos.length - 1;
                const thumb = document.createElement('div');
                thumb.style.cssText = 'width:80px;height:80px;border-radius:10px;overflow:hidden;position:relative;border:1.5px solid #e2e8f0;';
                thumb.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;"><button onclick="FacultyActions._removeEditPhoto(${idx}, this)" style="position:absolute;top:3px;right:3px;width:20px;height:20px;border-radius:50%;background:#ef4444;color:#fff;border:none;cursor:pointer;font-size:0.6rem;display:flex;align-items:center;justify-content:center;">x</button>`;
                grid.appendChild(thumb);
            };
            reader.readAsDataURL(files[i]);
        }
        input.value = '';
    },

    _removeEditPhoto: function(idx, btn) {
        window._editUploadedPhotos[idx] = null;
        btn.parentElement.remove();
    },

    viewEquipmentDetails: function(requestId) {
        const requests = this._getRequests();
        const req = requests.find(r => r.id === requestId);
        if (!req) return;

        const existing = document.getElementById('request-details-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'request-details-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        const statusColor = req.status === 'Approved' ? '#10b981' : req.status === 'Rejected' ? '#ef4444' : '#f59e0b';
        const reasonHtml = req.rejectReason
            ? '<div style="margin-top:12px;padding:12px;background:#fef2f2;border-radius:10px;"><strong style="color:#ef4444;">Rejection Reason:</strong><p style="margin:4px 0 0;color:#374151;">' + req.rejectReason + (req.rejectNotes ? ' — ' + req.rejectNotes : '') + '</p></div>'
            : '';

        overlay.innerHTML = '<div style="background:#fff;width:95%;max-width:520px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);">' +
            '<div style="text-align:center;margin-bottom:20px;">' +
            '<div style="width:60px;height:60px;background:' + statusColor + '15;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-clipboard-list" style="font-size:1.5rem;color:' + statusColor + ';"></i></div>' +
            '<h3 style="margin:0;color:#1e293b;font-size:1.3rem;">Request Details</h3>' +
            '<p style="color:#64748b;font-size:0.85rem;margin-top:5px;">' + req.item + '</p>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:12px;font-size:0.9rem;color:#374151;">' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Student:</strong></span><span>' + req.student + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Student ID:</strong></span><span>' + req.studentId + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Duration:</strong></span><span>' + req.duration + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Purpose:</strong></span><span>' + req.purpose + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Priority:</strong></span><span style="color:' + (req.priority === 'HIGH' ? '#ef4444' : req.priority === 'MEDIUM' ? '#f59e0b' : '#10b981') + ';font-weight:700;">' + req.priority + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Status:</strong></span><span style="color:' + statusColor + ';font-weight:700;">' + req.status + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Requested:</strong></span><span>' + req.date + '</span></div>' +
            reasonHtml +
            '</div>' +
            '<button id="closeDetailsBtn" style="margin-top:20px;width:100%;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Close</button>' +
            '</div>';
        document.body.appendChild(overlay);

        document.getElementById('closeDetailsBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    },

    viewRentalDetails: function(student, item, rented, returnDate, cost) {
        const existing = document.getElementById('rental-details-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'rental-details-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        overlay.innerHTML = '<div style="background:#fff;width:95%;max-width:520px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);">' +
            '<div style="text-align:center;margin-bottom:20px;">' +
            '<div style="width:60px;height:60px;background:#eff6ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-info-circle" style="font-size:1.5rem;color:#1d4ed8;"></i></div>' +
            '<h3 style="margin:0;color:#1e293b;font-size:1.3rem;">Rental Details</h3>' +
            '<p style="color:#64748b;font-size:0.85rem;margin-top:5px;">' + item + '</p>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:12px;font-size:0.9rem;color:#374151;">' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Student:</strong></span><span>' + student + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Item:</strong></span><span>' + item + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Rented On:</strong></span><span>' + rented + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Return Date:</strong></span><span style="color:#ef4444;font-weight:700;">' + returnDate + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Total Cost:</strong></span><span style="font-weight:700;">' + cost + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:10px;background:#f8fafc;border-radius:10px;"><span><strong>Status:</strong></span><span style="color:#10b981;font-weight:700;">Active</span></div>' +
            '</div>' +
            '<button id="closeRentalDetailsBtn" style="margin-top:20px;width:100%;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Close</button>' +
            '</div>';
        document.body.appendChild(overlay);

        document.getElementById('closeRentalDetailsBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    },

    extendRental: function(studentName, itemName, currentReturn) {
        const existing = document.getElementById('extend-rental-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'extend-rental-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';

        const defaultExtension = '3';

        overlay.innerHTML = '<div style="background:#fff;width:95%;max-width:450px;border-radius:20px;padding:30px;box-shadow:0 25px 50px rgba(0,0,0,0.25);animation:modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275);">' +
            '<div style="text-align:center;margin-bottom:20px;">' +
            '<div style="width:60px;height:60px;background:#fef3c7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-calendar-plus" style="font-size:1.5rem;color:#f59e0b;"></i></div>' +
            '<h3 style="margin:0;color:#1e293b;font-size:1.3rem;">Extend Rental</h3>' +
            '<p style="color:#64748b;font-size:0.85rem;margin-top:5px;">' + itemName + ' for ' + studentName + '</p>' +
            '</div>' +
            '<div style="background:#f8fafc;padding:14px;border-radius:12px;margin-bottom:18px;font-size:0.88rem;">' +
            '<p style="margin:0 0 6px;"><strong>Current Return Date:</strong> ' + currentReturn + '</p>' +
            '<p style="margin:0;"><strong>Additional Days:</strong> <input type="number" id="extendDays" value="' + defaultExtension + '" min="1" max="30" style="width:60px;padding:6px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.9rem;text-align:center;"></p>' +
            '</div>' +
            '<div style="margin-bottom:18px;">' +
            '<label style="font-weight:700;color:#1e293b;font-size:0.9rem;display:block;margin-bottom:6px;">Reason for Extension</label>' +
            '<textarea id="extendReason" placeholder="Optional: Explain the extension..." style="width:100%;padding:10px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.88rem;resize:vertical;min-height:60px;outline:none;font-family:inherit;"></textarea>' +
            '</div>' +
            '<div style="display:flex;gap:10px;">' +
            '<button id="extendCancelBtn" style="flex:1;padding:12px;background:#f1f5f9;color:#4b5563;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Cancel</button>' +
            '<button id="extendConfirmBtn" style="flex:1;padding:12px;background:#800000;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Confirm Extension</button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        document.getElementById('extendCancelBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

        document.getElementById('extendConfirmBtn').onclick = () => {
            const days = parseInt(document.getElementById('extendDays').value);
            if (!days || days < 1) { alert('Please enter a valid number of days.'); return; }
            overlay.remove();
            if (typeof UIUtils !== 'undefined' && UIUtils.showToast) {
                UIUtils.showToast('Rental extended by ' + days + ' days for ' + studentName, 'success');
            }
        };
    },

    contactStudent: function(studentName) {
        const messages = this._getMessages();
        const existingThread = messages.find(m => m.student === studentName);

        if (existingThread) {
            window.location.href = 'faculty-messages.html';
            setTimeout(() => {
                localStorage.setItem('kitcycle_open_thread', studentName);
            }, 100);
        } else {
            const newThread = {
                id: 'thread_' + Date.now(),
                student: studentName,
                studentId: '',
                avatar: '',
                lastMessage: '',
                lastTime: 'Just now',
                unread: 0,
                messages: []
            };
            messages.unshift(newThread);
            localStorage.setItem('kitcycle_messages', JSON.stringify(messages));
            window.location.href = 'faculty-messages.html';
            setTimeout(() => {
                localStorage.setItem('kitcycle_open_thread', studentName);
            }, 100);
        }
    },

    _getMessages: function() {
        if (!localStorage.getItem('kitcycle_messages')) {
            const defaults = [
                { id: 'thread1', student: 'Maria Santos', studentId: '2024-12345', avatar: '../../images/maria_profile.png', lastMessage: 'Thank you for approving the request!', lastTime: '10:30 AM', unread: 2, messages: [{ from: 'Maria Santos', text: 'Hello Professor! I submitted a request for the microscope.', time: '10:00 AM', self: false }, { from: 'You', text: 'Hi Maria, I will review it shortly.', time: '10:15 AM', self: true }, { from: 'Maria Santos', text: 'Thank you for approving the request!', time: '10:30 AM', self: false }] },
                { id: 'thread2', student: 'Juan Reyes', studentId: '2024-12346', avatar: '../../images/juan_profile.png', lastMessage: 'Will I be able to get it today?', lastTime: 'Yesterday', unread: 0, messages: [{ from: 'Juan Reyes', text: 'Good day Professor, I would like to extend my calculator rental.', time: 'Yesterday 3:00 PM', self: false }, { from: 'You', text: 'Sure Juan, let me check the schedule.', time: 'Yesterday 3:20 PM', self: true }, { from: 'Juan Reyes', text: 'Will I be able to get it today?', time: 'Yesterday 4:00 PM', self: false }] },
                { id: 'thread3', student: 'Anna Cruz', studentId: '2024-12347', avatar: '../../images/nash_profile.png', lastMessage: 'Got it, I will make sure to handle it with care.', lastTime: 'Yesterday', unread: 0, messages: [{ from: 'You', text: 'Anna, please ensure the camera equipment is properly stored when not in use.', time: 'Yesterday 11:00 AM', self: true }, { from: 'Anna Cruz', text: 'Got it, I will make sure to handle it with care.', time: 'Yesterday 11:15 AM', self: false }] }
            ];
            localStorage.setItem('kitcycle_messages', JSON.stringify(defaults));
        }
        return JSON.parse(localStorage.getItem('kitcycle_messages'));
    },

    viewEquipment: function(id) {
        const equipment = this._getEquipment();
        const eq = equipment.find(e => e.id === id);
        if (!eq) return;
        alert(`${eq.name}\n\nCategory: ${eq.category}\nTotal: ${eq.quantity} | Available: ${eq.available} | Borrowed: ${eq.borrowed}\nCondition: ${eq.condition}\nLocation: ${eq.location}\nPrice: ₱${eq.price}/day\n\n${eq.description || 'No description.'}`);
    },

    renderDashboard: function() {
        const equipment = this._getEquipment();
        const requests = this._getRequests();

        const totalEquip = equipment.reduce((s, e) => s + e.quantity, 0);
        const totalAvailable = equipment.reduce((s, e) => s + e.available, 0);
        const totalBorrowed = equipment.reduce((s, e) => s + e.borrowed, 0);
        const pendingReqs = requests.filter(r => r.status === 'Pending').length;

        const statCards = document.querySelectorAll('.stat-cards-grid .stat-card h3');
        if (statCards.length >= 3) {
            statCards[0].textContent = totalEquip;
            statCards[1].textContent = totalAvailable;
            statCards[2].textContent = totalBorrowed;
        }
        const pendingBadge = document.querySelector('.pill-badge');
        if (pendingBadge) pendingBadge.textContent = `${pendingReqs} Pending`;

        const storedName = localStorage.getItem('userName');
        if (storedName) {
            const firstName = storedName.split(' ').pop();
            const bannerGreeting = document.querySelector('.dashboard-banner p');
            if (bannerGreeting) bannerGreeting.textContent = `Welcome back, Professor ${firstName}. Manage departmental assets and approvals here.`;
        }
    },

    initDashboard: function() {
        this.renderDashboard();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.inventory-grid')) FacultyActions.renderEquipmentGrid();
    if (document.querySelector('.requests-stack')) FacultyActions._refreshApprovals();
    if (document.querySelector('.dashboard-banner')) FacultyActions.initDashboard();
});

(function() {
    if (!document.getElementById('faculty-actions-styles')) {
        const style = document.createElement('style');
        style.id = 'faculty-actions-styles';
        style.textContent = `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalPop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `;
        document.head.appendChild(style);
    }
})();
