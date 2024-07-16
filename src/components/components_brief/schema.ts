import { z } from "zod";

export const storiesSchema = z.object({
  title: z.optional(z.string().min(3)),
  link_url: z.optional(z.string().min(3)),
  link_title: z.optional(z.string().min(3)),
});

export const imageSchema = z.object({
  type: z.string(),
  image: z.string().url(),
});

export const blockSchema = z.object({
  label: z.optional(z.string().min(3)),
  title: z.optional(z.string().min(3)),
  content: z.optional(z.string().min(50)),
  link_url: z.optional(z.string().url()),
  image_url: z.string().url(),
  source: z.optional(
    z.object({
      name: z.string().min(2),
    })
  ),
  // stories: z.optional(z.array(storiesSchema)),
});

export const schema = z.object({
  title: z.string().min(3),
  slug: z.string().refine((value) => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(value);
  }),
  description: z.string().min(3),
  author: z.object({
    name: z.string().min(3),
  }),
  blocks: z.array(z.union([blockSchema, imageSchema])),
});
