
import CompanyReviewsAndJobContainer from "@/components/company-reviews-job-container";
import DeleteCompanyButton from "@/components/deleteCompanyBtn";
import { toast } from "sonner";

export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>
}) {
    const ps = await params;
    const id = ps.id;

    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();

    if (!data.success) {
        toast.error(data.message);
        return <p>No data found!</p>
    }
    const company = data.data;
    const owner = company.owner;
    return (
        <main className="flex flex-col gap-5 p-5">
            <section className="bg-muted p-5 rounded-md flex flex-col gap-2">
                <h2 className="text-xl font-medium">{company.title}</h2>
                <p className="font-medium text-muted-foreground">{company.description}</p>

                <hr />

                <h2 className="text-muted-foreground">Owner : <span className="text-foreground">{owner.email}</span></h2>
                <DeleteCompanyButton id={owner.id} />
            </section>
            <CompanyReviewsAndJobContainer user_id={owner.id} company_id={company.id} />
        </main>
    )
}