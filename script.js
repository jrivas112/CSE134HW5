// This code should be added to your script.js file

// Sample project data
const sampleProjects = [
  {
    title: "SSDM Project",
    image: "./assets/adverproj.webp",
    alt: "Advertisement Project Screenshot",
    description: "The SSDM project tracks vehicles entering and exiting a dealership's service drive using RFID technology, capturing VIN numbers to identify customers and display a personalized welcome message on a multimedia dashboard. It utilizes four RFID devices—one at entry and three at exit points—to log vehicle movements, match VINs in a database, and monitor repair order activity. A real-time monitoring dashboard provides a graphical representation of vehicle locations, tracks customer visits, and records how many customers open or do not open a repair order.",
    link: "https://rivasjulio047.wixsite.com/juliorivas"
  },
  {
    title: "Network Inventory",
    image: "./assets/networkinventory.webp",
    alt: "Network Inventory Project Screenshot",
    description: "The Network Inventory System is designed to track all network devices, including computers, printers, and servers, while managing IP addresses to prevent duplicate assignments. It also monitors device counts per department and provides a filtering system to view specific device types or departments. The system includes a demo showcasing its ability to organize and display network data efficiently.",
    link: "https://rivasjulio047.wixsite.com/juliorivas"
  },
  {
    title: "Controlled Advertisement",
    image: "./assets/controlled.webp",
    alt: "Controlled Advertisement Project Screenshot",
    description: "The Controlled Advertisement For Businesses project was developed to reduce software costs by replacing a $1,200-per-year advertisement system with an in-house solution. This custom dashboard manages and loops stored videos throughout the day, featuring Toyota dealership advertisements for branding and comedy videos for customer entertainment. The system ensures a cost-effective way to engage showroom visitors while maintaining control over displayed content.",
    link: "https://rivasjulio047.wixsite.com/juliorivas"
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
    // First try My JSON Server
    fetch('https://my-json-server.typicode.com/jrivas112/CSE134HW5/projects')
      .then(response => {
        if (!response.ok) {
          throw new Error('My JSON Server failed, trying JSONBin');
        }
        return response.json();
      })
      .then(projects => {
        loadProjects(projects);
        console.log('Loaded projects from My JSON Server');
      })
      .catch(error => {
        console.warn(error.message);
        
        // If My JSON Server fails, try JSONBin
        fetch('https://api.jsonbin.io/v3/b/67d12bae8a456b7966742fe1')
          .then(response => {
            if (!response.ok) {
              throw new Error('JSONBin response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Extract projects from JSONBin response
            const projects = data.record.projects || data.record;
            loadProjects(projects);
            console.log('Loaded projects from JSONBin');
          })
          .catch(jsonbinError => {
            console.error('Error fetching from JSONBin:', jsonbinError);
            alert('Failed to load data from both remote sources');
          });
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