import { Navigation } from "../../_feature/navigation";
import { SideBar } from "../../_feature/sideBar";
import { Content } from "./_feature/content";

export default async function Home() {
  return (
    <div className="flex flex-col max-h-screen bg-white w-full relative">
      <Navigation />
      <div className="flex w-full h-full">
        <SideBar />
        <Content />
      </div>
    </div>
  );
}
