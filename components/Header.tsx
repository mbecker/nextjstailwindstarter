import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { classNames } from "../utils/classes";

import { useRouter } from "next/router";
import { useSession, signOut, signIn } from "next-auth/react";
import { Session } from "next-auth";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Activities",
    href: "/",
    before: "before:bg-sky-500",
    hover: "hover:before:bg-sky-500",
  },
  {
    name: "Components",
    href: "/components",
    before: "before:bg-cyan-500",
    hover: "hover:before:bg-cyan-500",
  },
  {
    name: "Settings",
    href: "/settings",
    before: "before:bg-slate-500",
    hover: "hover:before:bg-slate-500",
  },
];
const userNavigation = [{ name: "Sign out", href: "#" }];

function mobileNav(open: boolean, image?: string) {
  return (
    <>
      <div className="lg:hidden relative z-10 flex items-center ">
        {/* Mobile menu button */}
        <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span className="sr-only">Open menu</span>
          {open ? (
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          )}
        </Disclosure.Button>
      </div>
      <div className="relative z-10 pr-2 lg:p-0 ml-4 flex items-center">
        {/* NOTIFICATION */}
        <Link href="/notifications">
          <a
            type="button"
            className="bg-slate-50 hover:bg-sky-500 flex-shrink-0 rounded-full p-1 text-slate-400 hover:text-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-white focus:ring-white"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </a>
        </Link>
        {/* Profile dropdown */}

        <Menu as="div" className="flex-shrink-0 relative ml-4">
          <div>
            <Menu.Button className="800 rounded-full flex text-sm text-white focus:outline-none">
              <span className="sr-only">Open user menu</span>
              {typeof image !== "undefined" && (
                <img src={image} className="w-8 h-8 rounded-full" />
              )}
              {typeof image === "undefined" && (
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 rounded-full"
                >
                  <title>Mary Roebling</title>
                  <mask
                    id="mask__beam"
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={36}
                    height={36}
                  >
                    <rect width={36} height={36} fill="#FFFFFF" />
                  </mask>
                  <g mask="url(#mask__beam)">
                    <rect width={36} height={36} fill="#f0f0d8" />
                    <rect
                      x={0}
                      y={0}
                      width={36}
                      height={36}
                      transform="translate(5 -1) rotate(155 18 18) scale(1.2)"
                      fill="#000000"
                      rx={6}
                    />
                    <g transform="translate(3 -4) rotate(-5 18 18)">
                      <path
                        d="M15 21c2 1 4 1 6 0"
                        stroke="#FFFFFF"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <rect
                        x={14}
                        y={14}
                        width="1.5"
                        height={2}
                        rx={1}
                        stroke="none"
                        fill="#FFFFFF"
                      />
                      <rect
                        x={20}
                        y={14}
                        width="1.5"
                        height={2}
                        rx={1}
                        stroke="none"
                        fill="#FFFFFF"
                      />
                    </g>
                  </g>
                </svg>
              )}
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0 focus:outline-none">
              <Menu.Item key={"signout"}>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="hover:bg-slate-100 block py-2 px-4 text-sm text-gray-700 w-full text-left"
                >
                  Sign out
                </button>
              </Menu.Item>
              {/* {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block py-2 px-4 text-sm text-gray-700 w-full text-left"
                        )}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))} */}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  return (
    <Disclosure
      as="header"
      className="bg-slate-800 fixed z-50 top-0 left-0 right-0"
    >
      {({ open }) => (
        <>
          <div className="w-full bg-white fixed z-50">
            {/* Top Header Bar - Hidden (pnly for development) */}
            {/* <div className="hidden header-top">
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
                  {mobileNav(open, session)}
                </div>
              </div>
            </div> */}

            <div className="header-nav">
              <div className="container relative h-16 flex items-center justify-between">
                <nav
                  className="hidden lg:py-4 lg:flex lg:space-x-8 font-semibold  text-slate-900"
                  aria-label="Global"
                >
                  {navigation.map((item, i) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href
                            ? `${item.before} italic`
                            : `${item.hover} hover:italic`,
                          "group before:-inset-1 before:-skew-y-3 before:block before:absolute px-2 relative inline-block"
                        )}
                        aria-current={
                          router.pathname === item.href ? "page" : undefined
                        }
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

                {mobileNav(open, session!.user.image)}
              </div>
            </div>
          </div>

          <Disclosure.Panel
            as="nav"
            className="lg:hidden mt-16 left-0 right-0 w-full"
            aria-label="Global"
          >
            <div className="pt-2 pb-3 px-2 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    router.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-none py-2 px-3 text-base font-medium"
                  )}
                  aria-current={
                    router.pathname === item.href ? "page" : undefined
                  }
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

                <Disclosure.Button
                  href="/notifications"
                  as="a"
                  type="button"
                  className="ml-auto flex-shrink-0 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-none py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
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
