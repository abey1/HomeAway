import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  // firstName: z.string().max(5, {message:"max length is 5"}),
  firstName: z.number(),
  lastName: z.number().min(2),
  userName: z.number().min(2),
});
