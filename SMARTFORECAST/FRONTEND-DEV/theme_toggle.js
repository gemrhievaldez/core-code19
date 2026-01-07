(function(){
        const btn = document.getElementById('theme-toggle');
        const icon = document.getElementById('theme-icon');
        const label = document.getElementById('theme-label');
        const root = document.documentElement;
        const storageKey = 'theme'; // 'light'|'dark'

        function applyTheme(t){
            root.setAttribute('data-theme', t);
            const isDark = t === 'dark';
            btn.setAttribute('aria-pressed', String(isDark));
            btn.setAttribute('aria-label', isDark ? 'Activate light theme' : 'Activate dark theme');
            icon.setAttribute('icon', isDark ? 'moon' : 'sun');
            label.textContent = isDark ? 'Dark' : 'Light';
        }

        const saved = localStorage.getItem(storageKey);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(saved || (prefersDark ? 'dark' : 'light'));

        btn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(storageKey, next);
        });
    })();