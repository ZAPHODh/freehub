import { CreateProjectForm } from "@/components/section/projects/form/create-project";


export default function CreateProjectPage() {
    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-balance">Create New Project</h1>
                <p className="text-muted-foreground mt-2">
                    Fill out the form below to post your project and find the right freelancer
                </p>
            </div>
            <CreateProjectForm />
        </div>
    )
}
