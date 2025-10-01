import { getProjectById } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'
import SprintForm from '../_components/CreateSprint';
import Header from '@/app/Blocks/Header';
import { Button } from '@/components/ui/button';
import { CircuitBoard, Ellipsis, Group, Search } from 'lucide-react';
import { AvatarCircles } from "@/components/ui/avatar-circles"
import Image from 'next/image';

const ProjectPage = async ({params}) => {

  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ]

  const projectId = params.projectId;
  const project = await getProjectById(projectId);

  if(!project) notFound();

  return (

    <div>

      <Header></Header>
      <div className="absolute flex inset-x-0 w-full h-px dark:border-[0.5px] bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-neutral-200/50 pointer-events-none"/>
      <div className="ml-5">

        <div className='text-gray-500 font-GS mt-8'>Projects</div>
        <div className="flex gap-2 font-mono font-bold mt-2">
          <CircuitBoard size={20} className='mt-0.5'/>
          <SprintForm pTitle = {project.name} pId = {projectId} pKey = {project.key} sKey = {project.sprints?.length + 1}></SprintForm>
        </div>

        {project.sprints.length === 0 ? (

          <p className='[font-family:var(--font-geist-sans)] text-gray-500 dark:text-gray-400 mt-4'>
            No sprints found for this project.{' '}
          </p>

        ) : (

          <Button className="mt-5">Create Sprint</Button>

        )}

      </div>

    </div>

  )
}

export default ProjectPage;