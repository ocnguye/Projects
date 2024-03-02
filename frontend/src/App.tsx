//@ts-nocheck
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Header from "../components/header/header"
import SignUp from "../components/SignUp"
import Login from "../components/Login"

function App() {

  return (
    <div>
      <SignedOut>
        {/* <SignInButton /> */}
        <SignUp />
        <Login />

      </SignedOut>

      <SignedIn>
        <Header />
      </SignedIn>

      
    </div>
  )
}

export default App
