import { CheckCircleIcon } from "@heroicons/react/outline";

export default function SettingsForm() {
  return (
    <form className="space-y-8 ">
      <div className="space-y-8 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Emails
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Email addresses for notification
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                New Email address
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col space-y-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block max-w-lg w-full shadow-sm focus:ring-sky-400 focus:border-sky-400 sm:text-sm border-gray-300"
                />
                <div className="w-full">
                <button
            type="submit"
            className="btn-main"
          >
            Save
          </button>
                </div>
              </div>
             
            </div>
          </div>
          
        </div>
      </div>

      
      <div className="pt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start ">
              <label
                htmlFor="emails"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email addresses
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 flex flex-col space-y-4 ">
                <ul className="flex flex-col space-y-2 divide-y divide-gray-200">
                    <li className="flex fflex-row items-center py-1">
                        <span className="flex-1">mats@aol.com</span>
                        <div className="">
                        <CheckCircleIcon className='w-6 h-6 text-cyan-400' />
                        </div>
                    </li>
                    <li className="flex fflex-row items-center py-1">
                        <span className="flex-1">mats@aol.com</span>
                        <div className="">
                        <CheckCircleIcon className='w-6 h-6 text-cyan-400' />
                        </div>
                    </li>
                    <li className="flex fflex-row items-center py-1">
                        <span className="flex-1">mats@aol.com</span>
                        <div className="">
                        <CheckCircleIcon className='w-6 h-6 text-cyan-400' />
                        </div>
                    </li>
                </ul>
              </div>
              
            </div>
      
    </form>
  );
}
