const LocalStorageKeys = Object.freeze({
  RESTORE_REGISTRATION: 'restore_registration',
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
});

class LocalStorageService {
  // Get item
  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  // Get and parse JSON
  static getJSON(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing JSON for ${key}:`, error);
      return null;
    }
  }

  // Set item
  static set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      return false;
    }
  }

  // Set JSON (automatically stringify)
  static setJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting JSON for ${key}:`, error);
      return false;
    }
  }

  // Remove item
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      return false;
    }
  }

  // Clear all
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Check if key exists
  static has(key) {
    return localStorage.getItem(key) !== null;
  }

  // Get all keys
  static getAllKeys() {
    return Object.keys(localStorage);
  }

  // === Specific methods for the app ===

  // Access Token
  static getAccessToken() {
    return this.get(LocalStorageKeys.ACCESS_TOKEN);
  }

  static setAccessToken(token) {
    return this.set(LocalStorageKeys.ACCESS_TOKEN, token);
  }

  static removeAccessToken() {
    return this.remove(LocalStorageKeys.ACCESS_TOKEN);
  }

  // Refresh Token
  static getRefreshToken() {
    return this.get(LocalStorageKeys.REFRESH_TOKEN);
  }

  static setRefreshToken(token) {
    return this.set(LocalStorageKeys.REFRESH_TOKEN, token);
  }

  static removeRefreshToken() {
    return this.remove(LocalStorageKeys.REFRESH_TOKEN);
  }

  // Restore Registration (assuming it's JSON)
  static getRestoreRegistration() {
    return this.getJSON(LocalStorageKeys.RESTORE_REGISTRATION);
  }

  static setRestoreRegistration(data) {
    return this.setJSON(LocalStorageKeys.RESTORE_REGISTRATION, data);
  }

  static removeRestoreRegistration() {
    return this.remove(LocalStorageKeys.RESTORE_REGISTRATION);
  }

  // Clear all auth data
  static clearAuthTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

// Export both the service and keys
export { LocalStorageService, LocalStorageKeys };
