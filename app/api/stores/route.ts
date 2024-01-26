import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const body = await req.json();
		const { name } = body;

		if (!userId) {
			const status = 401;
			return new NextResponse("Unauthorized", { status });
		}

		if (!name) {
			const status = 400;
			return new NextResponse("Name is required", { status });
		}

		const store = await prismadb.store.create({ data: { name, userId } });

		return NextResponse.json(store);
		//
	} catch (error) {
		console.log("[STORE_POST]", error);
		const status = 500;
		return new NextResponse("Internal error", { status });
	}
}
