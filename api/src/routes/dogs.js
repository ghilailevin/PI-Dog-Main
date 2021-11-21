const { Router } = require('express');
const router = require('express').Router();

const  axios  = require("axios");
const { Op } = require('sequelize');

const { Race, Temperament, Dog } = require('../db');


require('dotenv').config();
const {
  API_KEY
} = process.env;



//GET /dogs: Obtener un listado de las primeras 8 razas de perro. Debe devolver solo los datos necesarios para la ruta principal
router.get('/dogs', async function (req, res) {
  const { name } = req.query;
  
  const verify = await Race.findOne({where:{id:1}})
  if(!verify) {

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?&api_key=${API_KEY}`)
     const dogsDb = response.data.forEach(async (dog) => {
         const name = await Dog.create({name: dog.name});
         const race = await Race.create({
             name: dog.name,
             height: dog.height.metric,
             weight: dog.weight.metric,
             life_span: dog.life_span,
             image: dog.image.url
           })
           const temper = await Temperament.create({
               name: dog.temperament
              })
            });
            const dogs = await Race.findAll()
            return res.status(200).json(dogs)
  }
   try{
    if(name) {
      const dogs = await Race.findAll({where:{name:{[Op.substring]:name}}})
      return res.status(200).json(dogs)
   } else {
    const dogs = await Race.findAll()
    return res.status(200).json(dogs)
   }
  } catch (err){
    res.status(404).json('No se encontro el perro')
  }

})



// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida

router.get('/dogs/:id', async (req, res)=>{
  const { id } = req.params;

  const dog = await Race.findOne({ where: { id } })

  if(!dog){
    return  res.status(404).json({ message: "The dog was not found" })
  }
  return res.status(200).json({ dog })
})

module.exports = router;