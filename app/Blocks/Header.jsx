'use client';

import {PanelRightOpen, Search, Plus, Bell, HelpCircle, Settings} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export default function NavbarWithSidebar() {

  return ( 

    <div className="flex items-center w-full justify-between sm:px-6 py-2 px-4 border-0 [font-family:var(--font-geist-sans)]">
    <div className="flex items-center space-x-2">
        <Link href="/">
        <Image src="/logo.png" loading="lazy" alt="Logo" height={30} width={30} className="object-contain"/>
        </Link>
        <Link href="/">
        <div className="mt-1.5 -ml-1 text-lg font-extrabold [font-family:var(--font-geist-mono)]">
            SCRIVO
        </div>
        </Link>
    </div>

    <div className="sm:flex hidden items-center flex-1 mx-4 max-w-4xl space-x-2">
        <div className="relative w-full">
        <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 border dark:bg-neutral-900 border-black/10 dark:border-white/30 rounded focus:outline-none"/>
        <Search className="absolute left-3 top-[10px] w-4 h-5 text-gray-400"/>
        </div>
        <Link href="/project/create">
        <Button className="h-10 flex items-center">
            <Plus size={18} />
            <span className="[font-family:var(--font-geist-sans)]">Create</span>
        </Button>
        </Link>
    </div>

    <div className="flex items-center sm:space-x-4">
        <div className="sm:flex w-auto gap-4 hidden">
            <Bell className="w-5 h-8 text-black dark:text-white mt-[1.5px]"/>
            <HelpCircle className="w-5 h-8 text-black dark:text-white mt-[1.5px]"/>
            <AnimatedThemeToggler></AnimatedThemeToggler>
        </div>
        <Button className="h-8 flex sm:hidden items-center">
            <Plus size={18}/>
            <span className="[font-family:var(--font-geist-sans)]">Create</span>
        </Button>
        <SignedOut>
            <SignInButton forceRedirectUrl='/onboarding'>
              <Button variant={'outline'} className='ml-2 mt-0.5 cursor-pointer [font-family:var(--font-geist-sans)]'>Login</Button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
        <UserMenu/>
        </SignedIn>
    </div>
    </div>
  );
}
