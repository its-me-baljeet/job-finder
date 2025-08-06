import EditDelete from "@/components/edit-delete-company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Save, Send } from "lucide-react";

export default async function Page({ params }: {
    params: {
        id: string,
    }
}) {
    const ps = await params
    const id = ps.id;
    const res = await fetch("http://localhost:3000/api/job/" + id);
    const data = await res.json();

    const job = data.data;
    if (!job) {
        return <p>No data found!</p>
    }
    return (
        <main className="p-5">
            <Card className="h-full shadow-md">
                <CardHeader>
                    <div className="flex gap-5">
                        <CardTitle className="font-semibold text-2xl">{job.title}</CardTitle>

                        <div className="ml-auto flex gap-3 items-center">
                            <Button variant="secondary" className="flex"><Save />Save</Button>
                            <Button variant="secondary" className="flex"><Send />Apply</Button>

                        </div>
                    </div>
                    <p className="flex gap-2 text-sm"><span><MapPin size={20} /></span>{job.location}</p>
                    <p>Salary <span>₹{job.salary}</span></p>
                    <Badge variant="default" className="h-fit w-fit mt-2">{job.job_type}</Badge>
                </CardHeader>
                <CardContent>
                    <CardDescription className=" text-sm tracking-wide">{job.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <p>{job.company.title}</p>
                    {/* <p>Card Footer</p> */}
                    {/* <section className="w-full flex items-center justify-between">

                        <div className="flex items-center gap-2 border p-2 rounded-md">
                            <Avatar className="">
                                <AvatarImage src={job.employer_logo ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2DOOnn9pY67TodjACV0st9VwO1Q-ZdxOA&s"} height={35} width={35} className="rounded-full" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p >{job.employer_name}</p>

                        </div>
                        <CardAction className="ml-auto self-center">view</CardAction>
                    </section> */}
                </CardFooter>
                <EditDelete job={job}/>
            </Card>
        </main>
    )
}