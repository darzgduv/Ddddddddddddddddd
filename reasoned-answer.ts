'use server';

/**
 * @fileOverview An AI agent that answers questions using reasoning and information from multiple sources.
 *
 * - reasonedAnswer - A function that handles the question answering process.
 * - ReasonedAnswerInput - The input type for the reasonedAnswer function.
 * - ReasonedAnswerOutput - The return type for the reasonedAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReasonedAnswerInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
});
export type ReasonedAnswerInput = z.infer<typeof ReasonedAnswerInputSchema>;

const ReasonedAnswerOutputSchema = z.object({
  answer: z.string().describe('The comprehensive answer to the question.'),
});
export type ReasonedAnswerOutput = z.infer<typeof ReasonedAnswerOutputSchema>;

export async function reasonedAnswer(input: ReasonedAnswerInput): Promise<ReasonedAnswerOutput> {
  return reasonedAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reasonedAnswerPrompt',
  input: {schema: ReasonedAnswerInputSchema},
  output: {schema: ReasonedAnswerOutputSchema},
  prompt: `You are an AI assistant that answers questions comprehensively using reasoning and information from multiple sources.

  Question: {{{question}}}

  Answer: `,
});

const reasonedAnswerFlow = ai.defineFlow(
  {
    name: 'reasonedAnswerFlow',
    inputSchema: ReasonedAnswerInputSchema,
    outputSchema: ReasonedAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
