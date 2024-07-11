class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create elements
    const container = document.createElement('div');
    container.setAttribute('class', 'book-preview');

    const image = document.createElement('img');
    image.setAttribute('class', 'book-preview__image');
    container.appendChild(image);

    const title = document.createElement('h3');
    title.setAttribute('class', 'book-preview__title');
    container.appendChild(title);

    const author = document.createElement('p');
    author.setAttribute('class', 'book-preview__author');
    container.appendChild(author);

    // Append container to shadow DOM
    this.shadowRoot.append(container);

    // Set styles
    const style = document.createElement('style');
    style.textContent = `
      .book-preview {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
      }
      .book-preview__image {
        width: 100px;
        height: auto;
      }
      .book-preview__title {
        font-size: 1.2em;
        margin: 0.5em 0;
      }
      .book-preview__author {
        font-size: 1em;
        color: #555;
      }
    `;
    this.shadowRoot.append(style);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.book-preview__image').src = this.getAttribute('image');
    this.shadowRoot.querySelector('.book-preview__title').innerText = this.getAttribute('title');
    this.shadowRoot.querySelector('.book-preview__author').innerText = this.getAttribute('author');
  }

  static get observedAttributes() {
    return ['image', 'title', 'author'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'image') {
      this.shadowRoot.querySelector('.book-preview__image').src = newValue;
    } else if (name === 'title') {
      this.shadowRoot.querySelector('.book-preview__title').innerText = newValue;
    } else if (name === 'author') {
      this.shadowRoot.querySelector('.book-preview__author').innerText = newValue;
    }
  }
}

customElements.define('book-preview', BookPreview);
