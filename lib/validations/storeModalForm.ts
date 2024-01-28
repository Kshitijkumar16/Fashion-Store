import * as z from "zod";

export const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Required" })
		.max(32, { message: "Max 32 characters allowed" }),
});
