import Container from "./Blocks/Container";
import Hero from "./Blocks/Hero";
import Navbar from "./Blocks/Navbar";

export default function Home() {
  return (

    <div className="h-screen [background:radial-gradient(125%_100%_at_50%_0%,_#FFF_6.32%,_#E0F0FF_29.28%,_#E0F0FF_29.28%,_#E7EFFD_68.68%,_#FFF_100%)]">
      <div className="max-w-4xl mx-auto absolute inset-0 h-full w-full sm:block hidden">
        <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-neutral-300/50 via-neutral-200 to-transparent pointer-events-none"/>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-neutral-300/50 via-neutral-200 to-transparent pointer-events-none"/>
      </div> 
      <Container className="flex flex-col items-center relative h-screen">
        <Navbar/>
        <Hero/>
      </Container>
    </div>
      
  );
}
