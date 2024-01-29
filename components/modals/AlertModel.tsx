"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../ui/model";
import { Button } from "../ui/button";

interface AlertModelProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export const AlertModel = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
}: AlertModelProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title='Are you sure?'
			description='This action cannot be undone.'
			onClose={onClose}
			isOpen={isOpen}
		>
			<div className='flex items-center justify-end w-full pt-6 space-x-2'>
				<Button
					disabled={loading}
					variant='outline'
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					variant='destructive'
					onClick={onConfirm}
				>
					Continue
				</Button>
			</div>
		</Modal>
	);
};
