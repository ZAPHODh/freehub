import { z } from "zod"

export const createProjectSchema = z
    .object({
        title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
        description: z
            .string()
            .min(50, "Description must be at least 50 characters")
            .max(2000, "Description must be less than 2000 characters"),
        category: z.string().min(1, "Please select a category"),
        subcategory: z.string(),
        budgetType: z.enum(["FIXED", "HOURLY"], {
            message: "Please select a budget type",
        }),
        budget: z.string(),
        minBudget: z.string(),
        maxBudget: z.string(),
        deadline: z.string(),
        estimatedDuration: z.string(),
        skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
        technologies: z.array(z.string()),
        experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
            message: "Please select experience level",
        }),
        projectType: z.string().min(1, "Please select project type"),
        tags: z.array(z.string()),
        isUrgent: z.boolean(),
    })
    .refine(
        (data) => {
            if (data.budgetType === "FIXED") {
                return data.budget && data.budget.trim() !== "" && !isNaN(Number(data.budget)) && Number(data.budget) > 0
            }
            return true
        },
        {
            message: "Budget is required and must be a positive number for fixed price projects",
            path: ["budget"],
        },
    )
    .refine(
        (data) => {
            if (data.budgetType === "HOURLY") {
                return (
                    data.minBudget && data.minBudget.trim() !== "" && !isNaN(Number(data.minBudget)) && Number(data.minBudget) > 0
                )
            }
            return true
        },
        {
            message: "Minimum hourly rate is required and must be a positive number",
            path: ["minBudget"],
        },
    )
    .refine(
        (data) => {
            if (data.budgetType === "HOURLY") {
                return (
                    data.maxBudget && data.maxBudget.trim() !== "" && !isNaN(Number(data.maxBudget)) && Number(data.maxBudget) > 0
                )
            }
            return true
        },
        {
            message: "Maximum hourly rate is required and must be a positive number",
            path: ["maxBudget"],
        },
    )
    .refine(
        (data) => {
            if (data.budgetType === "HOURLY" && data.minBudget && data.maxBudget) {
                const minNum = Number(data.minBudget)
                const maxNum = Number(data.maxBudget)
                if (!isNaN(minNum) && !isNaN(maxNum)) {
                    return minNum <= maxNum
                }
            }
            return true
        },
        {
            message: "Maximum rate must be greater than or equal to minimum rate",
            path: ["maxBudget"],
        },
    )

export type CreateProjectFormData = z.infer<typeof createProjectSchema>
