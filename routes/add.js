const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  });
});

router.post('/', async (req, res) => {
  const { title, price, image } = req.body;
  const course = new Course({
    title: title,
    price: price,
    image: image,
    userId: req.user,
  });

  try {

    await course.save();
    res.redirect('/courses');
  } catch (err) {

    console.log(err);
  }
});

module.exports = router;