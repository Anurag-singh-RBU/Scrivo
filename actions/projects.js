"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data, orgId) {

  const { userId } = auth();

  if(!userId){

    throw new Error("Unauthorized");

  }

  if(!orgId){

    throw new Error("No Organization Selected");

  }

  try{
  
    const membershipList = await clerkClient.organizations.getOrganizationMembershipList({organizationId : orgId});

    const userMembership = membershipList.data?.find((membership) => membership.publicUserData?.userId === userId);

    if(!userMembership || userMembership.role !== "org:admin"){

      throw new Error("Only organization admins can create projects");

    }

    const existingProject = await db.project.findFirst({

      where: {

        organizationId: orgId,
        key: data.key.toUpperCase()

      }

    });

    if(existingProject){

      throw new Error(`A project with the key "${data.key}" already exists in this organization`);

    }

    const project = await db.project.create({

      data: {

        name: data.name,
        key: data.key.toUpperCase(),
        description: data.description,
        organizationId: orgId,

      },

    });

    return project;

  } catch(error){

    console.error("Error creating project:", error);
    throw new Error(error.message || "Error creating project");
    
  }
}
