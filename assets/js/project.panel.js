document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');

  const panelDesktop = document.getElementById('project-panel');
  const panelContentDesktop = panelDesktop.querySelector('.content');
  const closeBtnDesktop = document.getElementById('close-panel');

  const panelMobile = document.getElementById('project-panel-mobile');
  const panelContentMobile = panelMobile.querySelector('.content');
  const closeBtnMobile = document.getElementById('close-panel-mobile');

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
        panel.scrollTop = 0;
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

  function isMobileWidth() {
    return window.innerWidth <= 820;
  }

  function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
  }

  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      const href = this.getAttribute('href');
      if (!href) return;

      console.log('[panel] clicked:', href, 'window size:', window.innerWidth, 'x', window.innerHeight, 'landscape:', isLandscape());

      if (isMobileWidth()) {
        // Mobile panel for ALL small widths (portrait or landscape)
        closeDesktopPanel();
        if (isLandscape()) {
          console.log('[panel] Using MOBILE panel in LANDSCAPE');
          header.classList.remove('shrink');
        } else {
          console.log('[panel] Using MOBILE panel in PORTRAIT');
          header.classList.add('shrink');
        }
        loadProjectContent(href, panelContentMobile, panelMobile);
      } else {
        // Desktop panel for larger widths
        closeMobilePanel();
        console.log('[panel] Using DESKTOP panel');
        header.classList.add('shrink');
        loadProjectContent(href, panelContentDesktop, panelDesktop);
      }
    });
  });

  closeBtnDesktop.addEventListener('click', closeDesktopPanel);
  closeBtnMobile.addEventListener('click', closeMobilePanel);

  panelMobile.addEventListener('click', e => {
    if (e.target === panelMobile) closeMobilePanel();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (panelDesktop.classList.contains('active')) closeDesktopPanel();
      if (panelMobile.classList.contains('active')) closeMobilePanel();
    }
  });
});
