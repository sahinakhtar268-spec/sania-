const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

// Personalized compliments for Sania - art & drawing theme
const compliments = [
  "Sania, your art is absolutely breathtaking! 🎨✨",
  "Every drawing you create is a masterpiece! Keep shining! 🌟",
  "Your creativity in art makes the world more beautiful, Sania! 💖",
  "Sania, you're not just drawing lines, you're creating magic! 🪄",
  "Your passion for art inspires everyone around you! 🎭",
  "Sania, your drawings tell stories that touch the heart! ❤️",
  "You're a true artist, Sania – talented and unique! 🌈"
];

app.get('/api/compliments', (req, res) => {
  const randomCompliments = compliments.sort(() => 0.5 - Math.random()).slice(0, 5);
  res.json({ compliments: randomCompliments, message: `Making you happy, Sania! 💕` });
});

app.get('/api/random-compliment', (req, res) => {
  const random = compliments[Math.floor(Math.random() * compliments.length)];
  res.json({ compliment: random });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Visit http://localhost:3000 to see the happy site for Sania!');
});
