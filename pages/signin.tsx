import { signIn } from "next-auth/react";
import React from "react";

type Props = {};
const pageColor = { border: "border-sky-500", before: "before:bg-sky-500" };
const SignIn = ({}: Props) => (
  <>
    <div className="w-full max-w-lg mx-auto flex items-start">
      <h1
        className={`p-4 text-lg font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}
      >
        <span className="relative text-white">Sportspocket</span>
      </h1>
    </div>

    <div
      className={` max-w-lg mx-auto overflow-hidden shadow w-full ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}
    >
      <div className="sm:flex sm:items-start p-4">
        <div className="sm:flex-auto">
          <h1 className={`text-base italic font-semibold text-slate-600`}>
            Sign in to your account
          </h1>
        </div>
      </div>
      <div className="mt-6 mb-12 flex items-center justify-center">
        <button
          aria-label="Continue with Strava"
          role="button"
          onClick={() => signIn("strava")}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 py-3.5 px-4 border rounded-none border-slate-700 flex items-center"
        >
          <picture>
            <source srcSet="/images/strava_128.png" type="image/png" />
            <img
              src="/images/strava_128.png"
              className="w-8 h-8"
              alt="Strava"
            />
          </picture>
          <p className="text-base font-medium ml-4 text-slate-700">
            Continue with Strava
          </p>
        </button>
      </div>
    </div>
  </>
);

export default SignIn;
