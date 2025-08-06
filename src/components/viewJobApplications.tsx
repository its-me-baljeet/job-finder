'use client'
import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LoaderPinwheelIcon } from "lucide-react";
import { Application, Company, Openings, User } from "../../generated/prisma";
import { UserContext } from "@/app/(protected)/layout";

export default function ViewJobApplications({ job }:{
    job: Openings& {company: Company}
}) {
    const {user} = useContext(UserContext);
    const [applicants, setApplicants] = useState<(Application & {user: User})[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getApplications() {
            setLoading(true);
            const res = await fetch("/api/applicants/" + job.id);
            const data = await res.json();
            setLoading(false);
            if (data.success) {
                setApplicants(data?.data);
            }
        }
        getApplications();
    }, []);
    if(user?.company.id!=job.company_id)return null;
    return (
        <Dialog>
            <DialogTrigger>view job applicants</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Job Applicants</DialogTitle>
                    <DialogDescription>
                        {
                            loading && <LoaderPinwheelIcon className="animate-spin"/>
                        }
                        {
                            applicants.map(application => {
                                return <Card key={application.id}>
                                    <Badge className="ml-3">{application.user.email}</Badge>
                                </Card>
                            })
                        }``
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}