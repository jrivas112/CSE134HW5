    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.card-container');
            data.projects.forEach(project => {
                const card = document.createElement('project-card');
                card.setAttribute('title', project.title);
                card.setAttribute('img', project.image);  // make sure it matches "image"
                card.setAttribute('alt', project.alt);
                card.setAttribute('description', project.description);
                card.setAttribute('link', project.link);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching project data:', error));
