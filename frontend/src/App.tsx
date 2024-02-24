import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Header from "../components/header/header"

function App() {

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Header />
        <Header />
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  )
}

export default App
