import JobCard from "@/components/jobCard";
import { data } from "@/contants/data";
import Image from "next/image";

export default function Home() {
  const jobs = data.data;
  return (
    <main className="p-5 flex flex-col gap-5">
      <h2>All Jobs</h2>
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
  );
}
