// NODE MODULES...
import { Outlet, useNavigation } from 'react-router';
import { cn } from '@/lib/utils';

// COMPONENTS...
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading' && !navigation.formData;

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <TooltipProvider
          delayDuration={200}
          disableHoverableContent
        >
          <AppSidebar />
          <main
            className={cn(
              'flex-1',
              isLoading && 'opacity-50 pointer-events-none',
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>
    </>
  );
}

export default AppLayout;
