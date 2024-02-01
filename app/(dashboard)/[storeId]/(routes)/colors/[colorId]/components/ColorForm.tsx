"use client";
// Global imports
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
// Local imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/Heading";
import { AlertModel } from "@/components/modals/AlertModel";

// Zod schema
const formSchema = z.object({
	name: z.string().min(1, { message: "Required" }),
	value: z
		.string()
		.min(4, { message: "Minimum 4 characters required" })
		.regex(/^#/, { message: "Must be a valid hex code" }),
});

// Creating a type based on formSchema using the infer utility provided by zod. This type will match the valid form
type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
	initialData: Color | null;
}

// Component

export const ColorForm = ({ initialData }: ColorFormProps) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "Edit color" : "Create color";
	const description = initialData ? "Edit a color." : "Add a new color";
	const toastMessage = initialData ? "Color updated." : "Color created.";
	const action = initialData ? "Save changes" : "Create";

	// Using useForm and populating default values from initialData while validating them using the colorFormValue type
	const form = useForm<ColorFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			value: "",
		},
	});

	// Function updating color details / creating color in database
	const onSubmit = async (data: ColorFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/colors/${params.colorId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/colors`, data);
			}
			router.push(`/${params.storeId}/colors`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	// Function to delete a color
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
			router.push(`/${params.storeId}/colors`);
			router.refresh();
			toast.success("Color deleted.");
		} catch (error: any) {
			toast.error("Make sure you removed all products using this color first.");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

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
				{initialData && (
					<Button
						disabled={loading}
						variant='destructive'
						size='sm'
						onClick={() => setOpen(true)}
					>
						<Trash className='w-4 h-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-8'
				>
					<div className='gap-8 md:grid md:grid-cols-3'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Color name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hex Value</FormLabel>
									<FormControl>
										<div className='flex items-center gap-x-4'>
											<Input
												disabled={loading}
												placeholder='#000000'
												{...field}
											/>
											<div
												className='p-4 border rounded-full'
												style={{ backgroundColor: field.value }}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						className='ml-auto'
						type='submit'
					>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
