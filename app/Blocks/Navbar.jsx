import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { PenBox } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <div>

      <nav className='flex bg-gray-200 p-2'>
        <Link href = '/'>
          <Image src = '/logo.png' alt = 'Logo' height={50} width={40} className='object-contain'></Image>
        </Link>
        <Link href = '/'>
          <div className='mt-2 ml-1 text-lg font-extrabold'>SCRIVO</div>
        </Link>

        <div className='flex justify-end w-full'>

          <Link href = '/project/create'>
            <Button className = 'flex items-center gap-2 mt-0.5'>
              <PenBox size={18}></PenBox>
              <span>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl='/onboarding'>
              <Button variant={'outline'} className='ml-2 mt-0.5'>Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu/>
          </SignedIn>

        </div>
      </nav>

    </div>
  );
};

export default Navbar;
