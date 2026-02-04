import { AppSidebar } from "@/components/layout/app-sidebar"
import Roles from "@/constants/role"
import { userService } from "@/services/user.service"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardLayout(

  {
    admin,
    user
  }: {
    children: React.ReactNode,
    admin: React.ReactNode,
    user: React.ReactNode,
  }) {


  // read session server-side and determine role
  const { data: session } = await userService.getSession()
  const role = (session?.user?.role as string) ?? Roles.USER

  console.log("DashboardLayout session:", session, "role:", role)

  const userInfo = {
    role,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          /> */}
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* {admin}
          {user} */}

          {
            userInfo.role === Roles.ADMIN ? admin : user
          }

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}