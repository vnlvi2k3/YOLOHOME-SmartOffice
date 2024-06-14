import DashBoardMain from "./DashBoardMain";
import dynamic from "next/dynamic";

const NoSSRDashBoardMain = dynamic(() => import("./DashBoardMain"), {
  ssr: false,
});

export default function Dashboard() {
  return <NoSSRDashBoardMain />;
}
