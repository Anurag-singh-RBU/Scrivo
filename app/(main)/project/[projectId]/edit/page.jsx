"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/app/lib/validators";
import { BarLoader } from "react-spinners";
import { ChevronLeft } from "lucide-react";
import useFetch from "@/hooks/user-fetch";
import { editProject, getProject } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Edit = ({params}) => {

    const {projectId} = params;
    const router = useRouter();
    const [currentProject , setCurrentProject] = useState(null);

    const { register , handleSubmit , formState : { errors } , reset } = useForm({

        resolver: zodResolver(projectSchema),

    });
    
    const { loading , error , data : updatedProject , fn : editProjectFn } = useFetch(editProject);

    useEffect(() => {
        const fetchCurrentProject = async () => {
            try {

                const projectData = await getProject(projectId);
                setCurrentProject(projectData);

                reset({
                    name: projectData.name,
                    key: projectData.key,
                    description: projectData.description
                });

            } catch (error) {

                toast.error("Failed to load project data");

            }
        };
        
        fetchCurrentProject();

    }, [projectId , reset]);

    useEffect(() => {

        if (updatedProject){

            toast.success("Project successfully updated !!");
            router.push(`/onboarding`);

        }

    }, [updatedProject , router , projectId]);

    const onSubmit = async (data) => {
        try{

            await editProjectFn(projectId , data);

        } catch (error) {
            
            console.error("Error updating project :", error);

        }
    };

    if(!currentProject){

        return (
            <div className="flex justify-center items-center min-h-screen">
                <BarLoader width={"30%"} color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="overflow-hidden sm:px-8 px-3">
            <Button className='flex [font-family:var(--font-geist-sans)] items-center gap-2 mt-3 cursor-pointer' onClick={() => router.back()}>
                <ChevronLeft size={13}></ChevronLeft>
                Back
            </Button>
            <div className="mx-auto [font-family:var(--font-geist-sans)]">
                <h1 className="sm:text-6xl text-3xl text-center font-bold mb-15 sm:mt-10 mt-20 [font-family:var(--font-geist-mono)] tracking-tight">
                    Edit Your Project
                </h1>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input 
                            id="name" 
                            {...register("name")} 
                            placeholder="Project Name" 
                            defaultValue={currentProject.name}/>
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <Input 
                            id="key" 
                            {...register("key")} 
                            placeholder="Project Key" 
                            defaultValue={currentProject.key}/>
                        {errors.key && (
                            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
                        )}
                    </div>

                    <div>
                        <Textarea 
                            id="description" 
                            {...register("description")} 
                            className="h-28" 
                            placeholder="Project Description" 
                            defaultValue={currentProject.description}/>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    {loading && (
                        <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
                    )}

                    <Button 
                        type="submit" 
                        size="lg" 
                        className="bg-blue-500 text-white [font-family:var(--font-jetbrains)] font-bold"
                        disabled={loading}>
                        {loading ? "Updating" : "Update Project"}
                    </Button>
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                </form>
            </div>
        </div>
    );
}

export default Edit;
