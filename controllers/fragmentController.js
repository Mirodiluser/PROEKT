import path from 'path';
import fs from 'fs';

const dataDir = path.resolve('backend/data'); 

export const getFragmentsByLanguage = (req, res) => {
  const lang = req.params.lang; 

  const allowedLangs = ['uzbek', 'kazakh', 'turkish'];
  if (!allowedLangs.includes(lang)) {
    return res.status(400).json({ error: 'Invalid language' });
  }

  const filePath = path.join(dataDir, `${lang}.html`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'File read error' });
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
};
