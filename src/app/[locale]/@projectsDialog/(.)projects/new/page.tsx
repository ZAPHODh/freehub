import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/server/auth/session";
import CreateProjectModal from "@/components/layout/create-project-modal";

export default async function CreateProject() {
    const { session } = await getCurrentSession();
    if (!session) return redirect("/login");
    console.log('running dialog')
    return <CreateProjectModal />;
}