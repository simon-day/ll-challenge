/**
 * Finds occurrences of specified terms and their pronoun variants in a given text.
 *
 * Recognises and matches pronouns with their variants, accounting for case sensitivity where necessary.
 * The term 'I' is treated as case sensitive, while other pronouns are not.
 *
 * @param {string} text - The text in which to search for the terms.
 * @param {string} terms - Comma-separated string of terms.
 *                         Terms can be regular words or pronouns ('I', 'we', 'you').
 *                         Pronoun variants (e.g 'my', 'us', 'your') are also matched.
 *
 * @returns {string[]} An array of terms and pronoun variants found in the text.
 *                     Each term is only listed once, regardless of how many times it appears.
 *
 * @example
 * countTermInstances("The Customer is not our client", "Customer, us")
 * // Returns: ["Customer", "our"]
 */
function findTermInstances(text, terms) {
    if (!terms || !text) return [];

    const pronouns = {
      i: ["I", "me", "my", "mine", "myself"],
      we: ["we", "us", "our", "ours", "ourselves"],
      you: ["you", "your", "yourself"],
    };
  
    const foundTerms = new Set();
  
    const getVariantsToSearch = (term) => {
      const lowerCaseTerm = term.toLowerCase();
      if (pronouns[lowerCaseTerm]) {
        return pronouns[lowerCaseTerm];
      }
      for (const [key, variants] of Object.entries(pronouns)) {
        if (variants.includes(lowerCaseTerm)) {
          return pronouns[key];
        }
      }
      return null;
    };
  
    const processTerm = (term, caseSensitive = false) => {
      const flag = caseSensitive ? "g" : "gi";
      const regex = new RegExp(`\\b${term}\\b`, flag);
      const matches = text.match(regex);
      if (matches) {
        matches.forEach((match) => foundTerms.add(match));
      }
    };
  
    terms
      .split(",")
      .map((term) => term.trim())
      .forEach((term) => {
        const pronounVariants = getVariantsToSearch(term);
  
        if (pronounVariants) {
          pronounVariants.forEach((variant) => {
            processTerm(variant, variant === "I");
          });
        } else {
          processTerm(term);
        }
      });
  
    return [...foundTerms];
}
  
module.exports = findTermInstances;