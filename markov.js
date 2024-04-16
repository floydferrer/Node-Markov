/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    for (let word in this.words){
      if (!this.chains[this.words[word]]){
        this.chains[this.words[word]] = [];
        if (Number(word)+1 === this.words.length){
          this.chains[this.words[word]].push(null);
        } else{
          this.chains[this.words[word]].push(this.words[Number(word)+1]);
        }
      } else {
        if (Number(word) + 1 < this.words.length){
          this.chains[this.words[word]].push(this.words[Number(word)+1]);
        }
      }
    }
  }


  /** generates a random word from markov chain */
  
  generateWord(reference){
    return reference[Math.floor(Math.random()*reference.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let firstWord = true;
    let text = '';
    let lastWord = ''
    for (let i = 0; i < numWords; i++) {
      if (firstWord) {
        text = this.generateWord(Object.keys(this.chains));
        if (this.chains[text][0] === null) return text;
        lastWord = text;
        firstWord = false;
      }
      else {
        if (this.chains[lastWord][0] === null){
          return text;
        }
        else {
          let nextWord = this.generateWord(this.chains[lastWord]);
          lastWord = nextWord;
          text = text + ' ' + nextWord;
        }
      }
    }
    return text;  
  }
}

module.exports = { MarkovMachine };
