'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sprintSchema } from '@/app/lib/validators';
import { addDays } from 'date-fns/addDays';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalculatorIcon, Calendar, Calendar1Icon } from 'lucide-react';
import { format } from 'date-fns/format';
import {DayPicker} from 'react-day-picker';
import "react-day-picker/dist/style.css"

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
        <div className="flex items-end justify-end">
            <Button className="mt-8 -ml-8 mr-6" onClick = {() => setShow(!show)} variant = {show ? "destructive" : "default"}>{show ? "Cancel" : "Create Sprint"}</Button> 
        </div>
            <div className="absolute flex inset-x-0 w-full h-px dark:border-[0.5px] bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-neutral-200/50 pointer-events-none"/>      
        {show && 
            <Card>
                <CardContent>
                    <form>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='name' className='text-xl'>Sprint Name</label>
                            <input id="name" readOnly {...register("name")} className='border border-gray-300 py-2 px-3 rounded-md'/>
                            {errors.name && (
                                <p className='text-red-500 text-sm font-mono mt-1'>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='font-GS'>
                                Sprint Duration
                            </label>
                            <Controller control={control} name='dateRange'
                            render={((field)=>{

                                return (

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant='outline'>
                                                <Calendar size={14}></Calendar>
                                                {dRange.from && dRange.to?(
                                                    format(dRange.from , "LLL dd , y") + " - " + format(dRange.to , "LLL dd , y") 
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align='start' className="w-auto px-5 font-GS">
                                            <DayPicker mode='range' className = 'text-sm font-GS' selected={dRange} onSelect={(range) => {
                                               
                                               if(range?.from && range?.to){

                                                setDRange(range);
                                                field.onChange(range);

                                               }
                                            }}>
                                            </DayPicker>
                                        </PopoverContent>
                                    </Popover>

                                )

                            })}>
                            </Controller>
                        </div>
                    </form>
                </CardContent>
            </Card>}

        </div>

    </main>

  )

}

export default SprintForm