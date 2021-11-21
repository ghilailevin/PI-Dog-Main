const { Router } = require('express');
const router = require('express').Router();

const { Temperament, Race } = require('../db');

const axios = require("axios")

require('dotenv').config();
const {
  API_KEY
} = process.env;

router.get('/temperament', async (req, res) => {
  const { filter } = req.query;
  if(!filter) {
    const filtered = await Temperament.findAll({
      include: [Race]
    })
  
   return res.status(200).json({ filtered })
  }
  try {
    const filtered = await Temperament.findAll({
      where: {
        name: filter
      },
      include: [Race]
    })
  
    res.status(200).json({ filtered })
    
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }


})

module.exports = router;
  