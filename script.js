let cardContainer = document.querySelector(".card-container");
let category = document.querySelectorAll("li");
let categoryArr = Array.from(category);

function jokecards(imgurl, para, readMore) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");

  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "imgdiv");

  let img = document.createElement("img");
  img.setAttribute("src", imgurl);
  imgDiv.appendChild(img);

  let pDiv = document.createElement("div");
  pDiv.setAttribute("class", "pdiv");

  let aTag = document.createElement("a");
  aTag.setAttribute("href", readMore);
  aTag.setAttribute("target", "_blank");
  aTag.innerText = "Read more";

  let p = document.createElement("p");
  p.innerText = para;
  if (para.length > 100) {
    p.innerText = `${para.slice(0, 110)}...`;
  } else {
    p.innerText = para;
  }
  pDiv.appendChild(p);
  p.appendChild(aTag);

  cardDiv.appendChild(imgDiv);
  cardDiv.appendChild(pDiv);
  cardContainer.appendChild(cardDiv);
}

categoryArr.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    let key = event.target.id;
    let response = fetch(`https://inshortsapi.vercel.app/news?category=${key}`);
    response
      .then((data) => {
        return data.json();
      })
      .then((data2) => {
        for (let i = 0; i < 10; i++) {
          let content = data2.data[i].content;
          let imgUrl = data2.data[i].imageUrl;
          let readMore = data2.data[i].readMoreUrl;
          jokecards(imgUrl, content, readMore);
        }
      })
      .catch(() => {
        console.log("error");
      });
  });
});

let response = fetch(`https://inshortsapi.vercel.app/news?category=national`);
response
  .then((data) => {
    return data.json();
  })
  .then((data2) => {
    for (let i = 0; i < 10; i++) {
      let content = data2.data[i].content;
      let imgUrl = data2.data[i].imageUrl;
      let readMore = data2.data[i].readMoreUrl;
      jokecards(imgUrl, content, readMore);
    }
  })
  .catch(() => {
    console.log("error");
  });
