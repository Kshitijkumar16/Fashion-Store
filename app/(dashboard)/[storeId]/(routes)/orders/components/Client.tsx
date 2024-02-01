"use client";
//Local imports
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/dataTable";

interface OrderClientProps {
	data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
	return (
		<>
			<Heading
				title={`Orders (${data.length})`}
				description='Manage orders for your store'
			/>

			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey='label'
			/>
		</>
	);
};
