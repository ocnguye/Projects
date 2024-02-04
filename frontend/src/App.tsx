import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Example from "../components/example"

function App() {

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <Example />
      </SignedIn>
    </div>
  )
}

export default App
