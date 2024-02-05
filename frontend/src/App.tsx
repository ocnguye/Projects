import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Example from "../components/example"
import Header from "../components/header/header"

function App() {

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Header />
        <UserButton afterSignOutUrl="/" />
        <Example />
      </SignedIn>
    </div>
  )
}

export default App
