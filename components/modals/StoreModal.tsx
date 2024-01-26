"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/model";

export const StoreModal = () => {
	const StoreModal = useStoreModal();
	return (
		<Modal
			title='Create Store'
			description='Add a new store and manage products & categories easily'
			isOpen={StoreModal.isOpen}
			onClose={StoreModal.onClose}
		>
			Form
		</Modal>
	);
};
