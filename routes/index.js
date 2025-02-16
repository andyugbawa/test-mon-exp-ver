const express = require('express');
const router = express.Router();
const Counter = require('../models/counter'); // Ensure this path is correct

router.get('/count', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    res.json({ count: counter ? counter.count : 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/count', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter({ count: 1 });
    } else {
      counter.count += 1;
    }
    await counter.save();
    res.json({ count: counter.count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;