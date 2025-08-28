"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CreateProjectForm } from "../section/projects/form/create-project";


export default function CreateProjectModal() {
    const router = useRouter();
    const pathname = usePathname();

    const IsOpen = pathname.includes("/new");
    return (
        <Dialog open={IsOpen} onOpenChange={() => router.back()}>
            <DialogContent className="w-full max-w-screen max-h-screen overflow-y-auto rounded-md md:mx-auto">
                <DialogHeader>
                    <DialogTitle asChild>
                        <h2 className="font-semibold tracking-tight transition-colors">
                            New Project
                        </h2>
                    </DialogTitle>
                </DialogHeader>
                <CreateProjectForm />
            </DialogContent>
        </Dialog>
    );
}