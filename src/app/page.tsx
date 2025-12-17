import prisma from "@/lib/prisma";
import { Content } from "./_feature/content";
import { Navigation } from "./_feature/navigation";
import { SideBar } from "./_feature/sideBar";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users, "qqqqqqqqqqqq");

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <Navigation />
      <div className="flex w-full">
        <SideBar />
        <Content />
      </div>
    </div>
  );
}
