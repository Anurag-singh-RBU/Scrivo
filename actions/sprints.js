'use server'

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createSprint(data , projectId){

    const {userId} = auth();

    if(!userId){

        throw new Error("Unauthorized");

    }

    const project = await db.project.findUnique({

        where : {id : projectId},
        include : {organization : true}

    });

    if(!project){

        throw new Error("Project not found");   

    }

    const sprint = await db.sprint.create({

        data : {

            name : data.name,
            startDate : data.startDate,
            endDate : data.endDate,
            status : "PLANNED",
            projectId : projectId,
            organizationId : project.organization.id

        }

    });

    return sprint;

}