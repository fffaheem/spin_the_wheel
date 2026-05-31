// ============================================================
// CONFIG — Color Palettes & Application Constants
// ============================================================

const THEMES = {
    classic:  ['#ef4444','#f97316','#f59e0b','#84cc16','#10b981',
               '#06b6d4','#3b82f6','#8b5cf6','#d946ef','#f43f5e'],
    pastel:   ['#ffb3ba','#ffdfba','#ffffba','#baffc9','#bae1ff','#e8baff'],
    neon:     ['#ff00ff','#00ffff','#00ff00','#ffff00','#ff0055','#5500ff'],
    gold:     ['#bf953f','#fcf6ba','#b38728','#fbf5b7','#aa771c'],
    ocean:    ['#0284c7','#0369a1','#075985','#0c4a6e','#38bdf8','#7dd3fc'],
    retro:    ['#FF595E','#FFCA3A','#8AC926','#1982C4','#6A4C93'],
    sunset:   ['#ff7e5f','#feb47b','#ff99ac','#ff6a88','#d9a7c7'],
    crimson:  ['#C3073F','#950740','#6F2232','#4E4E50','#1A1A1D'],
    lavender: ['#c8b6ff','#e7c6ff','#ffd6ff','#b8c0ff','#bbd0ff'],
    matcha:   ['#dde5b6','#adc178','#a98467','#6c584c','#f0ead2'],
};

// Themes that need dark text on segments
const LIGHT_THEMES = ['pastel', 'gold', 'lavender', 'matcha'];

const DEFAULT_ITEMS = 'Alice\nBob\nCharlie\nDiana\nEthan\nFiona';

// Minimum items on wheel before spin is allowed
const MIN_ITEMS_TO_SPIN = 2;
