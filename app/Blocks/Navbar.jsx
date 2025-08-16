import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { PenBox } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { checkuser } from '@/lib/checkuser';
import UserLoading from './UserLoading';

const Navbar = async () => {

  await checkuser();

  return (
    <div>

      <nav className='flex py-4'>
        <Link href = '/'>
          <Image src = '/logo.png' loading = "lazy" alt = 'Logo' height={50} width={40} className='object-contain'></Image>
        </Link>
        <Link href = '/'>
          <div className='mt-1.5 ml-1 text-lg font-extrabold [font-family:var(--font-geist-mono)]'>SCRIVO</div>
        </Link>

        <div className='flex justify-end w-full'>

          <Link href = '/project/create'>
            <Button className = 'flex items-center gap-2 mt-0.5 cursor-pointer'>
              <PenBox size={18}></PenBox>
              <span className='[font-family:var(--font-geist-sans)]'>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl='/onboarding'>
              <Button variant={'outline'} className='ml-2 mt-0.5 cursor-pointer [font-family:var(--font-geist-sans)]'>Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu/>
          </SignedIn>

        </div>
      </nav>

      <UserLoading/>
      
    </div>
  );
};

export default Navbar;
