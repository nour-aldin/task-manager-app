import { z } from "zod";

/**
 * Zod schema for task form validation
 */
export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .nonempty("Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .nonempty("Description is required"),
  status: z.enum(["pending", "in-progress", "completed"], {
    required_error: "Status is required",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
  }),
});

/**
 * Infer TypeScript type from Zod schema
 */
export type TaskFormData = z.infer<typeof taskSchema>;

/**
 * Validation schema for editing task
 * Same as taskSchema but all fields are optional
 */
export const taskEditSchema = taskSchema.partial();

export type TaskEditFormData = z.infer<typeof taskEditSchema>;
