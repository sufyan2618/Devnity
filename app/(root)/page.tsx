
import { SignedIn, SignOutButton, SignUpButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <>

    <SignUpButton>
      <button className="flex items-center justify-center rounded-lg ">SignUp</button>
    </SignUpButton>


    <SignedIn>
    <SignOutButton>
    <button className="flex items-center justify-center rounded-lg ">Signout</button>
    </SignOutButton>
      </SignedIn>   
     </>
  );
}
