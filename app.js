const form_wrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const inputSearch = document.querySelector("#inputObje");
const button_wrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const image_wrapper = document.querySelector(".imageList-wrapper");
const message = document.querySelector(".message");
const imagee = document.querySelector("#imagee");
runEventListener();

function runEventListener() {
    form.addEventListener('submit', search);
}

function search(e) {
    e.preventDefault();

    const value = inputSearch.value.trim();
    if (value === "") {
        alert("Kanka boş arama yapma 🙃");
        return;
    }

    image_wrapper.innerHTML = "";

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID wyX6vnt_UW8yb3MBR-Y8fVmf7iKa-j03QPLFZwbxd6c"
        }
    })
        .then(res => res.json())
        .then(data => {
            Array.from(data.results).forEach(image => {
                addImageToUI(image);
            });
        })
        .catch(err => console.error(err));
}


clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    inputSearch.value = "";
    message.style.display = "flex";
    message.classList.add("show");
    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);
    image_wrapper.innerHTML = "";
    //  Array.from(image_wrapper.children).forEach(data=>data.remove());
})

function addImageToUI(url) {
    const div = document.createElement("div");
    div.className = "cardd";
    const img = document.createElement("img");
    img.src = url.urls.small;
    img.alt = "Görsel";
    img.style.height = "300px";
    img.style.width = "300px";
    img.classList.add("my-image-style");
    div.appendChild(img);
    image_wrapper.appendChild(div);
}