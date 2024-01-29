// Page rendering the entire danshboard

import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
	params: { storeId: string };
}

// Component

const DashboardPage = async ({ params }: DashboardPageProps) => {
	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
		},
	});
	return (
		<div>
			<h1>Active Store: {store?.name}</h1>
		</div>
	);
};

export default DashboardPage;
