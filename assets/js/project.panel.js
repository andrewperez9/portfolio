document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  const panel = document.getElementById('project-panel');
  const panelContent = panel.querySelector('.content');
  const closeBtn = document.getElementById('close-panel');

  // Handle clicks on project links
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth > 980) { // desktop only
        e.preventDefault();
        header.classList.add('shrink');
        fetch(this.getAttribute('href'))
          .then(res => res.text())
          .then(html => {
            panelContent.innerHTML = html;
            panel.classList.add('active');
          });
      }
    });
  });

  // Close panel
  function closePanel() {
    panel.classList.remove('active');
    header.classList.remove('shrink');
  }

  closeBtn.addEventListener('click', closePanel);

  // Close panel on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && panel.classList.contains('active')) {
      closePanel();
    }
  });
});
