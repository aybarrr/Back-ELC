import { Injectable, Inject, } from '@nestjs/common';

@Injectable()
export class AiLessonsService {
    constructor(){}
    
    createFunction(id: number, input: string): string {  
    
     
        const lessonFunctionName = `lesson${id}`;
        const lessonFunction = this[lessonFunctionName];
    
        if (typeof lessonFunction === 'function') {
          
          return lessonFunction(input);
        } else {
          console.error(`Function '${lessonFunctionName}' not found`);
          return 'Function not found';  
        }
      }
    


private lesson54(input: string) : string{
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
  

    return prompt54;
  }

  private lesson68(input: string) : string{
    const prompt68 = `Identify the correct grammatical structure of the following sentence:
  
    How many [nouns] do [subject] [verb]?'
    [subject] [verb] [nouns]'
    
    Yes if it is correct.
    No if it is not.
    Examples:
    
    Wh-question:
    
    How many people are there?
    
    Declarative sentence:
    
    People are there.
    
    Incorrect:
    
    How many people ther are?
    
    Incorrect:
    
    There are people.
    
    Answer:
    
    YES
    
    The first sentence structure, 'How many [nouns] do [subject] [verb]?', is a wh-question. Wh-questions are used to ask about specific information, such as the quantity, identity, or location of something. They begin with a wh-word, such as "how many," "who," "what," "where," or "when."
    
    The second sentence structure, '[subject] [verb] [nouns]', is a declarative sentence. Declarative sentences are used to make statements about something.
    
    To check that the input is in the correct format, follow these steps:
    
    Split the input string into words.
    Check if the input string is a wh-question.
    If the first word of the input string is a wh-word, such as "how many," "who," "what," "where," or "when," and the second word is "many"  and the third word is "do" and the fourth word is a verb, then the input string is in the correct format for a wh-question.
    Check if the input string is a declarative sentence.
    If the first word of the input string is a subject, and the second word is a verb, and the third word is a noun, then the input string is in the correct format for a declarative sentence.
    If the input string is not in the correct format for a wh-question or a declarative sentence, then return "NO."
    input: They need two chairs
    output: YES
    input: My friends want ice cream
    output: YES
    input: ${input}
    output:`
    return prompt68;
  
  }

  private lesson75(input: string) : string{
    const prompt75 = `Define if the input is in first condition or not. If the input is in the first conditional form, then return "Yes". If the input is not in the first conditional form, then return "No".  
    error:
    If the input does not match any of the above rules, return "error input".
    
    input: If it rains, I won't go to the park.
    output: Yes
    input: If I study hard, I will pass the exam.
    output: Yes
    input: If I have enough money, I will buy some new shoes.
    output: Yes
    input: She will be late if the train is delayed.
    output: Yes
    input: She will miss the bus if she doesn't leave soon.
    output: Yes
    input: If I see her, I will tell her.
    output: Yes
    input: The sun rises in the east.
    output: No
    input: I would go to the party if I had an invitation.
    output: No
    input: We would have won the game if we had played better.
    output: No
    input: I would have finished the project on time if I hadn't lost my files.
    output: No
    input: She is a student.
    output: No
    input: ${input}
    output:`
    return prompt75;
  }

  private lesson78(input: string) : string{
    const prompt78 = `Define if the input is related to the structure "Do you mind if" or "Would you mind if " or if the input related with answers to these structured questions. Answer "Yes" if the input is related. Answer "No" if the input is not related. 
    input: ${input}
    output:`
    return prompt78;
  }

  private lesson80(input: string) : string{
    const prompt80 = `Define if the input is related with the words "too" or "enough". Answer "Yes" if it does. Answer "No" if it doesnt related. 
    input: ${input}
    output:`
    return prompt80;
  }

  private lesson89(input: string) : string{
    const prompt89 = `Define if the input is related with the words "used to " or "would + (do something)".  The would is meant to describe something in the past. Answer "Yes" if it does. Answer "No" if it doesnt related. 
    input: ${input}
    output:`
    return prompt89;
  }

}