const { Anthropic } = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // Netlify injects this from your settings
  });

  try {
    const { messages } = JSON.parse(event.body);

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1500,
      messages: messages,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Anthropic Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to AI", details: error.message }),
    };
  }
};
