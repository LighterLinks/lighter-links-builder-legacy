import { ReactNode } from "react";
import AppPage from "./appPage/AppPage";
import Blueprints from "./blueprint/Blueprints";
import DashboardIcon from "@/asset/Icons/DashboardIcon";

export const ApplicationPages: { name: string; component: ReactNode }[] = [
  {
    name: "Application",
    component: <AppPage />,
  },
  {
    name: "Blueprints",
    component: <Blueprints />,
  },
];

export const FooterItems: { name: string; route: string; icon: ReactNode }[] = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <DashboardIcon size={20} color="#000" />,
  },
];
