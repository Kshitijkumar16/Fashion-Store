// This page is solely responsible for toggling the isOpen state of Create Store Modal 

"use client";
import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
	// Extracting states from zustand

	// Function to set isOpen = true
	const onOpen = useStoreModal((state) => state.onOpen);
	// Boolean that checks if modal is open
	const isOpen = useStoreModal((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	// This page renders nothing
	return null;
};

export default SetupPage;
