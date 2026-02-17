import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		category: z.string().optional(),
		cover: z.string().optional(),
		math: z.boolean().optional(),
	}),
});

export const collections = {
	post: postCollection,
};
