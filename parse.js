const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");

const input = fs.readFileSync(path.join(__dirname, 'tmp/ps-eu-flashcards.html'), 'utf8');
const dom = new jsdom.JSDOM(input);
const doc = dom.window.document;
let cards = [...doc.querySelectorAll('#flashcardItems li')];

cards = cards.map(card => {
  const question = card.querySelector('.fc-question').textContent;
  let answerLine = card.querySelector('.fc-answer').innerHTML.trim();
  let [answer, source] = answerLine.split('<br><br>');
  answer = answer.trim();
  if (source) {
    source = source.replace(/(<([^>]+)>)/gi, '')
      .trim()
      .replace(/^\(([^\)]+)\)$/, '$1');
  }
  return {
    question, answer, source
  };
});

fs.writeFileSync(path.join(__dirname, 'tmp/ps-eu-flashcards.json'), JSON.stringify(cards, null, 2));
console.log(`Saved ${cards.length} cards to tmp/ps-eu-flashcards.json`);

fs.writeFileSync(path.join(__dirname, 'tmp/ps-eu-flashcards.csv'), 'Question|Answer');
cards.forEach(card => {
  fs.appendFileSync(path.join(__dirname, 'tmp/ps-eu-flashcards.csv'), `\n${card.question}|${card.answer}`);
});
console.log(`Saved ${cards.length} cards to tmp/ps-eu-flashcards.csv`);
