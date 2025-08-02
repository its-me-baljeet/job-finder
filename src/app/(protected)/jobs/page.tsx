import JobCard from "@/components/jobCard";
import { Job } from "../../../../generated/prisma";
import NextButton from "@/components/nextButton";
export default async function JobsPage({ searchParams }: {
    searchParams: {
        q: string,
        jt: string,
        et: string,
        ms: string,
        page: string,
    }
}) {
    const params = await searchParams;
    const q = params.q;
    const jt = params.jt || "remote";
    const et = params.et || "fulltime";
    const ms = params.ms ? Number.parseInt(params.ms) : 100000;
    const page = params.page? Number.parseInt(params.page):1;
    const res = await fetch(`http://localhost:3000/api/search?q=${q}&jt=${jt}&et=${et}&ms=${ms}&page=${page}`);
    const data = await res.json();
    let jobs:Job[];
    if(!data.success){
        jobs=[]
    }
    jobs= data.data;
    // console.log(jobs)
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
            {/* <NextButton /> */}
        </main>
    )
}