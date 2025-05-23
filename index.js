const accessKey = 'QIJCvX0PY7xjD4zZ1B3u96nw0Dc9Y-GvHWPDU_61tUA'

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const showResult = document.getElementById('show-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        showResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(image);

        showResult.appendChild(imageLink);

        showMoreBtn.style.display = 'block'
    })
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});


showMoreBtn.addEventListener('click', () => {
    page++
    searchImages()
})