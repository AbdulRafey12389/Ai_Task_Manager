// NODE MODULES...
import { Link, useLocation } from 'react-router';

// COMPONENTS...
import Logo from './Logo';
import { Button } from '@/components/ui/button';

function Header() {
  const location = useLocation();

  return (
    <header className='fixed z-40 top-0 left-0 w-full p-4'>
      <div className='container flex items-center justify-between h-16 border backdrop-blur-3xl rounded-xl'>
        <Link to='/'>
          <Logo />
        </Link>

        <div className='flex items-center gap-2'>
          {location.pathname !== '/login' && (
            <Button
              asChild
              variant={'ghost'}
            >
              <Link to='/login'>Sign in</Link>
            </Button>
          )}

          {location.pathname !== '/register' && (
            <Button asChild>
              <Link to='/register'>Start for free</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
