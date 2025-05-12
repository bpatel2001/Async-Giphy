//const API_KEY = process.env.API_KEY; - Cant use for a live server yet - outside of the scope of the project

const API_KEY = ""; // Place your Giphy API key here

async function getImage(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const response = await fetch(endpoint);
    const data = await response.json();

    const gifURL = data.data[0].images.original.url;

    console.log(gifURL);

    return(gifURL);
}

async function getRandomImage(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const response = await fetch(endpoint);
    const data = await response.json();
    
    const randomIndex = Math.floor(Math.random() * data.data.length);

    const gifURL = data.data[randomIndex].images.original.url;

    console.log(gifURL);

    return(gifURL);
}

async function getAllImages(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const response = await fetch(endpoint);
    const data = await response.json();
    
    const allImages = data.data.map(gif => gif.images.original.url);

    console.log(allImages);

    return allImages;
}

async function helperGetImage(query) {
    return await getImage(query);
}

async function helperGetRandomImage(query) {
    return await getRandomImage(query);
}

async function helperGetAllImages(query) {
    return await getAllImages(query);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#random-gif-button").addEventListener("click", async () => {
        const smilingFriendsGif = await helperGetRandomImage("smiling-friends"); 
        document.querySelector("#gif-container").innerHTML = `<img src="${smilingFriendsGif}" alt="Random GIF" />`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#search-button").addEventListener("click", async () => {
        const userInput = document.querySelector("#search-input").value;
        const allImages = await helperGetAllImages(userInput);
        
        document.querySelector(".usergifs").innerHTML = allImages.map(gif => `<img src="${gif}" alt="GIF" />`).join("");
        
    });
});