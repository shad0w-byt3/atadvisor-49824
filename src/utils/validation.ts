// Validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Rwandan phone number format
  const phoneRegex = /^(\+250|0)(7[0-9]{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Please upload a valid image file (JPEG, PNG, WebP)' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Image size must be less than 10MB' };
  }
  
  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
};

export const validateFarmData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.location || data.location.trim().length < 2) {
    errors.push('Location must be at least 2 characters long');
  }
  
  if (!data.crops || !Array.isArray(data.crops) || data.crops.length === 0) {
    errors.push('At least one crop must be selected');
  }
  
  if (!data.farmSize || data.farmSize <= 0) {
    errors.push('Farm size must be greater than 0');
  }
  
  return { isValid: errors.length === 0, errors };
};