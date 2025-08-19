"use client";

import { Session } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "@/components/shared/logout-button";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
export default function Navbar({
    session,
    headerText,
}: {
    session: Session;
    headerText: {
        projects: string;
        freelancers: string;
        login: string;
        account: string;
        openMenu: string;
    };
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <nav className="flex h-full items-center justify-between">
            <Link href="/" className="flex items-center text-2xl font-bold">
                <Image
                    src="/chad-next.png"
                    alt="ChadNext logo"
                    width="30"
                    height="30"
                    className="mr-2 rounded-sm object-contain"
                />
                <p>FreelancerHub</p>
            </Link>
            <div className="hidden items-center gap-12 lg:flex 2xl:gap-16">
                <div className="space-x-4 text-center text-sm leading-loose text-muted-foreground md:text-left">
                    <Link
                        href="/projects"
                        className="font-semibold hover:underline hover:underline-offset-4"
                    >
                        {headerText.projects}
                    </Link>
                    <Link
                        href="/freelancers"
                        className="font-semibold hover:underline hover:underline-offset-4"
                    >
                        {headerText.freelancers}
                    </Link>
                </div>
                <div className="flex items-center gap-x-2">
                    {session ? (
                        <Link
                            href="/account"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "bg-secondary"
                            )}
                            onClick={() => setIsModalOpen(false)}
                        >
                            {headerText.account}
                        </Link>
                    ) : (
                        <Link href="/login" className={buttonVariants()}>
                            {headerText.login}
                        </Link>
                    )}
                </div>
            </div>
            <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
                <SheetTrigger className="lg:hidden">
                    <span className="sr-only">{headerText.openMenu}</span>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent>
                    <div className="flex flex-col items-center space-y-10 py-10">
                        <div className="space-y-4 text-center text-sm leading-loose text-muted-foreground">

                            {session ? (
                                <>
                                    <Link
                                        href="/account"
                                        className="block font-semibold hover:underline hover:underline-offset-4"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        {headerText.account}
                                    </Link>
                                    <LogoutButton className="!mt-20" />
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className={buttonVariants()}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    {headerText.login}
                                </Link>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}