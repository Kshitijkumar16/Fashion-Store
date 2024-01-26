import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
	return (
		<main className=''>
			<UserButton afterSignOutUrl="/" />
		</main>
	);
};

export default SetupPage;
