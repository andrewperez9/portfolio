// Sample project data — replace with your own info
const projects = [
  {
    name: "No-Show Appointments Dashboard",
    image: "assets/img/NoShowDashboard.png",
    description: "Interactive dashboard analyzing patient appointment no-shows using Python and Tableau.",
    page: "projects/noshow.html"
  },
  {
    name: "Fake News Detection",
    image: "assets/img/fakenews.png",
    description: "Machine Learning model built to detect Fake News based on ",
    page: "projects/fakenews.html"
  },
  {
    name: "CPP Faculty Search Engine",
    image: "assets/img/SearchEngine.png",
    description: "Made for students to quickly find faculty members based on search keywords. Made with Python and JavaScript.",
    page: "projects/searchengine.html"
  },
  {
    name: "STARS - Automated Blender Decal",
    image: "assets/mobility-scooter.png",
    description: "Computer vision project to assess mobility scooter safety metrics for healthcare professionals.",
    page: "projects/stars.html"
  },
];

const projectsContainer = document.getElementById('projects');

projects.forEach(proj => {
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.innerHTML = `
    <img src="${proj.image}" alt="${proj.name}" />
    <h2>${proj.name}</h2>
    <p>${proj.description}</p>
  `;
  card.onclick = () => {
    window.location.href = proj.page;
  };
  projectsContainer.appendChild(card);
});
