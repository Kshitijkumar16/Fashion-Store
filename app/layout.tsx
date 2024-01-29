// Main app layout

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "../providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dashboard - Fashion Store",
	description: "Multi store dashboard with easy access to every product.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={roboto.className}>
					<ToasterProvider />
					{/* Renders the Create Store Modal */}
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
