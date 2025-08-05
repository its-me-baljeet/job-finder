import JobCard from "@/components/jobCard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/search");
  const data = await res.json();
  const jobs = data.data;
  // console.log(jobs)
  return (
    <main className="p-5 flex flex-col gap-5">
      <h2>All Jobs</h2>
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
  );
}
