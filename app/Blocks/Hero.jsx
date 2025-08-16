import { ArrowRight } from 'lucide-react'
import React from 'react'
import {Highlighter} from "@/components/magicui/highlighter";
import { Button } from '@/components/ui/button';

const Hero = () => {

    return (

    <div className='px-4 py-2 flex flex-col items-center w-full sm:my-20 my-15'>

        <div className="border px-4 rounded-full [font-family:var(--font-geist-sans)] flex items-center gap-x-1.5 py-[4px] pr-[7px] pl-[11px] border-black/[0.03] bg-[rgba(30,31,37,0.04)] backdrop-blur-[10px] hover:not-active:bg-[rgba(30,31,37,0.08)] text-xs font-medium transition-background duration-150 ease-in-out cursor-pointer">Early stage project requirements <ArrowRight size={13} className='mt-0.2'/>
        </div>
        <div>
            <h1 className="text-gray-700 [font-family:var(--font-geist-mono)] mt-10 max-w-176 text-center sm:text-5xl text-3xl font-bold [word-spacing:0]">
                Magically Simplify <br></br> <div className='sm:mt-4 mt-2 whitespace-nowrap'>
                    <Highlighter action='highlight' color='yellow'>Project</Highlighter> and <Highlighter action='highlight'><span className='sm:hidden block'>Workflow</span><span className='sm:block hidden'>Management</span></Highlighter>
                </div>
            </h1>
        </div>

        <div className="flex items-center gap-4 mt-10 relative z-10">
            <button 
            className='block [font-family:var(--font-geist-sans)] px-4 py-2 text-center bg-brand-blue rounded-lg text-sm font-medium text-white [text-shadow:0px_1px_1px_rgba(0,_0,_0,_0.16)] shadow-[0px_1px_4px_-1px_rgba(30,_31,_37,_0.38)] bg-[#2579F4] hover:bg-[#196ae3] cursor-pointer transition-background duration-150 ease-in-out'>
                Get Started
            </button>
            <Button variant = {'outline'} className='flex items-center cursor-pointer [font-family:var(--font-geist-sans)] gap-x-1.5 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-150 ease-in-out'>
                Learn more
            </Button>
        </div>

        <div className="flex items-center gap-4 mt-6 relative z-10">
            <p className='text-gray-500 font-medium text-xs [font-family:var(--font-geist-sans)]'>Innovative Project Management 2025 by 
                <span className='font-bold text-gray-700'>&nbsp;SHADYX</span>
            </p>
        </div>

    </div>

  )

}

export default Hero