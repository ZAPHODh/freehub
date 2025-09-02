
import { ProjectsListingPage } from "@/components/layout/project-listing-page"
import { getProjects } from "./actions"


interface ProjectsPageProps {
    searchParams: Promise<{
        search?: string
        category?: string
        budgetMin?: string
        budgetMax?: string
        experienceLevel?: string
        sortBy?: "newest" | "budget" | "proposals"
    }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
    const params = await searchParams

    const filters = {
        search: params.search || "",
        category: params.category || "",
        budgetMin: params.budgetMin ? Number.parseInt(params.budgetMin) : 0,
        budgetMax: params.budgetMax ? Number.parseInt(params.budgetMax) : 50000,
        experienceLevel: params.experienceLevel || "",
        sortBy: params.sortBy || ("newest" as const),
    }

    const result = await getProjects(filters)

    return <ProjectsListingPage projects={result.projects as any} />
}

export async function generateMetadata() {
    return {
        title: "Browse Projects | Freelance Marketplace",
        description:
            "Find your next freelance project. Browse thousands of opportunities across web development, mobile apps, design, and more.",
    }
}
