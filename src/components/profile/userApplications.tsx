'use client'
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import JobCard from "../jobCard";
import { Application, Openings } from "../../../generated/prisma";

type ApplicationWithUser = Application & { job: Openings };
export default function UserApplications({ user_id }: {
    user_id: string;
}) {
    const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
    async function getUserApplications() {
        const resp = await fetch("/api/applications/" + user_id);
        const data = await resp.json();
        // console.log(data)
        setApplications(data.data);
    }
    useEffect(() => {
        getUserApplications();
    }, []);
    console.log("application state", applications)
    if (!applications.length) {
        return <p>No applications</p>
    }
    return (
        <section className="h-full md:w-3/5">
            <Card>
                <CardHeader>
                    Your Applications
                </CardHeader>
                <CardContent>
                    {
                        applications.map(appl => {
                            return (
                                <JobCard job={appl.job} />
                            )
                        })
                    }
                </CardContent>
            </Card>
        </section>
    )
}