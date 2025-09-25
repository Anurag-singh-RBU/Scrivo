import { getProjectById } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'
import SprintForm from '../_components/CreateSprint';

const ProjectPage = async ({params}) => {

  const projectId = params.projectId;
  const project = await getProjectById(projectId);

  if(!project) notFound();

  return (

    <div>

      <SprintForm pTitle = {project.name} pId = {projectId} pKey = {project.key} sKey = {project.sprints?.length + 1}></SprintForm>

      {project.sprints.length === 0 ? (

        <p className='[font-family:var(--font-geist-sans)] text-gray-500 dark:text-gray-400 mt-4'>
            No sprints found for this project.{' '}
        </p>

      ) : (

        <div className='[font-family:var(--font-geist-sans)] text-gray-700 dark:text-gray-300 mt-4'>
          Create a Sprint
        </div>

      )}

    </div>

  )
}

export default ProjectPage;