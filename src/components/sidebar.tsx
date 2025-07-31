import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="h-[calc(100vh-60px)] absolute top-15">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Job Filters</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-5 py-5">
                            <section className="flex flex-col gap-2 border p-2 rounded-md">
                                <h2>Employment Type</h2>
                                <RadioGroup defaultValue="full-time">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="full-time" id="full-time" />
                                        <Label htmlFor="full-time">Full Time</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="part-time" id="part-time" />
                                        <Label htmlFor="part-time">Part Time</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="contractor" id="contractor" />
                                        <Label htmlFor="contractor">Contractor</Label>
                                    </div>
                                </RadioGroup>
                            </section>
                            <section className="flex flex-col gap-2 border p-2 rounded-md">
                                <h2>Job Type</h2>
                                <RadioGroup defaultValue="remote">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="remote" id="remote" />
                                        <Label htmlFor="remote">Remote</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="on-site" id="on-site" />
                                        <Label htmlFor="on-site">On Site</Label>
                                    </div>
                                </RadioGroup>
                            </section>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}