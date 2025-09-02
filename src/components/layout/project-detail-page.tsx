"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    MapPin,
    Calendar,
    Clock,
    DollarSign,
    Users,
    Star,
    Eye,
    MessageSquare,
    Building2,
    Award,
} from "lucide-react"
import { toggleProjectFavorite } from "@/app/[locale]/projects/actions"
import { useState } from "react"

interface ProjectDetailPageProps {
    project: {
        id: string
        slug: string
        title: string
        description: string
        category: string
        subcategory?: string
        budgetType: "FIXED" | "HOURLY"
        budget: string
        minBudget?: number
        maxBudget?: number
        deadline?: Date
        estimatedDuration?: string
        skillsRequired: string[]
        technologies: string[]
        experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
        projectType: string
        tags: string[]
        isUrgent: boolean
        isFeatured: boolean
        status: string
        proposals: number
        views: number
        createdAt: Date
        user: {
            id: string
            name: string
            email: string
            picture?: string
            location?: string
            clientProfile?: {
                companyName?: string
                industry?: string
                totalSpent: number
                projectsPosted: number
                averageRating: number
                totalReviews: number
            }
        }
    }
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
    const [isFavorited, setIsFavorited] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleFavorite = async () => {
        setIsLoading(true)
        try {
            const result = await toggleProjectFavorite(project.id)
            setIsFavorited(result.favorited)
        } catch (error) {
            console.error("Failed to toggle favorite:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const formatBudget = () => {
        if (project.budgetType === "FIXED") {
            return `$${project.minBudget?.toLocaleString()} - $${project.maxBudget?.toLocaleString()}`
        }
        return project.budget
    }

    const getExperienceLevelColor = (level: string) => {
        switch (level) {
            case "BEGINNER":
                return "bg-green-100 text-green-800"
            case "INTERMEDIATE":
                return "bg-yellow-100 text-yellow-800"
            case "ADVANCED":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                {project.isFeatured && (
                                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                                        <Award className="w-3 h-3 mr-1" />
                                        Featured
                                    </Badge>
                                )}
                                {project.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                                <Badge variant="outline">{project.category}</Badge>
                            </div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">{project.title}</h1>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{project.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{project.proposals} proposals</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Posted {project.createdAt.toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Skills & Technologies Required</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Skills Required</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skillsRequired.map((skill) => (
                                                <Badge key={skill} variant="secondary">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    {project.technologies.length > 0 && (
                                        <div>
                                            <h4 className="font-medium mb-2">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <Badge key={tech} variant="outline">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Budget</p>
                                            <p className="text-sm text-muted-foreground">{formatBudget()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Duration</p>
                                            <p className="text-sm text-muted-foreground">{project.estimatedDuration || "Not specified"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Experience Level</p>
                                            <Badge className={getExperienceLevelColor(project.experienceLevel)}>
                                                {project.experienceLevel}
                                            </Badge>
                                        </div>
                                    </div>
                                    {project.deadline && (
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">Deadline</p>
                                                <p className="text-sm text-muted-foreground">{project.deadline.toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>About the Client</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={project.user.picture || "/placeholder.svg"} alt={project.user.name} />
                                            <AvatarFallback>
                                                {project.user.name ? project.user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("") : "E"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{project.user.name}</h4>
                                            {project.user.clientProfile?.companyName && (
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Building2 className="w-3 h-3" />
                                                    {project.user.clientProfile.companyName}
                                                </p>
                                            )}
                                            {project.user.location && (
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {project.user.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {project.user.clientProfile && (
                                        <>
                                            <Separator />
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Rating</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-medium">{project.user.clientProfile.averageRating.toFixed(1)}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            ({project.user.clientProfile.totalReviews} reviews)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Total Spent</span>
                                                    <span className="font-medium">${project.user.clientProfile.totalSpent.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Projects Posted</span>
                                                    <span className="font-medium">{project.user.clientProfile.projectsPosted}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-3">
                                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                        Send Proposal
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent"
                                        onClick={handleFavorite}
                                        disabled={isLoading}
                                    >
                                        <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-current text-red-500" : ""}`} />
                                        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                                    </Button>
                                    <Button variant="outline" className="w-full bg-transparent">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Contact Client
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {project.tags.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
