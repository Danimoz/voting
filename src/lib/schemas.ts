import { z } from "zod"


const MAX_SIZE = 1024 * 1024 * 3
export const candidateSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.any()
    .refine((file) => file.size <= MAX_SIZE, 'Max file size is 3MB')})

export type Candidate = z.infer<typeof candidateSchema>