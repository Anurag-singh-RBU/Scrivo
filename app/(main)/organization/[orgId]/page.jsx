import { getOrganization } from '@/actions/organization';
import Navbar from '@/app/Blocks/Navbar';
import React from 'react'

const organization = async ({params}) => {

  const {orgId} = await params;
  const organization = await getOrganization(orgId);

  if(!organization) return <p>Organization not found</p>;

  return (
    <div>

      <div className="w-full h-auto px-8">
        <Navbar/>
        <p>{organization.name}&rsquo;s Projects</p>
      </div>

    </div>
  )
}

export default organization