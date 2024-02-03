import { UserButton } from "@clerk/nextjs";
import Example from "@/components/example";

export default function Home() {
  return (
    <div className="h-screen p-4">
      <UserButton afterSignOutUrl="/" />
      <Example />
    </div>
  )
}
