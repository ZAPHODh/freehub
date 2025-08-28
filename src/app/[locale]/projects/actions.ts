"use server"

import { getCurrentSession } from "@/lib/server/auth/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/server/db"
import { z } from "zod"
import type { ExperienceLevel, BudgetType, ProjectStatus } from "@prisma/client"
import { generateUniqueSlug } from "@/lib/utils"
import { createProjectSchema } from "@/lib/schemas/project"



export async function createProject(formData: FormData) {
    try {
        const { user } = await getCurrentSession()
        if (!user) {
            throw new Error("You must be logged in to create a project")
        }

        const rawData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            subcategory: formData.get("subcategory") as string || undefined,
            budgetType: formData.get("budgetType") as string,
            budget: formData.get("budget") as string,
            minBudget: formData.get("minBudget") as string || undefined,
            maxBudget: formData.get("maxBudget") as string || undefined,
            deadline: formData.get("deadline") as string || undefined,
            estimatedDuration: formData.get("estimatedDuration") as string || undefined,
            skillsRequired: JSON.parse((formData.get("skillsRequired") as string) || "[]"),
            technologies: JSON.parse((formData.get("technologies") as string) || "[]"),
            experienceLevel: formData.get("experienceLevel") as string,
            projectType: formData.get("projectType") as string,
            tags: JSON.parse((formData.get("tags") as string) || "[]"),
            isUrgent: formData.get("isUrgent") === "true",
        }

        const validatedData = createProjectSchema.parse({
            ...rawData,
            budgetType: rawData.budgetType?.toUpperCase(),
            experienceLevel: rawData.experienceLevel?.toUpperCase(),
        })
        // const baseSlug = validatedData.title
        //     .toLowerCase()
        //     .replace(/[^a-z0-9\s-]/g, '')
        //     .replace(/\s+/g, '-')
        //     .trim()

        // let slug = baseSlug
        // let slugExists = await prisma.project.findFirst({ where: { slug } })
        // let counter = 1

        // while (slugExists) {
        //     slug = `${baseSlug}-${counter}`
        //     slugExists = await prisma.project.findFirst({ where: { slug } })
        //     counter++
        // }

        const slug = await generateUniqueSlug(formData.get("title") as string, prisma.project);

        const project = await prisma.project.create({
            data: {
                title: validatedData.title,
                slug: slug,
                description: validatedData.description,
                category: validatedData.category,
                subcategory: validatedData.subcategory,
                budgetType: validatedData.budgetType as BudgetType,
                budget: validatedData.budget,
                minBudget: validatedData.minBudget ? Number.parseFloat(validatedData.minBudget) : null,
                maxBudget: validatedData.maxBudget ? Number.parseFloat(validatedData.maxBudget) : null,
                deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
                estimatedDuration: validatedData.estimatedDuration,
                skillsRequired: validatedData.skillsRequired,
                technologies: validatedData.technologies,
                experienceLevel: validatedData.experienceLevel as ExperienceLevel,
                projectType: validatedData.projectType,
                tags: validatedData.tags,
                isUrgent: validatedData.isUrgent,
                status: "OPEN",
                creatorId: user.id as string,
            },
        })

        revalidatePath("/projects")
        redirect(`/projects/${project.slug}`)
    } catch (error) {
        console.error("Error creating project:", error)
        if (error instanceof z.ZodError) {
            throw new Error(`Validation error: ${error.issues.map((e) => e.message).join(", ")}`)
        }
        throw new Error("Failed to create project. Please try again.")
    }
}

export async function getProjects(filters?: {
    category?: string
    subcategory?: string
    budgetType?: string
    experienceLevel?: string
    skillsRequired?: string[]
    technologies?: string[]
    projectType?: string
    search?: string
    minBudget?: number
    maxBudget?: number
    isUrgent?: boolean
    isFeatured?: boolean
    page?: number
    limit?: number
}) {
    try {
        const page = filters?.page || 1
        const limit = filters?.limit || 10
        const skip = (page - 1) * limit

        const where: any = {
            status: "OPEN",
        }

        if (filters?.category) {
            where.category = filters.category
        }

        if (filters?.subcategory) {
            where.subcategory = filters.subcategory
        }

        if (filters?.budgetType) {
            where.budgetType = filters.budgetType.toUpperCase()
        }

        if (filters?.experienceLevel) {
            where.experienceLevel = filters.experienceLevel.toUpperCase()
        }

        if (filters?.projectType) {
            where.projectType = filters.projectType
        }

        if (filters?.isUrgent !== undefined) {
            where.isUrgent = filters.isUrgent
        }

        if (filters?.isFeatured !== undefined) {
            where.isFeatured = filters.isFeatured
        }

        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: "insensitive" } },
                { description: { contains: filters.search, mode: "insensitive" } },
                { category: { contains: filters.search, mode: "insensitive" } },
                { subcategory: { contains: filters.search, mode: "insensitive" } },
            ]
        }

        if (filters?.skillsRequired && filters.skillsRequired.length > 0) {
            where.skillsRequired = {
                hasSome: filters.skillsRequired,
            }
        }

        if (filters?.technologies && filters.technologies.length > 0) {
            where.technologies = {
                hasSome: filters.technologies,
            }
        }

        // Budget filtering
        if (filters?.minBudget !== undefined || filters?.maxBudget !== undefined) {
            where.AND = where.AND || []

            if (filters.minBudget !== undefined) {
                where.AND.push({
                    OR: [
                        { minBudget: { gte: filters.minBudget } },
                        { maxBudget: { gte: filters.minBudget } },
                    ]
                })
            }

            if (filters.maxBudget !== undefined) {
                where.AND.push({
                    OR: [
                        { maxBudget: { lte: filters.maxBudget } },
                        { minBudget: { lte: filters.maxBudget } },
                    ]
                })
            }
        }

        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    category: true,
                    subcategory: true,
                    budgetType: true,
                    budget: true,
                    minBudget: true,
                    maxBudget: true,
                    deadline: true,
                    estimatedDuration: true,
                    skillsRequired: true,
                    technologies: true,
                    experienceLevel: true,
                    projectType: true,
                    tags: true,
                    isUrgent: true,
                    isFeatured: true,
                    status: true,
                    proposals: true,
                    views: true,
                    createdAt: true,
                    updatedAt: true,
                    postedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            clientProfile: {
                                select: {
                                    companyName: true,
                                    averageRating: true,
                                    totalReviews: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [
                    { isFeatured: "desc" },
                    { isUrgent: "desc" },
                    { createdAt: "desc" },
                ],
                skip,
                take: limit,
            }),
            prisma.project.count({ where }),
        ])

        return {
            projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        }
    } catch (error) {
        console.error("Error fetching projects:", error)
        throw new Error("Failed to fetch projects")
    }
}

export async function getProjectById(id: string) {
    try {
        const project = await prisma.project.findFirst({
            where: {
                OR: [
                    { id },
                    { slug: id }
                ]
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        picture: true,
                        location: true,
                        clientProfile: {
                            select: {
                                companyName: true,
                                industry: true,
                                totalSpent: true,
                                projectsPosted: true,
                                averageRating: true,
                                totalReviews: true,
                            },
                        },
                    },
                },
                projectProposals: {
                    include: {
                        freelancer: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                picture: true,
                                freelancerProfile: {
                                    select: {
                                        title: true,
                                        hourlyRate: true,
                                        averageRating: true,
                                        totalReviews: true,
                                        completedJobs: true,
                                        successRate: true,
                                    },
                                },
                            },
                        },
                        attachments: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                attachments: true,
                questions: true,
                favorites: {
                    select: {
                        userId: true,
                    },
                },
            },
        })

        if (!project) {
            throw new Error("Project not found")
        }

        await prisma.project.update({
            where: { id: project.id },
            data: { views: { increment: 1 } },
        })

        return project
    } catch (error) {
        console.error("Error fetching project:", error)
        throw new Error("Failed to fetch project")
    }
}

export async function updateProject(id: string, formData: FormData) {
    try {
        const { user } = await getCurrentSession()
        if (!user) {
            throw new Error("You must be logged in to update a project")
        }

        const existingProject = await prisma.project.findFirst({
            where: {
                OR: [
                    { id },
                    { slug: id }
                ]
            },
            select: { id: true, creatorId: true, status: true, slug: true },
        })

        if (!existingProject || existingProject.creatorId !== user.id) {
            throw new Error("You don't have permission to update this project")
        }

        if (existingProject.status !== "OPEN") {
            throw new Error("Cannot update a project that is not open")
        }

        const rawData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            subcategory: formData.get("subcategory") as string || undefined,
            budgetType: formData.get("budgetType") as string,
            budget: formData.get("budget") as string,
            minBudget: formData.get("minBudget") as string || undefined,
            maxBudget: formData.get("maxBudget") as string || undefined,
            deadline: formData.get("deadline") as string || undefined,
            estimatedDuration: formData.get("estimatedDuration") as string || undefined,
            skillsRequired: JSON.parse((formData.get("skillsRequired") as string) || "[]"),
            technologies: JSON.parse((formData.get("technologies") as string) || "[]"),
            experienceLevel: formData.get("experienceLevel") as string,
            projectType: formData.get("projectType") as string,
            tags: JSON.parse((formData.get("tags") as string) || "[]"),
            isUrgent: formData.get("isUrgent") === "true",
        }

        const validatedData = createProjectSchema.parse({
            ...rawData,
            budgetType: rawData.budgetType?.toUpperCase(),
            experienceLevel: rawData.experienceLevel?.toUpperCase(),
        })

        // Check if title changed and generate new slug if needed
        let newSlug = existingProject.slug
        if (validatedData.title) {
            const baseSlug = validatedData.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()

            if (baseSlug !== existingProject.slug) {
                let slug = baseSlug
                let slugExists = await prisma.project.findFirst({
                    where: {
                        slug,
                        NOT: { id: existingProject.id }
                    }
                })
                let counter = 1

                while (slugExists) {
                    slug = `${baseSlug}-${counter}`
                    slugExists = await prisma.project.findFirst({
                        where: {
                            slug,
                            NOT: { id: existingProject.id }
                        }
                    })
                    counter++
                }
                newSlug = slug
            }
        }

        const updatedProject = await prisma.project.update({
            where: { id: existingProject.id },
            data: {
                title: validatedData.title,
                slug: newSlug,
                description: validatedData.description,
                category: validatedData.category,
                subcategory: validatedData.subcategory,
                budgetType: validatedData.budgetType as BudgetType,
                budget: validatedData.budget,
                minBudget: validatedData.minBudget ? Number.parseFloat(validatedData.minBudget) : null,
                maxBudget: validatedData.maxBudget ? Number.parseFloat(validatedData.maxBudget) : null,
                deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
                estimatedDuration: validatedData.estimatedDuration,
                skillsRequired: validatedData.skillsRequired,
                technologies: validatedData.technologies,
                experienceLevel: validatedData.experienceLevel as ExperienceLevel,
                projectType: validatedData.projectType,
                tags: validatedData.tags,
                isUrgent: validatedData.isUrgent,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        revalidatePath(`/projects/${updatedProject.slug}`)
        revalidatePath("/projects")

        return updatedProject
    } catch (error) {
        console.error("Error updating project:", error)
        if (error instanceof z.ZodError) {
            throw new Error(`Validation error: ${error.issues.map((e) => e.message).join(", ")}`)
        }
        throw new Error("Failed to update project. Please try again.")
    }
}

export async function deleteProject(id: string) {
    try {
        const { user } = await getCurrentSession()
        if (!user) {
            throw new Error("You must be logged in to delete a project")
        }

        const existingProject = await prisma.project.findFirst({
            where: {
                OR: [
                    { id },
                    { slug: id }
                ]
            },
            select: { id: true, creatorId: true, status: true },
        })

        if (!existingProject || existingProject.creatorId !== user.id) {
            throw new Error("You don't have permission to delete this project")
        }

        if (existingProject.status !== "OPEN") {
            throw new Error("Cannot delete a project that is not open")
        }

        await prisma.project.delete({
            where: { id: existingProject.id },
        })

        revalidatePath("/projects")
        redirect("/projects")
    } catch (error) {
        console.error("Error deleting project:", error)
        throw new Error("Failed to delete project. Please try again.")
    }
}

export async function toggleProjectFavorite(projectId: string) {
    try {
        const { user } = await getCurrentSession()
        if (!user) {
            throw new Error("You must be logged in to favorite a project")
        }

        const existingFavorite = await prisma.userFavoriteProject.findUnique({
            where: {
                userId_projectId: {
                    userId: user.id,
                    projectId: projectId,
                },
            },
        })

        if (existingFavorite) {
            await prisma.userFavoriteProject.delete({
                where: {
                    userId_projectId: {
                        userId: user.id,
                        projectId: projectId,
                    },
                },
            })
            return { favorited: false }
        } else {
            await prisma.userFavoriteProject.create({
                data: {
                    userId: user.id,
                    projectId: projectId,
                },
            })
            return { favorited: true }
        }
    } catch (error) {
        console.error("Error toggling project favorite:", error)
        throw new Error("Failed to update favorite status")
    }
}

export async function closeProject(id: string) {
    try {
        const { user } = await getCurrentSession()
        if (!user) {
            throw new Error("You must be logged in to close a project")
        }

        const existingProject = await prisma.project.findFirst({
            where: {
                OR: [
                    { id },
                    { slug: id }
                ]
            },
            select: { id: true, creatorId: true, status: true },
        })

        if (!existingProject || existingProject.creatorId !== user.id) {
            throw new Error("You don't have permission to close this project")
        }

        if (existingProject.status !== "OPEN") {
            throw new Error("Project is not open")
        }

        const updatedProject = await prisma.project.update({
            where: { id: existingProject.id },
            data: {
                status: "CLOSED",
                closedAt: new Date(),
            },
        })

        revalidatePath("/projects")
        return updatedProject
    } catch (error) {
        console.error("Error closing project:", error)
        throw new Error("Failed to close project")
    }
}