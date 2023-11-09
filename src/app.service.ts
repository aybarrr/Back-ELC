import { Injectable } from '@nestjs/common';
import { GoogleAIService } from './googleAi.service';
@Injectable()
export class AppService {
  constructor(private readonly googleAIService: GoogleAIService) {}
  
  sendMessage(id: number, input: string): string {
    const lessonFunctionName = `lesson${id}`;
    const lessonFunction = this[lessonFunctionName];

    if (typeof lessonFunction === 'function') {
      return lessonFunction(input);
    } else {
      console.error(`Function '${lessonFunctionName}' not found`);
      return 'Function not found';
    }
  
  }


private lesson1(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) \w+$/,
    /^.*?(she|he|it|this) (is|is not|isn't) \w+$/,
    /^.*?(you|we|they) (are|are not|aren't) \w+$/,
    /^.*?(your|my|his|her|its) name (is|is not|isn't) \w+$/,
    /^.*?(your|my|his|her|its) (.+) name (is|is not|isn't) \w+$/,
    /^.*?(what is|what is not|what isn't|what's|what's not) (your|my|his|her|its|their|our)\w+$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}


private lesson2(input: string): string {
  const words = input.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (word === 'a') {
      if (i < words.length - 1) {
        const nextWord = words[i + 1].toLowerCase();
        if (/^[aeiou]/.test(nextWord) || /s$/.test(nextWord)) {
          return 'NO';
        }
      }
    } else if (word === 'an') {
      if (i < words.length - 1) {
        const nextWord = words[i + 1].toLowerCase();
        if (/^[^aeiou]/.test(nextWord) || /s$/.test(nextWord)) {
          return 'NO';
        }
      }
    } else if (word === 'the') {
      return 'YES';
    }
  }

  return 'YES';
}

private lesson3(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) (a|an) (.+).*?$/,
    /^.*?you (are|are not|aren't) (a|an) (.+).*?$/,
    /^.*?(he|she|it|.+) (is|is not|isn't) (a|an) (.+).*?$/,
    /^.*?(your|my|his|her|its) \w+ (is|is not|isn't) (a|an) (.+).*?$/,
    /^.*?(we|they) (are|are not|aren't) .+s.*?$/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson4(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) from (.+).*?$/,
    /^.*?(you|we|they) (are|are not|aren't) from (.+).*?$/,
    /^.*?(he|she|it|.+) (is|is not|isn't) from (.+).*?$/,
    /^.*?(your|my|his|her|its) (.+) (is|is not|isn't) from (.+).*?$/,
    /^.*?where (are|are not|aren't) (you|they|we) from.*?$/,
    /^.*?where (is|is not|isn't) (your|my|his|her|its) (.+) from.*?$/,
    /^.*?where (is|is not|isn't) (he|she|it|.+) from.*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson5(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) (a|an) \w+$/,
    /^.*?(she|he|it|.+) (is|is not|isn't) (a|an) \w+$/,
    /^.*?(we|they|you) (are|are not|aren't) (a|an) \w+$/,
    /^.*?(your|my|his|her|its) \w+ (is|is not|isn't) (a|an) \w+$/,
    /^.*?are (you|we|they) (a|an) \w+\??$/,
    /^.*?is (she|he|it|.+) (a|an) \w+\??$/,
    /^.*?is (your|my|his|her|its) \w+ (a|an) \w+$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson6(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) \w+$/,
    /^.*?(she|he|it|.+) (is|is not|isn't) \w+$/,
    /^.*?(we|they|you) (are|are not|aren't) \w+$/,
    /^.*?(your|my|his|her|its) (.+) (is|is not|isn't) \w+$/,
    /^.*?are (you|we|they) \w+$/,
    /^.*?is (she|he|it|.+) \w+$/,
    /^.*?is (your|my|his|her|its) \w+ \w+$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson7(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) \d+$/,
    /^.*?(she|he|it|.+) (is|is not|isn't) \d+$/,
    /^.*?(we|they|you) (are|are not|aren't) \d+$/,
    /^.*?(your|my|his|her|its) \w+ (is|is not|isn't) \d+$/,
    /^.*?are (you|we|they) \d+$/,
    /^.*?is (she|he|it|.+) \d+$/,
    /^.*?is (your|my|his|her|its) \w+ \d+$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson8(input: string): string {
  var grammarPatterns = [
    /^.*?(what is|what is not|what isn't|what's|what's not) (your|my|his|her|its) (.+).*?$/,
    /^.*?(your|my|his|her|its) (.+) (is|is not|isn't) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson9(input: string): string {
  var grammarPatterns = [
    /^.*?how old (are|are not|aren't) (you|we|they).*?$/,
    /^.*?how old (is|is not|isn't) (he|she|it|.+).*?$/,
    /^.*?how old (am|am not) i.*?$/,
    /^.*?i (am|am not) \d+ years old.*?$/,
    /^.*?(you|we|they) (are|are not|aren't) \d+ years old.*?$/,
    /^.*?(he|she|it|.+) (is|is not|isn't) \d+ years old.*?$/,
    /^.*?(your|my|his|her|its) (.+) (is|is not|isn't) \d+ years old.*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson10(input: string): string {
  var grammarPatterns = [
    /^.*?this (is|is not|isn't) (.+).*?$/,
    /^.*?this (is|is not|isn't) (.+)'s (.+).*?$/,
    /^.*?this (is|is not|isn't) (my|your|his|her|our|their) (.+).*?$/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson11(input: string): string {
  var grammarPatterns = [
    /^.*?(i|you|we|they) have (.+).*?$/,
    /^.*?(he|she|it|.+) has (.+).*?$/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson12(input: string): string {
  input = input.toLowerCase();
  const presentSimplePattern = /^(i|you|we|they|he|she|it)(\s+[\w\s']+)?\s+(\b(?:am|are|is|dod|does)\b\s+[\w\s']+)?\b(?!not\b)\s*(\b(?:\w+ed|had|has|have|will|shall|do|does|is|are|am)\b)?\s*\b(?!to\b)\s*(?:\b\w+\b)?(\s+[\w\s']+)?(\.|\?|!)?$/i;

  if (presentSimplePattern.test(input)) {
    return 'YES';
  } else {
    return 'NO';
  }
}


private lesson13(input: string): string {
  input = input.toLowerCase();
  const pattern = /^.*?(he|she|it|.+) \w+s.*?$/;

  if (pattern.test(input)) {
    return "YES";
  } else {
    return "NO";
  }
}

private lesson14(input: string): string {
  var grammarPatterns = [
    /^.*?does (he|she|it|.+) (.+).*?$/,
    /^.*?does (my|your|his|her|our|their) \w+ (.+).*?$/,
    /^.*?(he|she|it|.+) .+s.*?$/,
    /^.*?(he|she|it|.+) (does not|doesn't) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson15(input: string): string {
  var grammarPatterns = [
    /^.*?(who|what|where|when|why|how|which|whose|whom|what time) does (he|she|it|.+) (.+).*?$/,
    /^.*?(who|what|where|when|why|how|which|whose|whom|what time) does (my|your|his|her|our|their) (.+) (.+).*?$/,
    /^.*?(he|she|it|.+) \w+s.*?$/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson17(input: string): string {
  var grammarPatterns = [
    /^.*?can (.+) (.+).*?$/,
    /^.*?can (my|your|his|her|our|their) (.+) (.+).*?$/,
    /^.*?(.+) (can|cannot|can't|can not) (.+).*?$/,
    /^.*?(my|your|his|her|our|their) (.+) (can|cannot|can't|can not) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}


private lesson19(input: string): string {
  var grammarPatterns = [
    /^.*?there (is|is not|isn't) (.+) (on|in|at) (.+).*?$/,
    /^.*?(is|is not|isn't) there (.+) (on|in|at) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson20(input: string): string {
  var grammarPatterns = [
    /^.*(i|she|he|it|.+) (was|was not|wasn't) (.+).*?$/,
    /^.*(you|we|they) (were|were not|weren't) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson21(input: string): string {
  var grammarPatterns = [
    /^.*(i|she|he|it|.+) (was|was not|wasn't) (.+).*?$/,
    /^.*(you|we|they) (were|were not|weren't) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson22(input: string): string {
  var grammarPatterns = [
    /^.*(.+) (was|were) born on the (first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth|twenty first|twenty second|twenty third|twentyfourth|twenty fifth|twenty sixth|twenty seventh|twenty eighth|twenty ninth|thirtieth|thirty first) of (january|february|march|april|may|june|july|aug ust|september|october|november|december).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson26(input: string): string {
  var grammarPatterns = [
    /^.*\w+ would like (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson27(input: string): string {
  var grammarPatterns = [
    /^.*\w+ (would|would not|wouldn't) like (.+).*?$/,
    /^.*(would|would not|wouldn't) \w+ like (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson28(input: string): string {
  var grammarPatterns = [
    /^.*\w+'d like (.+).*?$/,
    /^.*we have (.+).*?$/,
    /^.*there's (.+) (in|on|at) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson29(input: string): string {
  var grammarPatterns = [
    /^.*do you have (some|any) (.+).*?$/,
    /^.*i have (some|any) (.+).*?$/,
    /^.*i (do not|don't) have (some|any) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson30(input: string): string {
  var grammarPatterns = [
    /^.*(would|would not|wouldn't) \w+ like (some|any) (.+).*?$/,
    /^.*\w+ (would|would not|wouldn't) like (some|any) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson31(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) .+ing.*?/,
    /^.*?(you|we|they) (are|are not|aren't) .+ing.*?/,
    /^.*?\w+ (is|is not|isn't) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson32(input: string): string {
  var grammarPatterns = [
    /^.*?i (am|am not) .+ing.*?/,
    /^.*?(you|we|they) (are|are not|aren't) .+ing.*?/,
    /^.*?\w+ (is|is not|isn't) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson33(input: string): string {
  var grammarPatterns = [
    /^.*?(are|are not|aren't) you .+ing.*?/,
    /^.*?i (am|am not) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson34(input: string): string {
  var grammarPatterns = [
    /^.*?is \w+ .+ing.*?/,
    /^.*?\w+ (is|is not|isn't) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson35(input: string): string {
  var grammarPatterns = [
    /^.*?what (am|am not) i .+ing.*?/,
    /^.*?what (are|are not|aren't) (you|we|they) .+ing.*?/,
    /^.*?(what is|what is not|what isn't|what's|what's not) \w+ .+ing.*?/,
    /^.*?i (am|am not) .+ing.*?/,
    /^.*?(you|we|they) (are|are not|aren't) .+ing.*?/,
    /^.*?\w+ (is|is not|isn't) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson36(input: string): string {
  var grammarPatterns = [
    /^.*?(i am|i'm) going to (.+).*?/,
    /^.*?(you|we|they)'re going to (.+).*?/,
    /^.*?(you|we|they) are going to (.+).*?/,
    /^.*?(she|he|it)'s going to (.+).*?/,
    /^.*?\w+ is going to (.+).*?/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson37(input: string): string {
  var grammarPatterns = [
    /^.*?where (are|are not|aren't) you going to stay.*?/, 
    /^.*?what (are|are not|aren't) you going to do.*?/,
    /^.*?i (am|am not) going to (.+).*?/  
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson38(input: string): string {
  var grammarPatterns = [
    /^.*?i can't stop .+ing.*?/,
    /^.*?i enjoy .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson39(input: string): string {
  var grammarPatterns = [
    /^.*?keep .+ing.*?/,
    /^.*?kept .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson40(input: string): string {
  var grammarPatterns = [
    /^.*?(what is|what is not|what isn't|what's|what's not) (her|his) (.+).*?/,
    /^.*?where (is|is not|isn't) (she|he|it) from.*?/,
    /^.*?where (are|are not|aren't) (you|we|they) from.*?/,
    /^.*?where (am|am not) i from*.?/,
    /^.*?who (is|is not|isn't) (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}
private lesson41(input: string): string {
  var grammarPatterns = [
    /^.*?how much (is|is not|isn't) (.+).*?/,
    /^.*?it (is|is not|isn't) \d+.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson42(input: string): string {
  var grammarPatterns = [
    /^.*?(i|you|we|they) (.+) every day.*?/,
    /^.*?(she|he|it) .+s every day.*?/,
    /^.*?(i|you|we|they) (don't|do not) (.+) every day.*?/,
    /^.*?(she|he|it) (does not|doesn't) (.+) every day.*?/,
    /^.*?do (i|you|we|they) (.+) every day.*?/,
    /^.*?does (she|he|it) (.+) every day.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson43(input: string): string {
  var grammarPatterns = [
    /^.*?does (she|he|it) (.+).*?/,
    /^.*?(she|he|it) (does|does not|doesn't).*?/,
    /^.*?(she|he|it) .+s  .*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson44(input: string): string {
  var grammarPatterns = [
    /^.*?excuse me\. can you tell me the time\, please\?? (.+).*?/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}
private lesson45(input: string): string {
  var grammarPatterns = [
    /^.*?there (is|is not|isn't) (a|an) (.+) (on|in|at) (.+).*?$/,
    /^.*?(is|is not|isn't) there (a|an) (.+) (on|in|at) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson46(input: string): string {
  var grammarPatterns = [
    /^.*?there (are|are not|aren't) (any|some) (.+) (on|in|at) (.+).*?$/,
    /^.*?(are|are not|aren't) there (any|some) (.+) (on|in|at) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson47(input: string): string {
  var grammarPatterns = [
    /^.*?(i|you|we|they|she|he|it) can (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson48(input: string): string {
  var grammarPatterns = [
    /^.*?(i|you|we|they|she|he|it) could (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson49(input: string): string {
  var grammarPatterns = [
    /^.*?(i|she|he|it) was (a|an) (.+).*?$/,
    /^.*?(you|we|they) were (a|an) (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson51(input: string): string {
  var grammarPatterns = [
    /^.*?when were you born.*?$/,
    /^.*?when was (she|he|it) born.*?$/,
    /^.*?(she|he|it|i) was born on the (1st|2nd|3rd|(?:[4-9]|1\d|2[0-9]|3[0-1])th) of (january|february|march|april|may|june|july|august|september|october|november|december).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private async lesson54(input: string) : Promise<string>{
  const prompt54 = `Given numbers, return the text format of the number. Return how it is written and nothing else. If the given input is not number return "error input". Do not answer to any questions. You understand only numbers and nothing else. Do not do any calculations or other operations. You do not understand any calculations or arithmetical operations like - or + or others. Return '"error input" if the input is not just numbers
  input: How to make a cake?
  
  
  output: error input 
  input: What day is it today?
  output: error input 
  input: 36
  output: thirty-six
  input: 1234567
  output: one million two hundred thirty-four thousand five hundred sixty-seven 
  input: Answer to this: Who are you?
  
  
  output: error input 
  input: 06543
  output: six thousand five hundred forty-three 
  input: 87473335021
  output: eight billion seven hundred forty-seven million three hundred thirty-three thousand five hundred twenty-one 
  input: 8 9 8 7 6 5 
  output: eight, nine, eight, seven, six, five 
  input: 788655
  output: seven hundred eighty-eight thousand six hundred fifty-five 
  input: 10+10
  output: error input 
  input: 10 - 8
  output: error input
  input: 678 + 433
  output: error input
  input: 7656 - 877
  output: error input
  input: 10-8
  output: error input
  input: 23+8
  output: error input
  input: 8766789
  output: eight hundred seventy-six thousand six hundred seventy-eight nine
  input: 67 5678 454 89
  output: sixty-seven, five thousand six hundred seventy-eight, four hundred fifty-four, eighty-nine
  input: ${input}
  output:`

  return this.googleAIService.generateTextWithCustomPrompt(JSON.stringify(input), prompt54);
}

private lesson55(input: string): string {
  var grammarPatterns = [
    /^.*?from my point of view (.+).*?$/,
    /^.*?(i think|believe that) (.+).*?$/,
    /^.*?in my opinion\, (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson56(input: string): string {
  var grammarPatterns = [
    /^.*?(what's|what (is|is not|isn't)) your favourite (.+).*?$/,
    /^.*?my favourite (.+) (is|is not|isn't) (.+).*?$/,
    /^.*?would you like some(.+).*?$/,
    /^.*?i would like some(.+).*?$/,
    /^.*?i wouldn't you like any(.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson57(input: string): string {
  var grammarPatterns = [
    /^.*?can i have (.+)\, please.*?$/,
    /^.*?yes\, sure.*?$/,
    /^.*?no\, i'm sorry.*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson58(input: string): string {
  var grammarPatterns = [
    /^.*?(what is|what is not|what isn't|what's|what's not) .+er than (.+).*?$/,
    /^.*?(.+) (is|is not|isn't) .+er than (.+).*?$/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}


private lesson59(input: string): string {
  var grammarPatterns = [
    /^.*?(are|are not|aren't) you .+ing.*?/,
    /^.*?i (am|am not) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson62(input: string): string {
  var grammarPatterns = [
    /^.*?(when|where|why|what) do you (.+).*?/,
    /^.*?i (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson64(input: string): string {
  var grammarPatterns = [
    /^.*?what (am|am not) i .+ing.*?/,
    /^.*?what (are|are not|aren't) (you|we|they) .+ing.*?/,
    /^.*?(what is|what is not|what isn't|what's|what's not) (she|he|it) .+ing.*?/,
    /^.*?i (am|am not) .+ing.*?/,
    /^.*?(you|we|they) (are|are not|aren't) .+ing.*?/,
    /^.*?(she|he|it) (is|is not|isn't) .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson65(input: string): string {
  var grammarPatterns = [
    /^.*?(i|you|we|they) (have|have not| haven't) got (.+).*?/,
    /^.*?have (i|you|we|they) got (.+).*?/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}


private lesson66(input: string): string {
  var grammarPatterns = [
    /^.*?(she|he|it) (has|has not| hasn't) got (.+).*?/,
    /^.*?has (she|he|it) got (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}


private lesson67(input: string): string {
  var grammarPatterns = [
    /^.*?i like the way you (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson68(input: string): string {
  var grammarPatterns = [
    /^.*?how many .+s (do|does) \w+ (.+).*?/,
    /^.*?\w+ \w+ \w+.*?/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson69(input: string): string {
  var grammarPatterns = [
    /^.*?how much \w+ (do|does) \w+ (.+).*?/,
    /^.*?\w+ \w+ \w+.*?/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson70(input: string): string {
  var grammarPatterns = [
    /^.*?\w+ will (.+).*?/,
    /^.*?(.+) (am|am not|are|are not|aren't|is|is not|isn't) going to (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson71(input: string): string {
  var grammarPatterns = [
    /^.*?(do|does) \w+ think that \w+ will (.+).*?/,
    /^.*?of course (.+) wiil.*?/,
    /^.*?definitely.*?/,
    /^.*?absolutely.*?/,
    /^.*?(.+) might do.*?/,
    /^.*?i thinh so.*?/,
    /^.*?perhaps.*?/,
    /^.*?maybe.*?/,
    /^.*?i (am|am not) sure.*?/,
    /^.*?i doubt it.*?/,
    /^.*?anything's possible.*?/,
    /^.*?i don't think so.*?/,
    /^.*?no chance.*?/,
    /^.*?definitely not.*?/,
    /^.*?not a chance.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson72(input: string): string {
  var grammarPatterns = [
    /^.*?(have|has|have not|haven't|has not|hasn't) \w+ .+ed.*?/,
    /^.*?\w+ (have|has|have not|haven't|has not|hasn't) .+ed.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson74(input: string): string {
  var grammarPatterns = [
    /^.*?how long have (i|you|we|they) been .+ing.*?/,
    /^.*?how long has (he|she|it|.+) been .+ing.*?/,
    /^.*?(i|you|we|they) have been .+ing.*?/,
    /^.*?(he|she|it|.+) has been .+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson76(input: string): string {
  var grammarPatterns = [
    /^.*?\w+ (should have|should not have|shouldn't have) (.+).*?/,
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson81(input: string): string {
  var grammarPatterns = [
    /^.*?will you able to (.+).*?/,
    /^.*?i will be able to (.+).*?/,
    /^.*?i will not be able to (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson83(input: string): string {
  var grammarPatterns = [
    /^.*?do you like (.+).*?/,
    /^.*?are you fond of \w+ing.*?/,
    /^.*?(i am|i'm) (fairly|pretty) keen on \w+ing.*?/,
    /^.*?(i am|i'm) really into \w+ing.*?/,
    /^.*?(i am|i'm) quite a big fan of \w+ing.*?/,
    /^.*?i simple adore \w+ing.*?/,
    /^.*?(i am|i'm) quite enthusiastica about \w+ing.*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson85(input: string): string {
  var grammarPatterns = [
    /^.*?would you like (.+).*?/,
    /^.*?well\,? quite honestly (i do not| i don't|i do) think (i've|i've not|i have|i haven't|i have not) ever thought about that\,? but i guess (.+).*?/,
    /^.*?actually\,? this (is|is not|isn't) something that (i've|i've not|i have|i haven't|i have not) ever considered\,? but in short (.+).*?/,
    /^.*?(i am|i'm|i am not|i'm not|i amn't) really sure how to put this\,? but i suppose generally speaking (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson87(input: string): string {
  var grammarPatterns = [
    /^.*?what are your views on (.+).*?/,
    /^.*?do you have any suggestions for (.+).*?/,
    /^.*?would you like to suggest a course of action for (.+).*?/,
    /^.*?how do you feel about (.+).*?/,
    /^.*?from my point of view (.+).*?/,
    /^.*?i suggest (.+).*?/,
    /^.*?i guess we should (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson88(input: string): string {
  var grammarPatterns = [
    /^.*?i prefer(.+) to (.+).*?/,
    /^.*?(i would|i'd|i would not|i wouldn't|i'd not) prefer to (.+) than (.+).*?/,
    /^.*?(i would|i'd|i would not|i wouldn't|i'd not) rather(.+) then (.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}

private lesson84(input: string): string {
  var grammarPatterns = [
    /^.*?why did (.+) (.+).*?/,
    /^.*?i guess this was probably because (.+).*?/,
    /^.*?this could be because(.+).*?/,
    /^.*?this might be because(.+).*?/
  ];

  input = input.toLowerCase();

  for (var i = 0; i < grammarPatterns.length; i++) {
    if (grammarPatterns[i].test(input)) {
      return "YES";
    }
  }

  return "NO";
}




}



