import React from 'react';

const Footer = () => {
    return (
     <footer className="w-full bg-white dark:bg-gray-800  border-t border-[#E0E0E0] dark:border-[#495057]">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
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
                <p className="text-[#8D99AE] dark:text-[#ADB5BD] text-base">
                  Your guide to the best flavors in town.
                </p>
                <div className="flex space-x-6">
                  <a
                    className="text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                    href="#"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                    href="#"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm0 1.623c-2.387 0-2.653.01-3.593.056-1.115.05-1.573.22-1.895.344-.45.18-.765.398-1.126.76s-.578.675-.76 1.126c-.123.322-.293.78-.344 1.895C3.633 9.347 3.623 9.613 3.623 12s.01 2.653.056 3.593c.05 1.115.22 1.573.344 1.895.18.45.398.765.76 1.126s.675.578 1.126.76c.322.123.78.293 1.895.344 1.028.048 1.373.056 3.8.056s2.772-.008 3.8-.056c1.115-.05 1.573-.22 1.895-.344.45-.18.765-.398 1.126-.76s.578-.675.76-1.126c.123-.322.293-.78.344-1.895.048-1.028.056-1.373.056-3.8s-.008-2.772-.056-3.8c-.05-1.115-.22-1.573-.344-1.895a3.297 3.297 0 00-.76-1.126 3.297 3.297 0 00-1.126-.76c-.322-.123-.78-.293-1.895-.344C15.087 3.633 14.82 3.623 12.315 3.623zM12 7.152a4.848 4.848 0 100 9.696 4.848 4.848 0 000-9.696zM12 15a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                    href="#"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-[#2B2D42] dark:text-[#F9F9F9] tracking-wider uppercase">
                      Company
                    </h3>
                    <ul className="mt-4 space-y-4" role="list">
                      <li>
                        <a
                          className="text-base text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                          href="#"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-base text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                          href="#"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-base text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                          href="#"
                        >
                          Careers
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-[#2B2D42] dark:text-[#F9F9F9] tracking-wider uppercase">
                      Legal
                    </h3>
                    <ul className="mt-4 space-y-4" role="list">
                      <li>
                        <a
                          className="text-base text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                          href="#"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-base text-[#8D99AE] dark:text-[#ADB5BD] hover:text-[#E63946]"
                          href="#"
                        >
                          Terms of Service
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-1">
                  <div>
                    <h3 className="text-sm font-semibold text-[#2B2D42] dark:text-[#F9F9F9] tracking-wider uppercase">
                      Newsletter
                    </h3>
                    <p className="text-[#8D99AE] dark:text-[#ADB5BD] mt-4">
                      Sign up for our newsletter to get the latest news and
                      updates.
                    </p>
                    <form className="mt-4 sm:flex sm:max-w-md">
                      <label
                        className="sr-only"
                        htmlFor="email-address"
                      >
                        Email address
                      </label>
                      <input
                        autoComplete="email"
                        className="form-input appearance-none min-w-0 w-full bg-white dark:bg-gray-700 border border-[#E0E0E0] dark:border-[#495057] rounded-[0.5rem] shadow-sm py-2 px-4 text-base text-[#2B2D42] dark:text-[#F9F9F9] placeholder:text-[#8D99AE] dark:placeholder:text-[#ADB5BD] focus:outline-none focus:ring-[#E63946] focus:border-[#E63946]"
                        id="email-address"
                        name="email-address"
                        placeholder="Enter your email"
                        required
                        type="email"
                      />
                      <div className="mt-3 rounded-[0.5rem] sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button
                          className="w-full bg-[#E63946] flex items-center justify-center border border-transparent rounded-[0.5rem] py-2 px-4 text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E63946]"
                          type="submit"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-[#E0E0E0] dark:border-[#495057] pt-8">
              <p className="text-base text-[#8D99AE] dark:text-[#ADB5BD] text-center">
                © 2024 FlavorFind, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
  );
}

export default Footer;
