// NODE MODULES...
import { Link, useLocation } from 'react-router';
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

// CONTANTS...
import { SIDEBAR_LINKS } from '@/constants';

// ASSETS...
import { ChevronRight, CirclePlus, Plus } from 'lucide-react';

function AppSidebar() {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

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

                  <SidebarMenuBadge>0</SidebarMenuBadge>
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

            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarGroupAction aria-label='Add project'>
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>
              <TooltipContent side='right'>Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className='text-muted-foreground text-sm p-2'>
                      Click + to add some project
                    </p>
                  </SidebarMenuItem>
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
