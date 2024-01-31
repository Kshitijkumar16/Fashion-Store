"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./CellAction";

export type SizeColumn = {
	id: string;
	name: string;
	value: number;
	createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "value",
		header: "Number",
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
