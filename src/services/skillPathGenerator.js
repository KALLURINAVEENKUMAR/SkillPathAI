import OpenAI from 'openai';

// Check for API key first
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log('🔍 API Key Status:', apiKey ? '✅ Found' : '❌ Missing');

// Initialize OpenAI with better error handling
let openai;
try {
  if (apiKey && apiKey.trim() !== '') {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    console.log('✅ OpenAI initialized successfully');
  } else {
    console.error('❌ OpenAI API key is missing or empty');
  }
} catch (error) {
  console.error('❌ Failed to initialize OpenAI:', error);
}

export async function generateSkillPath(jobTitle) {
  console.log('🤖 Generating AI skill path for:', jobTitle);
  
  if (!openai) {
    console.error('❌ OpenAI not initialized');
    throw new Error('OpenAI is not properly configured. Please check your API key.');
  }
  
  if (!apiKey || apiKey.trim() === '') {
    console.error('❌ API key is missing');
    throw new Error('OpenAI API key is missing. Please add REACT_APP_OPENAI_API_KEY to your .env file.');
  }

  try {
    console.log('🚀 Calling OpenAI API...');
    const aiResult = await generateAISkillPath(jobTitle);
    if (aiResult && Array.isArray(aiResult) && aiResult.length > 0) {
      console.log('✅ AI generation successful, skills:', aiResult.length);
      return aiResult;
    } else {
      throw new Error('AI returned empty or invalid response');
    }
  } catch (error) {
    console.error('❌ AI generation failed:', error);
    if (error.message.includes('API key')) {
      throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
    }
    throw new Error(`Failed to generate learning path: ${error.message}`);
  }
}

// Enhanced AI Generation Function
async function generateAISkillPath(jobTitle) {
  console.log('📝 Creating AI prompt for:', jobTitle);
  
  const prompt = `You are an expert career advisor and learning path designer. Generate a comprehensive learning path for someone who wants to become a "${jobTitle}".

Requirements:
- Provide 5-7 essential skills in logical learning order
- Include realistic timeframes and difficulty levels
- Provide actual working course URLs (prefer free resources like freeCodeCamp, Coursera, YouTube, Khan Academy, etc.)
- Include practical projects for each skill
- Make importance explanations detailed and specific to the role

Return ONLY a valid JSON array with this exact structure:

[
  {
    "skill": "Specific skill name",
    "level": "Beginner|Intermediate|Advanced",
    "importance": "Detailed explanation of why this skill is crucial for this specific role",
    "course": "https://actual-working-url.com/course",
    "timeToComplete": "X-Y weeks",
    "resources": ["Resource 1", "Resource 2", "Resource 3", "Resource 4"],
    "projects": ["Project 1", "Project 2", "Project 3"]
  }
]

Important:
- Use real, working URLs for courses
- Make each skill specific to the ${jobTitle} role
- Order skills from foundational to advanced
- Include both technical and soft skills where relevant
- Ensure timeframes are realistic (2-12 weeks per skill)
- Make project suggestions practical and buildable`;

  let response;
  try {
    console.log('🌐 Making OpenAI API call...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using 3.5-turbo as it's more reliable
      messages: [
        {
          role: "system",
          content: "You are an expert career advisor who creates detailed, actionable learning paths. Always return valid JSON without markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    console.log('✅ OpenAI API call successful');
    response = completion.choices[0]?.message?.content?.trim();
    
    if (!response) {
      throw new Error('Empty AI response');
    }

    console.log('📄 AI Response received, length:', response.length);
    
    // Clean and parse JSON more robustly
    let cleanedResponse = response
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^[^[{]*/, '') // Remove any text before JSON starts
      .replace(/[^}\]]*$/, '') // Remove any text after JSON ends
      .trim();

    console.log('🧹 Cleaned response for parsing...');
    
    const parsedData = JSON.parse(cleanedResponse);
    
    // Validate the structure
    if (!Array.isArray(parsedData)) {
      throw new Error('Response is not an array');
    }

    console.log('✅ Successfully parsed', parsedData.length, 'skills');

    const validatedSkills = parsedData.map((skill, index) => ({
      skill: skill.skill || `Skill ${index + 1}`,
      level: skill.level || 'Beginner',
      importance: skill.importance || 'Important skill for career development.',
      course: skill.course || 'https://www.freecodecamp.org/',
      timeToComplete: skill.timeToComplete || '4-6 weeks',
      resources: Array.isArray(skill.resources) ? skill.resources : ['Online Resources'],
      projects: Array.isArray(skill.projects) ? skill.projects : ['Practice Project']
    }));

    return validatedSkills;
    
  } catch (parseError) {
    console.error('❌ JSON parsing failed:', parseError);
    console.error('Response was:', response);
    throw new Error('Failed to parse AI response as JSON');
  }
}

// Job recommendations function
export async function getJobRecommendations(query) {
  console.log('🔍 Getting job recommendations for:', query);
  
  if (!query || query.length < 2) {
    return [
      'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer',
      'DevOps Engineer', 'Machine Learning Engineer', 'Full Stack Developer',
      'Frontend Developer'
    ];
  }

  // Fallback to static filtering since we're focusing on main AI generation
  const commonRoles = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer',
    'DevOps Engineer', 'Machine Learning Engineer', 'Full Stack Developer',
    'Frontend Developer', 'Backend Developer', 'Mobile Developer',
    'Cloud Architect', 'Cybersecurity Analyst', 'Data Analyst',
    'AI Engineer', 'Site Reliability Engineer', 'Technical Writer'
  ];

  const filtered = commonRoles.filter(role => 
    role.toLowerCase().includes(query.toLowerCase())
  );

  return filtered.length > 0 ? filtered.slice(0, 6) : commonRoles.slice(0, 6);
}