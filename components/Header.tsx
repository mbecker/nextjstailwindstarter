import { forwardRef, Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { classNames } from "../utils/classes";

import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

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

function MobileNav(open: boolean, image?: string) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
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
        {/* Container: Theme, Notifications */}
        <div className="flex items-center justify-center  border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
          <label className="sr-only" id="headlessui-listbox-label-2">
            Theme
          </label>
          <button
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setTheme(
                theme === "light" || typeof theme === "undefined"
                  ? "dark"
                  : "light"
              );
            }}
          >
            <span className="dark:hidden">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  className="fill-sky-400/20 stroke-sky-500"
                />
                <path
                  d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                  className="stroke-sky-500"
                />
              </svg>
            </span>
            <span className="hidden dark:inline">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                  className="fill-sky-400/20"
                />
                <path
                  d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                  className="fill-sky-500"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                  className="fill-sky-500"
                />
              </svg>
            </span>
          </button>
          {/* NOTIFICATION */}
          <Link href="/notifications">
            <a
              type="button"
              className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
            >
              <span className="sr-only">View Notifications</span>
              <BellIcon className="w-5 h-5" />
            </a>
          </Link>
        </div>

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
                  className="hover:bg-slate-100 block py-4 px-4 font-semibold text-gray-700 w-full text-left"
                >
                  Sign out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}

/* eslint-disable */
const MyLink = forwardRef((props: any, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});
/* eslint-enable */

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  return (
    <Disclosure
      as="header"
      className="bg-slate-100 border-b-[1px] border-slate-300 dark:border-b-0 dark:bg-slate-800 fixed z-50 top-0 left-0 right-0"
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
                  {MobileNav(open, session)}
                </div>
              </div>
            </div> */}

            <div className="header-nav">
              <div className="container relative h-16 flex items-center justify-between">
                <nav
                  className="hidden lg:py-4 lg:flex lg:space-x-8 font-semibold text-slate-900"
                  aria-label="Global"
                >
                  {navigation.map((item, i) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href
                            ? `${item.before} italic`
                            : `${item.hover} `,
                          "hover:italic group before:-inset-1 before:-skew-y-3 before:block before:absolute px-2 relative inline-block"
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

                {MobileNav(open, session!.user.image)}
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
                <MyLink href={item.href} key={item.name}>
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      router.pathname === item.href
                        ? "bg-sky-500 dark:bg-slate-900 text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-none py-2 px-3 text-base font-medium w-full text-left"
                    )}
                    aria-current={
                      router.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                </MyLink>
              ))}
            </div>
            <div className="dark:border-t border-gray-700 pt-4 pb-3">
              <div className="mt-0 px-2 space-y-1">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block rounded-none py-2 px-3 text-base font-medium dark:text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
