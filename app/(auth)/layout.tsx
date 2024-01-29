// layout for sign-in and sign-up prompts

import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="flex items-center justify-center h-full">{children}</div>;
}
