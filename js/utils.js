// Form validation utilities
const FormValidator = {
  // Validate full name (at least 2 characters, letters and spaces only)
  validateName: (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
  },

  // Validate email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  // Validate 10-digit Indian phone number
  validatePhone: (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
  },

  // Validate required field
  validateRequired: (value) => {
    return value && value.trim().length > 0;
  },

  // Show error for a field
  showError: (input, message) => {
    input.classList.add('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  },

  // Clear error for a field
  clearError: (input) => {
    input.classList.remove('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.style.display = 'none';
    }
  },

  // Clear all errors in a form
  clearAllErrors: (form) => {
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
      FormValidator.clearError(input);
    });
  }
};

// API utilities
const API = {
  // Fetch university data
  fetchUniversityData: async (universityId) => {
    try {
      const response = await fetch(`data/university${universityId}.json`);
      if (!response.ok) throw new Error('Failed to fetch university data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching university data:', error);
      return null;
    }
  },

  // Submit lead form to Pipedream
  submitLead: async (formData, pipedreamUrl) => {
    try {
      const response = await fetch(pipedreamUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: 'Form submitted successfully! We will contact you soon.'
      };
    } catch (error) {
      console.error('Error submitting form:', error);
      return {
        success: false,
        message: 'Failed to submit form. Please try again later.'
      };
    }
  }
};

// Modal utilities
const Modal = {
  open: (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  },

  close: (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  },

  // Close modal when clicking outside
  setupOutsideClick: (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          Modal.close(modalId);
        }
      });
    }
  }
};

// Format currency (Indian Rupees)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Show form message
const showFormMessage = (form, message, isSuccess) => {
  const messageDiv = form.querySelector('.form-message');
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(isSuccess ? 'success' : 'error', 'show');

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageDiv.classList.remove('show');
    }, 5000);
  }
};

// Indian states list
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

// Populate state dropdown
const populateStates = (selectElement) => {
  INDIAN_STATES.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    selectElement.appendChild(option);
  });
};

// Export utilities (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FormValidator,
    API,
    Modal,
    formatCurrency,
    showFormMessage,
    INDIAN_STATES,
    populateStates
  };
}
