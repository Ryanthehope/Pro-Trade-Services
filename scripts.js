// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Update copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Quote Form Handling
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
});

// Handle Quote Form Submission
async function handleQuoteSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const formData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        postcode: form.postcode.value,
        service: form.service.value,
        message: form.message.value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Option 1: Formspree integration
        // Replace YOUR_FORMSPREE_ID with your actual Formspree form ID
        const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // Get from formspree.io
        
        if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
            // Demo mode - just show success without actually sending
            console.log('Form data:', formData);
            showSuccessMessage(form);
        } else {
            // Send to Formspree
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to send quote request');
            }
            
            showSuccessMessage(form);
        }
        
        // Option 2: Email via mailto (fallback)
        // Uncomment to enable email fallback
        // sendEmailFallback(formData);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showErrorMessage(form, 'Something went wrong. Please call us at 0161 234 5678 or try again later.');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Show success message
function showSuccessMessage(form) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div style="background-color: #48bb78; color: white; padding: 1.5rem; border-radius: 8px; text-align: center; margin-bottom: 2rem;">
            <strong style="font-size: 1.2rem;">✓ Quote Request Sent!</strong><br>
            <p style="margin-top: 0.5rem; margin-bottom: 0;">Thank you! We'll contact you within 2 hours during business hours (9am-6pm Mon-Fri).</p>
        </div>
    `;
    
    // Insert before form
    form.parentNode.insertBefore(successDiv, form);
    
    // Reset form
    form.reset();
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

// Show error message
function showErrorMessage(form, message) {
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <div style="background-color: #fc8181; color: white; padding: 1.5rem; border-radius: 8px; text-align: center; margin-bottom: 2rem;">
            <strong style="font-size: 1.2rem;">Error</strong><br>
            <p style="margin-top: 0.5rem; margin-bottom: 0;">${message}</p>
        </div>
    `;
    
    // Insert before form
    form.parentNode.insertBefore(errorDiv, form);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove error message after 8 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 8000);
}

// Email fallback (opens default email client)
function sendEmailFallback(formData) {
    const subject = `Quote Request - ${formData.service}`;
    const body = `
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Postcode: ${formData.postcode}
Service: ${formData.service}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:info@protradeservices.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Phone number validation (UK format)
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const phone = this.value.replace(/\s/g, '');
            const ukPhoneRegex = /^(\+44|0)?[1-9]\d{9,10}$/;
            
            if (phone && !ukPhoneRegex.test(phone)) {
                this.setCustomValidity('Please enter a valid UK phone number');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

// Postcode validation (basic UK format)
document.addEventListener('DOMContentLoaded', function() {
    const postcodeInput = document.getElementById('postcode');
    if (postcodeInput) {
        postcodeInput.addEventListener('blur', function() {
            const postcode = this.value.trim().toUpperCase();
            const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/;
            
            if (postcode && !ukPostcodeRegex.test(postcode)) {
                this.setCustomValidity('Please enter a valid UK postcode (e.g., M1 1AA)');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

// Add animation on scroll (optional enhancement)
function addScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.service-card, .feature, .review-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Uncomment to enable scroll animations
// document.addEventListener('DOMContentLoaded', addScrollAnimation);
