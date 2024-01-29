// This is not a shadcn component

"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./dialog";

// Interface containing all the values to control state and rendering of the Modal
interface ModalProps {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

// Component

export const Modal = ({
	title,
	description,
	isOpen,
	onClose,
	children,
}: ModalProps) => {
	//
	// Function to close the modal
	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};

	return (
		<Dialog
			// Properties provided by DialogComponent
			open={isOpen}
			onOpenChange={onChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};
