// =========================================================
// CozyPaws — interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Icons (Lucide) ---- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---- Build paw-print trail dividers ---- */
  document.querySelectorAll('.paw-trail').forEach((trail) => {
    const pawSVG = `
      <svg viewBox="0 0 24 24" fill="currentColor" class="paw-trail-icon">
        <circle cx="8" cy="7" r="2.1"/>
        <circle cx="12.5" cy="5.2" r="2.1"/>
        <circle cx="17" cy="7" r="2.1"/>
        <circle cx="19" cy="11.5" r="2.1"/>
        <path d="M12.5 11c-3.6 0-6.6 2.6-6.6 5.8 0 2.1 1.7 3.4 3.9 3.4 1 0 1.9-.3 2.7-.3s1.7.3 2.7.3c2.2 0 3.9-1.3 3.9-3.4 0-3.2-3-5.8-6.6-5.8z"/>
      </svg>`;
    trail.innerHTML = pawSVG.repeat(5);
  });

  /* ---- Mobile nav toggle ---- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      const icon = isOpen ? 'x' : 'menu';
      menuToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
      if (window.lucide) lucide.createIcons();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  /* ---- Scroll reveal for sections + paw trail (signature motif) ---- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---- Newsletter form (front-end only demo) ---- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterNote = document.getElementById('newsletterNote');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (!email) return;

      newsletterNote.textContent = `Thanks — treats & tips are on the way to ${email}.`;
      newsletterForm.reset();
    });
  }

  /* ---- Small delight: bounce the cart badge on click ---- */
  const cartBtn = document.querySelector('.icon-btn--cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      cartBtn.style.transform = 'scale(0.9)';
      setTimeout(() => { cartBtn.style.transform = ''; }, 180);
    });
  }

});// =========================================================
// Agroveterinaria Animalia — interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Icons (Lucide) ---- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---- Build paw-print trail dividers ---- */
  document.querySelectorAll('.paw-trail').forEach((trail) => {
    const pawSVG = `
      <svg viewBox="0 0 24 24" fill="currentColor" class="paw-trail-icon">
        <circle cx="8" cy="7" r="2.1"/>
        <circle cx="12.5" cy="5.2" r="2.1"/>
        <circle cx="17" cy="7" r="2.1"/>
        <circle cx="19" cy="11.5" r="2.1"/>
        <path d="M12.5 11c-3.6 0-6.6 2.6-6.6 5.8 0 2.1 1.7 3.4 3.9 3.4 1 0 1.9-.3 2.7-.3s1.7.3 2.7.3c2.2 0 3.9-1.3 3.9-3.4 0-3.2-3-5.8-6.6-5.8z"/>
      </svg>`;
    trail.innerHTML = pawSVG.repeat(5);
  });

  /* ---- Mobile nav toggle ---- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      const icon = isOpen ? 'x' : 'menu';
      menuToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
      if (window.lucide) lucide.createIcons();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  /* ---- Scroll reveal for sections + paw trail (signature motif) ---- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---- Newsletter form (front-end only demo) ---- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterNote = document.getElementById('newsletterNote');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (!email) return;

      newsletterNote.textContent = `Gracias — te enviaremos novedades a ${email}.`;
      newsletterForm.reset();
    });
  }

  /* ---- Grooming appointment form (front-end only demo) ----
     NOTA PARA EL CLIENTE: este formulario solo muestra un mensaje de
     confirmación en pantalla. Para recibir las solicitudes de verdad
     (por correo, WhatsApp o una hoja de cálculo) hay que conectarlo a
     un backend o a un servicio como Formspree, Google Forms o WhatsApp API. */
  const groomingForm = document.getElementById('groomingForm');
  const groomingNote = document.getElementById('groomingNote');

  if (groomingForm) {
    groomingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const petName = document.getElementById('petName').value.trim();
      const date = document.getElementById('apptDate').value;
      const time = document.getElementById('apptTime').value;

      groomingNote.textContent = `¡Listo! Recibimos la solicitud de cita para ${petName || 'tu mascota'} el ${date || '(fecha)'} a las ${time || '(hora)'}. Te confirmaremos por teléfono.`;
      groomingForm.reset();
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items (accordion behavior)
      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

});