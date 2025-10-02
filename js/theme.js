if (document.getElementById('settingsForm')) {
    const lang = document.getElementById('lang');
    const notif = document.getElementById('notif');
    const privacy = document.getElementById('privacy');
    const form = document.getElementById('settingsForm');
    const savedMsg = document.getElementById('settingsSavedMsg');

    const settings = JSON.parse(localStorage.getItem('fak_settings') || '{}');
    if (settings.lang) lang.value = settings.lang;
    if (settings.notif !== undefined) notif.checked = settings.notif;
    if (settings.privacy) privacy.value = settings.privacy;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const newSettings = {
            lang: lang.value,
            notif: notif.checked,
            privacy: privacy.value
        };
        localStorage.setItem('fak_settings', JSON.stringify(newSettings));
        savedMsg.style.display = 'inline';
        setTimeout(() => { savedMsg.style.display = 'none'; }, 1500);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    });
    document.addEventListener('click', function () {
        dropdownContent.classList.remove('show');
    });

    const themeSwitcher = document.getElementById('themeSwitcher');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(theme);

    themeSwitcher.addEventListener('click', function () {
        theme = (theme === 'dark') ? 'light' : 'dark';
        setTheme(theme);
        localStorage.setItem('theme', theme);
    });

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitcher.textContent = 'Világos';
        } else {
            document.body.classList.remove('dark-theme');
            themeSwitcher.textContent = 'Sötét';
        }
    }
});
