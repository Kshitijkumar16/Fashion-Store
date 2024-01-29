// Layout for "/" page, which continuously renders the Create Store prompt

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetUpLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	// Fetching data from PlanetScale (first store registered under user)
	const store = await prismadb.store.findFirst({ where: { userId: userId } });

	// This snippet redirects user to store if it exists
	if (store) {
		redirect(`/${store.id}`);
	}

	// Else it renders the create store Modal which is the child here (coming from page.tsx inside root -> routes)
	return <>{children}</>;
}
