//@ts-nocheck
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Header from "../components/header/header"
import Login from "../components/Login"

function App() {

  return (
    <div>
      <SignedOut>
        <SignInButton />
        <Login />

      </SignedOut>
      <SignedIn>
        <Header />
      </SignedIn>
    </div>
  )
}

export default App
