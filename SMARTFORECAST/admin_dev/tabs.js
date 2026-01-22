// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and tab contents (regular tabs)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Get all logs tab buttons and tab contents (logs & security tabs)
    const logsTabButtons = document.querySelectorAll('.logs-tab-button');
    const logsTabContents = document.querySelectorAll('.logs-tab-content');

    // Function to switch regular tabs
    function switchTab(targetTabId) {
        // Remove active class from all tabs and contents
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to clicked tab and corresponding content
        const clickedButton = document.querySelector(`.tab-button[data-tab="${targetTabId}"]`);
        const targetContent = document.getElementById(targetTabId);

        if (clickedButton && targetContent) {
            clickedButton.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    // Function to switch logs tabs
    function switchLogsTab(targetTabId) {
        // Remove active class from all logs tabs and contents
        logsTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        logsTabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to clicked tab and corresponding content
        const clickedButton = document.querySelector(`.logs-tab-button[data-tab="${targetTabId}"]`);
        const targetContent = document.getElementById(targetTabId);

        if (clickedButton && targetContent) {
            clickedButton.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    // Add click event listeners to all regular tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.getAttribute('data-tab');
            switchTab(targetTabId);
        });
    });

    // Add click event listeners to all logs tab buttons
    logsTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.getAttribute('data-tab');
            switchLogsTab(targetTabId);
        });
    });

    // Initialize: Show the first tab if no tab is active (regular tabs)
    const activeTab = document.querySelector('.tab-button.active');
    if (!activeTab && tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }

    // Initialize: Show the first tab if no tab is active (logs tabs)
    const activeLogsTab = document.querySelector('.logs-tab-button.active');
    if (!activeLogsTab && logsTabButtons.length > 0) {
        const firstLogsTabId = logsTabButtons[0].getAttribute('data-tab');
        switchLogsTab(firstLogsTabId);
    }
});

