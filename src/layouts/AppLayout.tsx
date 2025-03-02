// NODE MODULES...
import { Outlet } from 'react-router';

// COMPONENTS...
import { SidebarProvider } from '@/components/ui/sidebar';
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
        <main className='flex-1'>
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default AppLayout;
