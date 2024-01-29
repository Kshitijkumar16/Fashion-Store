"use client";
// Global imports
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
// Local imports
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/model";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formSchema } from "@/lib/validations/storeModalForm";

// Component

export const StoreModal = () => {
	// Custom hook from zustand
	const StoreModal = useStoreModal();
	// React hook
	const [loading, setloading] = useState(false);

	// Form resolver, react-hook-form allowing Zod to validate and create data externally
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	// Function to create the store when pressed "Create"
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setloading(true);
			// Axios sets the new url
			const response = await axios.post("/api/stores", values);
			// Using window here cause we need a complete refresh (new store is loaded in the database and data is in sync after refresh)
			// Redirecting user to the Dashboard of the new store
			window.location.assign(`/${response.data.id}`);

			//
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setloading(false);
		}
	};

	return (
		<Modal
			title='Create Store'
			description='Add a new store and manage products & categories easily'
			isOpen={StoreModal.isOpen}
			onClose={StoreModal.onClose}
		>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder='Suit store'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
								<Button
									disabled={loading}
									variant='outline'
									onClick={StoreModal.onClose}
								>
									Cancel
								</Button>
								<Button
									disabled={loading}
									type='submit'
								>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
