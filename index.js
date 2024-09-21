const API_KEY = "0328332b09a7447ebcf8d861ae84ed0f";
const url = "https://newsapi.org/v2/everything?";

// Fetching all data from News API
async function fetchData(query) {
    const timestamp = new Date().getTime();
    const res = await fetch(`${url}q=${query}&apiKey=${API_KEY}&_=${timestamp}`);
    const data = await res.json();
    console.log(data);
    return data; // Ensure the function returns the data
}

// Maping fetched data to card
function renderMain(arr) {
    let mainHTML = ''; 
    for (let i in arr) {
        if (arr[i].urlToImage) {
            mainHTML += `
                <div class="cards">
                    <div class="card cards">
                        <a href="${arr[i].url}">
                            <img class="image" src="${arr[i].urlToImage}" />
                            <h3>${arr[i].title}</h3>
                            <div>${arr[i].source.name}</div>
                            <div>${new Date(arr[i].publishedAt).toLocaleString()}</div>
                            <p>${arr[i].description}</p>
                        </a>
                    </div>
                </div>
            `;
        }
    }
    document.querySelector("main").innerHTML = mainHTML;
}

// Fecthing Nav bar 

let buttons = Array.from(document.getElementsByClassName('btn'));
buttons.map((btn) => {
    btn.addEventListener('click', async (e) => {
        let navbtn = e.target.innerText;
        const data = await fetchData(navbtn);
        renderMain(data.articles);
    });
});


fetchData("all").then(data => renderMain(data.articles));



// Search buttonn Fuctionality

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const query = searchInput.value.trim(); // Trim whitespace from the input value
    if (query) {
        const data = await fetchData(query);
        renderMain(data.articles);
    }
});

async function Search(query) {
    const data = await fetchData(query);
    renderMain(data.articles);
}

// News App click return to home or refresh
const homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', () => {
    window.location.reload();
});
