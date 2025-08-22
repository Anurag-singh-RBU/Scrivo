"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/user-fetch";
import { toast } from "sonner";
import { editProject } from "@/actions/projects";

export default function EditProject({projectId}){

  const {membership} = useOrganization();
  const router = useRouter();

  const {loading : isEditing , error , fn : editProjectFn , data : edited} = useFetch(editProject);

  const isAdmin = membership?.role === "org:admin";

  const handleEdit = async () => {

    editProjectFn(projectId);

  };

  useEffect(() => {

    if(edited){

      toast.error("Project updated successfully !!");
      router.refresh();

    }
  
  } , [edited]);

  if(!isAdmin) return null;

  return(

    <main>
        <Link href = {`/project/${projectId}/edit`}>
            <Button variant = {'outline'} className = 'flex items-center mt-0.5 cursor-pointer' onClick={handleEdit} disabled={isEditing}>
              <span className='[font-family:var(--font-geist-sans)]'>Edit Project</span>
            </Button>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </Link>
    </main>
  );
}