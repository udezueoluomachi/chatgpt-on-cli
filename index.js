import { config } from "dotenv";
import { createInterface } from "readline";
import { Configuration, OpenAIApi } from "openai"

config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.MODEL;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);


const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const queryUser = () => {
  rl.question("You : \n\n", async userInput => {
    try {
      const aiCompRes = await openai.createCompletion({
        model: MODEL,
        prompt: userInput,
        temperature: 0.2,
      });
      console.log("\n\nGideon : \n" + aiCompRes.data.choices[0].text + "\n\n");
      queryUser();
    } catch (error) {
      console.log("\nAn error occurred\n" + error)
    }
  })
}

console.log("Hello, I am Gideon.\nHow can I help you ?\nTry saying 'What can you do ?'\n\n")

queryUser();