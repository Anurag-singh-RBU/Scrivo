import { getProject } from '@/actions/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import DeleteProject from './DeleteProject';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default async function ProjectList({orgId}){

  const projects = await getProject(orgId);

  if(!projects || projects.length === 0){

    return(

    <p className='[font-family:var(--font-geist-sans)] text-gray-500 dark:text-gray-400 mt-4'>
        No projects found{' '}
        <Link href="/project/create" className='text-blue-500 hover:text-blue-600'>
            &nbsp;&nbsp; Create New
        </Link>
    </p>

    ) 

  }

    return (
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [font-family:var(--font-geist-sans)]">

        {projects.map((project) => (

            <Card key = {project.id} className="bg-white dark:bg-neutral-800">
            <CardHeader>
                <CardTitle className="flex justify-between font-bold [font-family:var(--font-jetbrains)] text-xl items-center">
                {project.name}
                <DeleteProject projectId = {project.id}/>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm -mt-2 text-gray-500 dark:text-gray-300 mb-6 text-justify">{project.description}</p>
                <Link href={`/project/${project.id}`}>
                   <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap text-center [font-family:var(--font-giest-sans)] text-sm leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                            View Project
                        </span>
                    </ShimmerButton>
                </Link>
            </CardContent>
            </Card>

        ))}

    </div>
    
    );

}