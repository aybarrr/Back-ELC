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
    const promptString = `You are a helpful English assistant checking the tense of the prompt. You have to define the time tenses of the sentence and return it. Your answers are concise. Your answers have to be in the following format: "Tense is:" + tense of the prompt sentence. You don't fix the grammatical or any other mistakes. If you don't understand the prompt or if it contains grammatical errors don't fix it, return "error". Do not return anything other than just "Tense is:" + tense of the prompt sentence. Return nothing but "Tense is:" + tense of the prompt sentence. Do not return confirmation phrases. Return the answer only in the given format.  Make sure the tense of the sentence is correct. If you are not sure for 90% then return "error".
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

    if (Array.isArray(result) && result[0] && result[0].candidates && result[0].candidates[0]) {
        const generatedOutput = result[0].candidates[0].output.trim();
        console.log(generatedOutput);
        return generatedOutput;
      } else {
        console.log("Unable to extract generated output");
      }
   
  }
}
