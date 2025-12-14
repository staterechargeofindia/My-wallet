/* =========================================
   GLOBAL APP CONFIGURATION
   Firebase-free | Wallet System
========================================= */

// 🔷 App Identity (QR verification ke liye)
const APP_CONFIG = {
  APP_NAME: "MY_WALLET",
  QR_KEY: "MY_WALLET",   // QR ke andar ye value hogi
};

// 🔷 Amount Rules
const AMOUNT_RULES = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 100000,        // ₹1 – ₹1,00,000 per transaction
  DAILY_LIMIT: 100000        // ₹1,00,000 per 24 hours
};

// 🔷 Admin Configuration (Hidden Admin Access)
const ADMIN_CONFIG = {
  ADMIN_ID: "226492031189",
  ADMIN_PASSWORD: "Cavpa3961k",
  MASTER_BALANCE: 100000000000
};

// 🔷 LocalStorage Keys (Standardized)
const STORAGE_KEYS = {
  PERM_ID: "PERM_ID",
  USER_NAME: "USER_NAME",
  IS_ADMIN: "IS_ADMIN",
  TXN_HISTORY: "TXN_HISTORY",
  ADMIN_LOGS: "ADMIN_LOGS",
  LAST_AMOUNT: "LAST_AMOUNT",
  LAST_TO: "LAST_TO"
};

// 🔷 Helper: Generate UTR
function generateUTR() {
  return "UTR" + Date.now() + Math.floor(Math.random() * 100);
}

// 🔷 Helper: Generate Transaction ID
function generateTXN() {
  return "TXN" + Math.floor(100000 + Math.random() * 900000);
}

// 🔷 Helper: Current Date Time
function now() {
  return new Date().toLocaleString();
}

// 🔷 Helper: Amount Validation
function isValidAmount(amount) {
  return (
    !isNaN(amount) &&
    amount >= AMOUNT_RULES.MIN_AMOUNT &&
    amount <= AMOUNT_RULES.MAX_AMOUNT
  );
}
