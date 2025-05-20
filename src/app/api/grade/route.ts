import { gradeMVV } from "@/lib/gradeMVV";
import type { GradeRequest } from "@/types/grade";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GradeRequest;

    if (
      !body.vision ||
      !Array.isArray(body.vision) ||
      !body.mission ||
      !Array.isArray(body.mission) ||
      !body.values ||
      !Array.isArray(body.values)
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const result = await gradeMVV(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
