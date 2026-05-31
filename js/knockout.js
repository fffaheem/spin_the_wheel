// ============================================================
// KNOCKOUT — Elimination helpers
// ============================================================

function resetKnockout() {
    // Task #2: stop the wheel before resetting so it doesn't keep spinning
    stopWheel();

    activeItems = items.slice();
    eliminatedItems.clear();
    canvas.classList.remove('winner-glow');
    updateKnockoutStatus();
    drawWheel();
}

function updateKnockoutStatus() {
    var wrapper = document.getElementById('knockout-count-wrapper');
    if (!knockoutEnabled) {
        if (wrapper) wrapper.style.display = 'none';
        knockoutStatusEl.style.display = 'flex';
        return;
    }
    if (wrapper) wrapper.style.display = 'inline';
    knockoutStatusEl.style.display = 'flex';
    knockoutCount.textContent = activeItems.length + '/' + items.length;
}

// Remove an item from the active pool
function eliminateItem(itemName) {
    var idx = activeItems.indexOf(itemName);
    if (idx !== -1) activeItems.splice(idx, 1);
    eliminatedItems.add(itemName);
}
