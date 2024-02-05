export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Add domain validation
    const allowedDomains = ['gmail.com', 'yahoo.com'];
    const domain = email.split('@')[1];
  
    if (!emailRegex.test(email) || !allowedDomains.includes(domain)) {
      return false;
    }
  
    return true;
  };