import { OurTeamSection } from "../components/about/Ourteamsection";
import { Breadcrumb } from "../components/Breadcrumb";
import data from "../data/ourTeams.json";

export default function OurTeamPage() {
  return (
    <>
    <div className="lg:py-20 bg-[#fdfbf3]">
       <div className='flex justify-center  mb-7'>
        <Breadcrumb items={data.hero.breadcrum} />
      </div>
      <OurTeamSection {...data.team} />
    </div>
    </>
  );
}
