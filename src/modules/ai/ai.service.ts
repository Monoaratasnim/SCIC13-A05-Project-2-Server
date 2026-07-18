import Groq from "groq-sdk";

interface CareerRoadmapInput {
  careerGoal: string;
  skills: string[];
  experienceLevel: string;
}

export const generateCareerRoadmap = async (
  payload: CareerRoadmapInput
) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const groq = new Groq({ apiKey });

  const prompt = `
You are an expert AI Career Coach.

Career Goal:
${payload.careerGoal}

Current Skills:
${payload.skills.join(", ")}

Experience Level:
${payload.experienceLevel}

Please provide:
1. Step-by-step learning roadmap
2. Technologies to learn
3. Recommended projects
4. Interview preparation tips
5. Estimated timeline
6. Career advice

Return the answer in Markdown format.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are an expert AI Career Coach.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
};