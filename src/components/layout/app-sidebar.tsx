import * as React from "react"

import { SearchForm } from "@/components/layout/search-form"
import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { userRoutes } from "@/routes/userRoutes"
import { Route } from "@/types"
import Roles from "@/constants/role"

// This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     {
//       title: "Getting Started",
//       items: [
//         // {
//         //   title: "Write Blogs",
//         //   url: "/dashboard/write-blog",
//         // },
//         // {
//         //   title: "Analytics",
//         //   url: "/dashboard/analytics",
//         // },
//         {
//           title: "User Dashboard",
//           url: "/dashboard",
//         },
//         {
//           title: "Admin Dashboard",
//           url: "/admin-dashboard",
//         },
//       ],
//     }
//   ],
// }

export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar> }) {

  let routes : Route[]= []

  switch (user.role) {
    case Roles.ADMIN:
      routes = adminRoutes
      break;

    case Roles.USER:
      routes = userRoutes
      break;

    default:
      routes = []
      break;
  }


  return (
    <Sidebar {...props}>
      <SidebarContent>

        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
