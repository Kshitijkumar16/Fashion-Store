import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; userId: string } }
) {
	try {
		const userId = auth();
		const body = await req.json();

		const { name } = body;

		if (!userId) {
			const status = 401;
			return new NextResponse("Unauthenticated", { status });
		}

		if (!name) {
			const status = 400;
			return new NextResponse("name is required", { status });
		}

		if (!params.storeId) {
			const status = 400;
			return new NextResponse("Store ID is required", { status });
		}

		const store = await prismadb.store.updateMany({
			where: {
				id: params.storeId,
				userId: params.userId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORE_PATCH]", error);
		const status = 500;
		return new NextResponse("Internal Error", { status });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; userId: string } }
) {
	try {
		const userId = auth();
		if (!userId) {
			const status = 401;
			return new NextResponse("Unauthenticated", { status });
		}

		if (!params.storeId) {
			const status = 400;
			return new NextResponse("Store ID is required", { status });
		}

		const store = await prismadb.store.deleteMany({
			where: {
				id: params.storeId,
				userId: params.userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORE_DELETE]", error);
		const status = 500;
		return new NextResponse("Internal Error", { status });
	}
}

