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

export async function getProject(orgId){

  const {userId} = auth();

  if(!userId || !orgId){

    throw new Error("Unauthorized");

  }

  const user = await db.user.findUnique({

    where : {clerkUserId : userId}

  });

  if(!user){

    throw new Error("User not found");

  }

  const project = await db.project.findMany({

    where : {organizationId : orgId},
    orderBy : {createdAt : "desc"},

  });

  return project;

}

export async function getProjectById(projectId){

  const {userId} = auth();

  if(!userId){

    throw new Error("Unauthorized");

  }

  try{

    const project = await db.project.findUnique({

      where : {id : projectId}

    });

    if(!project){

      throw new Error("Project not found");

    }

    // Check if user has access to this project
    const user = await db.user.findUnique({
      where : {clerkUserId : userId}
    });

    if(!user){
      throw new Error("User not found");
    }

    // You might want to add additional access checks here
    // For example, check if user is a member of the organization that owns the project

    return project;

  } catch(error){

    console.error("Error getting project:", error);
    throw new Error(error.message || "Error getting project");

  }

}

export async function deleteProject(projectId){

  const {userId} = auth();

  if(!userId){

    throw new Error("Unauthorized");

  }

  try {
    
    const project = await db.project.findUnique({

      where : {id : projectId}

    });

    if(!project){

      throw new Error("Project not found");

    }

    const orgId = project.organizationId;

    const membershipList = await clerkClient.organizations.getOrganizationMembershipList({organizationId : orgId});
    
    const userMembership = membershipList.data?.find((membership) => membership.publicUserData?.userId === userId);
    
    if(!userMembership || userMembership.role !== "org:admin"){

      throw new Error("Only organization admins can delete projects");

    }

    await db.project.delete({

      where : {id : projectId}

    });

    return {success : true};
    
  } catch(error) {

    console.error("Error deleting project :", error);
    throw new Error(error.message || "Error deleting project");

  }

}

export async function editProject(projectId , data){
  const {userId} = auth();

  if(!userId){

    throw new Error("Unauthorized");

  }

  try{

    const project = await db.project.findUnique({

      where : {id : projectId}

    });

    if(!project){

      throw new Error("Project not found");

    }

    const orgId = project.organizationId;

    const membershipList = await clerkClient.organizations.getOrganizationMembershipList({organizationId: orgId});
    
    const userMembership = membershipList.data?.find((membership) => membership.publicUserData?.userId === userId);
    
    if(!userMembership || userMembership.role !== "org:admin"){

      throw new Error("Only organization admins can edit projects");

    }

    if(data.key){

      const existing = await db.project.findFirst({

        where : {

          organizationId : orgId,
          key : data.key.toUpperCase(),
          id : {not : projectId}

        }

      });

      if(existing){

        throw new Error(`A project with the key "${data.key}" already exists in this organization`);

      }

    }

    const updated = await db.project.update({

      where : {id : projectId},

      data : {

        name : data.name || project.name,
        key : data.key ? data.key.toUpperCase() : project.key,
        description : data.description !== undefined ? data.description : project.description,

      }

    });

    return updated;
    
  } catch(error){

    console.error("Error editing project :", error);
    throw new Error(error.message || "Error editing project");

  }
}
