// Sample project data — replace with your own info
const projects = [
  {
    name: "No-Show Appointments Dashboard",
    image: "assets/img/NoShowDashboard.png",
    description: "Interactive dashboard analyzing patient appointment no-shows using Python and Tableau.",
    page: "projects/noshow.html"
  },
  {
    name: "Mobility Scooter Safety Analysis",
    image: "assets/mobility-scooter.png",
    description: "Computer vision project to assess mobility scooter safety metrics for healthcare professionals.",
    page: "projects/mobility-scooter.html"
  },
  {
    name: "Sales Data Visualization",
    image: "assets/sales-viz.png",
    description: "Sales trends and insights dashboard built with Power BI and SQL.",
    page: "projects/sales-visualization.html"
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
