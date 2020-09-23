

// Global variables
let LOGIN = false;
let USERNAME = "";
let PASSWORD = "";

// The function would be called once the html file loading
window.onload = function() {
    showHome();
    getNews();
    getItems();
	searchGift();
    getVersion();
}

// The function clears the navigation bar formatting effects
function showClear() {
    document.getElementById("home").style.backgroundColor="#006699";
    document.getElementById("news").style.backgroundColor="#006699";
    document.getElementById("display").style.backgroundColor="#006699";
	document.getElementById("shop").style.backgroundColor="#006699";
	document.getElementById("register").style.backgroundColor="#006699";
    document.getElementById("guestbook").style.backgroundColor="#006699";
    document.getElementById("SectionHome").style.display="none";
    document.getElementById("SectionNews").style.display="none";
    document.getElementById("SectionDisplay").style.display="none";
	document.getElementById("SectionShop").style.display="none";
    document.getElementById("SectionRegistration").style.display="none";
    document.getElementById("SectionLogin").style.display="none";
    document.getElementById("SectionGuestBook").style.display="none";
}

// The following seven functions change the main content of web page when
// users click on the navigation bar item
function showHome() {
    showClear();
    document.getElementById("home").style.backgroundColor="#0080a7";
    document.getElementById("SectionHome").style.display="inline";
}

function showNews() {
    showClear();
    document.getElementById("news").style.backgroundColor="#0080a7";
    document.getElementById("SectionNews").style.display="inline";
    getNews();
}

function showDisplay() {
    showClear();
    document.getElementById("display").style.backgroundColor="#0080a7";
    document.getElementById("SectionDisplay").style.display="inline";
    getItems();
    document.getElementById("search").value = "";
}

function showShop() {
    showClear();
    document.getElementById("shop").style.backgroundColor="#0080a7";
    document.getElementById("SectionShop").style.display="inline";
    document.getElementById("searchGift").value = "";
	searchGift();
}

function showRegister() {
    showClear();
    document.getElementById("register").style.backgroundColor="#0080a7";
    document.getElementById("SectionRegistration").style.display="inline";
    document.getElementById("registerStatus").innerHTML = "<p class='fontSize'>Please register here</p>";
}

function showLogin() {
    showClear();
    document.getElementById("SectionLogin").style.display="inline";
    document.getElementById("loginName").value = "";
    document.getElementById("loginPSW").value = "";
    document.getElementById("loginStatus").innerHTML = "<p class='fontSize'>Please login to continue</p>";
}

function showGuestBook() {
    showClear();
    document.getElementById("guestbook").style.backgroundColor="#0080a7";
    document.getElementById("SectionGuestBook").style.display="inline";
    getComments();
}

// The following two functions fetch news information from server
// and then processing them for writing into NEWS section content
function getNews() {
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
    //const uri = "http://localhost:8188/MuseumService.svc/news";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const newsJson = JSON.parse(xhr.responseText);
        convertNews(newsJson);
    }
    xhr.send(null);
}

function convertNews(newsJson){
    let newsContent = "";
    const addNews = (news) => {
        description = news.descriptionField;
        image = news.enclosureField.urlField;
        link = news.linkField;
        title = news.titleField;
        date = news.pubDateField;
        newsContent += "<p><img src=" + image + "></p>";
        newsContent += "<p><a href=" + link + " target = '_blank'>" + title + "</a><span id='date'>" + date + "</span></p>";
        newsContent += "<p class='fontSize'>" + description +"</p><hr><br>";
    }
    newsJson.forEach(addNews);
    document.getElementById("newsContent").innerHTML = newsContent;
}

// The following three functions is responsible for content of 
// DISPLAY section, where fetching and searching required data
// from corresponding servers
function getItems() {
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
    //const uri = "http://localhost:8188/MuseumService.svc/items";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const itemsJson = JSON.parse(xhr.responseText);
        convertItems(itemsJson);
    }
    xhr.send(null);
}

function searchItem() {
    let userInput = document.getElementById('search').value;
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + userInput;
    //const uri = "http://localhost:8188/MuseumService.svc/search?term=" + userInput;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const searchContent = JSON.parse(xhr.responseText);
        convertItems(searchContent);
    }
    xhr.send(null);
}

function convertItems(itemsJson) {
    let displayContent = "";
    const addItems = (item) => {
        discription = item.Description;
        id = item.ItemId;
        image = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + id;
        //image = "http://localhost:8188/MuseumService.svc/itemimg?id=" + id;
        title = item.Title;
        displayContent += "<p><img src=" + image + "></p>";
        displayContent += "<p><a href=" + image + " target = '_blank'>" + title + "</a></p>";
        displayContent += "<p class='fontSize'>" + discription + "</p><hr><br>";
    }
    itemsJson.forEach(addItems);
    document.getElementById("displayContent").innerHTML = displayContent;
}


// The following three functions are responsible for content of 
// SHOP section, where fetching and searching required products
// as well as purchase gifts functionality
function searchGift() {
    let userInput = document.getElementById('searchGift').value;
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=" + userInput;
    //const uri = "http://localhost:8188/MuseumService.svc/shop?term=" + userInput;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const searchContent = JSON.parse(xhr.responseText);
        convertGifts(searchContent);
    }
    xhr.send(null);
}

function convertGifts(giftsJson) {
    let shopContent = "";
    const addGifts = (gift) => {
        discription = gift.Description;
        id = gift.ItemId;
        image = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=" + id;
        //image = "http://localhost:8188/MuseumService.svc/shopimg?id=" + id;
        title = gift.Title;
        shopContent += "<p><img src=" + image + "></p>";
        //shopContent += "<p class='fontSize'>" + title + "<span id='buy'><button onclick='checkLogin(\""+id+"\")'>Buy now</button></span></p>";
        shopContent += "<p class='fontSize'>" + title + "<span id='buy'><button><a href='http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + id + "'>Buy now</a></button></span></p>";
        shopContent += "<p class='fontSize'>" + discription + "</p><hr><br>";
    }
    giftsJson.forEach(addGifts);
    document.getElementById("shopContent").innerHTML = shopContent;
}

function purchaseGift(id) {
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + id;
    //const uri = "http://localhost:8189/Service.svc/buy?id=" + id;
    xhr.open("GET", uri, true, USERNAME, PASSWORD);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        alert(JSON.parse(xhr.responseText));
    }
    xhr.send(null);
}

// The following function is responsible for new user registration
function registration() {
	let userName = document.getElementById("userName").value;
    let userPSW = document.getElementById("userPSW").value;
	let userAddress = document.getElementById("userAddress").value;
	let userJson = {};
	userJson.Address = userAddress;
	userJson.Name = userName;
	userJson.Password = userPSW;
	const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/register";
    //const uri = "http://localhost:8188/MuseumService.svc/register";
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
        document.getElementById("userName").value = "";
        document.getElementById("userPSW").value = "";
        document.getElementById("userAddress").value = "";
        document.getElementById("registerStatus").innerHTML = "<p class='fontSize'>" + JSON.parse(xhr.responseText) + "</p>";
    }
    xhr.send(JSON.stringify(userJson));
}

// The following three functions help to achieve login/logout
// funcionality of registered users
function checkLogin(id) {
    if (LOGIN) {
        purchaseGift(id);
    }
    else {
        showLogin();
    }
}

function login() {
    let username = document.getElementById("loginName").value;
    let password = document.getElementById("loginPSW").value;
	const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/mss/Service.svc/user";
    //const uri = "http://localhost:8189/Service.svc/user";
    xhr.open("GET", uri, true, username, password);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.withCredentials = true;
	xhr.onload = () => {
		if (xhr.status != 200) {
            document.getElementById("loginName").value = "";
            document.getElementById("loginPSW").value = "";
            document.getElementById("loginStatus").innerHTML = "<p class='fontSize'>Wrong username or password, please try again</p>";
        }
        else {
            LOGIN = true;
            USERNAME = username;
            PASSWORD = password;
            showHome();
            document.getElementById("inoff").innerHTML = "<button id='signin' onclick='logout()'>" + USERNAME + "<br>logout</button>";
        }
    }
    xhr.send(null);
}

function logout() {
    LOGIN = false;
    USERNAME = "";
    PASSWORD = "";
    showHome();
    document.getElementById("inoff").innerHTML = "<button id='signin' onclick='showLogin()'>login</button>";
}

// The function will post users comments into server and clear
// text area when posting succeeds
function postComments(){
    let userComments = document.getElementById("comments").value;
    let userName = document.getElementById("name").value;
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" + userName;
    //const uri = "http://localhost:8188/MuseumService.svc/comment?name=" + userName;
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
        document.getElementById("comments").value = "";
        document.getElementById("name").value = "";
        getComments();
    }
    xhr.send(JSON.stringify(userComments));
}

function getComments(){
	const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/htmlcomments"
    //const uri = "http://localhost:8188/MuseumService.svc/htmlcomments";
	xhr.open("GET", uri, true);
	xhr.onload = () => {
        const comments = xhr.responseText;
        document.getElementById("allcomments").innerHTML = comments;
    }
    xhr.send(null);
}

// This function would get the version information from the server
function getVersion() {
    let versionContent = "<p>&#169All rights reserved V";
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/version";
    //const uri = "http://localhost:8188/MuseumService.svc/version";
    xhr.open("GET", uri, true);
    xhr.onload = () => {
        versionContent += xhr.responseText + "</p>";
        document.getElementById("version").innerHTML = versionContent;
    }
    xhr.send(null);
}

