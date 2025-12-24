/* ============================================
   PORTFOLIO JAVASCRIPT
   Author: Your Name
   Description: Interactive features for portfolio
   
   This file contains simple JavaScript with 
   detailed comments explaining each part.
   ============================================ */


/* ============================================
   1. WAIT FOR PAGE TO LOAD
   This code runs when the page is fully loaded
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initLoader();
    initNavbar();
    initMobileMenu();
    initScrollToTop();
    initProjectFilter();
    initContactForm();
    initSkillBars();
    initSmoothScroll();
    initAOS();
    
});


/* ============================================
   2. LOADER
   Hides the loading animation when page loads
   ============================================ */
function initLoader() {
    // Get the loader element
    var loader = document.getElementById('loader');
    
    // Wait for everything to load
    window.addEventListener('load', function() {
        // Add 'hidden' class to hide loader
        loader.classList.add('hidden');
    });
}


/* ============================================
   3. NAVBAR SCROLL EFFECT
   Changes navbar background when scrolling
   ============================================ */
function initNavbar() {
    // Get the navbar element
    var navbar = document.getElementById('navbar');
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        // Check if user scrolled more than 50 pixels
        if (window.scrollY > 50) {
            // Add 'scrolled' class (makes navbar have background)
            navbar.classList.add('scrolled');
        } else {
            // Remove 'scrolled' class (transparent navbar)
            navbar.classList.remove('scrolled');
        }
    });
}


/* ============================================
   4. MOBILE MENU
   Opens/closes menu on mobile devices
   ============================================ */
function initMobileMenu() {
    // Get menu button and navigation links
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    
    // When menu button is clicked
    menuToggle.addEventListener('click', function() {
        // Toggle 'active' class on menu
        navLinks.classList.toggle('active');
        // Toggle 'active' class on button (for animation)
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    var allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}


/* ============================================
   5. SCROLL TO TOP BUTTON
   Shows button when scrolled down, scrolls to top when clicked
   ============================================ */
function initScrollToTop() {
    // Get the scroll button
    var scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Smooth scroll animation
        });
    });
}


/* ============================================
   6. PROJECT FILTER
   Filters projects by category when buttons are clicked
   ============================================ */
function initProjectFilter() {
    // Get all filter buttons
    var filterButtons = document.querySelectorAll('.filter-btn');
    // Get all project cards
    var projectCards = document.querySelectorAll('.project-card');
    
    // Add click event to each button
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the filter value (like 'all', 'django', 'api')
            var filterValue = this.getAttribute('data-filter');
            
            // Remove 'active' class from all buttons
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Add 'active' class to clicked button
            this.classList.add('active');
            
            // Show/hide projects based on filter
            projectCards.forEach(function(card) {
                // Get project's category
                var category = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    // Show all projects
                    card.style.display = 'block';
                } else if (category && category.includes(filterValue)) {
                    // Show matching projects
                    card.style.display = 'block';
                } else {
                    // Hide non-matching projects
                    card.style.display = 'none';
                }
            });
        });
    });
}


/* ============================================
   7. CONTACT FORM - REMOVED/COMMENTED
   We're letting Django handle the form now
   ============================================ */
function initContactForm() {
    // REMOVED - Django handles form submission now
    // The form will submit normally to Django backend
    
    // Optional: Add form validation before submit
    var form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Get form values
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                event.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            
            // Email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                event.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }
            
            // If validation passes, form will submit to Django
            // Show loading state on button
            var submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Form will submit normally to Django
            return true;
        });
    }
}


/* ============================================
   8. SKILL PROGRESS BARS
   Animates skill bars when they come into view
   ============================================ */
function initSkillBars() {
    // Get all skill progress bars
    var skillBars = document.querySelectorAll('.skill-progress');
    
    // Check if element is in viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    // Animate skill bars
    function animateSkillBars() {
        skillBars.forEach(function(bar) {
            if (isInViewport(bar)) {
                // Get the progress value from data attribute
                var progress = bar.getAttribute('data-progress');
                // Set the width to animate the bar
                bar.style.width = progress + '%';
            }
        });
    }
    
    // Run on scroll and on load
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
}


/* ============================================
   9. SMOOTH SCROLL
   Smooth scrolling when clicking anchor links
   ============================================ */
function initSmoothScroll() {
    // Get all links that start with #
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Prevent default jump
            event.preventDefault();
            
            // Get the target section
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


/* ============================================
   10. INITIALIZE AOS (Animate On Scroll)
   Sets up scroll animations
   ============================================ */
function initAOS() {
    // Check if AOS library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,           // Animation duration in milliseconds
            easing: 'ease-in-out',   // Animation easing
            once: true,              // Only animate once
            offset: 100              // Offset from viewport
        });
    }
}


/* ============================================
   11. ACTIVE NAV LINK ON SCROLL
   Highlights current section in navigation
   ============================================ */
(function() {
    // Get all sections with an ID
    var sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            var navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
            
            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLink.style.color = '#ffffff';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    });
})();


/* ============================================
   12. TYPING EFFECT (OPTIONAL)
   Creates a typing animation for roles
   Uncomment to use
   ============================================ */
/*
function initTypingEffect() {
    var roles = ['Python Backend Developer', 'Django Expert', 'API Developer', 'AWS Enthusiast'];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingElement = document.querySelector('.hero-content h1 span');
    
    function type() {
        var currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        var typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}
*/


/* ============================================
   13. COUNTER ANIMATION (OPTIONAL)
   Animates numbers counting up
   Uncomment to use
   ============================================ */
/*
function initCounters() {
    var counters = document.querySelectorAll('.stat-item .number');
    
    counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-count'));
        var current = 0;
        var increment = target / 50;
        
        function updateCount() {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target;
            }
        }
        
        updateCount();
    });
}
*/


/* ============================================
   That's all! This JavaScript file handles:
   
   ✅ Page loading animation
   ✅ Navbar scroll effect
   ✅ Mobile menu toggle
   ✅ Scroll to top button
   ✅ Project filtering
   ✅ Contact form handling
   ✅ Skill bar animations
   ✅ Smooth scrolling
   ✅ AOS animations
   ✅ Active nav highlighting
   
   ============================================ */