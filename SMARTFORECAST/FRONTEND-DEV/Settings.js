// Settings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation between main sections
    const navItems = document.querySelectorAll('.settings-nav-item');
    const sections = document.querySelectorAll('.settings-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding section
            const section = document.getElementById(`${targetSection}-section`);
            if (section) {
                section.classList.add('active');
            }
        });
    });

    // Preferences sub-tabs
    const prefTabs = document.querySelectorAll('.pref-tab');
    const prefContents = document.querySelectorAll('.pref-content');

    prefTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPref = this.getAttribute('data-pref');
            
            // Remove active class from all tabs and contents
            prefTabs.forEach(t => t.classList.remove('active'));
            prefContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const content = document.getElementById(`${targetPref}-content`);
            if (content) {
                content.classList.add('active');
            }
        });
    });

    // Password toggle visibility
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Option buttons (Theme Mode, Font Size, Export Format)
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find parent button group
            const buttonGroup = this.parentElement;
            const buttonsInGroup = buttonGroup.querySelectorAll('.option-btn');
            
            // Remove active class from all buttons in the group
            buttonsInGroup.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Form submissions
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            
            // Here you would typically send this data to a server
            console.log('Profile updated:', { fullName, email, role });
            alert('Profile updated successfully!');
        });
    }

    const savePreferencesBtn = document.querySelectorAll('.save-preferences-btn');
    savePreferencesBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            // Collect all preferences
            const notifications = {};
            document.querySelectorAll('.notification-item').forEach(item => {
                const title = item.querySelector('h3').textContent;
                const toggle = item.querySelector('input[type="checkbox"]');
                notifications[title] = toggle.checked;
            });
            
            // Here you would typically send this data to a server
            console.log('Preferences saved:', notifications);
            alert('Preferences saved successfully!');
        });
    });

    const applyChangesBtn = document.querySelector('.apply-changes-btn');
    if (applyChangesBtn) {
        applyChangesBtn.addEventListener('click', function() {
            const themeMode = document.querySelector('.theme-options .option-btn.active')?.textContent;
            const fontSize = document.querySelectorAll('.theme-options .button-group')[1]?.querySelector('.option-btn.active')?.textContent;
            const accentColor = document.getElementById('accent-color').value;
            
            console.log('Theme settings applied:', { themeMode, fontSize, accentColor });
            alert('Theme settings applied successfully!');
        });
    }

    const updatePasswordBtn = document.querySelector('.update-password-btn');
    if (updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }
            
            if (newPassword.length < 8) {
                alert('Password must be at least 8 characters long!');
                return;
            }
            
            // Here you would typically send this data to a server
            console.log('Password updated');
            alert('Password updated successfully!');
            
            // Clear password fields
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        });
    }

    const signOutAllBtn = document.querySelector('.sign-out-all-btn');
    if (signOutAllBtn) {
        signOutAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to sign out from all sessions?')) {
                // Here you would typically send this request to a server
                console.log('Signed out from all sessions');
                alert('Signed out from all sessions successfully!');
            }
        });
    }

    const logoutBtn = document.querySelector('.settings-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                // Here you would typically handle logout
                console.log('User logged out');
                window.location.href = 'login.html'; // Adjust to your login page
            }
        });
    }

    const dangerBtn = document.querySelector('.danger-btn');
    if (dangerBtn) {
        dangerBtn.addEventListener('click', function() {
            const confirmText = prompt('Type "DELETE" to confirm account deletion:');
            if (confirmText === 'DELETE') {
                if (confirm('This action cannot be undone. Are you absolutely sure?')) {
                    // Here you would typically send this request to a server
                    console.log('Account deletion requested');
                    alert('Account deletion request submitted. Please check your email for confirmation.');
                }
            } else if (confirmText !== null) {
                alert('Confirmation text did not match. Account deletion cancelled.');
            }
        });
    }

    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Here you would typically trigger a data export
            console.log('Data export requested');
            alert('Data export started. You will receive an email when it\'s ready.');
        });
    }

    // Change photo button
    const changePhotoBtn = document.querySelector('.change-photo-btn');
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function() {
            // Create a file input element
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const profileImg = document.querySelector('.profile-picture img');
                        if (profileImg) {
                            profileImg.src = event.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            input.click();
        });
    }
});

