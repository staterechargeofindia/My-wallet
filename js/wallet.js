/* =========================================
   WALLET LOGIC
   Debit / Credit / History
   Firebase-free
========================================= */

// Get user ID
function getUserId() {
  return localStorage.getItem(STORAGE_KEYS.PERM_ID);
}

// Get current balance
function getBalance() {
  return parseInt(localStorage.getItem("WALLET_BALANCE")) || 0;
}

// Set balance
function setBalance(amount) {
  localStorage.setItem("WALLET_BALANCE", amount);
}

// Initialize wallet (first time)
function initWallet() {
  if (!localStorage.getItem("WALLET_BALANCE")) {
    setBalance(0);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TXN_HISTORY)) {
    localStorage.setItem(STORAGE_KEYS.TXN_HISTORY, JSON.stringify([]));
  }
}

// Add transaction to history
function addTransaction(type, amount, party) {
  const history =
    JSON.parse(localStorage.getItem(STORAGE_KEYS.TXN_HISTORY)) || [];

  const txn = {
    date: now(),
    type: type,            // Debit / Credit / Admin
    amount: amount,
    party: party,
    utr: generateUTR(),
    txnId: generateTXN()
  };

  history.unshift(txn);
  localStorage.setItem(STORAGE_KEYS.TXN_HISTORY, JSON.stringify(history));

  // Last transaction info (receipt ke liye)
  localStorage.setItem(STORAGE_KEYS.LAST_AMOUNT, amount);
  localStorage.setItem(STORAGE_KEYS.LAST_TO, party);
}

// Debit money (User → User)
function debit(amount, toUser) {
  let balance = getBalance();

  if (balance < amount) {
    alert("Insufficient balance");
    return false;
  }

  balance -= amount;
  setBalance(balance);

  addTransaction("Debit", amount, toUser);
  return true;
}

// Credit money (Receive / Admin)
function credit(amount, fromUser) {
  let balance = getBalance();
  balance += amount;
  setBalance(balance);

  addTransaction("Credit", amount, fromUser);
  return true;
}

// Admin add balance
function adminAdd(amount) {
  credit(amount, "Admin");
}

// Admin withdraw balance
function adminWithdraw(amount) {
  let balance = getBalance();

  if (balance < amount) {
    alert("User balance insufficient");
    return false;
  }

  balance -= amount;
  setBalance(balance);

  addTransaction("Admin Withdraw", amount, "Admin");
  return true;
}

// Get transaction history
function getHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TXN_HISTORY)) || [];
}
