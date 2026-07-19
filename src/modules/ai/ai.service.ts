import Groq from "groq-sdk";
import { Roadmap } from "./roadmap.model";

interface CareerRoadmapInput {
  careerGoal: string;
  skills: string[];
  experienceLevel: string;
}

export const generateCareerRoadmap = async (
  payload: CareerRoadmapInput
) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing");

  const groq = new Groq({ apiKey });

  const prompt = `
You are an expert AI Career Coach. Generate a professional, structured career roadmap report.

---

## User Profile

- **Career Goal:** ${payload.careerGoal}
- **Current Skills:** ${payload.skills.join(", ")}
- **Experience Level:** ${payload.experienceLevel}

---

## Formatting Rules (MUST FOLLOW)

- Use \`##\` headings for every major section.
- Use \`###\` sub-headings where appropriate.
- Use numbered steps (\`1.\`, \`2.\`, etc.) for sequential learning plans.
- Use bullet points (-) for lists of items, tools, or tips.
- Keep paragraphs to a maximum of 2-3 sentences.
- Use horizontal separators (\`---\`) between every major section.
- Use blockquotes (\`>\`) to highlight key milestones or important advice.
- Never generate one large wall of text — break content into scannable sections.
- Keep the content concise, readable, and professionally formatted.
- Ensure the structure below is followed exactly every time.

---

## Required Sections (in this exact order)

### Section: ## Overview
- Briefly summarize the roadmap (2-3 sentences).
- Mention the career goal and what the user will achieve.
- Use a blockquote (\`>\`) for the key milestone statement.

### Section: ## Phase 1 – Foundations
- Define what the user should focus on in this phase.
- List specific topics, concepts, or skills to learn as numbered steps.
- Include estimated duration (e.g., "Weeks 1-4").
- Use \`###\` sub-headings for topics within the phase if needed.
- End with a bullet list of resources or tools for this phase.

### Section: ## Phase 2 – Core Skills
- Define the intermediate learning goals.
- List specific technologies, frameworks, or concepts to master as numbered steps.
- Include estimated duration.
- Use \`###\` sub-headings for topics within the phase if needed.
- End with a bullet list of practice activities or resources.

### Section: ## Phase 3 – Advanced Topics
- Define advanced or specialized skills to develop.
- List specific topics as numbered steps.
- Include estimated duration.
- Use \`###\` sub-headings for topics within the phase if needed.
- End with a bullet list of advanced resources or tools.

### Section: ## Phase 4 – Job Readiness
- Define final preparation steps before applying.
- List specific actions as numbered steps (portfolio, resume, GitHub, etc.).
- Include estimated duration.
- Use \`###\` sub-headings for topics within the phase if needed.
- End with a bullet list of final preparation tips.

### Section: ## Projects
- Suggest 2-3 projects to build at different phases.
- For each project, give a short description (1-2 sentences).
- Mention which phase the project aligns with.
- Use a bullet list.

### Section: ## Interview Preparation
- List specific topics to study for technical interviews.
- Include behavioral interview tips.
- Use numbered steps for preparation order.
- Use a blockquote (\`>\`) for the most critical advice.

### Section: ## Final Goal
- Summarize the overall journey in 2-3 sentences.
- Provide a motivational closing statement.
- Use a blockquote (\`>\`) for the key takeaway.
- List 3-5 actionable next steps the user should take immediately.

---

## Important Rules
- Be realistic about timelines based on the user's experience level.
- Recommend relevant, in-demand technologies for each phase.
- Ensure each phase builds on the previous one logically.
- Every response must follow the section order and formatting above exactly.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are an expert AI Career Coach. You always respond with professionally structured Markdown using H2 headings, numbered steps, bullet points, horizontal separators, and blockquotes. Never output plain text walls." },
      { role: "user", content: prompt },
    ],
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error("Failed to generate roadmap content");
  return content;
};

export const saveRoadmap = async (
  userId: string,
  content: string,
  careerGoal: string
) => {
  const roadmap = await Roadmap.findOneAndUpdate(
    { user: userId },
    { content, careerGoal },
    { new: true, upsert: true, runValidators: true }
  );
  return roadmap;
};

export const getLatestRoadmap = async (userId: string) => {
  const roadmap = await Roadmap.findOne({ user: userId }).sort({
    updatedAt: -1,
  });
  return roadmap;
};
