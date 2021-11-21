const { Router } = require('express');
const router = require('express').Router();
const {Race, Temperament } = require('../db')

router.post('/dog', async (req, res) =>{
    const { name, height, weight, image, life_span, temperament } = req.body;
console.log(req.body)
  try {
    const foundTemeprament = await Temperament.findOne({
      where: {
        name: temperament,
      },
    });

    if (!foundTemeprament) {
      const newTemperament = await Temperament.create({
        temperament,
      });

      const newRace = await Race.create({
        name,
        height,
        weight,
        image,
        life_span,
      });

      await newRace.addTemperament(newTemperament);

      return res.status(200).json({ newRace });
    }

    const newRace = await Race.create({
      name,
      height,
      weight,
      image,
      life_span,
    });

    await newRace.addTemperament(foundTemeprament);

    return res.status(200).json({ newRace });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;