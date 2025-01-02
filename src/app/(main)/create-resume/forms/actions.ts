"use server";

import openai from "@/lib/openai";
import { GenerateSummaryValues, generateSummartySchema } from "@/schemas";

export async function generateSummary(values: GenerateSummaryValues) {
  const { jobTitle, workExperiences, educations, skills = [] } = generateSummartySchema.parse(values);

  const systemMessage = `
  You are a professional resume generator AI. Your task is to generate a polished, 
  professional, and concise summary for a resume. This summary should highlight the 
  individual's key strengths, relevant experiences, educational background, and core skills. 
  
  Use the following instructions to guide your output:
  
  - Ensure the summary is tailored to the provided job title: "${jobTitle}".
  - Highlight the most impactful work experiences relevant to the job title.
  - Emphasize transferable skills that align with the job description.
  - Mention educational qualifications that add value to the individual's profile.
  - Use professional and action-oriented language that conveys expertise and reliability.
  - Keep the tone formal but approachable, avoiding jargon or overly technical terms.
  - Structure the summary in a way that makes it easy for recruiters to understand the 
    candidate's value proposition in 3-5 sentences, ensure under 100 characters.
  - Only return the summary and do not include any other unrelated information.

  Provided Information:
  - Job Title: ${jobTitle}
  - Work Experiences: ${JSON.stringify(workExperiences, null, 2)}
  - Educations: ${JSON.stringify(educations, null, 2)}
  - Skills: ${skills}
`;

  const userMessage = `
    Please generate a professional summary for the following data: 

    Job Title: ${jobTitle || "N/A"} 

    Work Experiences:
    ${workExperiences?.map((exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from 
        ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description: ${exp.description || "N/A"}
      `).join("\n\n")}

      Educations:
    ${educations?.map((edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from 
        ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
      `).join("\n\n")}

      Skills: 
      ${skills}
  `;

  console.log("systemMessage:", systemMessage);
  console.log("userMessage:", userMessage);

  const completeMessage = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiRes = completeMessage.choices[0].message.content;

  if (!aiRes) {
    throw new Error("Failed to generate summary");
  }

  return aiRes;
}