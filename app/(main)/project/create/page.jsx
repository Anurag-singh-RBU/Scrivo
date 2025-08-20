"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/app/lib/validators";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import OrgSwitcher from "@/app/Blocks/OrgSwitcher";
import useFetch from "@/hooks/user-fetch";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export default function CreateProject(){

  const router = useRouter();
  const {isLoaded : isOrgLoaded , membership} = useOrganization();
  const {isLoaded : isUserLoaded} = useUser();
  const [isAdmin , setIsAdmin] = useState(false);

  const {register , handleSubmit , formState : {errors}} = useForm({

    resolver : zodResolver(projectSchema),

  });

  useEffect(() => {

    if(isOrgLoaded && isUserLoaded && membership){

      setIsAdmin(membership.role === "org:admin");

    }

  } , [isOrgLoaded , isUserLoaded , membership]);

  const {loading , error , data : project , fn : createProjectFn} = useFetch(createProject);

  const onSubmit = async (data) => {

    if(!isAdmin){

      alert("Only organization admins can create projects");
      return;

    }

    const orgId = membership.organization.id;
    createProjectFn(data , orgId);

  };

  useEffect(() => {

    if(project){
      
      toast.success("Project successfully created !!");
      router.push(`/onboarding`);

    }

  }, [loading]);

  if(!isOrgLoaded || !isUserLoaded){

    return null;

  }

  if(!isAdmin){

    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title">
          Oops ! Only Admins can create projects.
        </span>
        <OrgSwitcher/>
      </div>
    );

  }

  return (

    <div className="overflow-hidden sm:px-8 px-3">
      <Button className = 'flex [font-family:var(--font-geist-sans)] items-center gap-2 mt-3 cursor-pointer' onClick={() => router.back()}>
        <ChevronLeft size={13}></ChevronLeft>
        Back
      </Button>
    <div className="mx-auto [font-family:var(--font-geist-sans)]">
      <h1 className="sm:text-6xl text-3xl text-center font-bold mb-8 sm:mt-10 mt-20 [font-family:var(--font-geist-mono)] tracking-tight">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div>
          <Input id="name" {...register("name")} placeholder="Project Name"/>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input id="key" {...register("key")} placeholder="Project Key &nbsp; ( Ex : RCYT )"/>
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>

        <div>
          <Textarea id="description" {...register("description")} className="h-28" placeholder="Project Description"/>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
        )}

        <Button type="submit" size="lg" disabled={loading} className="bg-blue-500 text-white [font-family:var(--font-jetbrains)] font-bold">
          {loading ? "Creating" : "Create Project"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
    </div>
  );
}