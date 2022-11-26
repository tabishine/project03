const myArticles = [
    { id: 1, title: "7 Practical CSS Tips" },
    { id: 2, title: "7 Practical Javascript Tips" },
    { id: 3, title: "7 Practical React Tips" },
  ];
  
  const article = `<div class="row gy-5">
  <div class="col-12">
    <div class="row">
      <div class="col-8">
        <div class="h-25 row">
          <div class="col-1">
            <img src="./assets/avatar_default.png" alt="..." />
          </div>
          <div class="col">
            <p>
              <b>Author name</b> <small class="text-muted">in</small>
              <b>Topics name</b> <small class="text-muted">7th July</small>
            </p>
          </div>
        </div>
        <div class="h-40 row"><p class="h3 title" id="title"></p></div>
        <div class="h-15 row">
          <p id="description"></p>
        </div>
  
        <div class="h-20 row">
          <div class="col-2">
            <span>JavaScript</span>
          </div>
          <div class="col-8">
            <p>
              <small class="text-muted">12 min read</small>
              <small class="text-muted">Selected for you</small>
            </p>
          </div>
          <div class="col-2">
            <img src="./assets/skeleton-rect.png" alt="..." />
            <img src="./assets/skeleton-rect.png" alt="..." />
            <img src="./assets/skeleton-rect.png" alt="..." />
          </div>
        </div>
      </div>
  
      <div class="col">
        <img className="news-image" class="img-fluid" alt="..." />
      </div>
    </div>
    <hr />
  </div>
  </div>`;
  
  function loadArticles() {
    const container = document.getElementById("container");
    const container2 = document.getElementById("container-2");
  
    let fetchedArticles = "";
  
    async function getNews() {
      // FETCH GET
      const result = await fetch(
        "https://api.nytimes.com/svc/topstories/v2/us.json?api-key=OyXe5VZMweUqav7eqSXpiXj5UADadedr"
      );
  
      const result2 = await result.json();
  
      if (!results2.data || results2.data.length === 0) {
        return emptyData();
      }
  
      const res = result2.results;
      fetchedArticles = result2.results;
      res.forEach((element) => {
        const newTitle = article.replace(
          `id="title">`,
          `id="title">${element.title}`
        );
  
        const abstract =
          element.abstract.length > 200
            ? element.abstract.slice(0, 200) + " ..."
            : element.abstract;
  
        const newDescription = newTitle.replace(
          `id="description">`,
          `id="title">${abstract}`
        );
  
        const imageNews =
          element.multimedia && element.multimedia.length > 0
            ? element.multimedia[0].url
            : "";
  
        const newImage = newDescription.replace(
          `className="news-image"`,
          `className="news-image" src="${imageNews}"`
        );
        container.innerHTML += newImage;
  
        handleClickOnTitle();
      });
    }
  
    getNews();
  
    function handleClickOnTitle() {
      const titles = document.querySelectorAll(".title");
      const buttons = document.querySelectorAll(".go-back");
  
      let dataForNewPage = "";
  
      titles.forEach((title) => {
        title.addEventListener("click", () => {
          dataForNewPage = fetchedArticles.filter(
            (article) => article.title === title.innerHTML
          )[0];
          container.className = "remove";
          container2.className = "show";
  
          const newTitle = document.querySelector(".title-2");
  
          if (newTitle.innerHTML) {
            newTitle.innerHTML = "";
          }
          newTitle.append(dataForNewPage.title);
        });
      });
  
      buttons.forEach((el) => {
        el.addEventListener("click", () => {
          container.className = "show";
          container2.style.display = "none";
        });
      });
    }
  }