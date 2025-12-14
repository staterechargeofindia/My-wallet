/* LIMIT LOGIC */

function getLast24hTotal() {
  const history = getHistory();
  const nowTime = Date.now();
  let total = 0;

  history.forEach(txn => {
    const t = new Date(txn.date).getTime();
    if (
      txn.type === "Debit" &&
      nowTime - t <= 24 * 60 * 60 * 1000
    ) {
      total += txn.amount;
    }
  });

  return total;
}

function canSendAmount(amount) {
  if (!isValidAmount(amount)) return false;

  const used = getLast24hTotal();
  return (used + amount) <= AMOUNT_RULES.DAILY_LIMIT;
}
