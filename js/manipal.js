// Configuration
const UNIVERSITY_ID = 1;
// Replace this with your actual Pipedream endpoint URL
const PIPEDREAM_ENDPOINT = 'https://your-pipedream-endpoint.m.pipedream.net';

let universityData = null;

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  // Load university data
  universityData = await API.fetchUniversityData(UNIVERSITY_ID);
  
  if (universityData) {
    populatePage(universityData.university);
  } else {
    console.error('Failed to load university data');
  }

  // Setup form
  setupForm();
  
  // Setup modal
  Modal.setupOutsideClick('feeModal');
});

// Populate page with university data
function populatePage(data) {
  // Header
  document.getElementById('universityName').textContent = data.name;
  document.getElementById('universityLocation').textContent = data.location;
  document.getElementById('established').textContent = data.established;
  document.getElementById('nirfRank').textContent = data.overview.ranking.nirf;
  document.getElementById('accreditation1').textContent = data.overview.accreditation[0];

  // Overview
  document.getElementById('description').textContent = data.overview.description;

  // Courses
  populateCourses(data.courses);

  // Placements
  populatePlacements(data.placements);

  // Facilities
  populateFacilities(data.facilities);

  // Populate course dropdown in form
  populateCourseDropdown(data.courses);

  // Populate fee modal
  populateFeeModal(data.courses);
}

// Populate courses section
function populateCourses(courses) {
  const coursesList = document.getElementById('coursesList');
  coursesList.innerHTML = '';

  courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'card';
    courseCard.innerHTML = `
      <h3>${course.name}</h3>
      <span class="duration">${course.duration}</span>
      <p class="mt-2"><strong>Eligibility:</strong> ${course.eligibility}</p>
      <p class="fee">${formatCurrency(course.feeRange.min)} - ${formatCurrency(course.feeRange.max)}/year</p>
      <p><strong>Seats:</strong> ${course.seats}</p>
    `;
    coursesList.appendChild(courseCard);
  });
}

// Populate placements section
function populatePlacements(placements) {
  const placementStats = document.getElementById('placementStats');
  placementStats.innerHTML = `
    <div class="stat-box">
      <span class="number">${placements.statistics.averagePackage}</span>
      <span class="label">Average Package</span>
    </div>
    <div class="stat-box">
      <span class="number">${placements.statistics.highestPackage}</span>
      <span class="label">Highest Package</span>
    </div>
    <div class="stat-box">
      <span class="number">${placements.statistics.placementRate}</span>
      <span class="label">Placement Rate</span>
    </div>
    <div class="stat-box">
      <span class="number">${placements.statistics.totalRecruiters}+</span>
      <span class="label">Recruiters</span>
    </div>
  `;

  const recruitersList = document.getElementById('recruitersList');
  recruitersList.innerHTML = '';
  placements.topRecruiters.forEach(recruiter => {
    const tag = document.createElement('div');
    tag.className = 'recruiter-tag';
    tag.textContent = recruiter;
    recruitersList.appendChild(tag);
  });
}

// Populate facilities section
function populateFacilities(facilities) {
  const facilitiesList = document.getElementById('facilitiesList');
  facilitiesList.innerHTML = '';

  facilities.forEach(facility => {
    const facilityCard = document.createElement('div');
    facilityCard.className = 'card';
    facilityCard.innerHTML = `
      <h3>${facility.name}</h3>
      <p>${facility.description}</p>
    `;
    facilitiesList.appendChild(facilityCard);
  });
}

// Populate course dropdown
function populateCourseDropdown(courses) {
  const courseSelect = document.getElementById('course');
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.name;
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });

  // Populate states
  const stateSelect = document.getElementById('state');
  populateStates(stateSelect);
}

// Populate fee modal
function populateFeeModal(courses) {
  const feeTableBody = document.getElementById('feeTableBody');
  feeTableBody.innerHTML = '';

  courses.forEach(course => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.name}</td>
      <td>${course.duration}</td>
      <td>${formatCurrency(course.feeRange.min)} - ${formatCurrency(course.feeRange.max)}</td>
    `;
    feeTableBody.appendChild(row);
  });
}

// Setup form validation and submission
function setupForm() {
  const form = document.getElementById('admissionForm');
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select');

  // Add real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    FormValidator.clearAllErrors(form);
    
    // Validate all fields
    let isValid = true;
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const state = document.getElementById('state');
    const course = document.getElementById('course');
    const intakeYear = document.getElementById('intakeYear');
    const consent = document.getElementById('consent');

    if (!FormValidator.validateName(fullName.value)) {
      FormValidator.showError(fullName, 'Please enter a valid name (letters and spaces only)');
      isValid = false;
    }

    if (!FormValidator.validateEmail(email.value)) {
      FormValidator.showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    if (!FormValidator.validatePhone(phone.value)) {
      FormValidator.showError(phone, 'Please enter a valid 10-digit Indian mobile number (starting with 6-9)');
      isValid = false;
    }

    if (!FormValidator.validateRequired(state.value)) {
      FormValidator.showError(state, 'Please select your state');
      isValid = false;
    }

    if (!FormValidator.validateRequired(course.value)) {
      FormValidator.showError(course, 'Please select a course');
      isValid = false;
    }

    if (!FormValidator.validateRequired(intakeYear.value)) {
      FormValidator.showError(intakeYear, 'Please select an intake year');
      isValid = false;
    }

    if (!consent.checked) {
      FormValidator.showError(consent, 'You must agree to continue');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Prepare form data
    const formData = {
      university: 'Manipal Academy of Higher Education',
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      state: state.value,
      course: course.value,
      intakeYear: intakeYear.value,
      consent: consent.checked,
      timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Submit to Pipedream
    const result = await API.submitLead(formData, PIPEDREAM_ENDPOINT);

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Show message
    showFormMessage(form, result.message, result.success);

    // Reset form if successful
    if (result.success) {
      form.reset();
      FormValidator.clearAllErrors(form);
    }
  });
}

// Validate individual field
function validateField(input) {
  FormValidator.clearError(input);

  if (input.type === 'text' && input.id === 'fullName') {
    if (!FormValidator.validateName(input.value)) {
      FormValidator.showError(input, 'Please enter a valid name');
      return false;
    }
  } else if (input.type === 'email') {
    if (!FormValidator.validateEmail(input.value)) {
      FormValidator.showError(input, 'Please enter a valid email');
      return false;
    }
  } else if (input.type === 'tel') {
    if (!FormValidator.validatePhone(input.value)) {
      FormValidator.showError(input, 'Please enter a valid 10-digit mobile number');
      return false;
    }
  } else if (input.tagName === 'SELECT') {
    if (!FormValidator.validateRequired(input.value)) {
      FormValidator.showError(input, 'This field is required');
      return false;
    }
  }

  return true;
}
