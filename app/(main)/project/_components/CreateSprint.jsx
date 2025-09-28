'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sprintSchema } from '@/app/lib/validators';
import { addDays } from 'date-fns/addDays';
import { Card, CardContent } from '@/components/ui/card';

const SprintForm = ({pTitle , pId , pKey , sKey}) => {

    const [show , setShow] = React.useState(false);

    const [dRange , setDRange] = useState({

        from : new Date(),
        to : addDays(new Date() , 14)

    })

    const {register , handleSubmit , formState : {errors} , control} = useForm({

        resolver : zodResolver(sprintSchema),
        
        defaultValues : {

            name : `${pKey} - ${sKey}`,
            startDate : dRange.from,
            endDate : dRange.to

        }

    });

    return (

    <main>

        <div>{pTitle}</div>
        
        <div className='flex flex-col gap-3 w-auto items-start mt-4 [font-family:var(--font-geist-sans)]'>

        <Button className="mt-2" onClick = {() => setShow(!show)} variant = {show ? "destructive" : "default"}>{show ? "Cancel" : "Create Sprint"}</Button>       
        {show && 
            <Card>
                <CardContent>
                    <form>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='name'>Sprint Name</label>
                            <input id="name" readOnly {...register("name")} className='border border-gray-300 py-2 px-3 rounded-md'/>
                            {errors.name && (
                                <p className='text-red-500 text-sm font-mono mt-1'>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>}

        </div>

    </main>

  )

}

export default SprintForm