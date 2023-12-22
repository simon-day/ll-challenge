const findTermInstances = require('./findTermInstances');

describe("findTermInstances", () => {
    test('finds multiple pronouns in the text', () => {
      expect(
        findTermInstances("We will handle your concerns", "we, you")
      ).toEqual(["We", "your"]);
    });
  
    test("does not find absent term", () => {
      expect(
        findTermInstances("This is a test sentence", "nonexistent")
      ).toEqual([]);
    });
  
    test("finds terms with mixed case sensitivity", () => {
      expect(findTermInstances("He said, 'I am busy'", "he, I")).toEqual([
        "He",
        "I",
      ]);
    });
  
    test("finds no pronoun variants when none are present", () => {
      expect(findTermInstances("This is a test sentence", "we, you")).toEqual([]);
    });
  
    test("returns each term only once despite multiple occurrences", () => {
        expect(findTermInstances("our team our goals", "our")).toEqual([
          "our",
        ]);
      });
    
    test("distinguishes between different cases of the same term", () => {
        expect(findTermInstances("Our team our goals", "our")).toEqual([
          "Our",
          "our",
        ]);
    });

    test("returns an empty array for empty text", () => {
      expect(findTermInstances("", "you")).toEqual([]);
    });
  
    test("returns an empty array for empty terms", () => {
      expect(findTermInstances("Some text", "")).toEqual([]);
    });
  });