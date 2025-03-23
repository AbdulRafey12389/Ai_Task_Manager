// NODE MODULES...
import { Outlet, useNavigation, useLoaderData } from 'react-router';
import { cn } from '@/lib/utils';

// COMPONENTS...
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ProjectProvider } from '@/contexts/ProjectContext';

// TYPES...
import { AppLoaderData } from '@/routes/loaders/appLoader';

function AppLayout() {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();

  const isLoading = navigation.state === 'loading' && !navigation.formData;

  return (
    <>
      <ProjectProvider projects={projects}>
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
      </ProjectProvider>
    </>
  );
}

export default AppLayout;
