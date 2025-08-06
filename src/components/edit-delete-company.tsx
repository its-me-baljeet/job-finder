'use client'
import { UserContext } from "@/app/(protected)/layout";
import { useContext } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { OpeningWithCompany } from "./jobCard";

export default function EditDelete({ job }:{
    job: OpeningWithCompany
}) {
    const { user } = useContext(UserContext);

    async function handleDelete() {
        try {
            const res = await fetch("/api/job/" + job.id, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error occured!");
        }
    }
    if (user?.company?.id == job?.company?.id) {
        return (
            <div>
                <Button variant="secondary" onClick={handleDelete}>Delete</Button>
                <Button variant="secondary">Update</Button>
            </div>
        )
    } else return null;
}