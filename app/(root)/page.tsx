"use client";
import { Modal } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage = () => {
	const onOpen = useStoreModal((state) => state.onOpen);
	const isOpen = useStoreModal((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return (
		<main>
			<div className='p-4'>Root Page</div>
		</main>
	);
};

export default SetupPage;
