/*! project-name v0.0.1 | (c) 2020 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
/*! project-name v0.0.1 | (c) 2020 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
import DATA from "./dataArticle.mjs";

class CustomArticle extends HTMLElement {
  constructor(categoryColor, imgSrc, buttonUrl, date, headerText, summary) {
    super();
    this.categoryColor = categoryColor;
    this.imgSrc = imgSrc;
    this.buttonUrl = buttonUrl;
    this.date = date;
    this.headerText = headerText;
    this.summary = summary;
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      @import url("./css/main.css");
      @import url("./css/article.css");
      </style>
      <article class="masonry-brick" style="box-shadow: 0 5px ${this.categoryColor}"> 
        <a href="${this.buttonUrl}" >
          <div class="article-img">
            <img src="${this.imgSrc}" alt="Article image" />
            <div class="onHover">
              <button onclick="location.href='${this.buttonUrl}'" type="button">
                <svg class="icon icon-button">
                  <use xlink:href="sprite.svg#ic_right-thin"></use>
                </svg>
                <span>read more</span>
              </button>
            </div>
            <div class="triangle-up"></div>
          </div>
          <div class="summary">
            <div class="info">
              <span class="date">
                <svg class="icon icon-details">
                  <use xlink:href="sprite.svg#ic_calendar"></use>
                </svg>
                <time>${this.date}</time>
              </span>
              <span class="comments">
                <svg class="icon icon-details">
                  <use xlink:href="sprite.svg#ic_comment"></use>
                </svg>
                14 Comments
              </span>
            </div>
            <h1>
              ${this.headerText}
            </h1>
            <p>
              ${this.summary}
            </p>
          </div>
        </a>
      </article>
    `;
  }
}

class CustomAd extends HTMLElement {
  constructor(imgAd, urlAd) {
    super();
    this.imgAd = imgAd;
    this.urlAd = urlAd;
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      @import url("./css/main.css");
      @import url("./css/ad.css");
      </style>
      <article class="masonry-brick">
        <div class="ad-img">
          <a href="${this.urlAd}"><img src="${this.imgAd}" alt="Advertisement image" /></a>
        </div>
      </article>
    `;
  }
}

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(DATA), 2);
  });
};


const init = async () => {
  const container = document.getElementById("article-container");
  const data = await fetchData();
  console.log("data data  ", data);

  data.forEach(({type, ...datum}) => {
    if (type === 'article') {
      const { categoryColor, imgSrc, buttonUrl, date, headerText, summary} = datum;
      container.appendChild(new CustomArticle(categoryColor, imgSrc, buttonUrl, date, headerText, summary));
    }

    if (type === 'ad') {
      const { imgAd, urlAd } = datum;
      container.appendChild(new CustomAd(imgAd, urlAd));
    } 
  })
};

  customElements.define("custom-article", CustomArticle);
customElements.define("custom-advertisement", CustomAd);

  init();
