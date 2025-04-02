// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// DOM Elements
const idForm = document.getElementById('id-form');
const verifyBtn = document.getElementById('verify-btn');
const verificationForm = document.getElementById('verification-form');
const verificationResult = document.getElementById('verification-result');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastDescription = document.getElementById('toast-description');
const toastIcon = document.getElementById('toast-icon');
const toastClose = document.getElementById('toast-close');

// Show toast notification
function showToast(title, description, type = 'success') {
  toastTitle.textContent = title;
  toastDescription.textContent = description;
  
  // Set icon based on type
  if (type === 'success') {
    toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    toast.classList.add('success');
    toast.classList.remove('error');
  } else {
    toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    toast.classList.add('error');
    toast.classList.remove('success');
  }
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

// Close toast on click
toastClose.addEventListener('click', () => {
  toast.classList.remove('show');
});

// Fake ID verification function
function verifyID(data) {
  return new Promise((resolve) => {
    // Simulate API call with timeout
    setTimeout(() => {
      // Simple verification logic for demo purposes
      // In a real app, this would be a server call
      
      // "Fake" ID patterns for demo
      const fakePatterns = [
        // Fake drivers license patterns 
        /^X[A-Z]\d{5}$/i,
        /^FAKE\d+$/i,
        /^TEST\d+$/i,
        /^DEMO\d+$/i,
        
        // Common fake numbers
        /^(1234|9999|0000)/,
        /12345678/,
        
        // Names that indicate test data
        data.fullName.toLowerCase().includes('test'),
        data.fullName.toLowerCase().includes('fake'),
        data.fullName.toLowerCase().includes('john doe'),
        data.fullName.toLowerCase().includes('jane doe'),
        
        // Other basic checks
        data.idNumber.length < 4,  // Too short to be real
      ];
      
      // Check for fake patterns
      const isFake = fakePatterns.some(pattern => {
        if (typeof pattern === 'boolean') return pattern;
        return pattern.test(data.idNumber);
      });
      
      // Age validation (must be at least 18 years old)
      const birthDate = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isUnder18 = age < 18 || 
          (age === 18 && today.getMonth() < birthDate.getMonth()) ||
          (age === 18 && today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
      
      // Future date check
      const isFutureDate = birthDate > today;
      
      // Determine result
      const result = isFake || isUnder18 || isFutureDate ? 'fake' : 'genuine';
      
      resolve(result);
    }, 2000); // 2 second delay to simulate processing
  });
}

// Handle form submission
idForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const data = {
    idType: document.getElementById('idType').value,
    idNumber: document.getElementById('idNumber').value,
    fullName: document.getElementById('fullName').value,
    dateOfBirth: document.getElementById('dateOfBirth').value
  };
  
  // Update button to show loading state
  verifyBtn.disabled = true;
  verifyBtn.innerHTML = '<span class="loading-spinner"></span> Verifying...';
  
  try {
    // Verify ID
    const result = await verifyID(data);
    
    // Display result
    displayResult(result, data);
    
    // Show toast notification
    if (result === 'genuine') {
      showToast('Verification Successful', 'The provided ID appears to be genuine.', 'success');
    } else {
      showToast('Verification Failed', 'The provided ID appears to be fake or contains incorrect information.', 'error');
    }
  } catch (error) {
    console.error('Verification error:', error);
    showToast('Verification Error', 'An error occurred during verification. Please try again.', 'error');
  } finally {
    // Reset button state
    verifyBtn.disabled = false;
    verifyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Verify ID';
  }
});

// Display verification result
function displayResult(result, data) {
  // Format ID type for display
  let idTypeDisplay = '';
  switch(data.idType) {
    case 'driver':
      idTypeDisplay = "Driver's License";
      break;
    case 'passport':
      idTypeDisplay = "Passport";
      break;
    case 'national':
      idTypeDisplay = "National ID";
      break;
    default:
      idTypeDisplay = "Other";
  }
  
  // Format date for display
  const formattedDate = new Date(data.dateOfBirth).toLocaleDateString();
  
  // Create result HTML
  const resultHTML = `
    <div class="card result-card ${result}">
      <div class="card-header result-header ${result}">
        <div class="flex items-center justify-between">
          <h3>Verification Result</h3>
          ${result === 'genuine' 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
          }
        </div>
        <p>ID verification ${result === 'genuine' ? 'passed' : 'failed'}</p>
      </div>
      <div class="card-content">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div class="result-icon ${result}">
            ${result === 'genuine'
              ? '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
              : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
            }
          </div>
        </div>
        
        <div class="data-grid">
          <p class="data-label">ID Type:</p>
          <p class="data-value">${idTypeDisplay}</p>
          
          <p class="data-label">ID Number:</p>
          <p class="data-value">${data.idNumber}</p>
          
          <p class="data-label">Full Name:</p>
          <p class="data-value">${data.fullName}</p>
          
          <p class="data-label">Date of Birth:</p>
          <p class="data-value">${formattedDate}</p>
        </div>
        
        <div class="info-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <p>
            ${result === 'genuine' 
              ? "This ID appears to be genuine based on our verification system." 
              : "This ID appears to be fake or contains incorrect information."}
          </p>
        </div>
        
        <button onclick="resetVerification()" class="reset-btn">
          Verify Another ID
        </button>
      </div>
    </div>
  `;
  
  // Update the result container and show it
  verificationResult.innerHTML = resultHTML;
  verificationForm.classList.add('hidden');
  verificationResult.classList.remove('hidden');
}

// Reset verification to show the form again
function resetVerification() {
  verificationForm.classList.remove('hidden');
  verificationResult.classList.add('hidden');
  idForm.reset();
}

// Make resetVerification function available globally
window.resetVerification = resetVerification;
