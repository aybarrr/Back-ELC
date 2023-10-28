import { Injectable } from '@nestjs/common';
  
import { GoogleAuth } from 'google-auth-library';
import { TextServiceClient } from '@google-ai/generativelanguage';

@Injectable()
export class AppService {
  
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
      /^i am ([A-Za-zА-Яа-я\s'-]+)$/i,
      /^.*?you are (.+)$/i,
      /^.*?he is (.+)$/i,
      /^.*?she is (.+)$/i,
      /^.*?this is (.+)$/i,
      /^.*?what is your name\??$/i,
      /^.*?my name is (.+)$/i,
    ];
  
    // Массив исключений
    var exceptions = [
      "do not", // Исключаем "do not" из всех паттернов
      "don't",
    ];
  
  
  
    // Проверяем исключения
    for (var i = 0; i < exceptions.length; i++) {
      if (input.includes(exceptions[i])) {
        return "NO"; // Если входная строка содержит исключение, возвращаем "NO"
      }
    }
  
    // Проверяем грамматические паттерны
    for (var i = 0; i < grammarPatterns.length; i++) {
      if (grammarPatterns[i].test(input)) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson2(input: string): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    input = input.toLowerCase();
  
    // Разделяем предложение на слова
    const words = input.split(' ');
    let hasAnOrA = false;
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
  
      if (word === 'an' && i < words.length - 1) {
        // Проверяем, что следующее слово начинается с гласной буквы
        const nextWord = words[i + 1].toLowerCase();
        if (!vowels.includes(nextWord[0]) || nextWord.endsWith('s')) {
          return 'NO'; // Возвращаем "NO" сразу, если условия не выполняются
        }
        hasAnOrA = true;
      } else if (word === 'a' && i < words.length - 1) {
        // Проверяем, что следующее слово начинается с согласной буквы и не заканчивается на 's'
        const nextWord = words[i + 1].toLowerCase();
        if (vowels.includes(nextWord[0]) || nextWord.endsWith('s')) {
          return 'NO'; // Возвращаем "NO" сразу, если условия не выполняются
        }
        hasAnOrA = true;
      }
  
      // Добавляем проверку на наличие слова "the"
      if (word === 'the') {
        if (i < words.length - 1) {
          const nextWord = words[i + 1].toLowerCase();
          if (!nextWord.endsWith('s')) {
            return 'YES'; // Если слово "the" без "s" найдено, возвращаем "YES"
          } else {
            return 'YES';
          }
        }
      }
    }
  
    // Если "an" или "a" не найдены, возвращаем "NO"
    if (!hasAnOrA) {
      return 'NO';
    }
  
    // Если ничего не привело к возвращению "NO" или "YES", возвращаем "НУЫ"
    return 'YES';
  }
  
  private lesson3(input: string): string {
    input = input.toLowerCase();
  
    const patterns = [
      /^.*?i am (a|an) ([A-Za-z\s]+).*?$/,
      /^.*?you are (a|an) ([A-Za-z\s]+).*?$/,
      /^.*?he is (a|an) ([A-Za-z\s]+).*?$/,
      /^.*?she is (a|an) ([A-Za-z\s]+).*?$/,
      /^.*?it is (a|an) ([A-Za-z\s]+).*?$/,
      /^.*?(we|they) are ([A-Za-z\s]+)+s.*?$/
    ];
  
    let matchFound = false;
  
    for (const pattern of patterns) {
      const match = input.match(pattern);
  
      if (match) {
        if (pattern.toString().includes('we are') || pattern.toString().includes('they are')) {
          const subject = match[1].trim();
          const hasS = !!match[2];
  
          if (subject.endsWith("s") !== hasS) {
            return "NO";
          }
        } else {
          const article = match[1];
          const noun = match[2].toLowerCase();
  
          if ((article === 'a' && this.isVowelSound(noun)) || (article === 'an' && !this.isVowelSound(noun))) {
            return "NO";
          }
        }
  
        matchFound = true;
      }
    }
  
    return matchFound ? "YES" : "NO";
  }
  
  private isVowelSound(word: string): boolean {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(word.charAt(0));
  }
  
  private lesson4(input: string): string {
    var grammarPatterns = [
      /^.*?i am from (.+).*?$/,
      /^.*?you are from (.+).*?$/,
      /^.*?we are from (.+).*?$/,
      /^.*?they are from (.+).*?$/,
      /^.*?he is from (.+).*?$/,
      /^.*?she is from (.+).*?$/,
      /^.*?it is from(.+).*?$/,
      /^.*?where are you from\??.*?$/,
      /^.*?where are we from\??.*?$/,
      /^.*?where are they from\??.*?$/,
      /^.*?where am i from\??.*?$/,
      /^.*?where is he from\??.*?$/,
      /^.*?where is she from\??.*?$/,
      /^.*?where is it from\??.*?$/
      
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
      /^.*?are you (a|an) (.+).*?$/, 
      /^.*?i am (a|an)(.+).*?$/, 
      /^.*?i am not (a|an) (.+).*?$/
    ];
  
    input = input.toLowerCase();
  
    // Перебирайте шаблоны и проверяйте введенный текст
    for (var i = 0; i < grammarPatterns.length; i++) {
      var match = input.match(grammarPatterns[i]);
      if (match) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson6(input: string): string {
    var grammarPatterns = [
      /^.*?i am (.+).*?$/, 
      /^.*?i am not (.+).*?$/, 
      /^.*?are you (.+).*?$/
    ];
  
    input = input.toLowerCase();
  
    // Перебирайте шаблоны и проверяйте введенный текст
    for (var i = 0; i < grammarPatterns.length; i++) {
      var match = input.match(grammarPatterns[i]);
      if (match) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson7(input: string): string {
    var grammarPatterns = [
      /^(.+).*?(she|he|it) is (.+).*?$/,
      /^(.+).*?(she|he|it) is not (.+).*?$/,
      /^.*?is (he|she|it) (.+)\??.*?$/,
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
    // Convert the sentence to lowercase 
    input = input.toLowerCase(); 
    console.log(input); 
    // Define regular expressions for the two grammar structures 
    const grammarPattern1 = /^.*?my (.+) is (.+).*?$/; 
    // const grammarPattern2 = /^.*what is your .*$*?\?/; 
    const grammarPattern2 = /^.*?what is your (.+).*?$/;; 
   
   
    // Check if the sentence matches either of the patterns 
    if (grammarPattern1.test(input) || grammarPattern2.test(input)) { 
      return "YES"; 
    } else { 
      return "NO"; 
    } 
  }
  
  private lesson9(input: string): string {
    var grammarPatterns = [
      /^.*?i am \w+ years old\.?.*?$/,
      /^.*?(he|she|it) is \w+ years old\.?.*?$/,
      /^.*?i am \w+ years old\.?.*?$/,
      /^.*?(you|we|they) are \w+ years old\.?.*?$/,
      /^.*?how old are (you|we|they)\??.*?$/,
      /^.*?how old is (he|she|it)\??.*?$/,
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
      /^.*?this is (.+).*?$/,
      /^.*?this is (.+)'s (.+).*?$/,
      /^.*?this is (my|your|his|her|our|their) (.+).*?$/,
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
      /^.*?(he|she|it) has (.+).*?$/,
    ];
  
    input = input.toLowerCase();
  
    for (var i = 0; i < grammarPatterns.length; i++) {
      if (grammarPatterns[i].test(input)) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson13(input: string): string {
    input = input.toLowerCase();
    const pattern = /^.*?(he|she|it) \w+s.*?$/;
  
    if (pattern.test(input)) {
      return "YES";
    } else {
      return "NO";
    }
  }    
  
  private lesson14(input: string): string {
    var grammarPatterns = [
      /^.*?does (he|she|it|.+) (.+).*?$/,
      /^.*?(he|she|it) \w+s.*?$/,
      /^.*?(he|she|it) (does not|doesn't) (.+).*?$/
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
      /^.*?(he|she|it) \w+s.*?$/,
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
      /^.*?can (i|you|we|they|she|he|it) (.+).*?$/,
      /^.*(i|you|we|they|she|he|it) can (.+).*?$/,
      /^.*(i|you|we|they|she|he|it) (can|cannot|can't|can not) (.+).*?$/,
    ];
  
    input = input.toLowerCase();
  
    for (var i = 0; i < grammarPatterns.length; i++) {
      if (grammarPatterns[i].test(input)) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson18(input: string): string {
    var grammarPatterns = [
      /^.*?(i|you|we|they|she|he|it|me|my|your|him|his|her|us|our|them|their) .* (i|you|we|they|she|he|it|me|my|your|him|his|her|us|our|them|their) .* (i|you|we|they|she|he|it|me|my|your|him|his|her|us|our|them|their).*?$/
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
      /^.*?there is (.+) (on|in|at) (.+).*?$/,
      /^.*?there is not (.+) (on|in|at) (.+).*?$/,
      /^.*?is there (.+) (on|in|at) (.+).*?$/
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
      /^.*(i|she|he|it) was (.+).*?$/,
      /^.*(you|we|they) were (.+).*?$/
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
      /^.*(i|she|he|it) (was not|wasn't) (.+).*?$/,
      /^.*(you|we|they) (were not|weren't) (.+).*?$/
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
      /^.*i was born on the (first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth|twenty-first|twenty-second|twenty-third|twenty-fourth|twenty-fifth|twenty-sixth|twenty-seventh|twenty-eighth|twenty-ninth|thirtieth|thirty-first) of (january|february|march|april|may|june|july|aug ust|september|october|november|december).*?$/
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
      /^.*(i|she|he|it|you|we|they) would like (.+).*?$/
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
      /^.*(i|she|he|it|you|we|they) would like (.+).*?$/,
      /^.*would (i|she|he|it|you|we|they) like (.+).*?$/,
      /^.*(i|she|he|it|you|we|they) would not like (.+).*?$/
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
      /^.*i'd like (.+).*?$/,
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
      /^.*would you like (some|any) (.+).*?$/,
      /^.*i would like (some|any) (.+).*?$/,
      /^.*i would not like (some|any) (.+).*?$/
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
      /^.*?i am .+ing.*?/,
      /^.*?(you|we|they) are .+ing.*?/,
      /^.*?(she|he|it) is .+ing.*?/
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
      /^.*?i am not .+ing.*?/,
      /^.*?(you|we|they) are not .+ing.*?/,
      /^.*?(she|he|it) is not .+ing.*?/
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
      /^.*?are you .+ing.*?/,
      /^.*?i am not .+ing.*?/,
      /^.*?i am .+ing.*?/
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
      /^.*?is (she|he|it) .+ing.*?/,
      /^.*?(she|he|it) is not .+ing.*?/,
      /^.*?(she|he|it) is .+ing.*?/
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
      /^.*?what am i .+ing.*?/,
      /^.*?what are (you|we|they) .+ing.*?/,
      /^.*?what is (she|he|it) .+ing.*?/,
      /^.*?i am .+ing.*?/,
      /^.*?(you|we|they) are .+ing.*?/,
      /^.*?(she|he|it) is .+ing.*?/,
      /^.*?i am not .+ing.*?/,
      /^.*?(you|we|they) are not .+ing.*?/,
      /^.*?(she|he|it) is not .+ing.*?/
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
      /^.*?(i'm|you're|we're|they're|he's|she's|it's) going to (.+).*?/
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
      /^.*?where are you going to stay.*?/, 
      /^.*?what are you going to do.*?/,
      /^.*?i am going to (.+).*?/  
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
      /^.*?what is (her|his) (.+).*?/,
      /^.*?where is (she|he|it) from.*?/,
      /^.*?where are (you|we|they) from.*?/,
      /^.*?where am i from*.?/,
      /^.*?who is (.+).*?/
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
      /^.*?how much is(.+).*?/,
      /^.*?is is (.+).*?/
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
      /^.*?there is (a|an) (.+) (on|in|at) (.+).*?$/,
      /^.*?there is not (a|an) (.+) (on|in|at) (.+).*?$/,
      /^.*?is there (a|an) (.+) (on|in|at) (.+).*?$/
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
      /^.*?there are (any|some) (.+) (on|in|at) (.+).*?$/,
      /^.*?there are not (any|some) (.+) (on|in|at) (.+).*?$/,
      /^.*?are there (any|some) (.+) (on|in|at) (.+).*?$/
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
      /^.*?(what's|what is) your favourite (.+).*?$/,
      /^.*?my favourite (.+) is (.+).*?$/,
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
      /^.*?what is .+er than (.+).*?$/,
      /^.*?(.+) is .+er than (.+).*?$/
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
      /^.*?are you .+ing.*?/,
      /^.*?i am not .+ing.*?/,
      /^.*?i am .+ing.*?/
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
      /^.*?what am i .+ing.*?/,
      /^.*?what are (you|we|they) .+ing.*?/,
      /^.*?what is (she|he|it) .+ing.*?/,
      /^.*?i am .+ing.*?/,
      /^.*?(you|we|they) are .+ing.*?/,
      /^.*?(she|he|it) is .+ing.*?/,
      /^.*?i am not .+ing.*?/,
      /^.*?(you|we|they) are not .+ing.*?/,
      /^.*?(she|he|it) is not .+ing.*?/
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
  
  private lesson70(input: string): string {
    var grammarPatterns = [
      /^.*?i will (.+).*?/,
      /^.*?i am going to (.+).*?/,
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
      /^.*?do you think that (.+) will (.+).*?/,
      /^.*?of course (.+) wiil.*?/,
      /^.*?definitely.*?/,
      /^.*?absolutely.*?/,
      /^.*?(.+) might do.*?/,
      /^.*?i thinh so.*?/,
      /^.*?perhaps.*?/,
      /^.*?maybe.*?/,
      /^.*?i am not sure.*?/,
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
      /^.*?have you .+ed.*?/,
      /^.*?i (have|haven't|have not) .+ed.*?/
    ];
  
    input = input.toLowerCase();
  
    for (var i = 0; i < grammarPatterns.length; i++) {
      if (grammarPatterns[i].test(input)) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson73(input: string): string {
    var grammarPatterns = [
      /^.*?(i|you|we|they|he|she|it) had .+ed.*?/,
      /^.*?(i|you|we|they|he|she|it) had .+ed (.+) (i|you|we|they|he|she|it) had .+ed .*?/
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
      /^.*?how long has (he|she|it) been .+ing.*?/,
      /^.*?(i|you|we|they) have been .+ing.*?/,
      /^.*?(he|she|it) has been .+ing.*?/
    ];
  
    input = input.toLowerCase();
  
    for (var i = 0; i < grammarPatterns.length; i++) {
      if (grammarPatterns[i].test(input)) {
        return "YES";
      }
    }
  
    return "NO";
  }
  
  private lesson75(input: string): string {
    var grammarPatterns = [
      /^.*?how long have (i|you|we|they) been .+ing.*?/,
      /^.*?how long has (he|she|it) been .+ing.*?/,
      /^.*?(i|you|we|they) have been .+ing.*?/,
      /^.*?(he|she|it) has been .+ing.*?/
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
      /^.*?(i'm|i am) (.*) .+ing .*?/,
      /^.*?are you (.*) .+ing .*?/,
      /^.*?do you (.*) .+ing.*?/
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




