import React from "react";

const Footer = () => (
    <footer className="z-10 footer">
    <div className="relative">
      <svg
        className="w-full h-[full] -mb-2"
        viewBox="0 0 1441 100"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          className="fill-sky-500"
          stroke="none"
          d="M -0 44.555557 L 1441 1 L 1441 99 L -0 99 Z"
        />
      </svg>
    </div>
    <div className="py-4 px-4 bg-sky-500">
      <div className="container sm:flex justify-between">
        <div className="mb-6 sm:mb-0 sm:flex">
          <p>Copyright © 2022 sportspocket</p>
          <p className="sm:ml-4 sm:pl-4">
            <a className="link-footer" href="/brand">
              Trademark Policy
            </a>
          </p>
        </div>
        <a
          className="link-footer"
          href="/contact"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
