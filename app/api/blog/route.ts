import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const blogs = await Blog.find().limit(16).populate('authorId');
    return new NextResponse(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'OK',
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

export async function POST(req: NextRequest) {
  console.log(req.headers.get('Authorization'));
  console.log(req.cookies);
  const accessToken = req.headers.get('Authorization') || '';
  console.log(accessToken);
  const token = accessToken.split(' ')[1];
  console.log(token);
  const decodedToken = verifyJwtToken(token);
  console.log(decodedToken);
  if (!decodedToken || !accessToken)
    return new NextResponse(
      JSON.stringify({ message: 'Please login to create a blog' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        statusText: 'Unauthorized',
      },
    );

  const { title, desc, category, imageURL } = await req.json();
  if (!title || !desc || !category || !imageURL)
    return new NextResponse(
      JSON.stringify({ message: 'Please fill all the fields' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        statusText: 'Bad Request',
      },
    );

  try {
    await dbConnect();
    const newBlog = await Blog.create({
      title,
      desc,
      category,
      imageURL,
      //   authorId: user.id,
    });
    return new NextResponse(JSON.stringify(newBlog), {
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
