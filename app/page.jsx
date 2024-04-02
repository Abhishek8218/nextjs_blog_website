import Image from "next/image";
import home_bird from '@/public/img/home_bird.png'

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3">
        <p className="special-word text-xs">Embark on an epic quest</p>
        <h1 className="pb-5">
        Explore Our<span className="special-word"> Eclectic Blog</span><br />  Platform
        </h1>
     
        <p>Dive into a myriad of topics from travel to tech, wellness to creativity. Engage with bite-sized articles offering insights and inspiration. Join us in this journey of discovery and exploration.</p>
      </div>

      <div className="hidden md:block basis-1/3">
        <Image 
          src={home_bird}
          alt="Home bird"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
