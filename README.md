# Parser for PS.eu flashcards

This script is to parse the content of the PS.eu flashcards into a JSON doc.

## Usage

 - Download the flashcards page:
   ```
   $ curl -LO tmp/ps-eu-flashcards.html \
     https://patentstrzelecki.eu/fiszki/wszystkie
   ```
 - Run: `node parse.js`
 - Use generated csv with https://github.com/Antosser/flashcards-printer
 