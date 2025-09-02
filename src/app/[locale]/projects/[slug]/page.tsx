
import { notFound } from "next/navigation"
import { getProjectById } from "../actions"
import { ProjectDetailPage } from "@/components/layout/project-detail-page"

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const slug = (await params).slug
    try {
        const project = await getProjectById(slug)
        return <ProjectDetailPage project={project as any} />
    } catch (error) {
        notFound()
    }
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const slug = (await params).slug
    try {
        const project = await getProjectById(slug)
        return {
            title: `${project.title} | Freelance Marketplace`,
            description: project.description.slice(0, 160),
        }
    } catch (error) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found.",
        }
    }
}
