import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder for real database and authentication logic.
// In a real app, you would use an ORM like Prisma and an auth library like NextAuth.js.
async function authenticateUser(username: string, password: string) {
  // Placeholder logic: In a real app, you'd query your database
  // and use a library like 'bcrypt' to compare password hashes.
  if (username === 'testuser' && password === 'password123') {
    // Return a dummy user object on success
    return { id: '1', username: 'testuser', email: 'test@example.com' };
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    const user = await authenticateUser(username, password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // In a real app, you would create a session here (e.g., set an encrypted HTTP-only cookie).
    // For now, we just return a success message.
    return NextResponse.json({ message: 'Login successful!', user });

  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}