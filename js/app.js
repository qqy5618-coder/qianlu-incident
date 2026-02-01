document.addEventListener('DOMContentLoaded', function () {
  // Navigation
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(a => a.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
    }
    const link = document.querySelector(`.main-nav a[data-section="${id}"]`);
    if (link) {
      link.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      history.pushState(null, '', '#' + sectionId);
    });
  });

  // Handle hash on load
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  } else {
    showSection('overview');
  }

  // Handle back/forward
  window.addEventListener('popstate', function () {
    const h = window.location.hash.slice(1);
    if (h && document.getElementById(h)) {
      showSection(h);
    } else {
      showSection('overview');
    }
  });

  // Print button
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      // Show all sections for printing
      sections.forEach(s => s.classList.add('active'));
      setTimeout(() => {
        window.print();
        // Restore view
        const current = window.location.hash.slice(1) || 'overview';
        showSection(current);
      }, 100);
    });
  }
});
