//Global imports
import { format } from "date-fns";
//Local imports
import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/Client";
import { SizeColumn } from "./components/Columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
	const sizes = await prismadb.size.findMany({
		where: { storeId: params.storeId },
		orderBy: {
			value: "asc"
		},
	});

	const formattedSizes: SizeColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, "MMMM do, yyyy"),
	}));

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeClient data={formattedSizes} />
			</div>
		</div>
	);
};

export default SizesPage;
