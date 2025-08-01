import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { data } from "@/contants/data";
import { MapPin } from "lucide-react";

export default async function Page({ params }: {
    params: {
        id: string,
    }
}) {
    const id = params.id;
    const job = data.data.find(job => job.job_id === id);
    console.log(job)
    if (!job) {
        return <p>No data found!</p>
    }
    return (
        <main>
            <Card className="h-full shadow-md">
                <CardHeader>
                    <div className="flex gap-5">
                        <CardTitle>{job.job_title}</CardTitle>
                        <Badge variant="default" className="h-fit w-fit ml-auto">{job.job_employment_type}</Badge>
                    </div>
                    <p className="flex gap-2 text-sm"><span><MapPin size={20} /></span>{job.job_location}</p>
                </CardHeader>
                <CardContent>
                    <CardDescription className=" line-clamp-2 text-sm tracking-wide">{job.job_description}</CardDescription>
                </CardContent>
                <CardFooter>
                    {/* <p>Card Footer</p> */}
                    <section className="w-full flex items-center justify-between">

                        <div className="flex items-center gap-2 border p-2 rounded-md">
                            <Avatar className="">
                                <AvatarImage src={job.employer_logo ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2DOOnn9pY67TodjACV0st9VwO1Q-ZdxOA&s"} height={35} width={35} className="rounded-full" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p >{job.employer_name}</p>

                        </div>
                        <CardAction className="ml-auto self-center">view</CardAction>
                    </section>
                </CardFooter>
            </Card>
        </main>
    )
}