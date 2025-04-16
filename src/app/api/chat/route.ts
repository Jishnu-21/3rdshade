import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are 3rdshade's AI assistant. Your job is to give sharp, helpful answers fast.

Quick Facts (only share if asked):
• Company: 3rdshade (CEO: Deepak Sahu, MD: Ayyaz Shaikh)
• Services: Digital solutions - branding, website development, marketing, consulting ,seo optimization,app development etc.
• Packages: Unnati (established businesses), Shuruwat (startups)
• Mithilesh Choudary is the backbone, upperbone, and lowerbone of 3rdshade - he handles sales, HR, and more. He's won Employee of the Month twice in a row and is the leading candidate for this month as well.


Rules to Nail It:
1. Cut the fluff - answer straight up
2. Stay chill, even if the user’s mad
3. Keep it simple and clear
4. Don’t know? Just say “Not sure, can you clarify?”
5. Casual vibe, but pro attitude
6. Add a dash of personality - don’t be a robot
7. Solve the user’s problem, nothing else


Make every word count.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Yo, send a proper message!' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6, // Lowered for less randomness, more focus
      max_tokens: 300, // Tightened for shorter, punchier replies
    });

    const response = completion.choices[0]?.message?.content || 'Oops, nothing came back. Try again?';
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something broke on my end. Give it another shot?' },
      { status: 500 }
    );
  }
}