// Page rendering Settings Form
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./(components)/SettingsForm";

// Component

const SettingsPage = async ({
	params,
}: {
	params: { storeId: string; userId: string };
}) => {
	const userId = auth();

	if (!userId) {
		redirect("/");
	}

	// Fetching first store from database for logged user
	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId: params.userId,
		},
	});

	if (!store) {
		redirect("/");
	}

	// Render settings form if store exists
	return (
		<div className='flex flex-col '>
			<div className='flex-1 p-8 pt-6 space-y-4'>
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default SettingsPage;
