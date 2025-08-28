import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50" >
            <div className="container mx-auto px-4 py-8" >
                < div className="mb-8" >
                    <Skeleton className="h-10 w-80 mb-2" />
                    <Skeleton className="h-6 w-96" />
                </div>

                <div className="mb-8 space-y-6" >
                    <Skeleton className="h-12 w-full" />

                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between" >
                        <div className="flex gap-4" >
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-40" />
                            <Skeleton className="h-10 w-36" />
                        </div>
                        < Skeleton className="h-10 w-20" />
                    </div>
                </div>

                <div className="mb-6" >
                    <Skeleton className="h-5 w-32" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {
                        Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} >
                                <CardContent className="p-6" >
                                    <Skeleton className="h-6 w-3/4 mb-3" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3 mb-4" />
                                    <div className="flex gap-2 mb-4" >
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-20" />
                                        <Skeleton className="h-6 w-18" />
                                    </div>
                                    < div className="flex items-center gap-3 mb-4" >
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <div>
                                            <Skeleton className="h-4 w-24 mb-1" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </div>
                                    < Skeleton className="h-10 w-full" />
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
