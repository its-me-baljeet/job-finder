import Link from "next/link";
import { ModeToggle } from "./modeToggleBtn";
import { SearchInput } from "./searchInput";
import { HeaderDropdown } from "./headerDropdown";
import { User } from "../../generated/prisma";

export default function Header() {
    return (
        <header className="w-full h-15 flex justify-between items-center px-5">
            <Link href={"/"} className="text-2xl font-medium">
                Job Dekho
            </Link>
            <section className="flex gap-5">
                <SearchInput />
                <ModeToggle />
                <HeaderDropdown/>
            </section>
        </header>
    )
}