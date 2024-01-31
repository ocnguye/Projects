import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen p-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
