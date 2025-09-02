// components/section/projects/project-filters.tsx
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { X } from "lucide-react"
import { Filters } from "@/hooks/use-project-filters"

interface ProjectsFiltersProps {
    filters: Filters
    onFiltersChange: (filters: Partial<Filters>) => void
    activeFiltersCount: number
    onClearAll: () => void
}

const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Data Science",
    "DevOps",
    "Marketing",
    "Writing",
    "Video & Animation",
]

const experienceLevels = [
    { value: "ENTRY", label: "Entry Level" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
    { value: "EXPERT", label: "Expert" },
]

const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "budget", label: "Highest Budget" },
    { value: "proposals", label: "Most Proposals" },
]

export function ProjectsFilters({
    filters,
    onFiltersChange,
    activeFiltersCount,
    onClearAll
}: ProjectsFiltersProps) {

    return (
        <div className="flex flex-wrap items-center gap-4">
            <Select
                value={filters.category || "all"}
                onValueChange={(value) => onFiltersChange({ category: value === "all" ? "" : value })}
            >
                <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.experienceLevel || "all"}
                onValueChange={(value) => onFiltersChange({ experienceLevel: value === "all" ? "" : value })}
            >
                <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                            {level.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.sortBy}
                onValueChange={(value: "newest" | "budget" | "proposals") =>
                    onFiltersChange({ sortBy: value })
                }
            >
                <SelectTrigger className="w-48 bg-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                        {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
                    </Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearAll}
                        className="h-8 px-2 text-slate-600 hover:text-slate-900"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    )
}