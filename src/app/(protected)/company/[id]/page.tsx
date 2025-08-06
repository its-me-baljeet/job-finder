import CompanyReviewsAndJobContainer from "@/components/company-reviews-job-container";
import DeleteCompanyButton from "@/components/deleteCompanyBtn";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const ps = await params;
    const id = ps.id;

    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();

    if (!data.success) {
        console.error(data.message);
        return <p className="text-center text-destructive mt-10">No data found!</p>;
    }

    const company = data.data;
    const owner = company.owner;

    return (
        <main className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-6">
            <section className="bg-muted rounded-xl p-4 md:p-6 shadow-sm space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{company.title}</h2>
                    <p className="text-muted-foreground">{company.description}</p>
                </div>

                <hr className="border-border" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-muted-foreground">
                        Owner: <span className="text-foreground font-medium">{owner.email}</span>
                    </h3>
                    <DeleteCompanyButton id={owner.id} />
                </div>
            </section>

            <section className="w-full">
                <CompanyReviewsAndJobContainer
                    user_id={owner.id}
                    company_id={company.id}
                />
            </section>
        </main>
    );
}
