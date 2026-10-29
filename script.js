/**
 * ============================================================================
 * ABHISHEK - MODERN DEVELOPER PORTFOLIO
 * Interactive JavaScript Engine
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC TYPING EFFECT IN HERO SECTION
  const typedRoleElement = document.getElementById('typedRole');
  const roles = [
    'Software Solutions',
    'Java & C++ Systems',
    'Campus Cloud Dashboard',
    'Robust OOP Architectures',
    'Algorithmic Applications'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenRoles = 2000;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      setTimeout(() => {
        isDeleting = true;
        typeRole();
      }, delayBetweenRoles);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }

    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeRole, currentSpeed);
  }

  if (typedRoleElement) {
    setTimeout(typeRole, 600);
  }

  // 2. THEME TOGGLE (DARK / LIGHT MODE)
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('abhishek_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = body.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('abhishek_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  // 3. STICKY HEADER & SCROLL SPY
  const header = document.getElementById('header');
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-nav-links .mobile-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (scrollPos > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll to Top visibility
    if (scrollPos > 450) {
      scrollToTopBtn?.classList.add('visible');
    } else {
      scrollToTopBtn?.classList.remove('visible');
    }

    // Active Navigation Highlight
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function dismissDrawer() {
    mobileDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  closeDrawer?.addEventListener('click', dismissDrawer);
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      dismissDrawer();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', dismissDrawer);
  });

  // 5. SKILLS FILTERING
  const filterTabs = document.querySelectorAll('.skill-tab');
  const skillBoxes = document.querySelectorAll('.skill-box');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      skillBoxes.forEach(box => {
        const boxCategory = box.getAttribute('data-category');
        if (filterCategory === 'all' || boxCategory === filterCategory) {
          box.style.display = 'flex';
          setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
          }, 50);
        } else {
          box.style.opacity = '0';
          box.style.transform = 'translateY(15px)';
          setTimeout(() => {
            box.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. ANIMATE SKILL BARS ON INTERSECTION
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  skillBoxes.forEach(box => skillObserver.observe(box));

  // 7. NUMERICAL COUNTER ANIMATION IN ACHIEVEMENTS
  const counters = document.querySelectorAll('.counter-number');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.4 });

  const counterBanner = document.querySelector('.stats-counter-banner');
  if (counterBanner) {
    counterObserver.observe(counterBanner);
  }

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function (easeOutQuad)
        const currentCount = Math.floor(progress * (2 - progress) * target);
        counter.textContent = currentCount;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // 8. INTERACTIVE CONTACT FORM VALIDATION & SUBMISSION
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('formSuccessToast');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const subjectInput = document.getElementById('userSubject');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError('nameError', 'Please enter your full name.');
        isValid = false;
      } else {
        clearError('nameError');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('emailError');
      }

      // Validate Subject
      if (!subjectInput.value) {
        showError('subjectError', 'Please select an opportunity topic.');
        isValid = false;
      } else {
        clearError('subjectError');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError('messageError', 'Please enter a message of at least 10 characters.');
        isValid = false;
      } else {
        clearError('messageError');
      }

      if (isValid) {
        // Simulate sending
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          if (toast) {
            toast.classList.add('active');
            setTimeout(() => {
              toast.classList.remove('active');
            }, 7000);
          }
        }, 1200);
      }
    });
  }

  function showError(elementId, msg) {
    const errEl = document.getElementById(elementId);
    if (errEl) errEl.textContent = msg;
  }

  function clearError(elementId) {
    const errEl = document.getElementById(elementId);
    if (errEl) errEl.textContent = '';
  }

  // 9. PROFILE SUMMARY MODAL / DOWNLOAD HANDLER
  const downloadResumeBtn = document.getElementById('downloadResume');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal('abhishek-resume');
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// 10. PROJECT DEEP DIVE MODAL SYSTEM
const projectDatabase = {
  'campus-cloud': {
    title: 'Campus Cloud Dashboard',
    tag: 'Flagship Academic Portal',
    subtitle: 'Centralized Education & Cloud Collaboration Platform',
    icon: 'fa-solid fa-cloud',
    tech: ['Java 21', 'MySQL', 'Cloud Storage API', 'RESTful API', 'CSS Glassmorphism', 'JavaScript'],
    description: `
      <p style="margin-bottom: 14px; color: var(--text-muted); line-height: 1.7;">
        The <strong>Campus Cloud Dashboard</strong> is Abhishek's flagship project engineered to transform educational workflows. Designed during his BCA tenure, the application resolves traditional disconnects between students, professors, and administration by providing a high-speed, synchronized digital campus hub.
      </p>
      <h4 style="font-family: var(--font-heading); margin: 18px 0 10px 0; color: var(--text-main);">Architectural Highlights:</h4>
      <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted); line-height: 1.7;">
        <li><strong>Role-Based Access Control (RBAC):</strong> Discrete authorization layers for Students, Faculty, and HODs.</li>
        <li><strong>Cloud Document Engine:</strong> Integrated cloud storage endpoints allowing immediate access to syllabus documents, lab manuals, and previous examination solutions.</li>
        <li><strong>Real-time Campus Notice Broadcaster:</strong> Categorized announcements with urgent flags and student reach analytics.</li>
        <li><strong>Optimized Query Performance:</strong> Indexed relational tables in MySQL designed with 3NF normalization, handling peak student inquiry loads seamlessly.</li>
      </ul>
      <div style="background: rgba(99, 102, 241, 0.08); padding: 14px 18px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan); margin-bottom: 20px;">
        <strong style="color: var(--accent-cyan);"><i class="fa-solid fa-medal"></i> Recognition:</strong> Awarded "Best System Architecture" at the Smart Campus Hackathon for clean OOP structure and database design.
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="#contact" onclick="closeProjectModal()" class="btn btn-primary btn-sm"><i class="fa-solid fa-paper-plane"></i> Discuss This Project</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i> Repository Link</a>
      </div>
    `
  },
  'banking-system': {
    title: 'Enterprise Banking & Transaction Engine',
    tag: 'Core Java & Multithreading',
    subtitle: 'High-Concurrency Account Management & Audit System',
    icon: 'fa-brands fa-java',
    tech: ['Java SE', 'Multithreading & Concurrency', 'OOP Principles', 'File I/O Persistence', 'JUnit'],
    description: `
      <p style="margin-bottom: 14px; color: var(--text-muted); line-height: 1.7;">
        A robust enterprise banking simulator demonstrating deep mastery of <strong>Java Object-Oriented Programming (OOP)</strong> and multithreading locks. It handles simultaneous deposits, withdrawals, and inter-bank transfers without race conditions or deadlock vulnerabilities.
      </p>
      <h4 style="font-family: var(--font-heading); margin: 18px 0 10px 0; color: var(--text-main);">Key Engineering Elements:</h4>
      <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted); line-height: 1.7;">
        <li>Thread synchronization utilizing synchronized blocks and atomic variables for reliable account balancing.</li>
        <li>Strict encapsulation, polymorphism for various account types (Savings, Current, Fixed Deposit).</li>
        <li>Encrypted audit ledger logging transaction timestamps and checksum hashes for error prevention.</li>
      </ul>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View Java Source Code</a>
      </div>
    `
  },
  'memory-allocator': {
    title: 'Custom Memory Allocator & Task Monitor',
    tag: 'C++ Systems Programming',
    subtitle: 'Low-Level Heap Management & Process Analytics',
    icon: 'fa-solid fa-microchip',
    tech: ['C++', 'Pointers & References', 'Memory Pooling', 'STL', 'Algorithm Optimization'],
    description: `
      <p style="margin-bottom: 14px; color: var(--text-muted); line-height: 1.7;">
        Built in <strong>C++</strong>, this project simulates operating system memory allocation mechanisms to investigate heap fragmentation and allocation latency.
      </p>
      <h4 style="font-family: var(--font-heading); margin: 18px 0 10px 0; color: var(--text-main);">Features & Implementations:</h4>
      <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted); line-height: 1.7;">
        <li>Implements First-Fit, Best-Fit, and Worst-Fit block selection heuristics.</li>
        <li>Tracks external and internal fragmentation rates under high allocation churn.</li>
        <li>Visual terminal-based process memory map illustrating free vs. occupied block spans.</li>
      </ul>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View C++ Source</a>
      </div>
    `
  },
  'c-records': {
    title: 'Student Records & Search System in C',
    tag: 'High-Speed Modular C',
    subtitle: 'Optimized Data Organization & Persistent File Indexing',
    icon: 'fa-solid fa-c',
    tech: ['C Language', 'Binary Search Trees (BST)', 'Dynamic Memory Allocation', 'Binary File I/O'],
    description: `
      <p style="margin-bottom: 14px; color: var(--text-muted); line-height: 1.7;">
        A high-efficiency command-line academic records system developed in pure <strong>C</strong>. Leveraging pointer structures and binary search trees, it guarantees \(O(\log n)\) search time across thousands of student records.
      </p>
      <h4 style="font-family: var(--font-heading); margin: 18px 0 10px 0; color: var(--text-main);">Key Features:</h4>
      <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted); line-height: 1.7;">
        <li>Dynamic allocation of node trees using <code>malloc()</code> and comprehensive memory cleanup with <code>free()</code>.</li>
        <li>Persistent binary file encoding allowing instant state recovery between application launches.</li>
        <li>Custom sorting filters by Roll Number, GPA, and Stream specialization.</li>
      </ul>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> Explore C Code</a>
      </div>
    `
  },
  'abhishek-resume': {
    title: 'Abhishek - Academic & Technical Summary',
    tag: 'Profile Overview',
    subtitle: 'BCA Scholar | 12th PCM 70% | Java & C++ Developer',
    icon: 'fa-solid fa-file-lines',
    tech: ['Java', 'C++', 'C', 'DSA', 'OOP', 'Cloud', 'MySQL'],
    description: `
      <div style="line-height: 1.7; color: var(--text-muted);">
        <p style="margin-bottom: 16px;">
          <strong>Candidate:</strong> Abhishek<br>
          <strong>Education:</strong> Bachelor of Computer Applications (BCA)<br>
          <strong>Secondary Schooling:</strong> 12th Standard PCM (Physics, Chemistry, Mathematics) - <strong>70% Marks</strong><br>
          <strong>Contact:</strong> abhishek.coding.dev@gmail.com | +91 98765 43210
        </p>
        <h4 style="font-family: var(--font-heading); color: var(--text-main); margin-bottom: 8px;">Technical Summary:</h4>
        <p style="margin-bottom: 14px;">
          Passionate software developer with solid algorithmic fundamentals honed through 12th grade PCM mathematics and advanced BCA coursework. Proficient in <strong>Java</strong>, <strong>C</strong>, and <strong>C++</strong> with hands-on experience designing cloud systems, relational databases, and multi-threaded applications. Creator of the <strong>Campus Cloud Dashboard</strong>.
        </p>
        <div style="background: rgba(99, 102, 241, 0.1); padding: 15px; border-radius: var(--radius-sm); border: 1px solid rgba(99, 102, 241, 0.25); margin-bottom: 20px;">
          <p style="font-size: 0.9rem; color: var(--text-main); margin: 0;">
            <strong>Ready for:</strong> Software Engineering Internships, Junior Backend Developer positions, and Open Source Software engineering.
          </p>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="#contact" onclick="closeProjectModal()" class="btn btn-primary btn-sm"><i class="fa-solid fa-envelope"></i> Reach Out to Abhishek</a>
          <button onclick="window.print()" class="btn btn-secondary btn-sm"><i class="fa-solid fa-print"></i> Print / Save as PDF</button>
        </div>
      </div>
    `
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const project = projectDatabase[projectId];

  if (!modal || !modalContent || !project) return;

  const techPills = project.tech.map(t => `<span class="tech-pill">${t}</span>`).join(' ');

  modalContent.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
      <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
        <i class="${project.icon}"></i>
      </div>
      <div>
        <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-cyan); font-weight: 700;">${project.tag}</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--text-main); margin: 0;">${project.title}</h3>
      </div>
    </div>
    <p style="font-size: 0.95rem; color: var(--text-dim); margin-bottom: 18px; font-weight: 500;">${project.subtitle}</p>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
      ${techPills}
    </div>
    <div class="modal-body-content">
      ${project.description}
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeToast() {
  const toast = document.getElementById('formSuccessToast');
  if (toast) {
    toast.classList.remove('active');
  }
}

// Close modal on escape key or backdrop click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

const modalEl = document.getElementById('projectModal');
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeProjectModal();
    }
  });
}

