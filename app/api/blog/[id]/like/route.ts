import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/jwt';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const accessToken = req.headers.get('Authorization') || '';
  const token = accessToken.split(' ')[1];
  const decodedToken: any = verifyJwtToken(token);
  if (!decodedToken || !accessToken)
    return new NextResponse(
      JSON.stringify({ message: 'Please login to like this blog' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        statusText: 'Unauthorized',
      },
    );
  try {
    const id = params.id;
    const blog = await Blog.findById(id);

    if (blog?.likes.includes(decodedToken._id)) {
      blog.likes = blog.likes.filter(
        (id: any) => id.toString() !== decodedToken._id.toString(),
      );
    } else {
      blog.likes.push(decodedToken._id);
    }

    await blog.save();
    return new NextResponse(
      JSON.stringify({
        message: 'Successfully liked/unliked the blog',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        statusText: 'OK',
      },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'Internal Server Error',
    });
  }
}
