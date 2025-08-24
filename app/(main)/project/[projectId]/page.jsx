import { getProjectById } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'

const ProjectPage = async ({params}) => {

  const projectId = params.projectId;
  const project = await getProjectById(projectId);

  if(!project) notFound();

  return (

    <div>
      Project Page
    </div>

  )
}

export default ProjectPage;