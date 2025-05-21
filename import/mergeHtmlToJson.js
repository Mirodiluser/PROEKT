const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const uzbekPath = path.join(__dirname, '../data/uzbek.html');
const kazakhPath = path.join(__dirname, '../data/kazakh.html');
const turkishPath = path.join(__dirname, '../data/turkish.html');

function parseHtml(filePath, langClass) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content);
  const result = {};

  $('div[data-number]').each((_, el) => {
    const number = $(el).attr('data-number');
    const text = $(el).find(`.${langClass}`).text().trim();
    result[number] = text;
  });

  return result;
}

const uz = parseHtml(uzbekPath, 'uz');
const kz = parseHtml(kazakhPath, 'kz');
const tr = parseHtml(turkishPath, 'tr');


const fragments = Object.keys(uz).map((num) => ({
  number: Number(num),
  uzbek: uz[num] || '',
  kazakh: kz[num] || '',
  turkish: tr[num] || ''
}));

const outputPath = path.join(__dirname, '../data/fragments.json');
fs.writeFileSync(outputPath, JSON.stringify(fragments, null, 2), 'utf-8');

console.log('✅ fragments.json успешно создан!');
