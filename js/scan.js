/* QR HANDLING */

function generateMyQR() {
  const data = {
    app: APP_CONFIG.QR_KEY,
    userId: localStorage.getItem(STORAGE_KEYS.PERM_ID)
  };
  return JSON.stringify(data);
}

function validateQR(qrText) {
  try {
    const data = JSON.parse(qrText);
    if (data.app !== APP_CONFIG.QR_KEY) return null;
    return data.userId;
  } catch {
    return null;
  }
}
