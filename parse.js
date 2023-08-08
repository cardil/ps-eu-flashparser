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
console.log(cards);