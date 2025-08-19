import { getOrganization } from '@/actions/organization';
import Image from 'next/image';
import Header from '@/app/Blocks/Header';
import React from 'react'
import {User, Star, Grid, Rocket, Folder, Filter, LayoutDashboard, Users, Target, SlidersHorizontal} from 'lucide-react';
import OrgSwitcher from '@/app/Blocks/OrgSwitcher';

const organization = async ({params}) => {

  const {orgId} = await params;
  const organization = await getOrganization(orgId);

  if(!organization) return <p>Organization not found</p>;

  return (
    <div>

      <div className="w-full h-full">
        <Header></Header>
        <div className="absolute flex inset-x-0 w-full h-px dark:border-[0.5px] bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-neutral-200/50 pointer-events-none"/>
        <div className="flex">
          <aside id = "sidebar" className="w-64 h-full dark:bg-neutral-900 bg-white border-1 p-4 sm:block hidden left-0 fixed">
            <ul className="space-y-3 text-sm text-gray-800 dark:text-gray-200 [font-family:var(--font-geist-sans)]">
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <User className="w-5 h-5"/>
                <span>For you</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <Star className="w-5 h-5"/>
                <span>Starred</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <Grid className="w-5 h-5"/>
                <span>Apps</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <Rocket className="w-5 h-5"/>
                <span>Projects</span>
              </li>

              <li className="pt-2 text-xs text-gray-500 dark:text-gray-400">Recent</li>
              <li className="flex items-center space-x-2 p-2 rounded cursor-pointer [font-family:var(--font-geist-sans)]">
                <OrgSwitcher></OrgSwitcher>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 dark:hover:bg-neutral-800 rounded">
                <Folder className="w-5 h-5" />
                <span>More projects</span>
              </li>

              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboards</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <Users className="w-5 h-5" />
                <span>Teams</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Customize sidebar</span>
              </li>
            </ul>
          </aside>
          
          <div className="flex-1 sm:ml-64 sm:px-6 px-4">
            <p className='mt-10 [font-family:var(--font-jetbrains)] text-xs text-gray-600 dark:text-gray-200'>
              Organizations
            </p>
            <div className='mb-4 mt-3 flex flex-col sm:flex-row justify-between items-start [font-family:var(--font-geist-mono)]'>
              <div className='flex items-center gap-3'>
                <Image src={organization.imageUrl || "/logo.png"} alt="Organization Logo" width={30} height={30} className="rounded-sm"></Image>
                <span className='text-[25px] font-bold'>{organization.name}</span>
                </div>
            </div>
            <div className="mb-4">Show Projects</div>
            <div className="mt-8">Show user assigned and reported issues here</div>
          </div>
          </div>
          <div className="mt-5 sm:hidden block">
            <OrgSwitcher></OrgSwitcher>
          </div>
        </div>
      </div>
  )
}

export default organization