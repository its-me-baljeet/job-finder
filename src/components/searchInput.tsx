import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchInput() {
  return (
    <form className="flex w-full max-w-sm items-center gap-2" action={"/jobs"} method="GET">
      <Input type="text" name="q" placeholder="jobs..." />
      <Button type="submit" variant="outline">
        <Search/>
      </Button>
    </form>
  )
}
