"use client"
import { useOrganization, useUser } from '@clerk/nextjs'
import React from 'react'
import { BarLoader } from 'react-spinners'

const UserLoading = () => {

    const {isLoaded} = useOrganization();
    const {isLoaded : isUserLoaded} = useUser();    

    if(!isLoaded || !isUserLoaded){

        return (

            <div className='flex items-center justify-center h-screen w-full'>
                <BarLoader color="#4f46e5" width={100}/>
            </div>

        )

    }

}

export default UserLoading