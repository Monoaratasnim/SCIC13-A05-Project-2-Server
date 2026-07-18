import Groq from "groq-sdk";

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

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const groq = new Groq({
    apiKey,
  });

  const prompt = `
You are an expert AI Career Advisor.

Analyze the following user profile and provide personalized career recommendations.

Education:
${payload.education}

Experience Level:
${payload.experienceLevel}

Skills:
${payload.skills.join(", ")}

Interests:
${payload.interests.join(", ")}

Generate a detailed report with the following sections:

1. Best Career Paths
2. Missing Skills
3. Technologies to Learn
4. Recommended Projects
5. Recommended Certifications
6. Job Roles to Apply For
7. Salary Expectations (Junior Level)
8. Learning Resources
9. Final Career Advice

Return the response in Markdown format.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an expert AI Career Advisor helping users choose the best career path.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1800,
  });

  return completion.choices[0]?.message?.content;
};