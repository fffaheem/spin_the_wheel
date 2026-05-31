// ============================================================
// STORAGE — LocalStorage save / load / reset
// ============================================================

var STORAGE_KEY = 'spinWheel_v4';

function saveSettings() {
    try {
        var data = {
            items:           itemsInput.value,
            power:           powerSlider.value,
            friction:        frictionSlider.value,
            sound:           soundToggle.checked,
            historyEnabled:  historyToggle.checked,
            theme:           document.documentElement.getAttribute('data-theme'),
            colorTheme:      colorThemeSelect.value,
            history:         historyList.innerHTML,
            gameMode:        gameMode,
            knockoutEnabled: knockoutEnabled,
            nWinTotal:       nWinTotal,
            nToWinTarget:    nToWinTarget,
            sessionActive:   sessionActive,   // Task #3: persist session flag
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* quota / private mode */ }
}

function loadSettings() {
    var raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!raw) {
        itemsInput.value = DEFAULT_ITEMS;
        return;
    }

    try {
        var s = JSON.parse(raw);

        itemsInput.value = (s.items !== undefined) ? s.items : DEFAULT_ITEMS;

        powerSlider.value   = (s.power   >= 1) ? s.power   : 50;
        frictionSlider.value = (s.friction >= 1) ? s.friction : 65;

        if (s.sound          !== undefined) soundToggle.checked   = s.sound;
        if (s.historyEnabled !== undefined) historyToggle.checked = s.historyEnabled;
        if (s.theme)          document.documentElement.setAttribute('data-theme', s.theme);
        if (s.colorTheme)     colorThemeSelect.value = s.colorTheme;
        if (s.history)        historyList.innerHTML  = s.history;
        if (s.gameMode)       gameMode        = s.gameMode;
        if (s.knockoutEnabled !== undefined) {
            knockoutEnabled        = s.knockoutEnabled;
            knockoutToggle.checked = s.knockoutEnabled;
        }
        if (s.nWinTotal    >= 3) nWinTotal    = Number(s.nWinTotal);
        if (s.nToWinTarget >= 2) nToWinTarget = Number(s.nToWinTarget);

        // Task #3: restore session flag — skip mode picker on refresh
        if (s.sessionActive) sessionActive = true;

    } catch (e) {
        itemsInput.value = DEFAULT_ITEMS;
    }

    updateBadgeValues();
}

function resetToDefaults() {
    showConfirmModal(
        'Reset all settings, items, and history to defaults?',
        function() {
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}

            itemsInput.value      = DEFAULT_ITEMS;
            powerSlider.value     = 50;
            frictionSlider.value  = 65;
            soundToggle.checked   = true;
            historyToggle.checked = true;
            colorThemeSelect.value = 'classic';
            historyList.innerHTML  = '';
            document.documentElement.setAttribute('data-theme', 'dark');

            gameMode        = 'classic';
            knockoutEnabled = false;
            nWinTotal       = 4;
            nToWinTarget    = 2;
            sessionActive   = false;

            resultDisplay.textContent = 'Ready to spin!';
            canvas.classList.remove('winner-glow');
            updateBadgeValues();
            updateItems();
            openModePicker();
        }
    );
}

function updateBadgeValues() {
    powerVal.textContent    = powerSlider.value;
    frictionVal.textContent = frictionSlider.value;
}
