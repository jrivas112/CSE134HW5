class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'card');

        const title = document.createElement('h4');
        title.textContent = this.getAttribute('title');

        const img = document.createElement('img');
        img.src = this.getAttribute('img');
        img.alt = this.getAttribute('alt');

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description');

        const link = document.createElement('a');
        link.href = this.getAttribute('link');
        link.textContent = 'Read More →';
        link.target = '_blank';

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

        wrapper.appendChild(title);
        wrapper.appendChild(img);
        wrapper.appendChild(description);
        wrapper.appendChild(link);

        shadow.append(style, wrapper);
    }

    connectedCallback() {
        const imgSrc = this.getAttribute('img');
        const altText = this.getAttribute('alt');

        const img = document.createElement('img');
        img.src = img.src = img.src = this.getAttribute('img') || '';
        img.alt = altText || 'Project image';

        const wrapper = this.shadowRoot.querySelector('.card');
        wrapper.insertBefore(img, wrapper.querySelector('a'));
    }
}

customElements.define('project-card', ProjectCard);
