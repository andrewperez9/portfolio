document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');

  // Desktop panel elements
  const panelDesktop = document.getElementById('project-panel');
  const panelContentDesktop = panelDesktop.querySelector('.content');
  const closeBtnDesktop = document.getElementById('close-panel');

  // Mobile panel elements
  const panelMobile = document.getElementById('project-panel-mobile');
  const panelContentMobile = panelMobile.querySelector('.content');
  const closeBtnMobile = document.getElementById('close-panel-mobile');

  // Keep track of injected styles to remove later
  let injectedStyleElements = [];

  function injectStylesFromHTML(html) {
    const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];

    injectedStyleElements.forEach(el => el.remove());
    injectedStyleElements = [];

    styleMatches.forEach(styleTag => {
      const styleElem = document.createElement('style');
      styleElem.classList.add('injected-project-style');
      styleElem.innerHTML = styleTag.replace(/<\/?style[^>]*>/g, '');
      document.head.appendChild(styleElem);
      injectedStyleElements.push(styleElem);
    });

    return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  }

  function loadProjectContent(href, contentContainer, panel) {
    fetch(href)
      .then(res => res.text())
      .then(html => {
        const cleanHTML = injectStylesFromHTML(html);
        contentContainer.innerHTML = cleanHTML;
        panel.classList.add('active');
      });
  }

  function closeDesktopPanel() {
    panelDesktop.classList.remove('active');
    header.classList.remove('shrink');
    injectedStyleElements.forEach(el => el.remove());
    injectedStyleElements = [];
  }

  function closeMobilePanel() {
    panelMobile.classList.remove('active');
    header.classList.remove('shrink');
    injectedStyleElements.forEach(el => el.remove());
    injectedStyleElements = [];
  }

  // Handle project link clicks
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      console.log('Window width:', window.innerWidth);

      if (window.innerWidth > 768) {
        // Desktop: close mobile panel first to avoid overlap
        closeMobilePanel();
        header.classList.add('shrink');
        loadProjectContent(href, panelContentDesktop, panelDesktop);
      } else {
        // Mobile: close desktop panel first
        closeDesktopPanel();
        header.classList.add('shrink');
        loadProjectContent(href, panelContentMobile, panelMobile);
      }
    });
  });

  closeBtnDesktop.addEventListener('click', closeDesktopPanel);
  closeBtnMobile.addEventListener('click', closeMobilePanel);

  // Close mobile panel when clicking outside content area
  panelMobile.addEventListener('click', e => {
    if (e.target === panelMobile) closeMobilePanel();
  });

  // ESC closes any open panel
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (panelDesktop.classList.contains('active')) closeDesktopPanel();
      if (panelMobile.classList.contains('active')) closeMobilePanel();
    }
  });
});
