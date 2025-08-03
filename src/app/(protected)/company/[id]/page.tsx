import DeleteCompanyButton from "@/components/deleteCompanyBtn";

export default async function Page({ params }: {
    params: {
        id: string;
    }
}) {
    const id = params.id;

    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();

    const company = data.data.company;
    const owner = data.data.owner;
    return (
        <main className="p-5">
            <section>
                <h2>Company Name : {company.title}</h2>
                <p>Company Description: {company.description}💦💦</p>

                <br />

                <hr />

                <br />

                <h2>CEO : 💦💦{owner.email}💦💦</h2>
            </section>
            <DeleteCompanyButton id={owner.id} />
        </main>
    )
}