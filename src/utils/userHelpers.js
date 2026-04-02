// User Helper Functions

/**
 * Get current logged in user data
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Check if user is logged in
 */
export const isUserLoggedIn = () => {
  return !!getCurrentUser();
};

/**
 * Update user profile
 */
export const updateUserProfile = (updates) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;

    const updatedUser = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('user_data', JSON.stringify(updatedUser));
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem('user_data');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

/**
 * Get user display name
 */
export const getUserDisplayName = () => {
  const user = getCurrentUser();
  return user ? user.name : 'Guest';
};

/**
 * Get user phone
 */
export const getUserPhone = () => {
  const user = getCurrentUser();
  return user ? user.phone : null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCurrentUser,
  isUserLoggedIn,
  updateUserProfile,
  logoutUser,
  getUserDisplayName,
  getUserPhone
};
