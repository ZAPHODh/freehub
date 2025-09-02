"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"


import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import MultipleSelector, { type Option } from "@/components/ui/multiselect"
import { type CreateProjectFormData, createProjectSchema } from "@/lib/zod/project"
import { AlertCircle, DollarSign, Calendar, Clock, Tag, Zap } from "lucide-react"
import { createProject } from "@/app/[locale]/projects/actions"

const skillsOptions: Option[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "php", label: "PHP" },
    { value: "csharp", label: "C#" },
    { value: "sql", label: "SQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "redis", label: "Redis" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "Google Cloud" },
    { value: "devops", label: "DevOps" },
    { value: "ui-ux", label: "UI/UX Design" },
    { value: "figma", label: "Figma" },
    { value: "photoshop", label: "Photoshop" },
    { value: "illustrator", label: "Illustrator" },
]

const technologiesOptions: Option[] = [
    { value: "nextjs", label: "Next.js" },
    { value: "nuxtjs", label: "Nuxt.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "gatsby", label: "Gatsby" },
    { value: "express", label: "Express.js" },
    { value: "nestjs", label: "NestJS" },
    { value: "fastapi", label: "FastAPI" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "laravel", label: "Laravel" },
    { value: "symfony", label: "Symfony" },
    { value: "spring", label: "Spring Boot" },
    { value: "dotnet", label: ".NET" },
    { value: "tailwindcss", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "sass", label: "Sass" },
    { value: "styled-components", label: "Styled Components" },
    { value: "graphql", label: "GraphQL" },
    { value: "rest-api", label: "REST API" },
    { value: "websocket", label: "WebSocket" },
    { value: "jwt", label: "JWT" },
    { value: "oauth", label: "OAuth" },
]

const tagsOptions: Option[] = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
    { value: "mobile", label: "Mobile" },
    { value: "web", label: "Web" },
    { value: "desktop", label: "Desktop" },
    { value: "api", label: "API" },
    { value: "database", label: "Database" },
    { value: "ui-design", label: "UI Design" },
    { value: "ux-design", label: "UX Design" },
    { value: "responsive", label: "Responsive Design" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "cms", label: "CMS" },
    { value: "blog", label: "Blog" },
    { value: "portfolio", label: "Portfolio" },
    { value: "dashboard", label: "Dashboard" },
    { value: "admin-panel", label: "Admin Panel" },
    { value: "automation", label: "Automation" },
    { value: "data-analysis", label: "Data Analysis" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "blockchain", label: "Blockchain" },
    { value: "testing", label: "Testing" },
    { value: "performance", label: "Performance" },
    { value: "security", label: "Security" },
    { value: "maintenance", label: "Maintenance" },
    { value: "bug-fix", label: "Bug Fix" },
    { value: "refactoring", label: "Refactoring" },
    { value: "migration", label: "Migration" },
    { value: "integration", label: "Integration" },
]

const categoryOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "desktop-development", label: "Desktop Development" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "data-science", label: "Data Science" },
    { value: "devops", label: "DevOps" },
    { value: "blockchain", label: "Blockchain" },
    { value: "ai-ml", label: "AI/Machine Learning" },
    { value: "game-development", label: "Game Development" },
    { value: "other", label: "Other" },
]

const projectTypeOptions = [
    { value: "website", label: "Website" },
    { value: "web-app", label: "Web Application" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "desktop-app", label: "Desktop Application" },
    { value: "api", label: "API Development" },
    { value: "database", label: "Database Design" },
    { value: "integration", label: "System Integration" },
    { value: "maintenance", label: "Maintenance & Support" },
    { value: "consulting", label: "Consulting" },
    { value: "other", label: "Other" },
]

export function CreateProjectForm() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
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
            experienceLevel: "BEGINNER",
            projectType: "",
            tags: [],
            isUrgent: false,
        },
    })

    const budgetType = form.watch("budgetType")
    const selectedSkills = form.watch("skillsRequired")
    const selectedTags = form.watch("tags")

    function onSubmit(values: CreateProjectFormData) {
        setError(null)

        const formData = new FormData()
        Object.entries(values).forEach(([key, val]) => {
            if (Array.isArray(val)) {
                formData.append(key, JSON.stringify(val))
            } else if (typeof val === "boolean") {
                formData.append(key, val.toString())
            } else if (val !== null && val !== undefined) {
                formData.append(key, String(val))
            }
        })

        startTransition(async () => {
            try {
                await createProject(formData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to create project")
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Tag className="h-5 w-5" />
                                Project Details
                            </CardTitle>
                            <CardDescription>Provide basic information about your project</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a clear, descriptive project title" {...field} className="text-lg" />
                                        </FormControl>
                                        <FormDescription>A compelling title helps attract the right freelancers</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your project in detail. Include objectives, requirements, deliverables, and any specific preferences..."
                                                className="min-h-32 resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>{field.value?.length || 0}/2000 characters (minimum 50 required)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select project category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categoryOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="projectType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Type *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select project type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {projectTypeOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="subcategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subcategory</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional: Specify a subcategory" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Budget Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Budget & Timeline
                            </CardTitle>
                            <CardDescription>Set your budget and project timeline</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="budgetType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget Type *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select budget type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="FIXED">Fixed Price</SelectItem>
                                                <SelectItem value="HOURLY">Hourly Rate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {budgetType === "FIXED"
                                                ? "Pay a fixed amount for the entire project"
                                                : "Pay based on hours worked"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {budgetType === "FIXED" ? (
                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fixed Budget ($) *</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter total project budget" {...field} />
                                            </FormControl>
                                            <FormDescription>Total amount you're willing to pay for this project</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="minBudget"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Min Hourly Rate ($) *</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Minimum rate" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="maxBudget"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Max Hourly Rate ($) *</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Maximum rate" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="deadline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Project Deadline
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormDescription>When do you need this completed?</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="estimatedDuration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Estimated Duration
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 2 weeks, 1 month" {...field} />
                                            </FormControl>
                                            <FormDescription>How long do you expect this to take?</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                            <FormField
                                control={form.control}
                                name="skillsRequired"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Required Skills *</FormLabel>
                                        <FormControl>
                                            <MultipleSelector
                                                value={field.value.map((skill) => ({ value: skill, label: skill }))}
                                                onChange={(options) => field.onChange(options.map((option) => option.value))}
                                                defaultOptions={skillsOptions}
                                                placeholder="Select required skills"
                                                emptyIndicator={<p className="text-center text-sm text-muted-foreground">No skills found</p>}
                                                commandProps={{
                                                    label: "Select skills",
                                                }}
                                            />
                                        </FormControl>
                                        {selectedSkills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedSkills.map((skill) => (
                                                    <Badge key={skill} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <FormDescription>Select the key skills freelancers need for this project</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="technologies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred Technologies</FormLabel>
                                        <FormControl>
                                            <MultipleSelector
                                                value={field.value.map((tech) => ({ value: tech, label: tech }))}
                                                onChange={(options) => field.onChange(options.map((option) => option.value))}
                                                defaultOptions={technologiesOptions}
                                                placeholder="Select preferred technologies"
                                                emptyIndicator={
                                                    <p className="text-center text-sm text-muted-foreground">No technologies found</p>
                                                }
                                                commandProps={{
                                                    label: "Select technologies",
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>Specify any particular frameworks, tools, or technologies</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="experienceLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Required Experience Level *</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select experience level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="BEGINNER">
                                                    <div className="flex flex-col">
                                                        <span>Beginner</span>
                                                        <span className="text-xs text-muted-foreground">Entry level, learning projects</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="INTERMEDIATE">
                                                    <div className="flex flex-col">
                                                        <span>Intermediate</span>
                                                        <span className="text-xs text-muted-foreground">Some experience, standard projects</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="ADVANCED">
                                                    <div className="flex flex-col">
                                                        <span>Advanced</span>
                                                        <span className="text-xs text-muted-foreground">Expert level, complex projects</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Additional Options */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Options</CardTitle>
                            <CardDescription>Add tags and special requirements for your project</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Tags</FormLabel>
                                        <FormControl>
                                            <MultipleSelector
                                                value={field.value.map((tag) => ({ value: tag, label: tag }))}
                                                onChange={(options) => field.onChange(options.map((option) => option.value))}
                                                defaultOptions={tagsOptions}
                                                placeholder="Select project tags"
                                                emptyIndicator={<p className="text-center text-sm text-muted-foreground">No tags found</p>}
                                                commandProps={{
                                                    label: "Select tags",
                                                }}
                                            />
                                        </FormControl>
                                        {selectedTags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedTags.map((tag) => (
                                                    <Badge key={tag} variant="outline">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <FormDescription>Tags help categorize and make your project more discoverable</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isUrgent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="flex items-center gap-2">
                                                <Zap className="h-4 w-4 text-orange-500" />
                                                Mark as Urgent
                                            </FormLabel>
                                            <FormDescription>
                                                Urgent projects get priority visibility and attract faster responses
                                            </FormDescription>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Separator />

                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="min-w-32">
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Creating...
                                </div>
                            ) : (
                                "Create Project"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
