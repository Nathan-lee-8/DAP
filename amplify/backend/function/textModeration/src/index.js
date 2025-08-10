import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event) => {
  const text = event.arguments.text;

  if (!text) {
    throw new Error("No text provided");
  }

  try {
    const response = await openai.moderations.create({ input: text });
    return response;

  } catch (error) {
    console.error(error);
    throw new Error("Moderation API call failed");
  }
};