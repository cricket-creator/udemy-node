const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// Добавляем роуты
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');

const User = require('./models/user');

const app = express();
// Создаём движок
const hbs = exphbs.create({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: 'hbs'
});
// Отслеживаем созданный движок
app.engine('hbs', hbs.engine);
// Запускаем движок
app.set('view engine', 'hbs');
// Отслеживаем шаблоны
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {

    const user = await User.findById('61b7496b28cfd279cb8e5cbf');
    req.user = user;
    next();
  } catch (err) {

    console.log(err);
  }
});

// Определяем папку public как статичную
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// Отслеживаем роуты с префиксами
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;

async function start () {

  try {

    const url = 'mongodb+srv://cricket:KQcUPjh3i7uXPNA@cluster0.ohtep.mongodb.net/shop';
    await mongoose.connect(url, { useNewUrlParser: true });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'pavel@mail.ru',
        name: 'Pavel',
        cart: { items: [] },
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {

    console.log(err);
  }
}

start();

/**
 * user: cricket
 * password: KQcUPjh3i7uXPNA
 * url: mongodb+srv://cricket:KQcUPjh3i7uXPNA@cluster0.ohtep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 */