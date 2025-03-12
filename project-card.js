class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create main wrapper
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'card');

        // Create style
        const style = document.createElement('style');
        style.textContent = `
            .card {
                background: #ffffff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                border-radius: 12px;
                padding: 16px;
                margin: 16px;
                max-width: 350px;
                font-family: 'Poppins', sans-serif;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            img {
                max-width: 100%;
                border-radius: 8px;
            }

            a {
                color: #007bff;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        `;

        // Append style first
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        const wrapper = this.shadowRoot.querySelector('.card');
        
        // Get attribute values
        const title = this.getAttribute('title') || 'Project Title';
        const imgSrc = this.getAttribute('img') || '';
        const altText = this.getAttribute('alt') || 'Project image';
        const description = this.getAttribute('description') || '';
        const linkHref = this.getAttribute('link') || '#';
        
        // Create elements
        const titleElem = document.createElement('h4');
        titleElem.textContent = title;
        
        const imgElem = document.createElement('img');
        imgElem.src = imgSrc;
        imgElem.alt = altText;
        
        const descElem = document.createElement('p');
        descElem.textContent = description;
        
        const linkElem = document.createElement('a');
        linkElem.href = linkHref;
        linkElem.textContent = 'Read More →';
        linkElem.target = '_blank';
        
        // Append all elements to the wrapper
        wrapper.appendChild(titleElem);
        wrapper.appendChild(imgElem);
        wrapper.appendChild(descElem);
    }
}

customElements.define('project-card', ProjectCard);