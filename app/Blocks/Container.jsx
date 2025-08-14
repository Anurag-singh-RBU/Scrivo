import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({children , className}) => {

  return(

    <div className={cn("max-w-4xl mx-auto px-4 relative z-10")}>{children}</div>

  )

}

export default Container