"use client";
// Global imports
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
//Local imports
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/dataTable";
import { APIList } from "@/components/ui/apiList";

interface CategoryClientProps {
	data: CategoryColumn[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Categories (${data.length})`}
					description='Manage Categories for your store'
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/categories/new`);
					}}
				>
					<Plus className='w-4 h-4 mr-2' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable
				searchKey='name'
				columns={columns}
				data={data}
			/>
			<Heading
				title='API'
				description='API calls for Categories'
			/>
			<Separator />
			<APIList
				entityName='categories'
				entityIdName='categoryId'
			/>
		</>
	);
};
