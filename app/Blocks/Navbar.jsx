import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton/>
      </SignedOut>

      <SignedIn>
        <UserButton/>
      </SignedIn>
    </div>
  );
};

export default Navbar;
