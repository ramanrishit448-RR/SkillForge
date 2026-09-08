import llm from "../configs/llm.js";
import {
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

const resumeAgent = async (resumeText) => {

  const response = await llm.invoke([

    new SystemMessage(`
You are an Expert ATS Resume Analyzer.

Analyze the given resume.

Extract the following information:

- Full Name
- Email
- Phone Number
- Professional Summary
- Technical Skills
- Projects
- Education
- Experience
- Strengths
- Weaknesses
- Missing Skills
- Suggested Job Role
- ATS Score (0-100)
- Recommendations

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do not use markdown.
3. Do not explain anything.
4. Do not add extra text.
5. Every field must exist.
6. ALL array fields (skills, projects, education, experience, strengths, weaknesses, missingSkills, recommendations) must contain ONLY plain strings - NOT objects or nested arrays.
   - For "education": each item should be a single string like "B.Tech in Computer Science, XYZ University (2020-2024)"
   - For "projects": each item should be a single string like "ProjectName - Brief description using Tech1, Tech2"
   - For "experience": each item should be a single string like "Job Title at Company, StartYear-EndYear: Brief description"
   - For "skills": flat list of skill name strings only

Response Format:

{
  "name":"",
  "email":"",
  "phone":"",
  "summary":"",
  "skills":[],
  "projects":[],
  "education":[],
  "experience":[],
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "suggestedRole":"",
  "score":0,
  "recommendations":[]
}
`),

    new HumanMessage(resumeText),

  ]);

  return response.content;
};

export default resumeAgent;