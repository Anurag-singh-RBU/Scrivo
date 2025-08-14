"use client"

import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react'
import React from 'react'

const UserMenu = () => {

  return (

    <UserButton appearance={{elements: {avatarBox: 'ml-3'}}}>
      <UserButton.MenuItems>
        <UserButton.Link label='My Organizations' labelIcon={<ChartNoAxesGantt size={15}/>} href='/onboarding'/>
        <UserButton.Action label='manageAccount'></UserButton.Action>
      </UserButton.MenuItems>
    </UserButton>

  )

}

export default UserMenu