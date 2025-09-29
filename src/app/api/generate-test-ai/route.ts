import { NextRequest, NextResponse } from 'next/server';
import dirtyJson from 'dirty-json';

const HACKCLUB_API_URL = 'https://ai.hackclub.com/chat/completions';

// This is a placeholder for your database logic.
// In a real app, you would use an ORM like Prisma to interact with your database.
async function saveTestToDatabase(topic: string, questions: any[]) {
  console.log('Saving test to database...');
  console.log('Topic:', topic);
  console.log('Questions:', questions);
  // In a real implementation:
  // const newTest = await prisma.mockTest.create({
  //   data: {
  //     userId: "current_user_id", // You'll get this from your auth session
  //     topic: topic,
  //     questions: {
  //       create: questions.map(q => ({
  //         question_number: q.question_number,
  //         question_text: q.question_text,
  //         marks: q.marks,
  //         answer_text: q.answer_text,
  //         model_answer: q.model_answer,
  //       }))
  //     }
  //   }
  // });
  // return newTest.id;
  const fakeTestId = Math.floor(Math.random() * 1000);
  console.log(`Test saved with placeholder ID: ${fakeTestId}`);
  return fakeTestId;
}

export async function POST(req: NextRequest) {
  try {
    // Note: We'll need to implement authentication to get the current user.
    // For now, we proceed as if the user is authenticated.

    const {
      exam_board = 'IGCSE',
      subject = 'General',
      topic,
      num_questions = 10,
      total_marks = 25,
    } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Please provide a topic for the test.' }, { status: 400 });
    }

    const system_prompt = `
      You are an expert IGCSE exam paper creator. Your task is to generate a mock test based on user specifications.
      - Generate questions appropriate for the specified curriculum level.
      - Each question must have a 'question_number', 'question_text', 'marks', a 'model_answer', and an 'answer_text' (the mark scheme).
      - The 'question_text', 'model_answer', and 'answer_text' fields MUST all be formatted using Markdown.
      - The 'answer_text' (mark scheme) MUST follow IGCSE conventions: Use a bulleted list for marking points, indicate marks in square brackets [1], and bold/underline key terms.
      - The sum of marks should be close to the requested total.
      - Respond ONLY with a single valid JSON object. Do not include any reasoning, conversational text, or markdown code fences.
      - The JSON object must have a single root key called "questions", which contains an array of question objects.
    `;

    const user_prompt = `Generate a mock test with the following specifications:\n- Exam Board: ${exam_board}\n- Subject: ${subject}\n- Topic: ${topic}\n- Number of Questions: ${num_questions}\n- Approximate Total Marks: ${total_marks} (don't think)`;

    const apiResponse = await fetch(HACKCLUB_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system_prompt },
          { role: 'user', content: user_prompt },
        ],
        max_tokens: 2000,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('AI API Error:', apiResponse.status, errorText);
      return NextResponse.json({ error: 'Failed to get a response from the AI.' }, { status: 500 });
    }

    const responseData = await apiResponse.json();
    const content = responseData.choices[0]?.message?.content;

    // Use dirty-json to handle potentially malformed JSON from the AI
    const testData = dirtyJson.parse(content);
    const questions_data = testData.questions;

    if (!questions_data || !Array.isArray(questions_data) || questions_data.length === 0) {
      throw new Error("AI returned a valid response but with no questions in it.");
    }

    // Save the test to the database (using our placeholder function)
    const testId = await saveTestToDatabase(topic, questions_data);

    return NextResponse.json({ message: 'Test generated successfully!', test_id: testId });

  } catch (error: any) {
    console.error('AI Test Generation Error:', error);
    return NextResponse.json({ error: `An error occurred while generating the test. Details: ${error.message}` }, { status: 500 });
  }
}