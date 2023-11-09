// google-ai.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import { TextServiceClient } from '@google-ai/generativelanguage';
require('dotenv').config();

@Injectable()
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
    const promptString = `Given a sentence, identify the tense of the sentence and return the tense in the format "Tense is "+ tense of the sentence.

    Sentences with multiple verbs: If a sentence has multiple verbs, the model should identify the tense of the sentence based on the main verb.
    Sentences with modal verbs: Modal verbs (e.g., can, could, may, might, must, shall, should, will, would) can change the tense of a sentence. The model should be able to identify the tense of modal verbs and the verbs they modify, and then identify the tense of the sentence based on the main verb.
    Sentences with irregular verbs: Irregular verbs can have different forms for different tenses. The model should be able to identify the tense of irregular verbs, even if they are not in the standard form.
    Sentences with contextual clues: The tense of a sentence can sometimes be determined by contextual clues. For example, the sentence "I have been to the store" could be in the present perfect tense, the past perfect tense, or the future perfect tense, depending on the context. The model should be able to use contextual clues to determine the tense of the sentence, and then identify the tense of the sentence based on the main verb.
    
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
input: He designed iconic landmarks that have become symbols of cities around the world.
output: Tense is Past 
input: He has coached championship-winning teams in multiple sports.
output: Tense is Present Perfect.
input: He has been coaching championship-winning teams in multiple sports.
output: Tense is Present Perfect Continuous.
input: He will build a network of schools that provides quality education to underprivileged children
output: Tense is Future.
input: Do you like ice cream?
output: Tense is Present
input: Are you studying for your exams right now?
output: Tense is Present Continuous
input: He will build a network of schools that provides quality education to underprivileged children
output: Tense is Future.
input: Have you ever visited Paris?
output: Tense is Present Perfect
input: I did mentor a generation of young entrepreneurs
output: Tense is Past
input: Did you watch that movie last night?
output: Tense is Past
input: Were you sleeping when I called you?
output: Tense is Past Continuous
input: Had you ever been to Japan before that trip?
output: Tense is Past Perfect
input: Will you eat dinner later today?
output: Tense is Future
input: Will you go to the party with me tomorrow?
output: Tense is Future
input: Will you be working late tonight?
output: Tense is Future Continuous
input: Will you have completed the assignment by Friday?
output: Tense is Future Perfect
input: Did you finish your homework yet?
output: Tense is Present Perfect
input: He has been creating educational content and resources for wildlife protection and conservation
output: Tense is Present Perfect Continuous
input: How often do you exercise during the week?
output: Tense is Present Simple
input: Do you enjoy reading books in your free time?
output: Tense is Present Simple
input: Are you a vegetarian or do you eat meat?
output: Tense is Present Simple
input: What are you currently working on at your job?
output: Tense is Present Continuous
input: Who are you meeting for lunch today?
output: Tense is Present Continuous
input: Why is the dog barking so loudly right now?
output: Tense is Present Continuous
input: Have you ever traveled to a foreign country?
output: Tense is Present Perfect
input: What's the most exciting thing you've done in the past year?
output: Tense is Present Perfect
input: Have you tried that new restaurant in town?
output: Tense is Present Perfect
input: Had you ever met him before the conference?
output: Tense is Past Perfect
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
  
}
