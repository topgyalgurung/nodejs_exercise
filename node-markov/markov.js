/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    // array of words that start with capitalized
    this.startWords = this.words.filter((word) => /^[A-Z]/.test(word));
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  // build a map of chains of word -> possible next words
  makeChains() {
    // TODO
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      // if the word is already in the object, push nextword to its array
      if (this.chains[word]) {
        this.chains[word].push(nextWord);
      } else {
        // create a new array with an array containing next word
        this.chains[word] = [nextWord];
      }
    }
  }

  /** - bigrams - two words at a time */
  makeChainsBigrams() {
    // TODO
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let bigram = `${this.words[i]} ${this.words[i + 1]}`;
      //const word = this.words[i];
      let nextWord = this.words[i + 2] || null;

      // if the word is already in the object, push nextword to its array
      if (this.chains[bigram]) {
        this.chains[bigram].push(nextWord);
      } else {
        // create a new array with an array containing next word
        this.chains[bigram] = [];
      }
    }
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    // TODO
    // pick a starting word randomly
    // step1 find all words that can come after that word, pick one of those
    // if picked null, stop
    // otherwise restart at step 1
    //e.g  "the cat in the hat"

    // improvements to be made:
    /** - have machine start on a capitalized word
     * - stop at a period
     * - bigrams - two words at a time
     */

    let keys = Object.keys(this.chains); //["the", "cat", "in", "hat"]
    let startKey = keys[Math.floor(Math.random() * keys.length)]; // e.g "the"
    const result = [];
    // "the": ["cat", "hat"]
    while (result.length < numWords && startKey != null) {
      result.push(startKey); // result =["the"] /* next iter: ["the", "hat"]

      const nextWords = this.chains[startKey]; // ["cat", "hat"] // null
      startKey = nextWords[Math.floor(Math.random() * nextWords.length)]; //e.g "hat"
    }
    return result.join(" ");
  }
  // improvements to be made:
  /** - have machine start on a capitalized word
   * - stop at a period

   */
  maxWordsImprovised(numWords = 100) {
    let keys = Object.keys(this.chains);
    let startKey =
      this.startWords[Math.floor(Math.random() * this.startWords.length)]; // e.g "the"
    const result = [];
    // "the": ["cat", "hat"]
    while (result.length < numWords && startKey != null) {
      result.push(startKey); // result =["the"] /* next iter: ["the", "hat"]

      const nextWords = this.chains[startKey]; // ["cat", "hat"] // null
      startKey = nextWords[Math.floor(Math.random() * nextWords.length)]; //e.g "hat"

      if (startKey === null || /[.!?]$/.test(word)) break;
    }
    return result.join(" ");
  }
  /**
   * give URL, returns HTML mixed into the output text
   * find libray in NPM that strip out HTML and use it
   * user passing multiple filesclear and or URLs make a machine that mixes together that text
   */

  /**
   * Javascript Generator functions
   * - make a machine that generates text on demand word by word
   * - JS has generator functions which can yield output on demand
   */
}

let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText());
console.log(mm.makeText((numWords = 50)));
// example output:
/* in the hat
cat in the hat
*/

module.exports = MarkovMachine;
