/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
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
  /**
   * give URL, returns HTML mixed into the output text
   * find libray in NPM that strip out HTML and use it
   * user passing multiple files and or URLs make a machine that mixes together that text
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
