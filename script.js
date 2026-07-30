document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Mobile menu ---------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });
  menuClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ---------------- Paw trail dividers ---------------- */
  const pawSVG = `<svg viewBox="0 0 24 24" fill="currentColor" class="paw-trail-icon">
      <circle cx="8" cy="7" r="2.1"/><circle cx="12.5" cy="5.2" r="2.1"/><circle cx="17" cy="7" r="2.1"/><circle cx="19" cy="11.5" r="2.1"/>
      <path d="M12.5 11c-3.6 0-6.6 2.6-6.6 5.8 0 2.1 1.7 3.4 3.9 3.4 1 0 1.9-.3 2.7-.3s1.7.3 2.7.3c2.2 0 3.9-1.3 3.9-3.4 0-3.2-3-5.8-6.6-5.8z"/></svg>`;
  document.querySelectorAll('.paw-trail').forEach(t => t.innerHTML = pawSVG.repeat(5));

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(o => { if (o !== item) o.classList.remove('is-open'); });
      item.classList.toggle('is-open', !isOpen);
    });
  });

  /* ---------------- Quiz ---------------- */
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizDotsWrap = document.getElementById('quiz-dots');
  const answers = {};
  let flowOrder = ['0'];

  function buildDots() {
    quizDotsWrap.innerHTML = '';
    flowOrder.forEach((step, i) => {
      const d = document.createElement('span');
      d.className = 'quiz-dot' + (i === 0 ? ' is-active' : '');
      quizDotsWrap.appendChild(d);
    });
  }
  buildDots();

  function goToStep(stepId) {
    quizSteps.forEach(s => s.classList.toggle('is-active', s.dataset.step === stepId));
    const idx = flowOrder.indexOf(stepId);
    if (idx > -1) {
      [...quizDotsWrap.children].forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }
  }

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key, value = btn.dataset.value;
      answers[key] = value;
      btn.closest('.quiz-step').querySelectorAll('.quiz-option').forEach(o => o.classList.remove('is-selected'));
      btn.classList.add('is-selected');

      let next;
      if (key === 'path') {
        next = value === 'mascota' ? '1m' : '1f';
        flowOrder = value === 'mascota' ? ['0', '1m', '2m', 'result'] : ['0', '1f', '2f', 'result'];
        buildDots();
      } else if (key === 'pet') {
        next = '2m';
      } else if (key === 'need') {
        next = 'result'; showResult();
      } else if (key === 'task') {
        next = '2f';
      } else if (key === 'freq') {
        next = 'result'; showResult();
      }
      setTimeout(() => goToStep(next), 220);
    });
  });

  const RESULTS = {
    'alimento_perro': ['Alimento para perros', 'Tenemos línea de alimento balanceado para perros de todas las edades. Pregunta por nuestras marcas premium en tienda.', '#shop'],
    'alimento_gato': ['Alimento para gatos', 'Contamos con alimento balanceado felino de alta calidad. Consulta las opciones disponibles en tienda.', '#shop'],
    'grooming': ['Cita de corte y aseo', 'Justo lo que tu mascota necesita — agenda su sesión de baño y corte con nuestro equipo.', '#citas'],
    'accesorios': ['Accesorios y juguetes', 'Tenemos accesorios, juguetes y kits de aseo para consentir a tu mascota.', '#shop'],
    'fumigacion_ocasional': ['Fumigadora Shindaiwa ES726', 'Ideal para uso ocasional en jardín o cultivos pequeños.', '#shop'],
    'fumigacion_profesional': ['Fumigadora ECHO SHP-800-2', 'Bomba de mochila a motor, pensada para uso profesional y frecuente.', '#shop'],
    'poda_ocasional': ['Podadora de altura ECHO PAS-266', 'Perfecta para alcanzar ramas altas en el jardín de casa.', '#shop'],
    'poda_profesional': ['Motosierra Shindaiwa 757 Professional', 'Potencia profesional para trabajos forestales frecuentes.', '#shop'],
    'maleza_ocasional': ['Chapeadora Shindaiwa', 'Robusta y ligera, ideal para mantener tu terreno bajo control.', '#shop'],
    'maleza_profesional': ['Desmalezadora Shindaiwa B530', 'Poder absoluto para limpiar terrenos grandes con frecuencia.', '#shop'],
  };

  function showResult() {
    let key;
    if (answers.path === 'mascota') {
      key = answers.need === 'alimento' ? `alimento_${answers.pet}` : answers.need;
    } else {
      key = `${answers.task}_${answers.freq}`;
    }
    const [title, text, link] = RESULTS[key] || ['Consúltanos', 'Cuéntanos más y te ayudamos a encontrar lo ideal.', '#contacto'];
    document.getElementById('quiz-result-title').textContent = title;
    document.getElementById('quiz-result-text').textContent = text;
    document.getElementById('quiz-result-cta').href = link;
  }

  document.getElementById('quiz-restart').addEventListener('click', () => {
    Object.keys(answers).forEach(k => delete answers[k]);
    document.querySelectorAll('.quiz-option.is-selected').forEach(o => o.classList.remove('is-selected'));
    flowOrder = ['0'];
    buildDots();
    goToStep('0');
  });

  /* ---------------- Calendar ---------------- */
  const calGrid = document.getElementById('cal-grid');
  const calLabel = document.getElementById('cal-month-label');
  const calSelectedLabel = document.getElementById('cal-selected-label');
  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const today = new Date();
  let viewYear = today.getFullYear(), viewMonth = today.getMonth();
  let selectedDate = null;

  function renderCalendar() {
    calGrid.innerHTML = '';
    calLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;
    const firstDay = new Date(viewYear, viewMonth, 1);
    let startOffset = firstDay.getDay() - 1; if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) calGrid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      const cellDate = new Date(viewYear, viewMonth, d);
      cell.textContent = d;
      cell.className = 'cal-day py-2 rounded-full cursor-pointer';
      const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (isPast) cell.classList.add('is-disabled');
      if (cellDate.toDateString() === today.toDateString()) cell.classList.add('is-today');
      if (selectedDate && cellDate.toDateString() === selectedDate.toDateString()) cell.classList.add('is-selected');
      cell.addEventListener('click', () => {
        selectedDate = cellDate;
        renderCalendar();
        calSelectedLabel.textContent = 'Fecha seleccionada: ' + cellDate.toLocaleDateString('es-HN', { weekday: 'long', day: 'numeric', month: 'long' });
      });
      calGrid.appendChild(cell);
    }
  }
  renderCalendar();

  document.getElementById('cal-prev').addEventListener('click', () => {
    viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  });
  document.getElementById('cal-next').addEventListener('click', () => {
    viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  });

  /* ---------------- Grooming form submit ---------------- */
  const groomingForm = document.getElementById('groomingForm');
  const groomingNote = document.getElementById('groomingNote');
  groomingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedDate) {
      groomingNote.textContent = 'Por favor selecciona una fecha en el calendario.';
      groomingNote.style.color = '#ba1a1a';
      return;
    }
    const petName = document.getElementById('petName').value.trim() || 'tu mascota';
    const time = document.getElementById('apptTime').value || '(hora)';
    const dateStr = selectedDate.toLocaleDateString('es-HN', { day: 'numeric', month: 'long' });
    groomingNote.style.color = '#1a3d1a';
    groomingNote.textContent = `¡Listo! Recibimos la solicitud de cita para ${petName} el ${dateStr} a las ${time}. Te confirmaremos por teléfono.`;
    groomingForm.reset();
    selectedDate = null;
    renderCalendar();
    calSelectedLabel.textContent = 'Selecciona una fecha';
  });

  /* ---------------- Before / after sliders ---------------- */
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const range = slider.querySelector('.ba-range');
    const afterWrap = slider.querySelector('.ba-after-wrap');
    const handle = slider.querySelector('.ba-handle');
    function update() {
      const v = range.value;
      afterWrap.style.clipPath = `inset(0 0 0 ${v}%)`;
      handle.style.left = v + '%';
    }
    range.addEventListener('input', update);
    update();
  });

  /* ---------------- Testimonial carousel ---------------- */
  const testiTrack = document.getElementById('testi-track');
  const testiSlides = document.querySelectorAll('.testi-slide');
  const testiDotsWrap = document.getElementById('testi-dots');
  let testiIndex = 0;

  testiSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testi-dot' + (i === 0 ? ' is-active' : '');
    dot.addEventListener('click', () => goToTesti(i));
    testiDotsWrap.appendChild(dot);
  });

  function goToTesti(i) {
    testiIndex = (i + testiSlides.length) % testiSlides.length;
    testiTrack.style.transform = `translateX(-${testiIndex * 100}%)`;
    [...testiDotsWrap.children].forEach((d, idx) => d.classList.toggle('is-active', idx === testiIndex));
  }
  document.getElementById('testi-prev').addEventListener('click', () => goToTesti(testiIndex - 1));
  document.getElementById('testi-next').addEventListener('click', () => goToTesti(testiIndex + 1));

  let touchStartX = 0;
  testiTrack.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
  testiTrack.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (diff > 50) goToTesti(testiIndex + 1);
    if (diff < -50) goToTesti(testiIndex - 1);
  }, { passive: true });

  /* ---------------- Newsletter ---------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterNote = document.getElementById('newsletterNote');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email) return;
    newsletterNote.textContent = `Gracias — te enviaremos novedades a ${email}.`;
    newsletterForm.reset();
  });

});