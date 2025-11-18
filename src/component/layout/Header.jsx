import React from 'react';
import { Link} from 'react-router-dom'; // Make sure to import Link
import { useLocation } from 'react-router-dom';

function Header() {

  const location = useLocation();
  const activePage =(path)=>
     location.pathname ==path
  ? "text-[#E63946] dark:text-[#E63946]"
  : "text-[#2B2D42] dark:text-[#F9F9F9]"



  return (
    <header className="w-full flex justify-center sticky top-0 z-50 bg-[#2B2D42]/50   backdrop-blur-sm">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#E0E0E0] dark:border-[#495057] px-4 md:px-10 py-3 w-full max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="text-[#E63946] size-7">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.5.92.5 1.32 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
            </svg>
          </div>
          <h2 className="text-[#2B2D42] dark:text-[#F9F9F9] text-xl font-bold leading-tight tracking-[-0.015em]">
            FlavorFind
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-9">
          <Link
            className={`text-sm font-medium leading-normal hover:text-[#E63946] dark:hover:text-[#E63946] transition-colors ${activePage("/")}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`text-sm font-medium leading-normal hover:text-[#E63946] dark:hover:text-[#E63946] transition-colors ${activePage("/restaurants")}`}
            
            to="/restaurants"
          >
            Restaurants
          </Link>
          <Link
            className={`text-sm font-medium leading-normal hover:text-[#E63946] dark:hover:text-[#E63946] transition-colors ${activePage("/blog")}`}
            to="/blog"
          >
            Blog
          </Link>
        </div>
        <div className="flex items-center gap-2">           
          <Link
          to={'/profile'}
            className="hidden md:block bg-center bg-no-repeat aspect-square bg-cover rounded-[9999px] size-10 ml-2"
            data-alt="User profile avatar"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1m85kmdFNr1gbDGAJv5ZyqJ9mbnkSqlTJC9qUaF93stCEj-Eorb-NSag8uteXC_E6gBG_aE06sHtXg-uoDcDm9I9vsfWuH-sjvBsUATdhL8gW7utL-oQAQEHzXTLc4JqB5M3Rb9nRdE73emK2IYZU6FgyMiOPVqdLHEBr-muLCJgiLij7NUZXCG74cq-2Qi3earSCXvkdUW6goBMXsm-PSpngDZRevzeGaWoPpOQVSfeiPysUdFKVUxvleDig2yZbzpkbZnWQUi4")',
            }}
          ></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;