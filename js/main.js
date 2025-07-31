// Sample project data — replace with your own info
const projects = [
  {
    name: "L.A. Healthcare Desert Mapping",
    image: "assets/img/gis.png",
    description: "Mapping healthcare access inequality in Los Angeles County by identifying high-vulnerability and underserved cencus tracts. Made with ArcGIS.",
    page: "https://pomona.maps.arcgis.com/apps/dashboards/23320b3f40c54e539c33795e634b69d7"
  },
  {
    name: "No-Show Appointments Dashboard",
    image: "assets/img/NoShowDashboard.png",
    description: "Interactive dashboard and analysis of key features in reducing patient appointment no-shows. Made in Excel.",
    page: "projects/noshow.html"
  },
  {
    name: "Fake News Detection",
    image: "assets/img/fakenews.png",
    description: "Machine Learning models built to detect Fake News based on short context. Built with Python.",
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
    image: "assets/img/stars.png",
    description: "Furthering research in photogrammetry by developing automated pipeline for applying decals to 3D models in Blender, using Python.",
    page: "projects/stars.html"
  },
  {
    name: "Cinema - Movie Recommender",
    image: "assets/img/cinema.webp",
    description: "Website recommender for movies based on favorite genres and keywords.",
    page: "https://replit.com/@lm2203793/Cinema"
  }
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
