import Image from "next/image";
import Container from "./Blocks/Container";
import Hero from "./Blocks/Hero";
import Navbar from "./Blocks/Navbar";
import { Marquee } from "@/components/magicui/marquee";
import Features from "./Blocks/Features";
import {Highlighter} from "@/components/magicui/highlighter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {

  const features = [
    {
      fname: "Intuitive Kanban Boards",
      text: "Visualize your workflow and optimize team productivity with our easy to use Kanban boards.",
    },
    {
      fname: "Sprint Planning",
      text: "Plan and manage sprints effectively ensuring your team stays focused on delivering value.",
    },
    {
      fname: "Detailed Reporting",
      text: "Gain insights into your team's performance with detailed and customizable reports and analytics.",
    },
    {
      fname: "Collaborative Dashboards",
      text: "Foster collaboration with shared workspaces where teams can communicate and collaborate in real time.",
    },
  ];

  return (

    <div className="h-full [background:radial-gradient(125%_100%_at_50%_0%,_#FFF_6.32%,_#E0F0FF_29.28%,_#E0F0FF_29.28%,_#E7EFFD_68.68%,_#FFF_100%)]">
      <div className="max-w-4xl mx-auto absolute inset-0 h-full w-full sm:block hidden">
        <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-neutral-300/50 via-neutral-200 to-transparent pointer-events-none"/>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-neutral-300/50 via-neutral-200 to-transparent pointer-events-none"/>
      </div> 
      <Container className="flex flex-col items-center relative h-screen">
        <Navbar/>
        <Hero/>
      </Container>
      <div className="relative w-full">
        <div className="absolute inset-x-0 sm:block hidden w-full h-px bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-neutral-200/50 pointer-events-none"/>
        <div className="max-w-4xl mx-auto sm:p-5 py-2">
        <Image src = "/kanban.png" alt = "kanban board" loading = "lazy" width={1000} height={1000} 
        className="sm:rounded-2xl w-full object-cover object-left-top border border-neutral-200 shadow-md overflow-clip [mask-image:radial-gradient(155.14%_111.78%_at_50%_-11.78%,_#D9D9D9_60%,_rgba(115,_115,_115,_0.00)_90%)] -mb-14.5 lg:-mb-7.5"></Image>
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent pointer-events-none"/>
        <div className="sm:mt-15 mt-35 w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-10 text-center [font-family:var(--font-geist-mono)]">
          <Highlighter action='underline' color='blue'>Key Features</Highlighter>
        </h2>
        <Marquee>
          {features.map((item , i) => (
            <Features key={i} fname={item.fname}text={item.text}/>
          ))}
        </Marquee>
        </div>
        </div>
      </div>
      <div className="sm:mt-15 mt-10 p-10 h-[300px] w-full bg-gray-50">
        <h2 className="[font-family:var(--font-jetbrains)] text-3xl text-center font-bold leading-11">Ready to Transform Your Workflow ?</h2>
        <p className="text-gray-700 sm:text-[15px] text-sm [font-family:var(--font-jetbrains)] text-center mt-3">
          Join thousands of teams already using <span className="font-bold text-blue-700">SCRIVO</span> to streamline their projects and boost productivity.
        </p>
        <div className="flex justify-center mt-10">
        <Link href = '/project/create'>
          <Button className = 'flex items-center gap-3 w-full mt-0.5 cursor-pointer'>
            <span className="[font-family:var(--font-geist-sans)]">Start For Free</span><ArrowRight size={13} className="mt-1"></ArrowRight>
          </Button>
        </Link>
        </div>
      </div>

    </div>
      
  );
}
