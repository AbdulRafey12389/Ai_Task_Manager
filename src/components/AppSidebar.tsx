// NODE MODULES...
import { Link, useLoaderData, useLocation } from 'react-router';
import { UserButton } from '@clerk/clerk-react';

// COMPONENTS...
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel,
  useSidebar,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TaskFormDialog from '@/components/TaskFormDialog';
import Logo from '@/components/Logo';
import ProjectFormDialog from './ProjectFormDialog';
import ProjectActionMenu from './ProjectActionMenu';

// HOOKS...
import { useProjects } from '@/contexts/ProjectContext';

// CONTANTS...
import { SIDEBAR_LINKS } from '@/constants';

// ASSETS...
import {
  ChevronRight,
  CirclePlus,
  Hash,
  Plus,
  MoreHorizontal,
} from 'lucide-react';

// TYPES...
import type { AppLoaderData } from '@/routes/loaders/appLoader';

function AppSidebar() {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  const { taskCounts } = useLoaderData() as AppLoaderData;

  const projects = useProjects();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to={'/app/inbox'}
          className='p-2'
        >
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* TASK CREATE BUTTON */}
              <SidebarMenuItem>
                <TaskFormDialog>
                  <SidebarMenuButton className='!text-primary'>
                    <CirclePlus className='' /> Add task
                  </SidebarMenuButton>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* SIDEBAR LINKS */}
              {SIDEBAR_LINKS.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false);
                    }}
                  >
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>

                  {/* SHOW TASK COUNT IN INBOX MENU ITEMS */}
                  {item.href === '/app/inbox' &&
                    Boolean(taskCounts?.inboxTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts?.inboxTasks}
                      </SidebarMenuBadge>
                    )}

                  {item.href === '/app/today' &&
                    Boolean(taskCounts?.todayTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts?.todayTasks}
                      </SidebarMenuBadge>
                    )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ALL PROJECTS */}
        <Collapsible
          defaultOpen
          className='group/collapsible'
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className='text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            >
              <CollapsibleTrigger>
                <ChevronRight className='me-2 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            {/* PROJECT CREATE BUTTON */}
            <Tooltip>
              <ProjectFormDialog method='POST'>
                <TooltipTrigger asChild>
                  <SidebarGroupAction aria-label='Add project'>
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>
              <TooltipContent side='right'>Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects?.documents
                    .slice(0, 5)
                    .map(({ $id, name, color_name, color_hex }) => (
                      <SidebarMenuItem key={$id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            location.pathname === `/app/projects/${$id}`
                          }
                          onClick={() => {
                            if (isMobile) setOpenMobile(false);
                          }}
                        >
                          <Link to={`/app/projects/${$id}`}>
                            <Hash color={color_hex} />

                            <span>{name}</span>
                          </Link>
                        </SidebarMenuButton>

                        <ProjectActionMenu
                          defaultFormData={{
                            id: $id,
                            name,
                            color_name,
                            color_hex,
                          }}
                          side='right'
                          align='start'
                        >
                          <SidebarMenuAction
                            aria-label='More actions'
                            showOnHover
                            className='bg-sidebar-accent'
                          >
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </ProjectActionMenu>
                      </SidebarMenuItem>
                    ))}

                  {projects !== null && projects?.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className='text-muted-foreground'
                        isActive={location.pathname === `/app/projects`}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                      >
                        <Link to={`/app/projects`}>
                          <MoreHorizontal /> All projects
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className='text-muted-foreground text-sm p-2'>
                        Click + to add some project
                      </p>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: 'w-full',
              userButtonTrigger:
                '!shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent',
              userButtonBox: 'flex-row-reverse',
              userButtonOuterIdentifier: 'ps-0',
              popoverBox: 'pointer-events-auto',
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
