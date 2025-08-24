import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const ProjectLayout = async ({children}) => {
  return (

    <div className='mx-auto'>
      <Suspense fallback = {<BarLoader width={"100%"} color='#36d7b7/'/>}>
        {children}
      </Suspense>
    </div>

  )
}

export default ProjectLayout