"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/dataTable";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { APIList } from "@/components/ui/apiList";

import { ProductColumn, columns } from "./Columns";

interface ProductsClientProps {
	data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Products (${data.length})`}
					description='Manage products for your store'
				/>
				<Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
					<Plus className='w-4 h-4 mr-2' /> Add New
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
				description='API Calls for Products'
			/>
			<Separator />
			<APIList
				entityName='products'
				entityIdName='productId'
			/>
		</>
	);
};
