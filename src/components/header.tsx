import Link from "next/link";
import { ModeToggle } from "./modeToggleBtn";
import { SearchInput } from "./searchInput";

export default function Header() {
    return (
        <header className="w-full h-15 flex justify-between items-center px-5">
            <Link href={"/"} className="text-2xl font-medium">
                Job Search
            </Link>
            <section className="flex gap-5">
                <SearchInput />
                <ModeToggle />
            </section>
        </header>
    )
}