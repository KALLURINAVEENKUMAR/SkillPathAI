import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Globe, 
  CheckCircle,
  ExternalLink,
  Clock,
  Users,
  Star
} from 'lucide-react';
import './TopicDetails.css';

const TopicDetails = () => {
  const { topicName } = useParams();
  const navigate = useNavigate(); // This will now work correctly

  // FIXED: Comprehensive topic resources for ALL topics
  const topicResources = {
    'Data Structures and Algorithms (DSA)': {
      title: 'Data Structures & Algorithms',
      description: 'Master DSA fundamentals and problem-solving techniques',
      color: '#8b5cf6',
      sections: [
        {
          title: 'DSA Fundamentals',
          subtitle: 'Core Data Structures and Algorithms',
          resources: [
            {
              title: 'GeeksforGeeks DSA',
              type: 'website',
              icon: BookOpen,
              url: 'https://www.geeksforgeeks.org/data-structures/',
              difficulty: 'Beginner to Advanced'
            },
            {
              title: 'CodeWithHarry DSA Course',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/c/CodeWithHarry',
              difficulty: 'Beginner'
            },
            {
              title: 'Cracking the Coding Interview',
              type: 'book',
              icon: BookOpen,
              author: 'Gayle Laakmann McDowell',
              difficulty: 'Intermediate'
            }
          ]
        },
        {
          title: 'Problem Solving Platforms',
          subtitle: 'Practice with real coding challenges',
          resources: [
            {
              title: 'LeetCode',
              type: 'platform',
              icon: Globe,
              url: 'https://leetcode.com/',
              difficulty: 'All Levels'
            },
            {
              title: 'HackerRank',
              type: 'platform',
              icon: Globe,
              url: 'https://www.hackerrank.com/',
              difficulty: 'Beginner to Advanced'
            },
            {
              title: 'Codeforces',
              type: 'platform',
              icon: Globe,
              url: 'https://codeforces.com/',
              difficulty: 'Intermediate to Expert'
            }
          ]
        }
      ]
    },

    'Problem Solving (Coding Platforms)': {
      title: 'Problem Solving & Coding Platforms',
      description: 'Master competitive programming and problem-solving skills',
      color: '#3b82f6',
      sections: [
        {
          title: 'Coding Practice Platforms',
          subtitle: 'Build problem-solving skills',
          resources: [
            {
              title: 'LeetCode - Interview Prep',
              type: 'platform',
              icon: Globe,
              url: 'https://leetcode.com/',
              difficulty: 'All Levels'
            },
            {
              title: 'HackerRank - Skills Practice',
              type: 'platform',
              icon: Globe,
              url: 'https://www.hackerrank.com/',
              difficulty: 'Beginner to Advanced'
            },
            {
              title: 'CodeChef - Competitive Programming',
              type: 'platform',
              icon: Globe,
              url: 'https://www.codechef.com/',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    },

    'Object-Oriented Programming (OOP)': {
      title: 'Object-Oriented Programming',
      description: 'Learn OOP principles and design patterns',
      color: '#f97316',
      sections: [
        {
          title: 'OOP Fundamentals',
          subtitle: 'Core concepts and principles',
          resources: [
            {
              title: 'Java OOP Tutorial - Oracle',
              type: 'website',
              icon: BookOpen,
              url: 'https://docs.oracle.com/javase/tutorial/java/concepts/',
              difficulty: 'Beginner'
            },
            {
              title: 'OOP in Python - Real Python',
              type: 'website',
              icon: BookOpen,
              url: 'https://realpython.com/python3-object-oriented-programming/',
              difficulty: 'Intermediate'
            },
            {
              title: 'C++ OOP - Apna College',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/@ApnaCollegeOfficial',
              difficulty: 'Beginner'
            }
          ]
        }
      ]
    },

    'Java Programming': {
      title: 'Java Programming',
      description: 'Complete Java development from basics to advanced',
      color: '#ea580c',
      sections: [
        {
          title: 'Java Fundamentals',
          subtitle: 'Core Java concepts',
          resources: [
            {
              title: 'Oracle Java Tutorial',
              type: 'website',
              icon: BookOpen,
              url: 'https://docs.oracle.com/javase/tutorial/',
              difficulty: 'Beginner'
            },
            {
              title: 'Java - Apna College',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/@ApnaCollegeOfficial',
              difficulty: 'Beginner'
            },
            {
              title: 'Java Programming - CodeWithHarry',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/c/CodeWithHarry',
              difficulty: 'Beginner'
            }
          ]
        }
      ]
    },

    'Python Programming': {
      title: 'Python Programming',
      description: 'Learn Python from basics to advanced applications',
      color: '#059669',
      sections: [
        {
          title: 'Python Fundamentals',
          subtitle: 'Core Python programming',
          resources: [
            {
              title: 'Python.org Official Tutorial',
              type: 'website',
              icon: BookOpen,
              url: 'https://docs.python.org/3/tutorial/',
              difficulty: 'Beginner'
            },
            {
              title: 'Python - FreeCodeCamp',
              type: 'video',
              icon: Play,
              url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
              difficulty: 'Beginner'
            },
            {
              title: 'Automate the Boring Stuff',
              type: 'book',
              icon: BookOpen,
              url: 'https://automatetheboringstuff.com/',
              difficulty: 'Beginner'
            }
          ]
        }
      ]
    },

    'SQL (Queries, Joins, Aggregations)': {
      title: 'SQL & Database Queries',
      description: 'Master SQL queries, joins, and database operations',
      color: '#7c3aed',
      sections: [
        {
          title: 'SQL Fundamentals',
          subtitle: 'Learn SQL from scratch',
          resources: [
            {
              title: 'SQLBolt Interactive Tutorial',
              type: 'website',
              icon: Globe,
              url: 'https://sqlbolt.com/',
              difficulty: 'Beginner'
            },
            {
              title: 'W3Schools SQL Tutorial',
              type: 'website',
              icon: BookOpen,
              url: 'https://www.w3schools.com/sql/',
              difficulty: 'Beginner'
            },
            {
              title: 'SQL Practice - LeetCode',
              type: 'platform',
              icon: Globe,
              url: 'https://leetcode.com/study-plan/sql/',
              difficulty: 'All Levels'
            }
          ]
        }
      ]
    },

    'Operating Systems': {
      title: 'Operating Systems',
      description: 'Understand OS concepts, processes, and memory management',
      color: '#1e40af',
      sections: [
        {
          title: 'OS Fundamentals',
          subtitle: 'Core operating system concepts',
          resources: [
            {
              title: 'Gate Smashers OS Playlist',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/@GateSmashers',
              difficulty: 'Intermediate'
            },
            {
              title: 'OS Notes - GeeksforGeeks',
              type: 'website',
              icon: BookOpen,
              url: 'https://www.geeksforgeeks.org/operating-systems/',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    },

    'Computer Networks': {
      title: 'Computer Networks',
      description: 'TCP/IP, OSI model, and network protocols',
      color: '#059669',
      sections: [
        {
          title: 'Networking Fundamentals',
          subtitle: 'Core networking concepts',
          resources: [
            {
              title: 'Computer Networks - Gate Smashers',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/@GateSmashers',
              difficulty: 'Intermediate'
            },
            {
              title: 'Networking - GeeksforGeeks',
              type: 'website',
              icon: BookOpen,
              url: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    },

    'Web Development Basics': {
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript fundamentals',
      color: '#db2777',
      sections: [
        {
          title: 'Frontend Basics',
          subtitle: 'HTML, CSS, JavaScript',
          resources: [
            {
              title: 'FreeCodeCamp Web Development',
              type: 'video',
              icon: Play,
              url: 'https://www.freecodecamp.org/',
              difficulty: 'Beginner'
            },
            {
              title: 'MDN Web Docs',
              type: 'website',
              icon: Globe,
              url: 'https://developer.mozilla.org/',
              difficulty: 'All Levels'
            },
            {
              title: 'Web Development - CodeWithHarry',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/c/CodeWithHarry',
              difficulty: 'Beginner'
            }
          ]
        }
      ]
    },

    'Frontend Framework Basics': {
      title: 'Frontend Frameworks',
      description: 'React.js, Angular.js, and modern frontend development',
      color: '#ec4899',
      sections: [
        {
          title: 'React.js',
          subtitle: 'Learn React development',
          resources: [
            {
              title: 'React Official Documentation',
              type: 'website',
              icon: BookOpen,
              url: 'https://react.dev/learn',
              difficulty: 'Intermediate'
            },
            {
              title: 'React - FreeCodeCamp',
              type: 'video',
              icon: Play,
              url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    },

    'Backend Development': {
      title: 'Backend Development',
      description: 'Server-side programming and APIs',
      color: '#065f46',
      sections: [
        {
          title: 'Backend Technologies',
          subtitle: 'Server-side development',
          resources: [
            {
              title: 'Node.js + Express Tutorial',
              type: 'video',
              icon: Play,
              url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
              difficulty: 'Intermediate'
            },
            {
              title: 'Backend Development - FreeCodeCamp',
              type: 'video',
              icon: Play,
              url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    }

    // Add more topics as needed...
  };

  // FIXED: Better fallback handling
  const normalizeTopicName = (name) => {
    // Try exact match first
    if (topicResources[name]) {
      return name;
    }
    
    // Try to find partial matches
    const keys = Object.keys(topicResources);
    for (const key of keys) {
      if (key.toLowerCase().includes(name.toLowerCase()) || 
          name.toLowerCase().includes(key.toLowerCase())) {
        return key;
      }
    }
    
    return null;
  };

  const topicKey = normalizeTopicName(topicName);
  const currentTopic = topicKey ? topicResources[topicKey] : null;

  // FIXED: The navigate function will now work properly
  if (!currentTopic) {
    return (
      <div className="topic-details">
        <div className="topic-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
        
        <div className="topic-not-found">
          <h1>Topic Not Found</h1>
          <p>Sorry, we don't have detailed resources for "{topicName}" yet.</p>
          <p>This topic is still being developed. Please check back later!</p>
          
          <div className="suggested-topics">
            <h3>Available Topics:</h3>
            <div className="topic-links">
              {Object.keys(topicResources).slice(0, 6).map(topic => (
                <button 
                  key={topic}
                  onClick={() => navigate(`/topic/${encodeURIComponent(topic)}`)}
                  className="topic-link-btn"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return Play;
      case 'website': return Globe;
      case 'book': return BookOpen;
      case 'platform': return Globe;
      default: return BookOpen;
    }
  };

  return (
    <div className="topic-details">
      {/* Header */}
      <div className="topic-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        
        <div className="topic-hero">
          <div className="topic-hero-content">
            <h1 className="topic-title">{currentTopic.title}</h1>
            <p className="topic-description">{currentTopic.description}</p>
            
            <div className="topic-stats">
              <div className="stat-item">
                <Clock size={16} />
                <span>Self-paced</span>
              </div>
              <div className="stat-item">
                <Users size={16} />
                <span>All skill levels</span>
              </div>
              <div className="stat-item">
                <Star size={16} />
                <span>Curated resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="topic-content">
        {currentTopic.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section">
            <div className="section-header">
              <CheckCircle 
                size={24} 
                className="section-icon"
                style={{ color: currentTopic.color }}
              />
              <div className="section-info">
                <h2 className="section-title">{section.title}</h2>
                <p className="section-subtitle">{section.subtitle}</p>
              </div>
            </div>

            <div className="resources-grid">
              {section.resources.map((resource, resourceIndex) => {
                const IconComponent = getResourceIcon(resource.type);
                return (
                  <div key={resourceIndex} className="resource-card">
                    <div className="resource-header">
                      <div className="resource-icon">
                        <IconComponent size={20} />
                      </div>
                      <span className="resource-type">{resource.type}</span>
                    </div>
                    
                    <h3 className="resource-title">{resource.title}</h3>
                    {resource.author && (
                      <p className="resource-author">by {resource.author}</p>
                    )}
                    
                    <div className="resource-difficulty">
                      <span className="difficulty-badge">
                        {resource.difficulty}
                      </span>
                    </div>
                    
                    {resource.url && (
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <ExternalLink size={16} />
                        View Resource
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicDetails;