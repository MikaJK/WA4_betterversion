import "./styles.css";

if (document.readyState !== "loading") {
  console.log("Document is ready!");
  startFunction();
} else {
  document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();
    console.log("Document is ready after waiting!");
    startFunction();
  });
}

function $(x) {
  return document.getElementById(x);
}

async function fetchData(url) {
  let data;
  console.log("fethcing");
  data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return data;
}

async function getImage(showImageURL, container) {
  const img1 = document.createElement("img");
  console.log(typeof showImageURL);
  if (showImageURL == null) {
    return img1;
  }
  img1.src = showImageURL;
  /*fetch(showImageURL)
    .then((response) => response.blob())
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob);
      img1.src = objectURL;
    })
    .catch((error) => {
      return Promise.reject();
    });*/
  return img1;
}

async function addToDocument(container, showName, showSUmmary, showImageURL) {
  const infoDiv = document.createElement("div");
  const showTitle = document.createElement("h1");
  infoDiv.className = "show-info";
  showTitle.innerHTML = showName;

  infoDiv.appendChild(showTitle);

  infoDiv.innerHTML = infoDiv.innerHTML + showSUmmary;

  const img1 = await getImage(showImageURL);
  container.appendChild(img1);

  container.appendChild(infoDiv);
}

function clearNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function startFunction() {
  let search = $("s-form");
  //let dataContainer = $("dataS");
  let theContainer = document.createElement("div");
  document.body.appendChild(theContainer);
  search.addEventListener("submit", function handleSubmit(event) {
    event.preventDefault();
    clearNode(theContainer);

    let show = $("input-show").value;
    let url = "https://api.tvmaze.com/search/shows?q=" + show;
    fetchData(url)
      .then((res) => {
        if (res.length === 0) {
          return;
        } else {
          res.forEach((element) => {
            let dataContainer = document.createElement("div");
            dataContainer.className = "show-data";
            theContainer.appendChild(dataContainer);
            //console.log(i + " " + JSON.stringify(element));
            var imageName = element.show.image;
            if (imageName == null) {
              imageName = null;
            } else {
              imageName = imageName["medium"];
            }
            addToDocument(
              dataContainer,
              element.show.name,
              element.show.summary,
              imageName
            );
          });
        }
      })
      .then(console.log("done"))
      .catch((error) => {
        return Promise.reject();
      });
  });
}
