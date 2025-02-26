// NODE MODULES...
import { Outlet } from 'react-router';

// COMPONENTS...
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

function AppLayout() {
  return (
    <SidebarProvider>
      <TooltipProvider
        delayDuration={200}
        disableHoverableContent
      >
        <AppSidebar />
      </TooltipProvider>
      <SidebarTrigger />
      <div>sdasd</div>
      <Outlet />
    </SidebarProvider>
  );
}

export default AppLayout;
