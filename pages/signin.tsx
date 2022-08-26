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
          <h1 className={`text-xs italic font-semibold text-slate-600`}>
            Sign in with your Strava account
          </h1>
        </div>
      </div>
      <div className="mt-6 mb-12 flex items-center justify-center">
        <button
          aria-label="Continue with Strava"
          role="button"
          onClick={() => signIn("strava")}
          className="focus:outline-none ring-0 ring-offset-0 ring-sky-400 py-3.5 px-4  rounded-none flex items-center"
        >
          <picture>
            <source srcSet="/images/btn_strava_connectwith_orange/btn_strava_connectwith_orange.svg" type="image/svg" />
            <img
              src="/images/btn_strava_connectwith_orange/btn_strava_connectwith_orange.svg"
              className="w-full"
              alt="Strava"
            />
          </picture>
        </button>
      </div>
    </div>
  </>
);

export default SignIn;
