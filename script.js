// Fetch remote JSON and create project cards dynamically
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.card-container');

    data.projects.forEach(project => {
      const card = document.createElement('project-card');
      card.setAttribute('title', project.title);
      card.setAttribute('img', project.image);
      card.setAttribute('alt', project.alt);
      card.setAttribute('description', project.description);
      card.setAttribute('link', project.link);
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error:', error));
