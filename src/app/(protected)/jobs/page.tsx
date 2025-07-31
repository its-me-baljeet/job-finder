import JobCard from "@/components/jobCard";
import { data } from "@/contants/data";

export default function JobsPage({ searchParams }: {
    searchParams: {
        q: string
    }
}) {
    const q = searchParams.q || "";
    const jobs = data.data.filter(job => job.job_title.toLowerCase().includes(q.toLowerCase()));
    return (
        <main className="p-5">
            <section className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    jobs.map(job => {
                        return <div key={job.job_id}>
                            <JobCard job={job} />
                        </div>
                    })
                }
            </section>
        </main>
    )
}