document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // 1. LOGIN FORM HANDLER
    // ========================
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var role = document.getElementById("role").value;
            var paths = {
                student: "student-interface/student-dashboard.html",
                faculty: "faculty-interface/faculty-dashboard.html",
                admin: "admin-interface/admin-dashboard.html"
            };
            window.location.href = paths[role] || "student-interface/student-dashboard.html";
        });
    }

    // ========================
    // 2. PASSWORD TOGGLE
    // ========================
    var passwordToggles = document.querySelectorAll(".toggle-password");
    passwordToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            var input = this.closest(".input-wrapper").querySelector("input[type='password'], input[type='text']");
            if (input) {
                if (input.type === "password") {
                    input.type = "text";
                    this.classList.remove("fa-eye");
                    this.classList.add("fa-eye-slash");
                } else {
                    input.type = "password";
                    this.classList.remove("fa-eye-slash");
                    this.classList.add("fa-eye");
                }
            }
        });
    });

    // ========================
    // 3. HAMBURGER MENU (Mobile)
    // ========================
    var hamburgerBtn = document.getElementById("hamburger-btn");
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", function () {
            var navRight = document.querySelector(".nav-right");
            if (navRight) {
                navRight.classList.toggle("nav-right-active");
                this.classList.toggle("hamburger-open");
            }
        });
    }

    // Close mobile nav when clicking a link
    var navLinks = document.querySelectorAll(".nav-links a, .auth-buttons a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            var navRight = document.querySelector(".nav-right");
            if (navRight && navRight.classList.contains("nav-right-active")) {
                navRight.classList.remove("nav-right-active");
                if (hamburgerBtn) hamburgerBtn.classList.remove("hamburger-open");
            }
        });
    });

    // ========================
    // 4. NOTIFICATION DROPDOWN
    // ========================
    window.toggleNotifs = function () {
        var dd = document.getElementById("notifDropdown");
        if (dd) {
            dd.style.display = dd.style.display === "block" ? "none" : "block";
        }
    };

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".nav-notification-container")) {
            var dd = document.getElementById("notifDropdown");
            if (dd) dd.style.display = "none";
        }
    });

    // ========================
    // 5. RENT / CTA BUTTONS
    // ========================
    var rentButtons = document.querySelectorAll(".btn-rent, .btn-rent-now");
    rentButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var currentPath = window.location.pathname;
            if (currentPath.includes("student-interface") || currentPath.includes("faculty-interface") || currentPath.includes("admin-interface")) {
                var itemName = this.closest(".item-card, .market-card, .saved-item-card");
                var name = itemName ? itemName.querySelector("h3, h4") : null;
                var itemNameText = name ? name.textContent.trim() : "this item";
                alert("Rental request for \"" + itemNameText + "\" would be sent to the lender. This feature requires a backend.");
            } else {
                window.location.href = "login.html";
            }
        });
    });

    // ========================
    // 6. QR MODAL
    // ========================
    window.openQRModal = function () {
        var modal = document.getElementById("qrModal");
        if (modal) modal.style.display = "flex";
    };
    window.closeQRModal = function () {
        var modal = document.getElementById("qrModal");
        if (modal) modal.style.display = "none";
    };

    var qrModal = document.getElementById("qrModal");
    if (qrModal) {
        qrModal.addEventListener("click", function (e) {
            if (e.target === qrModal) closeQRModal();
        });
    }

    // ========================
    // 7. CHAT FAB TOGGLE
    // ========================
    window.toggleChat = function () {
        var chat = document.getElementById("quickChat");
        if (chat) {
            chat.style.display = chat.style.display === "block" ? "none" : "block";
        }
    };

    // ========================
    // 8. MARKETPLACE SEARCH BAR
    // ========================
    var searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            var term = this.value.toLowerCase();
            var cards = document.querySelectorAll(".market-card");
            var visibleCount = 0;
            cards.forEach(function (card) {
                var title = card.querySelector("h4");
                var cat = card.querySelector(".cat-badge");
                var titleText = title ? title.textContent.toLowerCase() : "";
                var catText = cat ? cat.textContent.toLowerCase() : "";
                if (titleText.includes(term) || catText.includes(term)) {
                    card.style.display = "block";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });
            var countEl = document.getElementById("item-count");
            if (countEl) countEl.textContent = visibleCount + " items found";
        });
    }

    // ========================
    // 9. MARKETPLACE FILTER BUTTONS
    // ========================
    var filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
    if (filterBtns.length > 0 && !document.querySelector(".rental-filter-bar")) {
        var cards = document.querySelectorAll(".market-card");
        if (cards.length > 0) {
            filterBtns.forEach(function (btn) {
                btn.addEventListener("click", function () {
                    filterBtns.forEach(function (b) { b.classList.remove("active"); });
                    btn.classList.add("active");
                    var filterValue = btn.getAttribute("data-filter");
                    var visibleItems = 0;
                    cards.forEach(function (card) {
                        var category = card.getAttribute("data-category");
                        if (filterValue === "all" || category === filterValue) {
                            card.style.display = "block";
                            visibleItems++;
                        } else {
                            card.style.display = "none";
                        }
                    });
                    var itemCount = document.getElementById("item-count");
                    if (itemCount) itemCount.textContent = visibleItems + " items found";
                });
            });
        }
    }

    // ========================
    // 10. SIDEBAR TOGGLE + PERSISTENCE
    // ========================
    window.toggleSidebar = function () {
        var sidebar = document.getElementById("sidebar");
        var mainContent = document.getElementById("mainContent");
        if (!sidebar || !mainContent) return;

        document.documentElement.classList.remove("sidebar-is-minimized");
        var isMinimized = sidebar.classList.toggle("minimized");
        mainContent.classList.toggle("expanded");
        localStorage.setItem("sidebarMinimized", isMinimized);
    };

    window.onload = function () {
        var isMinimized = localStorage.getItem("sidebarMinimized") === "true";
        if (isMinimized) {
            var sidebar = document.getElementById("sidebar");
            var mainContent = document.getElementById("mainContent");
            if (sidebar) sidebar.classList.add("minimized");
            if (mainContent) mainContent.classList.add("expanded");
        }
    };

    // ========================
    // 11. REGISTRATION STEP NAVIGATION
    // ========================
    var regSteps = document.querySelectorAll(".registration-step");
    if (regSteps.length > 0) {
        var indicatorSteps = document.querySelectorAll(".indicator-step");
        var indicatorLines = document.querySelectorAll(".indicator-line");

        window.showStep = function (stepId) {
            var header = document.getElementById("registration-header");
            var stepTitle = document.getElementById("step-title");
            var stepSubtitle = document.getElementById("step-subtitle");

            if (stepId === 1) {
                if (header) header.style.display = "block";
                if (stepTitle) stepTitle.textContent = "Join WMSU KitCycle";
                if (stepSubtitle) stepSubtitle.textContent = "Create your account and start renting today.";
            } else if (stepId === 2) {
                if (header) header.style.display = "block";
                if (stepTitle) stepTitle.textContent = "Verify Active Status";
                if (stepSubtitle) stepSubtitle.textContent = "We've sent a 6-digit code to your university email.";
            } else if (stepId === 3) {
                if (header) header.style.display = "block";
                if (stepTitle) stepTitle.textContent = "Identity Verification";
                if (stepSubtitle) stepSubtitle.textContent = "Please scan your physical credentials.";
            } else if (stepId === 4) {
                if (header) header.style.display = "none";
            }

            regSteps.forEach(function (step) { step.classList.remove("active"); });
            var target = document.getElementById("step-" + stepId);
            if (target) target.classList.add("active");

            indicatorSteps.forEach(function (step, index) {
                var currentStep = index + 1;
                step.classList.remove("active", "completed");
                var dot = step.querySelector(".step-dot");
                if (currentStep < stepId) {
                    step.classList.add("completed");
                    if (dot) dot.innerHTML = '<i class="fas fa-check"></i>';
                } else if (currentStep === stepId) {
                    step.classList.add("active");
                    if (dot) dot.textContent = currentStep;
                } else {
                    if (dot) dot.textContent = currentStep;
                }
            });

            indicatorLines.forEach(function (line, index) {
                if (index < stepId - 1) {
                    line.classList.add("active");
                } else {
                    line.classList.remove("active");
                }
            });
        };

        var formStep1 = document.getElementById("form-step-1");
        if (formStep1) {
            formStep1.addEventListener("submit", function (e) {
                e.preventDefault();
                showStep(2);
            });
        }

        var verifyOtpBtn = document.getElementById("btn-verify-otp");
        if (verifyOtpBtn) {
            verifyOtpBtn.addEventListener("click", function () { showStep(3); });
        }

        var submitDocsBtn = document.getElementById("btn-submit-docs");
        if (submitDocsBtn) {
            submitDocsBtn.addEventListener("click", function () { showStep(4); });
        }

        // OTP auto-focus
        var otpInputs = document.querySelectorAll(".otp-input");
        otpInputs.forEach(function (input, index) {
            input.addEventListener("input", function (e) {
                if (e.target.value && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });
            input.addEventListener("keydown", function (e) {
                if (e.key === "Backspace" && !e.target.value && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });

        // Document upload preview
        var uploadSlots = document.querySelectorAll(".upload-slot");
        uploadSlots.forEach(function (slot) {
            var input = slot.querySelector(".file-input");
            var preview = slot.querySelector(".preview-img");
            if (input) {
                input.addEventListener("change", function (e) {
                    var file = e.target.files[0];
                    if (file && preview) {
                        slot.classList.add("scanning");
                        slot.classList.remove("uploaded");
                        setTimeout(function () {
                            slot.classList.remove("scanning");
                            slot.classList.add("uploaded");
                            var reader = new FileReader();
                            reader.onload = function (re) {
                                preview.src = re.target.result;
                            };
                            reader.readAsDataURL(file);
                        }, 2000);
                    }
                });
            }
        });

        // Resend code cooldown
        var resendBtn = document.getElementById("btn-resend-code");
        if (resendBtn) {
            var cooldownTimer;
            var secondsRemaining = 60;

            window.startResendCooldown = function () {
                resendBtn.style.pointerEvents = "none";
                resendBtn.style.opacity = "0.6";
                resendBtn.textContent = "Resend Code (" + secondsRemaining + "s)";
                cooldownTimer = setInterval(function () {
                    secondsRemaining--;
                    resendBtn.textContent = "Resend Code (" + secondsRemaining + "s)";
                    if (secondsRemaining <= 0) {
                        clearInterval(cooldownTimer);
                        resendBtn.style.pointerEvents = "auto";
                        resendBtn.style.opacity = "1";
                        resendBtn.textContent = "Resend Code";
                        secondsRemaining = 60;
                    }
                }, 1000);
            };

            resendBtn.addEventListener("click", function (e) {
                e.preventDefault();
                alert("A new verification code has been sent to your university email.");
                startResendCooldown();
            });
        }
    }

    // ========================
    // 12. RENTAL FILTER (student-rentals.html)
    // ========================
    window.filterRentals = function (category, btn) {
        var cards = document.querySelectorAll(".rental-horizontal-card");
        var btns = document.querySelectorAll(".rental-filter-bar .filter-btn");
        btns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        cards.forEach(function (card) {
            if (category === "all") {
                card.classList.remove("hidden");
            } else {
                if (card.classList.contains(category)) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            }
        });
    };

    // ========================
    // 13. SAVED ITEM REMOVE BUTTONS
    // ========================
    var removeSavedBtns = document.querySelectorAll(".remove-saved");
    removeSavedBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            var card = this.closest(".saved-item-card");
            if (card) {
                card.style.transition = "opacity 0.3s, transform 0.3s";
                card.style.opacity = "0";
                card.style.transform = "scale(0.9)";
                setTimeout(function () {
                    card.remove();
                    var grid = document.querySelector(".saved-items-grid");
                    if (grid && grid.querySelectorAll(".saved-item-card").length === 0) {
                        grid.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#64748b;"><i class="far fa-heart" style="font-size:3rem;margin-bottom:15px;display:block;color:#cbd5e1;"></i><p>No saved items yet. Browse the marketplace to find gear!</p><a href="../marketplace.html" style="color:#800000;font-weight:700;text-decoration:none;margin-top:10px;display:inline-block;">Browse Marketplace <i class="fas fa-arrow-right"></i></a></div>';
                    }
                }, 300);
            }
        });
    });

    // ========================
    // 14. MESSAGING SYSTEM (student-messages.html)
    // ========================
    if (document.querySelector(".messenger-wrapper")) {
        var chatData = {
            juan: { name: "Juan Dela Cruz", role: "Lender", avatar: "J", color: "#800000", item: "Canon EOS 90D DSLR", status: "Awaiting Pickup", statusClass: "status-pending", img: "../../images/camera.jpg", location: "Engineering Grandstand", messages: [{ t: "in", m: "Hello! Are you available to meet?", time: "10:30 AM" }, { t: "out", m: "Hi Juan! Heading to the Grandstand now.", time: "10:32 AM" }] },
            maria: { name: "Maria Santos", role: "Lender", avatar: "M", color: "#6366f1", item: "Scientific Calculator TI-84", status: "Ready Tomorrow", statusClass: "status-pending", img: "../../images/calculator.jpg", location: "Library Lobby", messages: [{ t: "in", m: "Hi Nash! I've prepared the calculator.", time: "Yesterday" }] },
            sherwin: { name: "Sherwin Lim", role: "Borrower", avatar: "S", color: "#f59e0b", item: "Laboratory Microscope", status: "Active Rental", statusClass: "status-active", img: "../../images/microscope.jpeg", location: "Science Lab A", messages: [{ t: "in", m: "Is the lens clear?", time: "12:05 PM" }] },
            shawn: { name: "Shawn Benigno", role: "Lender", avatar: "S", color: "#10b981", item: "White Lab Coat", status: "Completed", statusClass: "status-active", img: "../../images/lighting.jpeg", location: "CET Entrance", messages: [{ t: "in", m: "Already washed it.", time: "Tue" }] },
            cedric: { name: "Cedric Santiago", role: "Borrower", avatar: "C", color: "#ec4899", item: "Textbook Bundle", status: "Extension Requested", statusClass: "status-pending", img: "../../images/books.jpeg", location: "Main Library", messages: [{ t: "in", m: "Can I extend for 2 days?", time: "Mon" }] },
            van: { name: "Van Valeros", role: "Lender", avatar: "V", color: "#8b5cf6", item: "Drafting Kit", status: "Pending Pickup", statusClass: "status-pending", img: "../../images/books.jpeg", location: "WMSU Main Gate", messages: [{ t: "in", m: "Meet at the main gate?", time: "Sun" }] },
            karl: { name: "Karl Tzy", role: "Borrower", avatar: "K", color: "#3b82f6", item: "Camera Tripod", status: "Due Today", statusClass: "status-active", img: "../../images/lighting.jpeg", location: "CS Dept Hallway", messages: [{ t: "in", m: "Available now?", time: "Sat" }] }
        };

        var currentConvoId = "juan";
        var unreadCount = 1;

        window.switchConvo = function (id, el) {
            currentConvoId = id;
            var data = chatData[id];
            if (el.classList.contains("unread")) {
                el.classList.remove("unread");
                unreadCount = Math.max(0, unreadCount - 1);
                updateSidebarNotif();
            }
            document.querySelectorAll(".chat-item").forEach(function (item) { item.classList.remove("active"); });
            el.classList.add("active");

            var activeName = document.getElementById("activeName");
            var activeRole = document.getElementById("activeRole");
            var activeAvatar = document.getElementById("activeAvatar");
            var txTitle = document.getElementById("txTitle");
            var txImg = document.getElementById("txImg");
            var txStatus = document.getElementById("txStatus");

            if (activeName) activeName.innerHTML = data.name + ' <i class="fas fa-shield-alt verified-check"></i>';
            if (activeRole) activeRole.innerText = data.role;
            if (activeAvatar) { activeAvatar.innerText = data.avatar; activeAvatar.style.background = data.color; }
            if (txTitle) txTitle.innerText = data.item;
            if (txImg) txImg.src = data.img;
            if (txStatus) { txStatus.innerText = data.status; txStatus.className = "status-badge-v2 " + data.statusClass; }

            renderMessages();
        };

        function renderMessages() {
            var area = document.getElementById("msgArea");
            if (!area) return;
            area.innerHTML = "";
            chatData[currentConvoId].messages.forEach(function (msg) {
                var row = document.createElement("div");
                row.className = "message-row" + (msg.t === "out" ? " sent" : "");
                row.innerHTML = '<div class="message-bubble-v2 msg-' + (msg.t === "out" ? "outbound" : "inbound") + '">' + msg.m + '<div style="font-size: 0.65rem; margin-top: 5px; opacity: 0.7; text-align: right;">' + msg.time + "</div></div>";
                area.appendChild(row);
            });
            area.scrollTop = area.scrollHeight;
        }

        window.sendMessage = function () {
            var input = document.getElementById("msgInput");
            if (!input) return;
            var text = input.value.trim();
            if (!text) return;
            var now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            chatData[currentConvoId].messages.push({ t: "out", m: text, time: now });
            renderMessages();
            input.value = "";
        };

        window.handleSearch = function (term) {
            term = term.toLowerCase();
            document.querySelectorAll(".chat-item").forEach(function (item) {
                var nameEl = item.querySelector("h4");
                var contextEl = item.querySelector('div[style*="font-size: 0.75rem"]');
                var name = nameEl ? nameEl.innerText.toLowerCase() : "";
                var context = contextEl ? contextEl.innerText.toLowerCase() : "";
                item.classList.toggle("hidden", !(name.includes(term) || context.includes(term)));
            });
        };

        function updateSidebarNotif() {
            var badge = document.getElementById("sidebarNotifCount");
            var navBadge = document.getElementById("navNotifBadge");
            if (badge) { badge.innerText = unreadCount; badge.style.display = unreadCount > 0 ? "inline-block" : "none"; }
            if (navBadge) navBadge.style.display = unreadCount > 0 ? "block" : "none";
        }

        window.triggerCall = function (type) {
            var data = chatData[currentConvoId];
            alert("Starting " + type + " Call with " + data.name + "...\n(Feature available for Verified Students)");
        };
        window.triggerProfile = function () {
            var data = chatData[currentConvoId];
            alert("Viewing " + data.name + "'s Trust Profile...\nRating: 4.9 Stars • 12 Successful Rentals");
        };
        window.triggerImage = function () {
            alert("Opening Camera / Gallery...\nPlease select an image to verify the item condition.");
        };
        window.openMap = function () {
            var data = chatData[currentConvoId];
            alert("WMSU CAMPUS MAP\n------------------\nDesignated Meetup: " + data.location + "\n------------------\nPlease stay in public view.");
        };

        window.openHandshake = function () {
            var modal = document.getElementById("handshakeModal");
            if (modal) modal.style.display = "flex";
        };
        window.closeHandshake = function () {
            var modal = document.getElementById("handshakeModal");
            if (modal) modal.style.display = "none";
        };

        var handshakeModal = document.getElementById("handshakeModal");
        if (handshakeModal) {
            handshakeModal.addEventListener("click", function (e) {
                if (e.target === handshakeModal) closeHandshake();
            });
        }

        // Run on load for messaging
        renderMessages();
        updateSidebarNotif();
    }

    // ========================
    // 15. FOOTER LINKS (placeholder handlers)
    // ========================
    var footerLinks = document.querySelectorAll("footer a[href='#']");
    footerLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var text = this.textContent.trim();
            alert(text + " page is under construction.");
        });
    });

    // ========================
    // 16. HERO PRODUCT CARD FEATURED IMAGE SWAP
    // ========================
    var featuredImgs = document.querySelectorAll(".product-featured");
    if (featuredImgs.length > 0) {
        featuredImgs.forEach(function (img) {
            img.addEventListener("click", function () {
                var imgs = ["images/clean_dslr.png", "images/calculator.jpg", "images/books.jpeg", "images/microscope.jpeg"];
                var currentIndex = imgs.indexOf(this.src.split("/").pop());
                var nextIndex = (currentIndex + 1) % imgs.length;
                this.src = imgs[nextIndex];
                var title = this.closest(".hero-product-card").querySelector(".product-title");
                var prices = ["Canon EOS 90D DSLR - Starting at ₱30/hour", "TI-84 Calculator - Starting at ₱50/day", "Engineering Textbook Bundle - Starting at ₱100/week", "Lab Microscope - Starting at ₱150/day"];
                if (title) title.textContent = prices[nextIndex].split(" - ")[0];
                var price = this.closest(".hero-product-card").querySelector(".product-price");
                if (price) price.textContent = prices[nextIndex].split(" - ")[1];
            });
        });
    }

    // ========================
    // 17. CATEGORY CARD CLICK -> MARKETPLACE FILTER
    // ========================
    var catCards = document.querySelectorAll(".cat-card");
    if (catCards.length > 0) {
        var categoryMap = {
            "Academic Tools": "tools",
            "Laboratory Equipment": "lab",
            "Textbooks": "text",
            "Media Equipment": "media"
        };
        catCards.forEach(function (card) {
            card.style.cursor = "pointer";
            card.addEventListener("click", function () {
                var h3 = card.querySelector("h3");
                var cat = h3 ? h3.textContent.trim() : "";
                var filter = categoryMap[cat] || "all";
                window.location.href = "pages/marketplace.html?filter=" + filter;
            });
        });
    }

    // Read URL filter param on marketplace
    var urlParams = new URLSearchParams(window.location.search);
    var filterParam = urlParams.get("filter");
    if (filterParam) {
        var targetBtn = document.querySelector('.filter-btn[data-filter="' + filterParam + '"]');
        if (targetBtn) targetBtn.click();
    }

});
