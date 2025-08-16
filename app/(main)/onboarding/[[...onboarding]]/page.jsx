import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import Navbar from "@/app/Blocks/Navbar";
import OnboardingClient from "@/app/Blocks/OnboardingClient";

export default async function Onboarding(){

    const user = await currentUser();

    if(!user) redirect("/sign-in?redirect_url=/onboarding");

    let dbUser = await db.user.findUnique({where: { clerkUserId: user.id }});

    if(!dbUser){

        const name = `${user.firstName} ${user.lastName}`;
        dbUser = await db.user.create({

        data : {
            clerkUserId: user.id,
            name,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },

        });

    }

    return (

        <div>
        <div className="w-full h-auto px-8">

            <Navbar/>
            <div className="absolute inset-x-0 sm:block hidden w-full h-px bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-neutral-200/50 pointer-events-none"/>
            <div className="flex flex-col items-center mt-20 justify-center">
                <OnboardingClient/>
            </div>

        </div>
        </div>

    );
}
