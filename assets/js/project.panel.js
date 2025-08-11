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
        panel.scrollTop = 0; // Reset scroll to top
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

  // Check if device is likely a phone
  function isPhone() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  // Handle project link clicks
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');

      if (!isPhone() && window.innerWidth > 768) {
        // Desktop behavior
        closeMobilePanel();
        header.classList.add('shrink');
        loadProjectContent(href, panelContentDesktop, panelDesktop);
      } else {
        // Always mobile behavior for phones, portrait or landscape
        closeDesktopPanel();
        header.classList.add('shrink');
        loadProjectContent(href, panelContentMobile, panelMobile);
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
