"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SettingsFormProps {
	initialData: Store;
}

const formSchema = z.object({
	name: z.string().min(1, {message: "Required"}),
});

type SettingsFormValue = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const form = useForm<SettingsFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: SettingsFormValue) => {};

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title='Settings'
					description='Manage store preferences'
				/>
				<Button
					variant='destructive'
					size='icon'
					onClick={() => {}}
				>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Store name'
										/>
									</FormControl>
                           <FormMessage/>
								</FormItem>
							)}
						/>
					</div>
					<Button
						className='ml-auto'
						type='submit'
						disabled={loading}
					>
						Save Changes
					</Button>
				</form>
			</Form>
		</>
	);
};
