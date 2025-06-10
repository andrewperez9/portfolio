document.getElementById("sidebar").innerHTML = `
  <div class="sidebar">
    <img src="assets/images/andrew-headshot.jpg" alt="Andrew Perez">
    <h1>Andrew Perez</h1>
    <p>Aspiring Data Analyst | Dashboard Builder</p>
    <ul>
      <li><a href="mailto:acperez926@gmail.com">Email</a></li>
      <li><a href="https://linkedin.com/in/andrew-perez926" target="_blank">LinkedIn</a></li>
      <li><a href="assets/pdf/resume.pdf" target="_blank">Resume</a></li>
    </ul>
  </div>
`;

document.getElementById("projects").innerHTML = `
  <div class="project" onclick="window.location='https://yourdashboard1.link'">
    <img src="assets/images/dashboard1.png" alt="Dashboard 1">
    <div class="project-content">
      <h2>No-Show Appointments Dashboard</h2>
      <p>Data analysis dashboard highlighting patient no-shows using visual KPIs and filters.</p>
    </div>
  </div>

  <div class="project" onclick="window.location='https://yourdashboard2.link'">
    <img src="assets/images/dashboard2.png" alt="Dashboard 2">
    <div class="project-content">
      <h2>Demographic Trends Slide Deck</h2>
      <p>Slide-based analysis exploring appointment patterns across different socioeconomic groups.</p>
    </div>
  </div>
`;
