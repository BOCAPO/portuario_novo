export const setStorageItem = (key: string, value: string) => {
  const payload = JSON.stringify(value);
  window.sessionStorage.setItem(key, payload);
};

export const getStorageItem = (key: string) => {
  const result = window.sessionStorage.getItem(key);
  try {
    return result ? JSON.parse(result) : null;
  } catch (error) {
    return null;
  }
};

export const removeStorageItem = (key: string) => {
  window.sessionStorage.removeItem(key);
};
