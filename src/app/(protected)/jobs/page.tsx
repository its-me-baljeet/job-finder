import JobCard from "@/components/jobCard";
import db from "@/services/prisma";

export default async function JobsPage({ searchParams }: {
    searchParams: {
        q: string,
        jt: string,
        et: string,
        ms: string,
    }
}) {
    const params = await searchParams;
    const q = params.q;
    const jt = params.jt || "remote";
    const et = params.et || "fulltime";
    const ms = params.ms ? Number.parseInt(params.ms) : 100000;
    const jobs = await db.job.findMany({
        where: {
            title: {
                contains: q,
                mode: "insensitive",
            },
            job_type: jt,
            employment_type: et,
            salary: {
                gte: ms
            }
        },
    })
    return (
        <main className="p-5">
            <section className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    jobs.map(job => {
                        return <div key={job.id}>
                            <JobCard job={job} />
                        </div>
                    })
                }
            </section>
        </main>
    )
}