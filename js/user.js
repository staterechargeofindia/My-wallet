/* USER REGISTRATION & RESTORE */

function generatePermId(aadhaar, dob) {
  return btoa(aadhaar + "|" + dob); // simple hash (demo)
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEYS.PERM_ID, user.permId);
  localStorage.setItem(STORAGE_KEYS.USER_NAME, user.name);
}

function registerUser(formData) {
  const permId = generatePermId(formData.aadhaar, formData.dob);

  saveUser({
    permId: permId,
    name: formData.name
  });

  // backend call later
  return permId;
}

function isRegistered() {
  return !!localStorage.getItem(STORAGE_KEYS.PERM_ID);
}
