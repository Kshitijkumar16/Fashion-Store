"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { APIAlert } from "./apiAlert";

interface APIListProps {
	entityName: string;
	entityIdName: string;
}

export const APIList = ({ entityIdName, entityName }: APIListProps) => {
	const origin = useOrigin();
	const params = useParams();

	const baseURL = `${origin}/api/${params.storeId}`;

	return (
		<>
			<APIAlert
				title='GET'
				variant='public'
				description={`${baseURL}/${entityName}`}
			/>
			<APIAlert
				title='GET'
				variant='public'
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
			<APIAlert
				title='POST'
				variant='admin'
				description={`${baseURL}/${entityName}`}
			/>
			<APIAlert
				title='PATCH'
				variant='admin'
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
			<APIAlert
				title='DELETE'
				variant='admin'
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
		</>
	);
};
