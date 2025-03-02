// NODE MODULES...

// COMPONENTS...
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';

function InboxPage() {
  return (
    <>
      <Head title='Inbox - Tasky AI' />
      <TopAppBar
        title='inbox'
        taskCount={20}
      />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>
      </Page>

      <PageList>
        <TaskCreateButton />
      </PageList>
    </>
  );
}

export default InboxPage;
