"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrganizationList, useOrganization } from "@clerk/nextjs";

export default function OnboardingClient() {
  const router = useRouter();
  const { organization } = useOrganization();

  useEffect(() => {

    if(organization){

      router.push(`/organization/${organization.slug}`);

    }

  }, [organization]);

  return (

    <div className="flex flex-col items-center justify-center">
      <OrganizationList hidePersonal afterCreateOrganizationUrl="/organization/:slug" afterSelectOrganizationUrl="/organization/:slug"/>
    </div>

  );
}
