const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(async (ctx, next) => {
    await new Promise(r => setTimeout(r, 2000));
    await next();
});

const news = [
    { title: 'Дэдпул 3 собрал миллиард долларов за выходные', date: '2024-01-28' },
    { title: 'Новый трейлер "Дюны 2" побил рекорды просмотров', date: '2024-01-27' },
    { title: 'Оскар 2024: полный список номинантов', date: '2024-01-26' },
    { title: 'Кристофер Нолан снимет фильм про вампиров', date: '2024-01-25' }
];

router.get('/api/news', ctx => {
    ctx.body = news;
});

app.use(router.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});