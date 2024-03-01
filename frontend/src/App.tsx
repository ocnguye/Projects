//@ts-nocheck
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Header from "../components/header/header"
import SignUp from "../components/SignUp"

function App() {

  return (
    <div>
      <SignedOut>
        {/* <SignInButton /> */}
        <SignUp />

      </SignedOut>
      <SignedIn>
        <Header />
      </SignedIn>
    </div>
  )
}

export default App
