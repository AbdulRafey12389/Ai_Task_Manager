// ASSETS...
import { logo } from '@/assets';

function Logo() {
  return (
    <div className='flex items-center gap-3 font-semibold text-lg'>
      <img
        src={logo}
        alt='Tasky AI'
        className='h-6 w-6'
      />
      Tasky AI
    </div>
  );
}

export default Logo;
