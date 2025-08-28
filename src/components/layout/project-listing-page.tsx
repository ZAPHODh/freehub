"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Grid, List } from "lucide-react"
import { ProjectsSearch } from "../section/projects/project-search"
import { ProjectsFilters } from "../section/projects/project-filters"
import { Button } from "../ui/button"
import { ProjectCard } from "../section/projects/project-card"
import Link from "next/link"

interface Project {
    id: string
    slug: string
    title: string
    description: string
    category: string
    subcategory: string
    budgetType: string
    budget: string
    minBudget: number
    maxBudget: number
    deadline: Date
    estimatedDuration: string
    skillsRequired: string[]
    technologies: string[]
    experienceLevel: string
    projectType: string
    tags: string[]
    isUrgent: boolean
    isFeatured: boolean
    status: string
    proposals: number
    views: number
    createdAt: Date
    updatedAt: Date
    postedAt: Date
    user: {
        id: string
        name: string
        email: string
        picture: string
        location: string
        clientProfile?: {
            companyName: string
            industry: string
            totalSpent: number
            projectsPosted: number
            averageRating: number
            totalReviews: number
        }
    }
}

interface Filters {
    search: string
    category: string
    budgetMin: number
    budgetMax: number
    experienceLevel: string
    sortBy: "newest" | "budget" | "proposals"
}

interface ProjectsListingPageProps {
    initialProjects: Project[]
    initialFilters: Filters
}

export function ProjectsListingPage({ initialProjects, initialFilters }: ProjectsListingPageProps) {
    const router = useRouter()
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [filters, setFilters] = useState<Filters>(initialFilters)

    const projects = initialProjects

    const handleFiltersChange = (newFilters: Partial<Filters>) => {
        const updatedFilters = { ...filters, ...newFilters }
        setFilters(updatedFilters)

        const params = new URLSearchParams()
        if (updatedFilters.search) params.set("search", updatedFilters.search)
        if (updatedFilters.category) params.set("category", updatedFilters.category)
        if (updatedFilters.budgetMin > 0) params.set("budgetMin", updatedFilters.budgetMin.toString())
        if (updatedFilters.budgetMax < 50000) params.set("budgetMax", updatedFilters.budgetMax.toString())
        if (updatedFilters.experienceLevel) params.set("experienceLevel", updatedFilters.experienceLevel)
        if (updatedFilters.sortBy !== "newest") params.set("sortBy", updatedFilters.sortBy)

        router.push(`/projects?${params.toString()}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">Find Your Next Project</h1>
                        <p className="text-lg text-slate-600">Discover opportunities that match your skills and expertise</p>
                    </div>
                    <Button className="my-4" asChild>
                        <Link href={'/projects/new'}>
                            New Project
                        </Link>
                    </Button>
                </div>

                <div className="mb-8 space-y-6">
                    <ProjectsSearch value={filters.search} onChange={(search) => handleFiltersChange({ search })} />

                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <ProjectsFilters filters={filters} onChange={handleFiltersChange} />

                        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="h-8 w-8 p-0"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="h-8 w-8 p-0"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-slate-600">{projects.length} projects found</p>
                </div>

                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} viewMode={viewMode} />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-slate-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No projects found</h3>
                        <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
