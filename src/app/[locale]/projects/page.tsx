
import { ProjectsListingPage } from "@/components/layout/project-listing-page"
import { getProjects } from "./actions"


interface ProjectsPageProps {
    searchParams: {
        search?: string
        category?: string
        budgetMin?: string
        budgetMax?: string
        experienceLevel?: string
        sortBy?: "newest" | "budget" | "proposals"
    }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
    const filters = {
        search: searchParams.search || "",
        category: searchParams.category || "",
        budgetMin: searchParams.budgetMin ? Number.parseInt(searchParams.budgetMin) : 0,
        budgetMax: searchParams.budgetMax ? Number.parseInt(searchParams.budgetMax) : 50000,
        experienceLevel: searchParams.experienceLevel || "",
        sortBy: searchParams.sortBy || ("newest" as const),
    }

    const result = await getProjects(filters)

    return <ProjectsListingPage initialProjects={result.projects as any} initialFilters={filters} />
}

export async function generateMetadata() {
    return {
        title: "Browse Projects | Freelance Marketplace",
        description:
            "Find your next freelance project. Browse thousands of opportunities across web development, mobile apps, design, and more.",
    }
}
