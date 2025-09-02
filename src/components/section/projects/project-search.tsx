// components/section/projects/project-search.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface ProjectsSearchProps {
    value: string
    onChange: (value: string) => void
    onSubmit?: (value: string) => void
}

export function ProjectsSearch({ value, onChange, onSubmit }: ProjectsSearchProps) {
    const [localValue, setLocalValue] = useState(value)

    // Sync with external value changes (from URL)
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    // Optional: Auto-search with debounce (uncomment if you want live search)
    const debouncedValue = useDebounce(localValue, 500)
    useEffect(() => {
        if (debouncedValue !== value) {
            onChange(debouncedValue)
        }
    }, [debouncedValue, value, onChange])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSubmit) {
            onSubmit(localValue)
        } else {
            onChange(localValue)
        }
    }

    const handleClear = () => {
        setLocalValue("")
        onChange("")
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                    type="text"
                    placeholder="Search projects by title, description, or skills..."
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className="pl-10 pr-20 h-12 text-base bg-white border-slate-200"
                />
                {localValue && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
                <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    Search
                </Button>
            </div>
        </form>
    )
}