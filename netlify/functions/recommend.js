const { Anthropic } = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // This pulls from your Netlify settings
  });

  try {
    const { messages } = JSON.parse(event.body);
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: messages,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
