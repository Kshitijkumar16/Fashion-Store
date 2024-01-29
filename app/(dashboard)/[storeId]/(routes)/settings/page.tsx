import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./(components)/SettingsForm";

interface SettingsPageProps {
	params: {
		storeId: string;
		userId: string;
	};
}

const SettingsPage = async ({ params } : SettingsPageProps) => {
	const userId = auth();

	if (!userId) {
		redirect("/");
	}

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId: params.userId,
		},
	});

	if (!store) {
		redirect("/");
	}

	return (
		<div className='flex flex-col '>
			<div className='flex-1 p-8 pt-6 space-y-4'>
				<SettingsForm initialData={store}/>
			</div>
		</div>
	);
};

export default SettingsPage;
