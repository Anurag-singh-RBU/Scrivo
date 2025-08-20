"use client"

import { OrganizationSwitcher, SignedIn, useOrganization, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import React from 'react'

const OrgSwitcher = () => {

    const {isLoaded} = useOrganization();
    const {isLoaded : isUserLoaded} = useUser();
    const pathname = usePathname();

    if(!isLoaded || !isUserLoaded) return null;

    return (

        <div>
            <SignedIn>
                <OrganizationSwitcher hidePersonal afterCreateOrganizationUrl="/organization/:slug" afterSelectOrganizationUrl="/organization/:slug" 
                createOrganizationMode={pathname === "/onboarding" ? "navigation" : "modal"}
                appearance={{elements: {organizationSwitcherTrigger: "dark:text-white text-white" , organizationSwitcherTriggerIcon: "text-gray-500 dark:text-gray-600"}}}/>
            </SignedIn>
        </div>

    )

}

export default OrgSwitcher