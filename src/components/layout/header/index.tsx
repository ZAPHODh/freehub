import { getCurrentSession } from "@/lib/server/auth/session";
import { getScopedI18n } from "@/locales/server";
import Navbar from "./navbar";

export default async function Header() {
    const { session } = await getCurrentSession();
    const scopedT = await getScopedI18n("header");
    const headerText = {
        projects: scopedT("projects"),
        freelancers: scopedT("freelancers"),
        login: scopedT("login"),
        account: scopedT("account"),
        openMenu: scopedT("openMenu"),
    };

    return (
        <header className="h-20 w-full">
            <div className="container h-full">
                <Navbar headerText={headerText} session={session!} />
            </div>
        </header>
    );
}