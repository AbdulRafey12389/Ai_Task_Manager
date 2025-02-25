// COMPONENTS...
import { Separator } from '@/components/ui/separator';

// CONSTANTS...
import { SOCIAL_LINKS } from '@/constants';

function Footer() {
  return (
    <footer className='p-4 pb-0'>
      <div className='container min-h-16 py-4 bg-background border border-b-0 rounded-t-xl flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-between'>
        <p className='text-center text-sm'>&copy; 2025 AbdulRafey</p>

        <ul className='flex flex-wrap items-center'>
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li
              key={index}
              className='flex items-center'
            >
              <a
                href={href}
                className='text-sm text-muted-foreground hover:text-foreground hover:underline'
                target='_blank'
              >
                {label}
              </a>

              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator
                  orientation='vertical'
                  className='mx-3 h-3'
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
