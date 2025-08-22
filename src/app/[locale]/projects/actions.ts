"use server";

import { type Project } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/server/auth/session";
import { prisma } from "@/lib/server/db";
// import { getUserSubscriptionPlan } from "@/lib/server/payment";

import { BudgetType, ExperienceLevel, ProjectStatus } from "@prisma/client";

interface AttachmentPayload {
    name: string;
    size: string;
}

interface QuestionPayload {
    question: string;
    answer?: string;
}

interface Payload {
    title: string;
    description: string;
    budget: string;
    budgetType: BudgetType;
    deadline: Date;
    category: string;
    subcategory?: string;
    experienceLevel: ExperienceLevel;
    projectType: string;
    attachments?: AttachmentPayload[];
    questions?: QuestionPayload[];
    technologies?: string[];
    skillsRequired?: string[];
    status?: ProjectStatus;
}

export async function createProject(payload: Payload) {
    const { user } = await getCurrentSession();

    if (!user?.id) {
        throw new Error("User must be logged in to create a project.");
    }

    await prisma.project.create({
        data: {
            title: payload.title,
            description: payload.description,
            budget: payload.budget,
            budgetType: payload.budgetType,
            deadline: payload.deadline,
            category: payload.category,
            subcategory: payload.subcategory,
            experienceLevel: payload.experienceLevel,
            projectType: payload.projectType,
            technologies: payload.technologies ?? [],
            skillsRequired: payload.skillsRequired ?? [],
            status: payload.status,

            attachments: payload.attachments && payload.attachments.length > 0
                ? {
                    create: payload.attachments.map((a) => ({
                        name: a.name,
                        size: a.size,
                    })),
                }
                : undefined,
            questions: payload.questions && payload.questions.length > 0
                ? {
                    create: payload.questions.map((q) => ({
                        question: q.question,
                        answer: q.answer,
                    })),
                }
                : undefined,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });

    revalidatePath(`/projects`);
}

// export async function checkIfFreePlanLimitReached() {
//     const { user } = await getCurrentSession();
//     const subscriptionPlan = await getUserSubscriptionPlan(user?.id as string);

//     // If user is on a free plan.
//     // Check if user has reached limit of 3 projects.
//     if (subscriptionPlan?.isPro) return false;

//     const count = await prisma.project.count({
//         where: {
//             userId: user?.id,
//         },
//     });

//     return count >= 3;
// }

export async function getProjects() {
    const { user } = await getCurrentSession();
    const projects = await prisma.project.findMany({
        where: {
            creatorId: user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return projects as Project[];
}

export async function getProjectById(id: string) {
    const { user } = await getCurrentSession();
    const project = await prisma.project.findFirst({
        where: {
            id,
            creatorId: user?.id,
        },
    });
    return project as Project;
}

export async function updateProjectById(id: string, payload: Payload) {
    const { user } = await getCurrentSession();

    if (!user?.id) {
        throw new Error("User must be logged in to update a project.");
    }

    await prisma.project.update({
        where: {
            id,
            creatorId: user.id,
        },
        data: {
            title: payload.title,
            description: payload.description,
            budget: payload.budget,
            budgetType: payload.budgetType,
            deadline: payload.deadline,
            category: payload.category,
            subcategory: payload.subcategory,
            experienceLevel: payload.experienceLevel,
            projectType: payload.projectType,
            technologies: payload.technologies ?? [],
            skillsRequired: payload.skillsRequired ?? [],
            status: payload.status,

            attachments: payload.attachments
                ? {
                    deleteMany: {},
                    create: payload.attachments.map((a) => ({
                        name: a.name,
                        size: a.size,
                    })),
                }
                : undefined,

            questions: payload.questions
                ? {
                    deleteMany: {}, // ⚠️ idem
                    create: payload.questions.map((q) => ({
                        question: q.question,
                        answer: q.answer,
                    })),
                }
                : undefined,
        },
    });

    revalidatePath(`/projects`);
}

export async function deleteProjectById(id: string) {
    const { user } = await getCurrentSession();
    await prisma.project.delete({
        where: {
            id,
            creatorId: user?.id,
        },
    });
    revalidatePath(`/projects`);
    redirect("/projects");
}