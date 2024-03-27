//@ts-nocheck
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Header from "../components/header/header"
import SignUp from "../components/SignUp"

function App() {

  return (
    <div>
      <SignedOut>
        <SignUp />
      </SignedOut>
      <SignedIn>
        <Header />
      </SignedIn>
    </div>
  )
}

export default App
