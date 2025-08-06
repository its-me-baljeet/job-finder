'use client'
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function JobApplyButton({ job }) {
    async function handleSubmit() {
        try {
            const res = await fetch(`/api/job/apply/`+job.id, {
                method: 'POST',
                body: JSON.stringify({ jobId: job.id }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Applied successfully");
            } else {
                toast.error(data.message || "Can't apply for the Job");
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred.");
        }
    }

    return (
        <Button variant="secondary" className="flex"
            onClick={handleSubmit}
        >
            <Send />Apply
        </Button>
    )
}