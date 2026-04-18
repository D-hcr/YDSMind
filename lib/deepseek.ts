import OpenAI from 'openai';

const apiKey = process.env.DEEPSEEK_API_KEY;

export const createDeepSeek = () => {
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY environment variable is required.');
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com',
  });
};
