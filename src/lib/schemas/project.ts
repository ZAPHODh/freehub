import z from "zod"

export const createProjectSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .min(50, "Description must be at least 50 characters")
        .max(2000, "Description must be less than 2000 characters"),
    category: z.string().min(1, "Please select a category"),
    subcategory: z.string().optional(),
    budgetType: z.enum(["FIXED", "HOURLY"], {
        message: "Please select a budget type"
    }),
    budget: z.string().min(1, "Budget is required"),
    minBudget: z
        .string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), "Min budget must be a positive number"),
    maxBudget: z
        .string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), "Max budget must be a positive number"),
    deadline: z.string().optional(),
    estimatedDuration: z.string().optional(),
    skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
    technologies: z.array(z.string()).default([]),
    experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
        message: "Please select experience level"
    }),
    projectType: z.string().min(1, "Please select project type"),
    tags: z.array(z.string()).default([]),
    isUrgent: z.boolean().default(false),
})
    .refine((data) => {
        if (data.minBudget && data.maxBudget) {
            return Number(data.minBudget) <= Number(data.maxBudget)
        }
        return true
    }, {
        message: "Min budget must be less than or equal to max budget",
        path: ["maxBudget"],
    })
export type CreateProjectFormData = z.infer<typeof createProjectSchema>