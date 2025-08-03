import DeleteCompanyButton from "@/components/deleteCompanyBtn";

export default async function Page({ params }: {
    params: {
        id: string;
    }
}) {
    const ps = await params;
    const id = ps.id;

    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();

    const company = data.data.company;
    const owner = company.owner;
    // console.log(owner)
    return (
        <main className="p-5">
            <section className="bg-muted p-5 rounded-md flex flex-col gap-2">
                <h2 >Company Name : {company.title}</h2>
                <p>Company Description: {company.description}</p>

                <br />

                <hr />

                <br />

                <h2>CEO : {owner.email}</h2>
            <DeleteCompanyButton id={owner.id} />
            </section>
        </main>
    )
}