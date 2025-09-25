import { getProjectById } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'
import SprintForm from '../_components/CreateSprint';
import Header from '@/app/Blocks/Header';
import { Button } from '@/components/ui/button';

const ProjectPage = async ({params}) => {

  const projectId = params.projectId;
  const project = await getProjectById(projectId);

  if(!project) notFound();

  return (

    <div>

      <Header></Header>
      <div className="absolute flex inset-x-0 w-full h-px dark:border-[0.5px] bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-neutral-200/50 pointer-events-none"/>

      <SprintForm pTitle = {project.name} pId = {projectId} pKey = {project.key} sKey = {project.sprints?.length + 1}></SprintForm>

      {project.sprints.length === 0 ? (

        <p className='[font-family:var(--font-geist-sans)] text-gray-500 dark:text-gray-400 mt-4'>
            No sprints found for this project.{' '}
        </p>

      ) : (

        <Button className="mt-2">Create Sprint</Button>

      )}

    </div>

  )
}

export default ProjectPage;