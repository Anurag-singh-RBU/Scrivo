"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { deleteProject } from "@/actions/projects";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/user-fetch";
import { toast } from "sonner";

export default function DeleteProject({projectId}){

  const {membership} = useOrganization();
  const router = useRouter();

  const {loading : isDeleting , error , fn : deleteProjectFn , data : deleted} = useFetch(deleteProject);

  const isAdmin = membership?.role === "org:admin";

  const handleDelete = async () => {

    if(window.confirm("Are you sure you want to delete this project ?")){

      deleteProjectFn(projectId);

    }

  };

  useEffect(() => {

    if(deleted){

      toast.error("Project deleted successfully !!");
      router.refresh();

    }
  
  } , [deleted]);

  if(!isAdmin) return null;

  return(

    <main>
      <Button variant="ghost" size="sm" className={`${isDeleting ? "animate-pulse" : ""}`} onClick={handleDelete} disabled={isDeleting}>
        <Trash2 className="h-4 w-4"/>
      </Button>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </main>
  );
}