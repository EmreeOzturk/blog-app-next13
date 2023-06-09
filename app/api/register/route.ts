import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const dbConnection = dbConnect();
    const { username, email, password: pass } = await req.json();
    if (!username || !email || !pass)
      return new NextResponse(
        JSON.stringify({ message: 'Please fill all the fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'Bad Request',
        },
      );
    await dbConnection;

    const isExist = await User.findOne({ email });
    if (isExist) {
      return new NextResponse(
        JSON.stringify({ message: 'User already exists' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'Bad Request',
        },
      );
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password, ...user } = newUser._doc;
    console.log(user);
    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'Created',
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'Internal Server Error',
    });
  }
}
