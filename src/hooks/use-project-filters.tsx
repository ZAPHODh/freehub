"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"

export interface Filters {
    search: string
    category: string
    budgetMin: number
    budgetMax: number
    experienceLevel: string
    sortBy: "newest" | "budget" | "proposals"
}

const DEFAULT_FILTERS: Filters = {
    search: "",
    category: "",
    budgetMin: 0,
    budgetMax: 50000,
    experienceLevel: "",
    sortBy: "newest"
}

export function useProjectFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const filters = useMemo<Filters>(() => ({
        search: searchParams.get("search") || DEFAULT_FILTERS.search,
        category: searchParams.get("category") || DEFAULT_FILTERS.category,
        budgetMin: parseInt(searchParams.get("budgetMin") || "") || DEFAULT_FILTERS.budgetMin,
        budgetMax: parseInt(searchParams.get("budgetMax") || "") || DEFAULT_FILTERS.budgetMax,
        experienceLevel: searchParams.get("experienceLevel") || DEFAULT_FILTERS.experienceLevel,
        sortBy: (searchParams.get("sortBy") as Filters["sortBy"]) || DEFAULT_FILTERS.sortBy
    }), [searchParams])

    const updateFilters = useCallback((newFilters: Partial<Filters>) => {
        const current = new URLSearchParams(searchParams.toString())

        for (const [key, value] of Object.entries(newFilters) as [keyof Filters, any][]) {
            const defaultValue = DEFAULT_FILTERS[key]

            if (value === "" || value === null || value === undefined || value === defaultValue) {
                current.delete(key)
            } else {
                current.set(key, String(value))
            }
        }

        current.delete("page")

        const query = current.toString()
        router.push(`${pathname}${query ? `?${query}` : ""}`)
    }, [searchParams, router, pathname])

    const clearFilters = useCallback(() => {
        router.push(pathname)
    }, [router, pathname])

    const activeFiltersCount = useMemo(() => {
        return Object.entries(filters).filter(([key, value]) => {
            const defaultValue = DEFAULT_FILTERS[key as keyof Filters]
            return value !== defaultValue && value !== ""
        }).length
    }, [filters])

    return {
        filters,
        updateFilters,
        clearFilters,
        activeFiltersCount,
        defaultFilters: DEFAULT_FILTERS
    }
}