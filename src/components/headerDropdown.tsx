import { UserContext } from "@/app/(protected)/layout"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { User2 } from "lucide-react"
import Link from "next/link"
import { useContext } from "react"

export function HeaderDropdown() {
    const {user}=useContext(UserContext);
    // console.log(user)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><User2/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {
                    user?.company?
                    <DropdownMenuItem>
                        <Link href={"/add-job"}>
                            + Add Job
                        </Link>
                    </DropdownMenuItem>
                    :
                    <DropdownMenuItem>
                        <Link href={"/add-company"}>
                            + Add Company
                        </Link>
                    </DropdownMenuItem>

                }
                {
                    user?.company&&
                    <DropdownMenuItem>
                        <Link href={"/company/"+user.id}>
                            View Company
                        </Link>
                    </DropdownMenuItem>
                }
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
