const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const pageProgress = document.getElementById('pageProgress');
const startJourney = document.getElementById('startJourney');
const cursorGlow = document.querySelector('.cursor-glow');
const revealItems = document.querySelectorAll('.reveal');
const careerButtons = document.querySelectorAll('.career-item');
const careerPanel = document.getElementById('careerPanel');
const tiltCards = document.querySelectorAll('.tilt-card');

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

function runLoader() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 380);
    }

    const rounded = Math.round(progress);
    loaderBar.style.width = `${rounded}%`;
    loaderPercent.textContent = `${rounded}%`;
  }, 90);
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
    document.getElementById('about-is')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', updatePageProgress);

window.addEventListener('DOMContentLoaded', () => {
  runLoader();
  updatePageProgress();
  setupReveal();
  setupJourneyButton();
  setupCursorGlow();
  setupCareerSwitcher();
  setupTiltCards();
});


