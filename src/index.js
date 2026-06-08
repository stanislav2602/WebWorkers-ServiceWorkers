import './styles.css';

const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://ваш-сервер.cyclic.app/api/news'
    : 'http://localhost:3000/api/news';

const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const newsUl = document.getElementById('news');
const refreshBtn = document.getElementById('refreshBtn');

function hideAll() {
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    newsUl.style.display = 'none';
}

function showLoading() {
    hideAll();
    loadingDiv.style.display = 'block';
}

function showError() {
    hideAll();
    errorDiv.style.display = 'block';
}

function showNews(data) {
    hideAll();
    newsUl.style.display = 'block';
    
    newsUl.innerHTML = '';
    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="news__title">${item.title}</div><div class="news__date">${item.date}</div>`;
        newsUl.appendChild(li);
    });
}

async function fetchNews() {
    showLoading();
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();
        const data = await response.json();
        showNews(data);
    } catch (err) {
        showError();
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

refreshBtn.addEventListener('click', fetchNews);
fetchNews();