class ProjectCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
  
      const container = document.createElement("div");
      container.classList.add("card");
  
      const title = document.createElement("h2");
      title.textContent = this.getAttribute("title");
  
      const picture = document.createElement("picture");
      const img = document.createElement("img");
      img.src = this.getAttribute("img");
      img.alt = this.getAttribute("alt") || "Project image";
      picture.appendChild(img);
  
      const description = document.createElement("p");
      description.textContent = this.getAttribute("description");
  
      const link = document.createElement("a");
      link.href = this.getAttribute("link");
      link.textContent = "Read More →";
      link.target = "_blank";
  
      container.append(title, picture, description, link);
  
      const style = document.createElement("style");
      style.textContent = `
        :host {
          --card-bg: #fff;
          --card-radius: 10px;
          --shadow: rgba(0,0,0,0.1);
          --card-padding: 16px;
          --font-family: sans-serif;
        }
  
        .card {
          background: var(--card-bg);
          box-shadow: 0 4px 6px var(--shadow);
          border-radius: var(--card-radius);
          padding: var(--card-padding);
          font-family: var(--font-family);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
  
        img {
          max-width: 100%;
          border-radius: 8px;
        }
  
        a {
          text-decoration: none;
          color: #0066cc;
        }
  
        a:hover {
          text-decoration: underline;
        }
  
        @media (min-width: 600px) {
          .card {
            flex-direction: row;
            align-items: center;
          }
  
          picture {
            flex: 1;
          }
  
          div {
            flex: 2;
          }
        }
      `;
  
      shadow.append(style, container);
    }
  }
  
  customElements.define("project-card", ProjectCard);