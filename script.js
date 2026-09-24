const loader = document.getElementById('loader');
const pageProgress = document.getElementById('pageProgress');
const startJourney = document.getElementById('startJourney');
const cursorGlow = document.querySelector('.cursor-glow');
const revealItems = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const menuToggle = document.getElementById('menuToggle');
const primaryNavigation = document.getElementById('primaryNavigation');
const navLinks = document.querySelectorAll('.nav-link[data-nav-section]');

const year4Courses = {
  semester1: [
    { number: '01', name: 'Modern Database', track: 'Data Engineering (DE)', trackCode: 'DE', trackKey: 'de', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '02', name: 'Enterprise Resource Planning', track: 'Digital Transformation (DT)', trackCode: 'DT', trackKey: 'dt', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '03', name: 'Data Mining', track: 'Artificial Intelligence (AI)', trackCode: 'AI', trackKey: 'ai', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '04', name: 'Business Intelligence', track: 'Data Science (DS)', trackCode: 'DS', trackKey: 'ds', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '05', name: 'Social Informatics', track: 'Digital Transformation (DT)', trackCode: 'DT', trackKey: 'dt', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } }
  ],
  semester2: [
    { number: '01', name: 'Big Data', track: 'Data Science (DS)', trackCode: 'DS', trackKey: 'ds', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '02', name: 'Geographic IS (GIS)', track: 'Data Engineering (DE)', trackCode: 'DE', trackKey: 'de', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '03', name: 'Distributed Data Management', track: 'Data Engineering (DE)', trackCode: 'DE', trackKey: 'de', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '04', name: 'Intelligent IS', track: 'Artificial Intelligence (AI)', trackCode: 'AI', trackKey: 'ai', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } },
    { number: '05', name: 'Knowledge Management', track: 'Digital Transformation (DT)', trackCode: 'DT', trackKey: 'dt', futureContent: { description: '', topics: [], skills: [], practicalApplications: [], careerAreas: [] } }
  ]
};

function renderYear4Roadmap() {
  const roadmap = document.getElementById('year4Roadmap');
  if (!roadmap) return;

  roadmap.innerHTML = Object.entries(year4Courses).map(([semesterKey, courses], index) => `
    <section class="year4-semester year4-semester--${semesterKey}">
      <div class="year4-semester__head">
        <span>SEMESTER</span>
        <strong>0${index + 1}</strong>
        <h3>Semester ${index + 1}</h3>
      </div>
      <div class="year4-course-grid">
        ${courses.map((course) => `
          <article class="year4-course glass${course.name === 'Enterprise Resource Planning' ? ' year4-course--enterprise' : ''}" data-course="${course.number}">
            <span class="year4-course__number">${course.number}</span>
            <h4>${course.name}</h4>
            <span class="track-badge year4-track-badge" data-track="${course.trackKey}" aria-label="${course.track}" title="${course.track}">
              <strong>${course.trackCode}</strong>
            </span>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');
}

function updatePageProgress() {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? (window.scrollY / scrollRange) * 100 : 0;
  pageProgress.style.height = `${progress}%`;
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
}

function setupJourneyButton() {
  startJourney?.addEventListener('click', () => {
    document.getElementById('why-is')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function setupCursorGlow() {
  if (!cursorGlow || window.matchMedia('(max-width: 640px)').matches) return;

  window.addEventListener('mousemove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

function setupTiltCards() {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      if (window.matchMedia('(max-width: 820px)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function setMenuState(isOpen) {
  if (!menuToggle || !primaryNavigation) return;
  menuToggle.classList.toggle('is-open', isOpen);
  primaryNavigation.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل');
}

function setupMobileMenu() {
  menuToggle?.addEventListener('click', () => {
    setMenuState(!primaryNavigation.classList.contains('is-open'));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

function setupActiveNavigation() {
  const sections = [...navLinks]
    .map((link) => document.getElementById(link.dataset.navSection))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.navSection === visibleEntry.target.id);
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.01, 0.25, 0.5] });

  sections.forEach((section) => observer.observe(section));
}

function setupTopbarMotion() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const updateTopbar = () => {
    topbar.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateTopbar();
  window.addEventListener('scroll', updateTopbar, { passive: true });
}

window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', updatePageProgress);

window.addEventListener('DOMContentLoaded', () => {
  renderYear4Roadmap();
  updatePageProgress();
  setupReveal();
  setupJourneyButton();
  setupCursorGlow();
  setupTiltCards();
  setupMobileMenu();
  setupActiveNavigation();
  setupTopbarMotion();
});


