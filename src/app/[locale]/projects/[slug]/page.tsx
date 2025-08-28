
import { notFound } from "next/navigation"
import { getProjectById } from "../actions"
import { ProjectDetailPage } from "@/components/layout/project-detail-page"

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    try {
        const project = await getProjectById(params.slug)
        return <ProjectDetailPage project={project as any} />
    } catch (error) {
        notFound()
    }
}

export async function generateMetadata({ params }: ProjectPageProps) {
    try {
        const project = await getProjectById(params.slug)
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
