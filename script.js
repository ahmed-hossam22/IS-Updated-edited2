const loader = document.getElementById('loader');
const pageProgress = document.getElementById('pageProgress');
const startJourney = document.getElementById('startJourney');
const cursorGlow = document.querySelector('.cursor-glow');
const revealItems = document.querySelectorAll('.reveal');
const careerButtons = document.querySelectorAll('.career-item');
const careerPanel = document.getElementById('careerPanel');
const tiltCards = document.querySelectorAll('.tilt-card');
const menuToggle = document.getElementById('menuToggle');
const primaryNavigation = document.getElementById('primaryNavigation');
const navLinks = document.querySelectorAll('.nav-link[data-nav-section]');

const careerContent = {
  analyst: {
    title: 'Data Analyst',
    text: 'مسار تحليل البيانات مناسب لمن يحب فهم الأرقام وتحويلها إلى معنى واضح. الـ Data Analyst ينظف البيانات، يحللها، ويعرضها في dashboards وتقارير تساعد الإدارة تعرف أين المشكلة وأين الفرصة.',
    jobs: 'فرص العمل: قوية في الشركات، البنوك، التسويق، المنتجات، والـ BI.',
    salary: 'المرتبات: جيدة وتزيد بسرعة مع Excel / SQL / Power BI أو Tableau.'
  },
  engineer: {
    title: 'Data Engineer',
    text: 'مهندس البيانات هو الشخص الذي يبني الطريق الذي تتحرك عليه البيانات. يهتم بتجميع البيانات من أكثر من مصدر، تخزينها بشكل منظم، وتجهيزها بحيث يقدر المحلل أو عالم البيانات يستخدمها بسهولة وبدون أخطاء.',
    jobs: 'فرص العمل: قوية جدًا في الشركات الكبيرة، الأنظمة السحابية، المنتجات الرقمية، والبنوك.',
    salary: 'المرتبات: غالبًا أعلى من المتوسط لأنها تحتاج SQL قوي، قواعد بيانات، Cloud، وPython.'
  },
  scientist: {
    title: 'Data Scientist',
    text: 'عالم البيانات يحاول يجاوب على أسئلة أعمق: ماذا سيحدث؟ لماذا حدث؟ وما القرار الأفضل؟ يستخدم الإحصاء والبرمجة والـ Machine Learning لاكتشاف أنماط وبناء نماذج توقع تساعد الشركة تتحرك بذكاء.',
    jobs: 'فرص العمل: ممتازة في المنتجات، البنوك، التسويق، الصحة، والـ AI teams.',
    salary: 'المرتبات: قوية، لكنها تحتاج أساس جيد في الإحصاء، Python، تحليل البيانات، وبناء النماذج.'
  },
  ml: {
    title: 'Machine Learning Engineer',
    text: 'مهندس تعلم الآلة يأخذ نموذج الـ AI من مرحلة التجربة إلى منتج يعمل مع المستخدمين. يهتم بتدريب النماذج، اختبارها، تحسين أدائها، وربطها بتطبيق أو نظام حقيقي.',
    jobs: 'فرص العمل: مطلوبة في شركات التقنية، البحث، التوصيات، الرؤية الحاسوبية، ومعالجة اللغة.',
    salary: 'المرتبات: عالية عادة، لأنها تجمع بين البرمجة القوية وفهم النماذج والأنظمة.'
  },
  ai: {
    title: 'AI Engineer',
    text: 'مهندس الذكاء الاصطناعي يبني حلولًا ذكية تخدم المستخدم أو الشركة، مثل chatbots، أنظمة توصية، تصنيف محتوى، أو أدوات تساعد على اتخاذ القرار. المسار يحتاج فهم بيانات وخوارزميات وطريقة دمج الحل داخل نظام فعلي.',
    jobs: 'فرص العمل: في نمو مستمر مع انتشار أدوات الذكاء الاصطناعي داخل الشركات والمنتجات.',
    salary: 'المرتبات: من الأقوى في السوق عند امتلاك أساس عملي ومشاريع واضحة.'
  }
}

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

function setupCareerSwitcher() {
  careerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      careerButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const key = button.dataset.career;
      const content = careerContent[key];

      careerPanel.innerHTML = `
        <span class="section-kicker">Track Focus</span>
        <h3>${content.title}</h3>
        <p>${content.text}</p>
        <div class="career-meta">
          <span>${content.jobs}</span>
          <span>${content.salary}</span>
        </div>
      `;
    });
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

window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', updatePageProgress);

window.addEventListener('DOMContentLoaded', () => {
  renderYear4Roadmap();
  updatePageProgress();
  setupReveal();
  setupJourneyButton();
  setupCursorGlow();
  setupCareerSwitcher();
  setupTiltCards();
  setupMobileMenu();
  setupActiveNavigation();
});


