import Todo from "@/schema/todoSchema";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const todos = await Todo.find();
    return NextResponse.json(todos, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Invalid data: Title and description are required" },
        { status: 400 }
      );
    }

    const existingTodo = await Todo.findOne({ title });

    if (existingTodo) {
      return NextResponse.json(
        { message: "Todo already exists" },
        { status: 409 }
      );
    }

    const todo = await Todo.create({ title, description });

    return NextResponse.json(todo, { status: 201 });
  } catch (error: any) {
    console.error("Post Error", error.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("delete eddor", error.message);
  }
}
