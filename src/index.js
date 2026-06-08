import './styles.css';

const MOCK_NEWS = [
    { title: 'Дэдпул 3 собрал миллиард долларов за выходные', date: '2024-01-28' },
    { title: 'Новый трейлер "Дюны 2" побил рекорды просмотров', date: '2024-01-27' },
    { title: 'Оскар 2024: полный список номинантов', date: '2024-01-26' },
    { title: 'Кристофер Нолан снимет фильм про вампиров', date: '2024-01-25' }
];

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
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        const cache = await caches.open('news-v1');
        await cache.put('/api/news', new Response(JSON.stringify(MOCK_NEWS)));
    } catch (e) {}
    
    showNews(MOCK_NEWS);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

refreshBtn.addEventListener('click', fetchNews);
fetchNews();