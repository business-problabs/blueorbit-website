/* ==========================================================================
   Blue Orbit — Global Interactions
   Mobile menu toggle, smooth scroll, header state, active-link highlight.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile navigation toggle */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.classList.toggle('is-active', isOpen);
    });

    /* Close mobile menu after a nav link is tapped */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Smooth scroll for in-page anchor links */
  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    var href = link.getAttribute('href');
    var hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;

    var page = href.substring(0, hashIndex);
    var hash = href.substring(hashIndex);
    var currentPage = window.location.pathname.split('/').pop();

    /* Only intercept links that point to an anchor on the current page */
    var isSamePage = page === '' || page === currentPage || (page === 'index.html' && currentPage === '');

    if (isSamePage && hash.length > 1) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          var headerOffset = 90;
          var elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          });
        }
      });
    }
  });

  /* Header background intensifies on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        header.style.borderBottomColor = 'rgba(90, 160, 255, 0.25)';
      } else {
        header.style.borderBottomColor = '';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Basic client-side validation feedback for the contact form */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#e5484d';
        } else {
          field.style.borderColor = '';
        }
      });
    });
  }

});
