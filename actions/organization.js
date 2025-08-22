"use server";

import { db } from "@/lib/prisma";
import { auth , clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getOrganization(slug){

  const { userId } = auth();

  if(!userId){

    redirect("/sign-in?redirect_url=/onboarding");
    
  }

  const user = await db.user.findUnique({where: { clerkUserId : userId }});

  if(!user){

    throw new Error("User not found");

  }

  const organization = await clerkClient().organizations.getOrganization({slug});

  if(!organization){

    return null;

  }

  const { data : membership } = await clerkClient().organizations.getOrganizationMembershipList({organizationId: organization.id});

  const userMembership = membership.find(

    (member) => member.publicUserData.userId === userId

  );

  if(!userMembership){

    return null;

  }

  const plainOrganization = {
    
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    createdAt: organization.createdAt,
    updatedAt: organization.updatedAt,
    imageUrl: organization.imageUrl,
    role: userMembership.role,
    
  };

  return plainOrganization;

}
