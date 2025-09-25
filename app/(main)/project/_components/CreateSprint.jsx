'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sprintSchema } from '@/app/lib/validators';

const SprintForm = ({pTitle , pId , pKey , sKey}) => {

    const [show , setShow] = React.useState(false);

    useForm({

        resolver : zodResolver(sprintSchema),
        
        defaultValues : {

            name : `${pKey}-${sKey}`,

        }

    });

    return (

    <main>

        <div>{pTitle}</div>
        
        <div className='flex flex-col gap-3 w-auto items-start mt-4 [font-family:var(--font-geist-sans)]'>

        <Button className="mt-2" onClick = {() => setShow(!show)} variant = {show ? "destructive" : "default"}>{show ? "Cancel" : "Create Sprint"}</Button>       
        {show && <>Form</>}

        </div>

    </main>

  )

}

export default SprintForm