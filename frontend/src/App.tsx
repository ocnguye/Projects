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
        <img src="https://smiski.com/e/wp-content/uploads/2016/03/s1_06.png" alt="Clerk.dev" />
        <Example />
      </SignedIn>
    </div>
  )
}

export default App
