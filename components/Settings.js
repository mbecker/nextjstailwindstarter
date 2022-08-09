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
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Account", href: "#", icon: UserCircleIcon, current: true },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
  { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsTwo() {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? "bg-sky-500 ring-sky-500" : "bg-white",
                "group block max-w-xs  rounded-lg p-3  ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={classNames(
                    item.current ? "text-white" : "text-slate-400",
                    "flex-shrink-0 h-6 w-6 group-hover:stroke-white"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    item.current ? "text-white" : "text-slate-900",
                    " group-hover:text-white text-sm font-semibold truncate"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </a>
          ))}
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <form action="#" method="POST">
          <div className="rounded-md shadow  bg-white  mt-0">
            <div className="p-6 border-b border-gray-100 ">
              <h5 className="text-xl font-semibold">Payment Methods</h5>
              <p className="text-slate-400 mt-2">
                Primary payment method is used by default
              </p>
            </div>
            <div className="px-6">
              <ul>
                <li className="flex justify-between items-center py-6">
                  <div className="flex items-center">
                    <img
                      src="assets/images/payments/visa.png"
                      className="rounded shadow w-12"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="font-semibold">Visa ending in 4578</p>
                      <p className="text-slate-400 text-sm">
                        Expires in 12/2022
                      </p>
                    </div>
                  </div>
                  <div>
                    <a
                      href=""
                      className="btn btn-icon bg-red-600/5 hover:bg-red-600 border-red-600/10 hover:border-red-600 text-red-600 hover:text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2 h-4 w-4"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="flex justify-between items-center py-6 border-t border-gray-100 ">
                  <div className="flex items-center">
                    <img
                      src="assets/images/payments/american-ex.png"
                      className="rounded shadow w-12"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="font-semibold">
                        American Express ending in 4578
                      </p>
                      <p className="text-slate-400 text-sm">
                        Expires in 12/2022
                      </p>
                    </div>
                  </div>
                  <div>
                    <a
                      href=""
                      className="btn btn-icon bg-red-600/5 hover:bg-red-600 border-red-600/10 hover:border-red-600 text-red-600 hover:text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2 h-4 w-4"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="flex justify-between items-center py-6 border-t border-gray-100 ">
                  <div className="flex items-center">
                    <img
                      src="assets/images/payments/discover.png"
                      className="rounded shadow  w-12"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="font-semibold">Discover ending in 4578</p>
                      <p className="text-slate-400 text-sm">
                        Expires in 12/2022
                      </p>
                    </div>
                  </div>
                  <div>
                    <a
                      href=""
                      className="btn btn-icon bg-red-600/5 hover:bg-red-600 border-red-600/10 hover:border-red-600 text-red-600 hover:text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2 h-4 w-4"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="flex justify-between items-center py-6 border-t border-gray-100 ">
                  <div className="flex items-center">
                    <img
                      src="assets/images/payments/master-card.png"
                      className="rounded shadow w-12"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="font-semibold">
                        Master Card ending in 4578
                      </p>
                      <p className="text-slate-400 text-sm">
                        Expires in 12/2022
                      </p>
                    </div>
                  </div>
                  <div>
                    <a
                      href=""
                      className="btn btn-icon bg-red-600/5 hover:bg-red-600 border-red-600/10 hover:border-red-600 text-red-600 hover:text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2 h-4 w-4"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="py-6 border-t border-gray-100 ">
                  <a
                    href="#!"
                    data-modal-toggle="paymentMethod"
                    className="btn-main  text-white rounded-md"
                  >
                    Add Payment Method
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="ring-1 ring-slate-200 ring-opacity-5 shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y- sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-Mail Address
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Provide basic informtion about the job. Be specific with the
                  job title.
                </p>
              </div>

              <fieldset>
                <legend className="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="h-5 flex items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-700"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-700"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="text-base font-medium text-gray-900">
                  Push Notifications
                </legend>
                <p className="text-sm text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                    />
                    <label htmlFor="push-everything" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        Everything
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                    />
                    <label htmlFor="push-email" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        Same as email
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                    />
                    <label htmlFor="push-nothing" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        No push notifications
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="px-4 py-3 bg-slate-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-sky-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
