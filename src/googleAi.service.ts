// google-ai.service.ts
import { Injectable, Scope } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import { TextServiceClient } from '@google-ai/generativelanguage';
require('dotenv').config();

@Injectable({
  scope: Scope.REQUEST,
})
export class GoogleAIService {
    
  private client: TextServiceClient;
  private  MODEL_NAME: string;

  constructor() {
    this.MODEL_NAME = "models/text-bison-001";
    const API_KEY = process.env.API_KEY_PALM;

    const authClient = new GoogleAuth().fromAPIKey(API_KEY);
    this.client = new TextServiceClient({ authClient });
  }

  async generateText(input: string): Promise<string> {
    const stopSequences: string[] = [];
    const promptString = `You are a helpful English assistant checking the tense of the prompt. You have to define the time tenses of the sentence and return it. Your answers are concise. Your answers have to be in the following format: "Tense is:" + tense of the prompt sentence. You don't fix the grammatical or any other mistakes. If you don't understand the prompt or if it contains grammatical errors don't fix it, return "error". Do not return anything other than just "Tense is:" + tense of the prompt sentence. The given sentence might be a question. Define the tense of it.  Return nothing but "Tense is:" + tense of the prompt sentence. Do not return confirmation phrases. Return the answer only in the given format.  Make sure the tense of the sentence is correct. If you are not sure for 90% then return "error". If the sentence uses a combination of tenses then return  "Tense is a combination of tenses:" + all tenses used in sentence.
    input: She has designed iconic landmarks that have become symbols of cities around the world
    output:  Tense is Present Perfect.
    input: I have mentored a generation of young entrepreneurs, helping them achieve their goals.
    output:  Tense is Present Perfect.
    input: The team has developed cutting-edge medical devices that have saved countless lives.
    output:  Tense is Present Perfect.
    input: I have built a network of schools that provide quality education to underprivileged children
    output:  Tense is Present Perfect.
    input: He has coached championship-winning teams in multiple sports.
    output:  Tense is Present Perfect.
    input: The team has created groundbreaking video games that revolutionized the industry.
    output:  Tense is Present Perfect.
    input: He has been creating educational content and resources for wildlife protection and conservation.
    output:  Tense is Present Perfect Continuous.
    input: She has been mentoring students in sustainable agriculture practices for food security and sustainability.
    output:  Tense is Present Perfect Continuous.
    input: I have been mentoring students in renewable energy engineering.
    output:  Tense is Present Perfect Continuous.
    input: She has been advocating for green urban development projects
    output:  Tense is Present Perfect Continuous.
    input: She has built a network of schools that provides quality education to underprivileged children
    output: Tense is Present Perfect.
    input: I has been  building a network of schools that provides quality education to underprivileged children.
    output: error
    input: The team has developed cutting-edge medical devices that have saved countless lives
    output: Tense is Present Perfect.
    input: She has built a network of schools that provides quality education to underprivileged children.
    output: Tense is Present Perfect.
    input: He had developed cutting-edge medical devices that had saved countless lives.
    output: Tense is Past Perfect.
    input: He has been designing iconic landmarks that have become symbols of cities around the world.
    output: Tense is Present Perfect Continuous.
    input: I built a network of schools that provide quality education to underprivileged children.
    output: Tense is Past.
    input: I was mentoring a generation of young entrepreneurs, helping them achieve their goals.
    output: Tense is Past Continuous
    input: I have been advocating for green urban development projects
    output: Tense is Present Perfect Continuous.
    input: He built a network of schools that provide quality education to underprivileged children
    output: Tense is Past.
    input: She has been advocating for green urban development projects
    output: Tense is Present Perfect Continuous.
    input: Do you work here?
    output: Tense is Present.
    input: Is it raining?
    output: Tense is Present.
    input: What are you eating?
    output: Tense is Present.
    input: The team has created groundbreaking video games that revolutionized the industry
    output: Tense is Present Perfect
    input: Did you go to the store yesterday?
    output: Tense is Past.
    input: what did you do yesterday?
    output: Tense is Past.
    input: Is he a doctor?
    output: Tense is Present.
    input: What will you do tomorrow?
    output: Tense is Future
    input: Have you done your homework?
    output: Tense is Present Perfect
    input: He designed iconic landmarks that have become symbols of cities around the world
    output: Tense is a combination of tenses Past and  Present Perfect
    input: He has been designing iconic landmarks that have become symbols of cities around the world
    output: Tense is Present Perfect Continuous
    input: He designed iconic landmarks that have become symbols of cities around the world.
    output: Tense is Past
    input: What will you do tomorrow?
    output: Tense is Future
    input: Every morning, she walks to the park and feeds the birds.
    output: Tense is Present Simple
    input: The sun rises in the east and sets in the west.
    output: Tense is Present Simple 
    input: He usually takes the bus to work.
    output: Tense is Present Simple
    input: As we speak, they are preparing for the upcoming exam.
    output: Tense is Present Continuous
    input: I am currently working on a project for my art class.
    output: Tense is Present Continuous
    input: The team is playing exceptionally well in today's match.
    output: Tense is Present Continuous
    input: Last summer, we traveled to Europe and explored many historic cities.
    output: Tense is Past Simple
    input: He completed his degree in computer science three years ago.
    output: Tense is Past Simple
    input: While I was studying, my roommate was playing music loudly in the background.
    output: Tense is Past Continuous
    
    input: The sun was setting as we walked along the beach.
    output: Tense is Past Continuous
    input: Tomorrow, we will attend a conference on environmental sustainability.
    output: Tense is Future Simple
    input: She will graduate from university next spring.
    output: Tense is Future Simple
    input: This time next week, I will be attending a workshop in the city.
    output: Tense is Future Continuous
    input: At 8 PM tomorrow, they will be watching a live performance at the theater.
    output: Tense is Future Continuous
    input: By the end of the year, I will have completed all the required courses for my certification.
    output: Tense is Future Perfect
    input: They will have been married for 25 years in June.
    output: Tense is Future Perfect
    input: The new policies are being implemented by the management team as we speak. 
    output: Tense is Present Continuous Passive
    input: The project has been being worked on by the team for several months for now 
    output: Tense is Present Perfect Continuous Passive
    input: By this time next year, she will have been studying Chinese for five years
    output: Tense is Future Perfect Continuous 
    input: The documents had been being reviewed by the committe nefore the decision was made 
    output: Tense is Past Perfect Continuous Passive 
    input: Have you been studying Russian for long ?
    output: Tense is Present Perfect Continuous Interrogative
    input: Have you been studying for your exam?
    output: Tense is Present Perfect Continuous Interrogative 
    input: Have you been working on your project for a long time?
    output: Tense is Present Perfect Continuous Interrogative 
    input: Have the students been taking their test for a while?
    output: Tense is Present Perfect Continuous Interrogative 
    input: The house had been being built for 5 years before it was finally completed.
    output: Tense is Past Perfect Continuous Passive
    input: The painting had been being restored for years when it was finally unveiled to the public.
    output: Tense is Past Perfect Continuous Passive 
    input: The book had been being written for months when the author finally finished it.
    output: Tense is Past Perfect Continuous Passive 
    input: Have you been studying for your exam all day?
    output: Tense is Present Perfect Continuous Interrogative 
    input: Have you been eating breakfast for the past hour?
    output: Tense is Present Perfect Continuous Interrogative 
    input: Haven't you been waiting for the bus for over an hour?
    output: Tense is Present Perfect Continuous Interrogative 
    input: How long have you been studying for your exam?
    output: Tense is Present Perfect Continuous Interrogative 
    input: What have you been watching on TV for the past few hours?
    output: Tense is Present Perfect Continuous Interrogative 
    input: As we were chatting, i realized i had forgotten to reply to an important email 
    output: Tense is Past Perfect Continuous 
    input: After she had been studying for hours, she finally felt ready to take the exam
    output: Tense is Past Perfect Continuous 
    input: When the police arrived, the thieves had been robbing the bank for over an hour
    output: Tense is Past Perfect Continuous 
    input: By the time the guests arrived, the host had been preparing the party for several hours.
    output: Tense is Past Perfect Continuous 
    input: As the storm approached, the sailors had been working tirelessly to secure the ship for over a day.
    output: Tense is Past Perfect Continuous 
    input: ${input}
    output:`; 

    const result = await this.client.generateText({
      model: this.MODEL_NAME,
      temperature: 0.7,
      candidateCount: 1,
      topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        stopSequences: stopSequences,
        safetySettings: [
        { category: 'HARM_CATEGORY_DEROGATORY', threshold: 1 },
        { category: 'HARM_CATEGORY_TOXICITY', threshold: 1 },
        { category: 'HARM_CATEGORY_VIOLENCE', threshold: 2 },
        { category: 'HARM_CATEGORY_SEXUAL', threshold: 2 },
        { category: 'HARM_CATEGORY_MEDICAL', threshold: 2 },
        { category: 'HARM_CATEGORY_DANGEROUS', threshold: 2 },
      ],
      prompt: {
        text: promptString,
      },
    });

    console.log(`input to service: ${input}`);

    if (Array.isArray(result) && result[0] && result[0].candidates && result[0].candidates[0]) {
        const generatedOutput = result[0].candidates[0].output.trim();
        console.log(generatedOutput);
        console.log(`Output from service: ${generatedOutput}`);

        return generatedOutput;
      } else {
        console.log("Unable to extract generated output");
      }
   
  }

  async generateTextWithCustomPrompt(input: string, prompt: string): Promise<string> {
    const stopSequences: string[] = [];
    const promptString = prompt; 

    const result = await this.client.generateText({
      model: this.MODEL_NAME,
      temperature: 0.7,
      candidateCount: 1,
      topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        stopSequences: stopSequences,
        safetySettings: [
        { category: 'HARM_CATEGORY_DEROGATORY', threshold: 1 },
        { category: 'HARM_CATEGORY_TOXICITY', threshold: 1 },
        { category: 'HARM_CATEGORY_VIOLENCE', threshold: 2 },
        { category: 'HARM_CATEGORY_SEXUAL', threshold: 2 },
        { category: 'HARM_CATEGORY_MEDICAL', threshold: 2 },
        { category: 'HARM_CATEGORY_DANGEROUS', threshold: 2 },
      ],
      prompt: {
        text: promptString,
      },
    });

  
    

    if (Array.isArray(result) && result[0] && result[0].candidates && result[0].candidates[0]) {
        const generatedOutput = result[0].candidates[0].output.trim();
        console.log(`input : ${input}` );
        console.log(`output : ${generatedOutput}` );
      


        console.log(generatedOutput);
        return generatedOutput;
      } else {
        console.log("Unable to extract generated output");
      }
   
  }
  
}
