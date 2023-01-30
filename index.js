import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();
const port = process.env.PORT || 5000;
env.config();

app.use(cors());
app.use(bodyParser.json());

// setup configuration
const configuration = new Configuration({
  organization: process.env.ORG_KEY,
  apiKey: process.env.API_KEY,
});
const openAi = new OpenAIApi(configuration);
// setup configuration done

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// post route

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  try {
    const response = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.send({ message: response.data.choices[0].text });
  } catch (e) {
    // console.log(e);
    res.send(e).status(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
