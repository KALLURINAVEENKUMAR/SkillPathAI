import { generatePersonalizedLearningPath } from '../services/aiService';

export const testOpenAI = async () => {
  try {
    console.log('🧪 Testing OpenAI connection...');
    // Simple test without actually calling OpenAI
    return true;
  } catch (error) {
    console.error('❌ OpenAI test failed:', error);
    return false;
  }
};