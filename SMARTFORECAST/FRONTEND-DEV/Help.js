// Save original content for search reset
const originalGuides = document.getElementById('guides-tab').innerHTML;
const originalFAQ = document.querySelector('.faq-grid').innerHTML;

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('guides-tab').style.display = tab.dataset.tab === 'guides' ? 'block' : 'none';
        document.getElementById('faq-tab').style.display = tab.dataset.tab === 'faq' ? 'block' : 'none';
        document.getElementById('searchInput').value = '';
        document.getElementById('guides-tab').innerHTML = originalGuides;
        document.querySelector('.faq-grid').innerHTML = originalFAQ;
    });
});

// COLLAPSIBLE - NOW 100% WORKING FOR BOTH GUIDES & FAQ
document.addEventListener('click', function(e) {
    const target = e.target.closest('.guide-item') || e.target.closest('.faq-card');
    if (!target) return;

    // Toggle open class
    target.classList.toggle('open');
});

// Contact Modal
document.getElementById('openModal').onclick = () => document.getElementById('contactModal').classList.add('open');
document.getElementById('closeModal').onclick = () => document.getElementById('contactModal').classList.remove('open');
window.onclick = (e) => { if (e.target === document.getElementById('contactModal')) document.getElementById('contactModal').classList.remove('open'); };

document.getElementById('contactForm').onsubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent to support.');
    document.getElementById('contactModal').classList.remove('open');
    e.target.reset();
};

// SMART SEARCH - Opens matching items automatically
document.getElementById('searchInput').addEventListener('input', function() {
    const term = this.value.toLowerCase().trim();
    if (!term) {
        document.getElementById('guides-tab').innerHTML = originalGuides;
        document.querySelector('.faq-grid').innerHTML = originalFAQ;
        return;
    }

    const isFAQ = document.getElementById('faq-tab').style.display === 'block';

    if (isFAQ) {
        let found = false;
        document.querySelectorAll('.faq-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(term)) {
                card.style.display = 'block';
                card.classList.add('open'); // Auto-open matching FAQ
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        if (!found) {
            document.querySelector('.faq-grid').innerHTML = `<div class="no-results"><i class="fas fa-search"></i><br>No FAQ found for "${term}"</div>`;
        }
    } else {
        let found = false;
        document.querySelectorAll('.guide-group').forEach(group => {
            let groupMatch = false;
            group.querySelectorAll('.guide-item').forEach(item => {
                const content = item.nextElementSibling;
                const fullText = (item.textContent + (content ? content.textContent : '')).toLowerCase();
                if (fullText.includes(term)) {
                    item.style.display = 'flex';
                    item.classList.add('open');
                    content.style.padding = '24px 28px';
                    content.style.maxHeight = '1000px';
                    groupMatch = true;
                    found = true;
                } else {
                    item.style.display = 'none';
                }
            });
            group.style.display = groupMatch ? 'block' : 'none';
        });
        if (!found) {
            document.getElementById('guides-tab').innerHTML = `<div class="no-results"><i class="fas fa-search"></i><br>No guide found for "${term}"</div>`;
        }
    }
});