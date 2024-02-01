"use client";
// Global imports
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
//Local imports
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/dataTable";
import { APIList } from "@/components/ui/apiList";

interface BillboardClientProps {
	data: BillboardColumn[];
}

export const BillboardClient = ({ data }: BillboardClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Billboards (${data.length})`}
					description='Manage Billboards for your store'
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/billboards/new`);
					}}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey="label"/>
			<Heading title="API" description="API calls for Billboards"/>
			<Separator/>
			<APIList entityName="billboards" entityIdName="billboardId" />
		</>
	);
};
