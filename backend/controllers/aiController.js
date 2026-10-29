import StudySession from '../models/StudySession.js';
import Goal from '../models/Goal.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// @desc    Get AI insights
// @route   GET /api/ai/insights
// @access  Private
export const getInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await StudySession.find({ user: userId });
    const goals = await Goal.find({ user: userId });

    // Prepare data for AI
    const sessionData = sessions.map((s) => ({
      topic: s.topic,
      duration: s.duration,
      date: s.date,
    }));

    const goalData = goals.map((g) => ({
      title: g.title,
      progress: g.progress,
      target: g.target,
      completed: g.completed,
    }));

    // Try to use Gemini if API key is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `Based on the following study data, provide insights in JSON format:
        Sessions: ${JSON.stringify(sessionData)}
        Goals: ${JSON.stringify(goalData)}
        
        Return a JSON object with these exact keys:
        {
          "weeklySummary": "string",
          "strengths": ["string1", "string2"],
          "weakAreas": ["string1", "string2"],
          "productivityPattern": "string",
          "recommendations": ["string1", "string2", "string3"]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const insights = JSON.parse(jsonMatch[0]);
          return res.json(insights);
        }
      } catch (aiError) {
        console.error('AI Error:', aiError);
        // Fall back to mock data if AI fails
      }
    }

    // Mock data fallback
    const mockInsights = {
      weeklySummary:
        'You maintained consistent study habits this week with focused sessions.',
      strengths: [
        'You maintained consistent practice',
        'Study sessions are well-distributed',
        'Goal completion rate is excellent',
      ],
      weakAreas: [
        'Consider adding more variety to topics',
        'Backend study time could be improved',
      ],
      productivityPattern:
        'You are most productive in the morning hours between 9 AM - 12 PM.',
      recommendations: [
        'Add focused sessions for weak areas',
        'Set specific daily targets',
        'Take short breaks between sessions',
      ],
    };

    res.json(mockInsights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate study plan
// @route   POST /api/ai/study-plan
// @access  Private
export const generateStudyPlan = async (req, res) => {
  try {
    const { goal } = req.body;

    // Try to use Gemini if API key is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `Create a 4-week study plan for: "${goal}". 
        Return a JSON object with this structure:
        {
          "goal": "string",
          "weeks": [
            {
              "week": 1,
              "topic": "string",
              "days": [
                {
                  "day": 1,
                  "topic": "string",
                  "subtopic": "string",
                  "time": 60,
                  "task": "string"
                }
              ]
            }
          ]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const plan = JSON.parse(jsonMatch[0]);
          return res.json(plan);
        }
      } catch (aiError) {
        console.error('AI Error:', aiError);
      }
    }

    // Mock data fallback
    const mockPlan = {
      goal: goal || 'Learn MERN in 30 days',
      weeks: [
        {
          week: 1,
          topic: 'JavaScript',
          days: [
            { day: 1, topic: 'JavaScript', subtopic: 'ES6 Basics', time: 60, task: 'Practice exercises' },
            { day: 2, topic: 'JavaScript', subtopic: 'Arrays & Objects', time: 60, task: 'Build mini project' },
            { day: 3, topic: 'JavaScript', subtopic: 'Functions', time: 60, task: 'Code challenges' },
            { day: 4, topic: 'JavaScript', subtopic: 'Promises', time: 60, task: 'API calls practice' },
            { day: 5, topic: 'JavaScript', subtopic: 'DOM', time: 60, task: 'Interactive page' },
            { day: 6, topic: 'JavaScript', subtopic: 'Review', time: 90, task: 'Practice test' },
            { day: 7, topic: 'JavaScript', subtopic: 'Rest', time: 0, task: 'Relax' },
          ],
        },
        {
          week: 2,
          topic: 'React',
          days: [
            { day: 1, topic: 'React', subtopic: 'React Basics', time: 60, task: 'Create components' },
            { day: 2, topic: 'React', subtopic: 'Props & State', time: 60, task: 'State management' },
            { day: 3, topic: 'React', subtopic: 'Hooks', time: 60, task: 'Hooks practice' },
            { day: 4, topic: 'React', subtopic: 'Forms', time: 60, task: 'Form handling' },
            { day: 5, topic: 'React', subtopic: 'Routing', time: 60, task: 'Multi-page app' },
            { day: 6, topic: 'React', subtopic: 'Review', time: 90, task: 'Mini project' },
            { day: 7, topic: 'React', subtopic: 'Rest', time: 0, task: 'Relax' },
          ],
        },
        {
          week: 3,
          topic: 'Node + Express',
          days: [
            { day: 1, topic: 'Node', subtopic: 'Node Basics', time: 60, task: 'Setup Node' },
            { day: 2, topic: 'Express', subtopic: 'Express Routes', time: 60, task: 'Build API' },
            { day: 3, topic: 'Node', subtopic: 'REST API', time: 60, task: 'Full CRUD' },
            { day: 4, topic: 'Node', subtopic: 'Authentication', time: 60, task: 'Auth system' },
            { day: 5, topic: 'Node', subtopic: 'Error Handling', time: 60, task: 'Error handling' },
            { day: 6, topic: 'Node', subtopic: 'Review', time: 90, task: 'API project' },
            { day: 7, topic: 'Node', subtopic: 'Rest', time: 0, task: 'Relax' },
          ],
        },
        {
          week: 4,
          topic: 'MongoDB + Full Stack',
          days: [
            { day: 1, topic: 'MongoDB', subtopic: 'MongoDB Basics', time: 60, task: 'Database setup' },
            { day: 2, topic: 'MongoDB', subtopic: 'Mongoose', time: 60, task: 'Connect to Node' },
            { day: 3, topic: 'Full Stack', subtopic: 'Connect React to API', time: 90, task: 'Integration' },
            { day: 4, topic: 'Full Stack', subtopic: 'Deployment', time: 60, task: 'Deploy app' },
            { day: 5, topic: 'Full Stack', subtopic: 'Final Project', time: 120, task: 'Full MERN app' },
            { day: 6, topic: 'Full Stack', subtopic: 'Review', time: 90, task: 'Practice test' },
            { day: 7, topic: 'Full Stack', subtopic: 'Rest', time: 0, task: 'Relax' },
          ],
        },
      ],
    };

    res.json(mockPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
