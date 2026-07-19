import Groq from "groq-sdk";
import { Recommendation } from "./recommendation.model";

interface RecommendationInput {
  skills: string[];
  interests: string[];
  experienceLevel: string;
  education: string;
}

export const generateCareerRecommendation = async (
  payload: RecommendationInput
) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing");

  const groq = new Groq({ apiKey });

  const prompt = `
You are an expert AI Career Advisor. Generate a professional, structured career recommendation report.

---

## User Profile

- **Education:** ${payload.education}
- **Experience Level:** ${payload.experienceLevel}
- **Skills:** ${payload.skills.join(", ")}
- **Interests:** ${payload.interests.join(", ")}

---

## Formatting Rules (MUST FOLLOW)

- Use \`##\` headings for every major section.
- Use \`###\` sub-headings where appropriate.
- Use bullet points (-) instead of long paragraphs.
- Keep paragraphs to a maximum of 2-3 sentences.
- Use horizontal separators (\`---\`) between every major section.
- Use blockquotes (\`>\`) to highlight important advice or key takeaways.
- Never generate one large wall of text — break content into scannable sections.
- Keep the content concise, readable, and professionally formatted.
- Ensure the structure below is followed exactly every time.

---

## Required Sections (in this exact order)

### Section: ## Best Career Match
- Recommend 2-3 specific career paths that match the user's skills, interests, and experience.
- For each career, provide a one-line summary.
- Use a bullet list.

### Section: ## Why This Career Matches
- For each recommended career, explain why it fits the user's profile.
- Keep each explanation to 2-3 sentences max.
- Use bullet points, one per career.

### Section: ## Missing Skills
- Identify the key skills the user currently lacks for the recommended careers.
- Use a bullet list.
- Be specific (e.g., "TypeScript" not just "programming languages").

### Section: ## Technologies to Learn
- List specific technologies, frameworks, tools, or libraries to learn.
- Prioritize by relevance to the recommended careers.
- Use a bullet list grouped by category if helpful.

### Section: ## Recommended Projects
- Suggest 2-3 portfolio projects to showcase relevant skills.
- For each project, give a short description (1-2 sentences).
- Use a bullet list.

### Section: ## Certifications
- List relevant certifications that would strengthen the user's profile.
- If none are strongly recommended, say so and suggest alternatives.
- Use a bullet list.

### Section: ## Job Roles to Apply For
- List specific job titles the user should target.
- Use a bullet list.

### Section: ## Salary Expectations
Use two sub-sections:

#### ### Bangladesh Market Salary (BDT)
- Provide monthly salary ranges in BDT (৳).
- Base on experience level:
  - Beginner: ৳20,000 – ৳50,000/month
  - Intermediate: ৳50,000 – ৳120,000/month
  - Advanced: ৳120,000 – ৳250,000+/month
- Adjust within range based on role and skills.

#### ### International Opportunities (USD)
- Provide yearly salary ranges in USD ($).
- Base on experience level:
  - Beginner: $15,000 – $40,000/year
  - Intermediate: $40,000 – $80,000/year
  - Advanced: $80,000 – $150,000+/year
- Note that these are typical for remote/global positions.

### Section: ## Learning Resources
- Suggest specific courses, platforms, books, or resources.
- Use a bullet list.
- Include free and paid options where possible.

### Section: ## Final Career Advice
- Provide 3-5 actionable next steps.
- End with a brief motivational note.
- Use a blockquote (\`>\`) for the key takeaway.

---

## Important Rules
- Use realistic salary estimates based on the Bangladesh job market.
- Do not inflate salaries unrealistically.
- Consider the user's experience level when estimating ranges.
- Mention that international salaries vary by company, location, and negotiation.
- Every response must follow the section order and formatting above exactly.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an expert AI Career Advisor helping users choose the best career path. You provide realistic salary estimates for both the Bangladesh market (BDT monthly) and international remote opportunities (USD yearly). You always respond with professionally structured Markdown using H2 headings, bullet points, horizontal separators, and blockquotes. Never output plain text walls.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 3500,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Failed to generate recommendation content");
  return content;
};

export const saveRecommendation = async (
  userId: string,
  content: string,
  profileData: RecommendationInput
) => {
  const recommendation = await Recommendation.findOneAndUpdate(
    { user: userId },
    {
      content,
      careerProfile: {
        skills: profileData.skills,
        interests: profileData.interests,
        experienceLevel: profileData.experienceLevel,
        education: profileData.education,
      },
    },
    { new: true, upsert: true, runValidators: true }
  );
  return recommendation;
};

export const getLatestRecommendation = async (userId: string) => {
  const recommendation = await Recommendation.findOne({
    user: userId,
  }).sort({ updatedAt: -1 });
  return recommendation;
};
