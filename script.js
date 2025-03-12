// This code should be added to your script.js file

// Sample project data
const sampleProjects = [
    {
      title: "Personal Portfolio",
      image: "assets/portfolio.jpg",
      alt: "Portfolio website screenshot",
      description: "A responsive portfolio website built with HTML, CSS, and JavaScript.",
      link: "https://github.com/jrivas112/portfolio"
    },
    {
      title: "Task Manager App",
      image: "assets/taskmanager.jpg",
      alt: "Task manager application",
      description: "A task management application with local storage functionality.",
      link: "https://github.com/jrivas112/task-manager"
    },
    {
      title: "Weather Dashboard",
      image: "assets/weather.jpg",
      alt: "Weather dashboard application",
      description: "A weather dashboard that uses a third-party API to retrieve weather data.",
      link: "https://github.com/jrivas112/weather-app"
    }
  ];
  
  // Function to initialize local storage with sample data if it doesn't exist
  function initializeLocalStorage() {
    if (!localStorage.getItem('projectData')) {
      localStorage.setItem('projectData', JSON.stringify(sampleProjects));
      console.log('Local storage initialized with sample data');
    }
  }
  
  // Function to load projects from data source and render them
  function loadProjects(projects) {
    const container = document.querySelector('.card-container');
    container.innerHTML = ''; // Clear existing cards
    
    projects.forEach(project => {
      const card = document.createElement('project-card');
      card.setAttribute('title', project.title);
      card.setAttribute('img', project.image);
      card.setAttribute('alt', project.alt);
      card.setAttribute('description', project.description);
      card.setAttribute('link', project.link);
      container.appendChild(card);
    });
  }
  
  // Function to load data from local storage
  function loadLocalData() {
    try {
      const data = localStorage.getItem('projectData');
      if (data) {
        const projects = JSON.parse(data);
        loadProjects(projects);
        console.log('Loaded projects from local storage');
      } else {
        console.error('No project data found in local storage');
        alert('No project data found in local storage. Initializing with sample data.');
        initializeLocalStorage();
        loadLocalData(); // Try again after initialization
      }
    } catch (error) {
      console.error('Error loading from local storage:', error);
      alert('Error loading data from local storage');
    }
  }
  
  // Function to load data from remote server (JSONBin)
  function loadRemoteData() {
    // Replace with your actual JSONBin ID or My JSON Server URL
    const remoteUrl = 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID';
    
    fetch(remoteUrl, {
      headers: {
        // Include any required headers for your chosen service
        // For JSONBin: 'X-Master-Key': 'YOUR_MASTER_KEY'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // For JSONBin, the actual data is in the 'record' property
        // Adjust this according to your chosen service's response format
        const projects = data.record || data;
        loadProjects(projects);
        console.log('Loaded projects from remote server');
      })
      .catch(error => {
        console.error('Error fetching remote data:', error);
        alert('Error loading data from remote server');
      });
  }
  
  // Create the UI buttons
  function createButtons() {
    const container = document.querySelector('.projects');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'data-buttons';
    
    const localButton = document.createElement('button');
    localButton.textContent = 'Load Local';
    localButton.addEventListener('click', loadLocalData);
    
    const remoteButton = document.createElement('button');
    remoteButton.textContent = 'Load Remote';
    remoteButton.addEventListener('click', loadRemoteData);
    
    buttonsDiv.appendChild(localButton);
    buttonsDiv.appendChild(remoteButton);
    
    // Insert buttons before the card container
    const cardContainer = document.querySelector('.card-container');
    container.insertBefore(buttonsDiv, cardContainer);
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorage();
    createButtons();
    // Don't automatically load any data - wait for button clicks
  });