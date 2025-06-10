document.addEventListener("DOMContentLoaded", function () {
    const includes = document.querySelectorAll("[data-include]");
  
    includes.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to fetch ${file}`);
        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        el.innerHTML = `<p style="color: red;">Error loading ${file}</p>`;
        console.error(err);
      }
    });
  });
  