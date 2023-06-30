import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/jwt';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const id = params.id;
    const blog = await Blog.findById(id).populate('authorId');
    return new NextResponse(JSON.stringify(blog), {
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
      JSON.stringify({ message: 'Please login to create a blog' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        statusText: 'Unauthorized',
      },
    );
  try {
    const { title, desc, category, imageURL } = await req.json();
    const id = params.id;
    const blog = await Blog.findById(id).populate('authorId');

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString())
      return new NextResponse(
        JSON.stringify({ message: 'You are not authorized to edit this blog' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'Unauthorized',
        },
      );

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { title, desc, category, imageURL } },
      { new: true },
    );
    return new NextResponse(JSON.stringify(updatedBlog), {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const accessToken = req.headers.get('Authorization') || '';
  const token = accessToken.split(' ')[1];
  const decodedToken: any = verifyJwtToken(token);
  if (!decodedToken || !accessToken)
    return new NextResponse(
      JSON.stringify({ message: 'You are not authorized to delete this blog' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        statusText: 'Unauthorized',
      },
    );

  try {
    const id = params.id;

    const blog = await Blog.findById(id).populate('authorId');

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString())
      return new NextResponse(
        JSON.stringify({
          message: 'You are not authorized to delete this blog',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'Unauthorized',
        },
      );

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify(deletedBlog), {
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
