const { Configuration, OpenAIApi } = require("openai")

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const symptoms = req.body.symptoms

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "for the given symptoms, give diagnosis in less than 5 words: "+symptoms,
    temperature: 0.7,
    max_tokens: 10,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  console.log(response.data.choices[0].text)

  res.status(200).json({ advice: response.data.choices[0].text })
}
