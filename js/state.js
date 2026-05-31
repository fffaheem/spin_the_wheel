// ============================================================
// STATE — All Mutable Application State
// ============================================================

// ---- Wheel items ----
var items       = [];
var activeItems = [];

// ---- Wheel physics ----
var currentAngle    = 0;
var angularVelocity = 0;
var isSpinning      = false;
var lastTickSegment = -1;
var animationFrame;

// ---- Game mode ----
var gameMode        = 'classic';   // 'classic' | 'nwin' | 'ntowin'
var knockoutEnabled = false;

// ---- Session flag: if true, skip mode picker on page load ----
var sessionActive = false;

// ---- Eliminated items (for this knockout session) ----
var eliminatedItems = new Set();

// ---- N Win state ----
var nWinTotal         = 4;   // spins per round (user configures, min 3)
var nWinRemaining     = 0;   // spins left in current round
var nWinScores        = {};  // item → cumulative win count
var nWinRoundScores   = {};  // item → wins in current round only
var nWinRound         = 1;   // which round we are in (for KO mode)

// ---- N to Win state ----
var nToWinTarget = 2;   // hits before a player is eliminated (min 2)
var nToWinScores = {};  // item → total hit count
