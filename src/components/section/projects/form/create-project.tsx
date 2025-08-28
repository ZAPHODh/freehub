"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus } from "lucide-react"
import { createProject } from "@/app/[locale]/projects/actions"
import { toast } from "sonner"
import { CreateProjectFormData, createProjectSchema } from "@/lib/schemas/project"


export function CreateProjectForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [skillInput, setSkillInput] = useState("")
    const [techInput, setTechInput] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState<CreateProjectFormData>({
        title: "",
        description: "",
        category: "",
        subcategory: "",
        budgetType: "FIXED",
        budget: "",
        minBudget: "",
        maxBudget: "",
        deadline: "",
        estimatedDuration: "",
        skillsRequired: [],
        technologies: [],
        tags: [],
        experienceLevel: "INTERMEDIATE",
        projectType: "",
        isUrgent: false,
    })

    const updateField = (field: keyof CreateProjectFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const addSkill = () => {
        if (skillInput.trim()) {
            if (!formData.skillsRequired.includes(skillInput.trim())) {
                updateField("skillsRequired", [...formData.skillsRequired, skillInput.trim()])
            }
            setSkillInput("")
        }
    }

    const removeSkill = (skill: string) => {
        updateField(
            "skillsRequired",
            formData.skillsRequired.filter((s) => s !== skill),
        )
    }

    const addTechnology = () => {
        if (techInput.trim()) {
            if (!formData.technologies.includes(techInput.trim())) {
                updateField("technologies", [...formData.technologies, techInput.trim()])
            }
            setTechInput("")
        }
    }

    const removeTechnology = (tech: string) => {
        updateField(
            "technologies",
            formData.technologies.filter((t) => t !== tech),
        )
    }

    const addTag = () => {
        if (tagInput.trim()) {
            if (!formData.tags.includes(tagInput.trim())) {
                updateField("tags", [...formData.tags, tagInput.trim()])
            }
            setTagInput("")
        }
    }

    const removeTag = (tag: string) => {
        updateField(
            "tags",
            formData.tags.filter((t) => t !== tag),
        )
    }

    const validateForm = () => {
        try {
            createProjectSchema.parse(formData)
            setErrors({})
            return true
        } catch (error: any) {
            const newErrors: Record<string, string> = {}
            if (error.errors) {
                error.errors.forEach((err: any) => {
                    const field = err.path[0]
                    newErrors[field] = err.message
                })
            }
            setErrors(newErrors)
            return false
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Validation Error", {
                description: "Please fix the errors in the form",
            })
            return
        }

        setIsSubmitting(true)
        try {
            const formDataObj = new FormData()

            // Add all form fields to FormData
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formDataObj.append(key, JSON.stringify(value))
                } else if (value !== undefined && value !== null) {
                    formDataObj.append(key, value.toString())
                }
            })

            await createProject(formDataObj)

            toast.success("Success!", {
                description: "Your project has been created successfully.",
            })
        } catch (error) {
            toast.error("Error", {
                description: error instanceof Error ? error.message : "Failed to create project",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const categories = [
        "Web Development",
        "Mobile Development",
        "Design",
        "Writing",
        "Marketing",
        "Data Science",
        "DevOps",
        "Other",
    ]

    const projectTypes = [
        "Website",
        "Mobile App",
        "Desktop App",
        "API Development",
        "Database Design",
        "UI/UX Design",
        "Content Writing",
        "SEO/Marketing",
        "Data Analysis",
        "Other",
    ]

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide the essential details about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Project Title
                        </label>
                        <Input
                            id="title"
                            placeholder="Enter a clear, descriptive title for your project"
                            value={formData.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Project Description
                        </label>
                        <Textarea
                            id="description"
                            placeholder="Describe your project in detail. Include goals, requirements, and any specific features you need..."
                            className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                            value={formData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                            Minimum 50 characters. Be specific about what you need.
                        </p>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => updateField("category", e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md bg-background ${errors.category ? "border-red-500" : "border-input"}`}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label htmlFor="subcategory" className="block text-sm font-medium mb-2">
                                Subcategory (Optional)
                            </label>
                            <Input
                                id="subcategory"
                                placeholder="e.g., React Development, Logo Design"
                                value={formData.subcategory}
                                onChange={(e) => updateField("subcategory", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                            Project Type
                        </label>
                        <select
                            id="projectType"
                            value={formData.projectType}
                            onChange={(e) => updateField("projectType", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-background ${errors.projectType ? "border-red-500" : "border-input"}`}
                        >
                            <option value="">Select project type</option>
                            {projectTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Budget & Timeline</CardTitle>
                    <CardDescription>Set your budget and project timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label htmlFor="budgetType" className="block text-sm font-medium mb-2">
                            Budget Type
                        </label>
                        <select
                            id="budgetType"
                            value={formData.budgetType}
                            onChange={(e) => updateField("budgetType", e.target.value as "FIXED" | "HOURLY")}
                            className="w-full px-3 py-2 border rounded-md bg-background border-input"
                        >
                            <option value="FIXED">Fixed Price</option>
                            <option value="HOURLY">Hourly Rate</option>
                        </select>
                    </div>

                    {formData.budgetType === "FIXED" ? (
                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium mb-2">
                                Fixed Budget ($)
                            </label>
                            <Input
                                id="budget"
                                type="number"
                                placeholder="5000"
                                value={formData.budget}
                                onChange={(e) => updateField("budget", e.target.value)}
                                className={errors.budget ? "border-red-500" : ""}
                            />
                            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="minBudget" className="block text-sm font-medium mb-2">
                                    Min Hourly Rate ($)
                                </label>
                                <Input
                                    id="minBudget"
                                    type="number"
                                    placeholder="25"
                                    value={formData.minBudget}
                                    onChange={(e) => updateField("minBudget", e.target.value)}
                                    className={errors.minBudget ? "border-red-500" : ""}
                                />
                                {errors.minBudget && <p className="text-red-500 text-sm mt-1">{errors.minBudget}</p>}
                            </div>
                            <div>
                                <label htmlFor="maxBudget" className="block text-sm font-medium mb-2">
                                    Max Hourly Rate ($)
                                </label>
                                <Input
                                    id="maxBudget"
                                    type="number"
                                    placeholder="75"
                                    value={formData.maxBudget}
                                    onChange={(e) => updateField("maxBudget", e.target.value)}
                                    className={errors.maxBudget ? "border-red-500" : ""}
                                />
                                {errors.maxBudget && <p className="text-red-500 text-sm mt-1">{errors.maxBudget}</p>}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium mb-2">
                                Deadline (Optional)
                            </label>
                            <Input
                                id="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => updateField("deadline", e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="estimatedDuration" className="block text-sm font-medium mb-2">
                                Estimated Duration (Optional)
                            </label>
                            <Input
                                id="estimatedDuration"
                                placeholder="e.g., 2 weeks, 1 month"
                                value={formData.estimatedDuration}
                                onChange={(e) => updateField("estimatedDuration", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Skills & Requirements */}
            <Card>
                <CardHeader>
                    <CardTitle>Skills & Requirements</CardTitle>
                    <CardDescription>Specify the skills and technologies needed for your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label htmlFor="experienceLevel" className="block text-sm font-medium mb-2">
                            Required Experience Level
                        </label>
                        <select
                            id="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={(e) =>
                                updateField("experienceLevel", e.target.value as "BEGINNER" | "INTERMEDIATE" | "ADVANCED")
                            }
                            className="w-full px-3 py-2 border rounded-md bg-background border-input"
                        >
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Required Skills</label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a skill (e.g., React, Python, Photoshop)"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addSkill()
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addSkill} size="sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skillsRequired.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                                    >
                                        {skill}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeSkill(skill)}
                                            className="h-4 w-4 p-0 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Add at least one required skill for your project</p>
                        {errors.skillsRequired && <p className="text-red-500 text-sm mt-1">{errors.skillsRequired}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Technologies (Optional)</label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a technology (e.g., Node.js, PostgreSQL, AWS)"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addTechnology()
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addTechnology} size="sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map((tech) => (
                                    <div
                                        key={tech}
                                        className="flex items-center gap-1 border border-border bg-background px-2 py-1 rounded-md text-sm"
                                    >
                                        {tech}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeTechnology(tech)}
                                            className="h-4 w-4 p-0 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Tags (Optional)</label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add tags to help categorize your project"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addTag()
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addTag} size="sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                                    >
                                        {tag}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeTag(tag)}
                                            className="h-4 w-4 p-0 hover:text-primary-foreground/80"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Options */}
            <Card>
                <CardHeader>
                    <CardTitle>Additional Options</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="isUrgent"
                            checked={formData.isUrgent}
                            onChange={(e) => updateField("isUrgent", e.target.checked)}
                            className="mt-1"
                        />
                        <div className="space-y-1">
                            <label htmlFor="isUrgent" className="text-sm font-medium">
                                This is an urgent project
                            </label>
                            <p className="text-sm text-muted-foreground">Mark this project as urgent to attract faster responses</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                    Save as Draft
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Project..." : "Create Project"}
                </Button>
            </div>
        </form>
    )
}
