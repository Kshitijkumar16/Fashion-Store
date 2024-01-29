"use client";
// Global imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
// Local imports
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModel } from "@/components/modals/AlertModel";
import { APIAlert } from "@/components/ui/apiAlert";
import { useOrigin } from "@/hooks/use-origin";

//
interface BillboardFormProps {
	initialData: Billboard | null;
}

// Zod schema
const formSchema = z.object({
	label: z.string().min(1, { message: "Required" }),
	imageURL: z.string().min(1, { message: "Required" }),
});

// Creating a Type based on formSchema using the infer utility provided by Zod. This type will match the valid form
type BillboardFormValue = z.infer<typeof formSchema>;

// Component

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
	// Using useForm and filling default values from intitalData while validating them using the BillboardFormValue type
	const form = useForm<BillboardFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {label:"", imageURL: ""},
	});

	const title = initialData ? "Edit billboard" : "Create billboard";
	const description = initialData ? "Edit your billboard here" : "Add a new billboard";
	const toastMessage = initialData ? "Billboard updated" : "Billboard creted";
	const action = initialData ? "Save changes" : "Create";

	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Function to update store details in database
	const onSubmit = async (data: BillboardFormValue) => {
		try {
			setLoading(true);
			await axios.patch(`/api/stores/${params.storeId}`, data);
			router.refresh();
			toast.success("Store updated.");
			//
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	// Function to delete a store from the database
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/stores/${params.storeId}`);
			router.refresh();
			router.push("/");
			toast.success("Store deleted.");
		} catch (error) {
			toast.error("Make sure you removed all products and categories first.");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	// Component

	return (
		<>
			<AlertModel
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading
					title={title}
					description={description}
				/>
				<Button
					disabled={loading}
					variant='destructive'
					size='icon'
					onClick={() => setOpen(true)}
				>
					<Trash className='w-4 h-4' />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-8'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='label'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											className='capitalize'
											disabled={loading}
											placeholder='Billboard label'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						className='ml-auto'
						type='submit'
						disabled={loading}
					>
						{action}
					</Button>
				</form>
			</Form>
			<Separator />
			
		</>
	);
};
