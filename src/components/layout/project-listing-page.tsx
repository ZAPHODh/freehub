"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Users } from "lucide-react"
import { ProjectsSearch } from "../section/projects/project-search"
import { ProjectsFilters } from "../section/projects/project-filters"
import { useMemo } from "react"
import { useProjectFilters } from "@/hooks/use-project-filters"

interface Project {
    id: string
    slug: string
    title: string
    description: string
    category: string
    subcategory: string
    budgetType: string
    budget: number | null
    minBudget: number | null
    maxBudget: number | null
    deadline: string | null
    estimatedDuration: string | null
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
    createdAt: string
    updatedAt: string
    postedAt: string | null
    user: {
        id: string
        name: string | null
        email: string
        clientProfile: {
            companyName: string | null
            averageRating: number | null
            totalReviews: number
        } | null
    }
}

interface ProjectsListingPageProps {
    projects: Project[]
}

export function ProjectsListingPage({ projects }: ProjectsListingPageProps) {
    const { filters, updateFilters, clearFilters, activeFiltersCount } = useProjectFilters()

    const formatBudget = (project: Project) => {
        if (project.budgetType === "FIXED" && project.budget) {
            return `$${project.budget.toLocaleString()}`
        } else if (project.budgetType === "HOURLY" && project.minBudget && project.maxBudget) {
            return `$${project.minBudget}-$${project.maxBudget}/hr`
        }
        return "Budget not specified"
    }

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return "Just now"
        if (diffInHours < 24) return `${diffInHours}h ago`
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}d ago`
        const diffInWeeks = Math.floor(diffInDays / 7)
        return `${diffInWeeks}w ago`
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Browse Projects</h1>
                <p className="text-muted-foreground">
                    Find your next freelance opportunity from thousands of projects
                </p>
            </div>

            <div className="mb-8 flex flex-col gap-4">
                <ProjectsSearch
                    value={filters.search}
                    onChange={(search) => updateFilters({ search })}
                />
                <ProjectsFilters
                    filters={filters}
                    onFiltersChange={updateFilters}
                    activeFiltersCount={activeFiltersCount}
                    onClearAll={clearFilters}
                />
            </div>

            <div className="grid gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {project.isFeatured && (
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                Featured
                                            </Badge>
                                        )}
                                        {project.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                                        <Badge variant="outline">{project.experienceLevel}</Badge>
                                    </div>
                                    <CardTitle className="text-xl mb-2 hover:text-primary cursor-pointer">
                                        {project.title}
                                    </CardTitle>
                                    <p className="text-muted-foreground line-clamp-3 mb-4">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary mb-1">
                                        {formatBudget(project)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {project.budgetType === "FIXED" ? "Fixed Price" : "Hourly Rate"}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.skillsRequired.slice(0, 5).map((skill) => (
                                            <Badge key={skill} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {project.skillsRequired.length > 5 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{project.skillsRequired.length - 5} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{project.proposals} proposals</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{formatTimeAgo(project.createdAt)}</span>
                                        </div>
                                        {project.deadline && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {project.user.clientProfile?.averageRating && (
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span>{project.user.clientProfile.averageRating.toFixed(1)}</span>
                                                <span>({project.user.clientProfile.totalReviews})</span>
                                            </div>
                                        )}
                                        <Button
                                            size="sm"
                                            onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        No projects found matching your criteria.
                    </p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    )
}