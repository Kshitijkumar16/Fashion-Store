// Main app layout

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "../providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const roboto = Inter({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	style: ["normal"],
});

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
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
					>
						<ToasterProvider />
						{/* Renders the Create Store Modal */}
						<ModalProvider />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
