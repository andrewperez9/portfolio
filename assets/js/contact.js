document.getElementById('contactButton').addEventListener('click', function () {
    const target = document.getElementById('three');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });