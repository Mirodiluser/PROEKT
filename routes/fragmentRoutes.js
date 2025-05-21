import express from 'express';
import { getFragmentsByLanguage } from '../controllers/fragmentController.js';
import Fragment from '../models/Fragment.js';

const router = express.Router();

router.get('/html/:lang', getFragmentsByLanguage);

router.get('/', async (req, res) => {
  try {
    const fragments = await Fragment.find().sort({ number: 1 });
    res.json(fragments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:number', async (req, res) => {
  try {
    const fragment = await Fragment.findOne({ number: req.params.number });
    if (!fragment) return res.status(404).json({ message: 'Fragment not found' });
    res.json(fragment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
