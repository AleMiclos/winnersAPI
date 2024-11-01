// controllers/winnerController.js
const Winner = require('./models/Winner.js');

exports.addWinner = async (req, res) => {
  try {
    const { name, prize, date } = req.body;
    const winner = new Winner({ name, prize, date });
    await winner.save();
    res.status(201).json({ message: 'Winner added successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWinners = async (req, res) => {
  try {
    const winners = await Winner.find();
    res.json(winners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWinner = async (req, res) => {
  try {
    await Winner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Winner deleted successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
