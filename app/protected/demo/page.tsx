import { getProfiles } from "@/app/actions"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

export default async function DemoPage() {
  const result = await getProfiles();

  if ('error' in result) {
    console.error(result.error);
    return <div>Error loading profiles</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={result.p_data ?? []} />
    </div>
  )
}
