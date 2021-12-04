const express = require('express');
const exphbs = require('express-handlebars');
// Добавляем роуты
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();
// Создаём движок
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
// Отслеживаем созданный движок
app.engine('hbs', hbs.engine);
// Запускаем движок
app.set('view engine', 'hbs');
// Отслеживаем шаблоны
app.set('views', 'views');
// Определяем папку public как статичную
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Отслеживаем роуты с префиксами
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});