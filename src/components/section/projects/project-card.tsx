"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Heart, Eye, MessageSquare, Clock, MapPin } from "lucide-react"
import { useState } from "react"
import { toggleProjectFavorite } from "@/app/[locale]/projects/actions"
import { useScopedI18n } from "@/locales/client"


interface Project {
    id: string
    slug: string
    title: string
    description: string
    category: string
    budget: string
    skillsRequired: string[]
    isUrgent: boolean
    isFeatured: boolean
    proposals: number
    views: number
    createdAt: Date
    estimatedDuration: string
    user: {
        name: string
        picture: string
        location: string
        clientProfile?: {
            averageRating: number
            totalReviews: number
        }
    }
}
interface ProjectCardProps {
    project: Project
    viewMode: "grid" | "list"
}

export function ProjectCard({ project, viewMode }: ProjectCardProps) {
    const scopedT = useScopedI18n('projects.card')
    const scopedBadges = useScopedI18n('projects.detail.badges')
    const scopedReviews = useScopedI18n('projects.detail.client')
    const [isFavorited, setIsFavorited] = useState(false)
    const [isToggling, setIsToggling] = useState(false)

    const handleFavoriteToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isToggling) return

        setIsToggling(true)
        try {
            const result = await toggleProjectFavorite(project.id)
            setIsFavorited(result.favorited)
        } catch (error) {
            console.error("Failed to toggle favorite:", error)
        } finally {
            setIsToggling(false)
        }
    }

    const timeAgo = (date: Date) => {
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return scopedT('timeAgo.justPosted')
        if (diffInHours < 24) return `${diffInHours}${scopedT('timeAgo.hoursAgo')}`
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}${scopedT('timeAgo.daysAgo')}`
        return `${Math.floor(diffInDays / 7)}${scopedT('timeAgo.weeksAgo')}`
    }

    if (viewMode === "list") {
        return (
            <Link href={`/projects/${project.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-emerald-200 bg-white">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {project.isFeatured && (
                                                <Badge className="bg-amber-100 text-amber-800 border-amber-200">{scopedBadges('featured')}</Badge>
                                            )}
                                            {project.isUrgent && <Badge variant="destructive">{scopedBadges('urgent')}</Badge>}
                                            <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                                                {project.category}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">{project.title}</h3>
                                        <p className="text-slate-600 line-clamp-2 mb-3">{project.description}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleFavoriteToggle}
                                        disabled={isToggling}
                                        className="ml-2 h-8 w-8 p-0 hover:bg-red-50"
                                    >
                                        <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.skillsRequired.slice(0, 4).map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {project.skillsRequired.length > 4 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{project.skillsRequired.length - 4} ${scopedBadges('more')}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{project.proposals} {scopedT('stats.proposals')}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{project.views} {scopedT('stats.views')}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{timeAgo(project.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-64 flex-shrink-0">
                                <div className="text-right mb-4">
                                    <div className="text-2xl font-bold text-emerald-600 mb-1">{project.budget}</div>
                                    <div className="text-sm">{scopedT('estimated')}{project.estimatedDuration}</div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={project.user.picture || "/placeholder.svg"} alt={project.user.name} />
                                        <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-slate-900 truncate">{project.user.name}</div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <MapPin className="h-3 w-3" />
                                            <span className="truncate">{project.user.location}</span>
                                        </div>
                                        {project.user.clientProfile && (
                                            <div className="text-xs">
                                                ⭐ {project.user.clientProfile.averageRating} ({project.user.clientProfile.totalReviews}{" "}
                                                ){scopedReviews('reviews')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        )
    }

    return (
        <Link href={`/projects/${project.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 border-slate-200">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-wrap gap-2">
                            {project.isFeatured && <Badge className="">{scopedBadges('featured')}</Badge>}
                            {project.isUrgent && <Badge variant="destructive">{scopedBadges('urgent')}</Badge>}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleFavoriteToggle}
                            disabled={isToggling}
                            className="h-8 w-8 p-0 hover:bg-red-50"
                        >
                            <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                        </Button>
                    </div>

                    <Badge variant="outline" className="w-fit mb-3">
                        {project.category}
                    </Badge>

                    <h3 className="text-lg font-semibold  line-clamp-2 mb-2">{project.title}</h3>
                </CardHeader>

                <CardContent className="pb-4">
                    <p className="text-sm line-clamp-3 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                        {project.skillsRequired.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                        {project.skillsRequired.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{project.skillsRequired.length - 3}
                            </Badge>
                        )}
                    </div>

                    <div className="text-xl font-bold mb-1">{project.budget}</div>
                    <div className="text-sm  mb-4">{scopedT('estimated')} {project.estimatedDuration}</div>

                    <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{project.proposals}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{project.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{timeAgo(project.createdAt)}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0">
                    <div className="flex items-center gap-3 w-full p-3 bg-slate-50 rounded-lg">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={project.user.picture || "/placeholder.svg"} alt={project.user.name} />
                            <AvatarFallback>{project.user.name.charAt(0) || 'F'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-900 text-sm truncate">{project.user.name}</div>
                            <div className="flex items-center gap-1 text-xs">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{project.user.location}</span>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
