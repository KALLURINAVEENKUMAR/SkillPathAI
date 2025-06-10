import OpenAI from 'openai';

// Initialize OpenAI with proper error handling
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || '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',
    dangerouslyAllowBrowser: true
  });
  console.log('✅ OpenAI initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize OpenAI:', error);
}

// Enhanced AI service with specific handling for popular job titles
export const generatePersonalizedLearningPath = async (jobTitle) => {
  console.log('🤖 AI Service called for:', jobTitle);
  
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const cleanTitle = jobTitle.trim().toLowerCase();
  
  // Specific handling for Full Stack Developer
  if (cleanTitle.includes('full stack') || cleanTitle.includes('fullstack')) {
    return [
      {
        skill: 'Frontend Development',
        level: 'Beginner',
        importance: 'Master the client-side of web development including HTML, CSS, JavaScript, and modern frameworks like React or Vue.js. This forms the visual and interactive part of applications.',
        resources: ['MDN Web Docs', 'freeCodeCamp', 'React Documentation', 'CSS-Tricks'],
        course: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
        timeToComplete: '8-12 weeks',
        projects: ['Personal Portfolio Website', 'Todo App with React', 'E-commerce Frontend'],
        order: 1
      },
      {
        skill: 'Backend Development',
        level: 'Intermediate',
        importance: 'Learn server-side programming, databases, APIs, and server management. Master Node.js, Express, Python Django, or similar backend technologies.',
        resources: ['Node.js Documentation', 'Express.js Guide', 'MongoDB University', 'REST API Design'],
        course: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side',
        timeToComplete: '10-14 weeks',
        projects: ['REST API with Authentication', 'Blog Backend System', 'E-commerce API'],
        order: 2
      },
      {
        skill: 'Database Management',
        level: 'Intermediate',
        importance: 'Understand both SQL and NoSQL databases. Learn to design efficient database schemas, write optimized queries, and manage data relationships.',
        resources: ['PostgreSQL Tutorial', 'MongoDB Docs', 'SQL Bolt', 'Database Design Course'],
        course: 'https://www.coursera.org/specializations/data-management',
        timeToComplete: '6-8 weeks',
        projects: ['Database Design for E-commerce', 'Data Migration Scripts', 'Performance Optimization'],
        order: 3
      },
      {
        skill: 'DevOps & Deployment',
        level: 'Advanced',
        importance: 'Learn deployment strategies, CI/CD pipelines, containerization with Docker, cloud platforms, and monitoring. Essential for production applications.',
        resources: ['Docker Documentation', 'AWS Free Tier', 'GitHub Actions', 'Kubernetes Basics'],
        course: 'https://www.coursera.org/learn/google-cloud-platform',
        timeToComplete: '8-10 weeks',
        projects: ['Dockerized Full Stack App', 'CI/CD Pipeline Setup', 'AWS Deployment'],
        order: 4
      }
    ];
  }
  
  // Specific handling for Data Scientist
  if (cleanTitle.includes('data scientist') || cleanTitle.includes('data science')) {
    return [
      {
        skill: 'Python Programming',
        level: 'Beginner',
        importance: 'Master Python fundamentals including data structures, libraries like NumPy, Pandas, and Matplotlib for data manipulation and visualization.',
        resources: ['Python.org Tutorial', 'Pandas Documentation', 'NumPy Guide', 'Matplotlib Tutorials'],
        course: 'https://www.coursera.org/learn/python-data-analysis',
        timeToComplete: '6-8 weeks',
        projects: ['Data Cleaning Project', 'Exploratory Data Analysis', 'Data Visualization Dashboard'],
        order: 1
      },
      {
        skill: 'Machine Learning',
        level: 'Intermediate',
        importance: 'Learn supervised and unsupervised learning algorithms, model evaluation, and feature engineering using scikit-learn and TensorFlow.',
        resources: ['Scikit-learn Docs', 'TensorFlow Tutorials', 'Kaggle Learn', 'Andrew Ng Course'],
        course: 'https://www.coursera.org/learn/machine-learning',
        timeToComplete: '10-12 weeks',
        projects: ['Predictive Model', 'Classification System', 'Recommendation Engine'],
        order: 2
      },
      {
        skill: 'Statistics & Mathematics',
        level: 'Intermediate',
        importance: 'Understand statistical concepts, probability, hypothesis testing, and mathematical foundations crucial for data analysis and modeling.',
        resources: ['Khan Academy Statistics', 'Think Stats', 'Statistical Learning Book', 'Mathematics for ML'],
        course: 'https://www.edx.org/course/introduction-to-statistics',
        timeToComplete: '8-10 weeks',
        projects: ['A/B Testing Analysis', 'Statistical Report', 'Hypothesis Testing Project'],
        order: 3
      },
      {
        skill: 'Big Data & Cloud',
        level: 'Advanced',
        importance: 'Learn to work with large datasets using tools like Spark, Hadoop, and cloud platforms like AWS, GCP for scalable data processing.',
        resources: ['Apache Spark Docs', 'AWS Data Analytics', 'Google Cloud ML', 'Hadoop Ecosystem'],
        course: 'https://www.coursera.org/specializations/big-data',
        timeToComplete: '8-12 weeks',
        projects: ['Big Data Pipeline', 'Cloud ML Model', 'Real-time Analytics'],
        order: 4
      }
    ];
  }
  
  // Generic fallback for any other job title
  return [
    {
      skill: `${jobTitle} Fundamentals`,
      level: 'Beginner',
      importance: `Building a strong foundation in ${jobTitle} concepts is essential for career success. You'll learn the core principles, terminology, and basic workflows that form the backbone of this field.`,
      resources: ['Official Documentation', 'Online Courses', 'Tutorial Videos', 'Community Forums'],
      course: 'https://www.freecodecamp.org/',
      timeToComplete: '4-6 weeks',
      projects: [`Build a basic ${jobTitle.toLowerCase()} project`, 'Complete hands-on exercises'],
      order: 1
    },
    {
      skill: `${jobTitle} Tools & Technologies`,
      level: 'Intermediate',
      importance: `Learning industry-standard tools and technologies is crucial for professional development. This includes popular frameworks, libraries, and development environments used in real-world projects.`,
      resources: ['Official Documentation', 'GitHub Repositories', 'Community Forums', 'Video Tutorials'],
      course: 'https://developer.mozilla.org/',
      timeToComplete: '6-8 weeks',
      projects: [`Create an intermediate ${jobTitle.toLowerCase()} application`, 'Contribute to open source projects'],
      order: 2
    },
    {
      skill: `Advanced ${jobTitle} Practices`,
      level: 'Advanced',
      importance: `Understanding best practices and advanced concepts helps write maintainable, scalable, and efficient solutions. This includes design patterns, optimization techniques, and industry standards.`,
      resources: ['Advanced Courses', 'Industry Blogs', 'Professional Communities', 'Expert Mentorship'],
      course: 'https://www.coursera.org/',
      timeToComplete: '8-10 weeks',
      projects: [`Design and implement a complex ${jobTitle.toLowerCase()} system`, 'Lead a team project'],
      order: 3
    }
  ];
};

export const getJobSuggestions = async (query) => {
  try {
    console.log('🔍 Getting job suggestions for:', query);
    
    const allSuggestions = [
      "Full Stack Developer",
      "Frontend Developer", 
      "Backend Developer",
      "Data Scientist",
      "DevOps Engineer",
      "Machine Learning Engineer",
      "AI Engineer",
      "UI/UX Designer",
      "Product Manager",
      "Cloud Solutions Architect",
      "Cybersecurity Analyst",
      "Mobile App Developer",
      "Database Administrator",
      "Software Architect",
      "QA Engineer",
      "Site Reliability Engineer",
      "Python Developer",
      "Java Developer",
      "React Developer",
      "Node.js Developer"
    ];
    
    if (!query || query.length < 2) {
      const result = allSuggestions.slice(0, 8);
      console.log('✅ Returning default suggestions:', result);
      return result;
    }
    
    const filtered = allSuggestions
      .filter(job => job.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
    
    console.log('✅ Returning filtered suggestions:', filtered);
    return filtered.length > 0 ? filtered : allSuggestions.slice(0, 6);
    
  } catch (error) {
    console.error('❌ Error in getJobSuggestions:', error);
    return [
      "Full Stack Developer",
      "Data Scientist", 
      "Frontend Developer",
      "Backend Developer",
      "DevOps Engineer",
      "UI/UX Designer"
    ];
  }
};