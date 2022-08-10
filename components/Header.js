/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { classNames } from "../utils/classes";

import { useRouter } from "next/router";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Activities", href: "/", before: "before:bg-sky-500", hover: "hover:before:bg-sky-500" },
  { name: "Components", href: "/components", before: "before:bg-cyan-500", hover: "hover:before:bg-cyan-500" },
  { name: "Projects", href: "#", before: "before:bg-pink-500", hover: "hover:before:bg-pink-500" },
  { name: "Calendar", href: "#", before: "before:bg-rose-500", hover: "hover:before:bg-rose-500" },
  { name: "Settings", href: "/settings", before: "before:bg-slate-500", hover: "hover:before:bg-slate-500" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];



function mobileNav(open) {
  return (
    <>
      <div className="w-full flex lg:hidden">
      <div className="relative z-10 flex items-center ">
        {/* Mobile menu button */}
        <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span className="sr-only">Open menu</span>
          {open ? (
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          )}
        </Disclosure.Button>


      </div>
      <div className="flex-1 flex items-center justify-end">
      <svg
className="w-10 h-10"
  viewBox="0 0 122 104"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <path
    fill="#ff0066"
    stroke="none"
    d="M 107.300003 43.400002 C 117.899994 64 123.300003 85.400002 115.399994 94 C 107.5 102.599998 86.199997 98.400002 62.800003 99.699997 C 39.300003 101 13.5 107.800003 4.700001 98.599998 C -4.099998 89.5 3.900002 64.5 16.799999 42.5 C 29.699997 20.600006 47.300003 1.699997 64.099998 2.300003 C 80.800003 2.800003 96.600006 22.699997 107.300003 43.400002 Z"
  />
</svg>



      </div>
      </div>
      <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
        {/* NOTIFICATION */}
        <button
          type="button"
          className="bg-slate-50 hover:bg-sky-500 flex-shrink-0 rounded-full p-1 text-slate-400 hover:text-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-white focus:ring-white"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="flex-shrink-0 relative ml-4">
          <div>
            <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={user.imageUrl}
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block py-2 px-4 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}

export default function Header() {
  const router = useRouter();
  return (
    <Disclosure as="header" className="dark:bg-gray-800 bg-white">
      {({ open }) => (
        <>
          <div className="w-full bg-white">
            <div className="hidden header-top">
              <div className="container">
                <div className="relative h-16 flex justify-between">
                  <div className="relative z-10 px-2 flex lg:px-0">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                  </div>
                  {mobileNav(open)}
                </div>
              </div>
            </div>
            <div className="header-nav">
              <div className="container relative h-16 flex items-center justify-between">
                <nav
                  className="hidden lg:py-4 lg:flex lg:space-x-8 font-semibold  text-slate-900"
                  aria-label="Global"
                >
                  {navigation.map((item, i) => (
                    <Link key={item.name}
                    href={item.href}>
                    <a
                      
                      className={classNames(
                        router.pathname === item.href
                          ? `${item.before} italic`
                          : `${item.hover} hover:italic`,
                        "group before:-inset-1 before:-skew-y-3 before:block before:absolute px-2 relative inline-block"
                      )}
                      aria-current={router.pathname === item.href ? "page" : undefined}
                    >
                      <span
                        className={classNames(
                          router.pathname === item.href ? "text-white" : "",
                          "relative group-hover:text-white"
                        )}
                      >
                        {item.name}
                      </span>
                    </a>
                    </Link>
                  ))}
                </nav>
                {mobileNav(open)}
              </div>
            </div>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="pt-2 pb-3 px-2 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="px-4 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
