import type { NextPage } from "next";
import Table from "./../components/Table";

const pageColor = { border: "border-sky-500", before: "before:bg-sky-500" };

const Home: NextPage = () => {
  return (
    <div className={`overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}>
      <div className="sm:flex sm:items-start p-4">
        <div className="sm:flex-auto">
          <h1 className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}>
            <span className="relative text-white">Activities</span>
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button className="btn-main">
  Refresh
</button>
        </div>
      </div>
      <div className="mt-0">
        <Table />
      </div>
    </div>
  );
};

export default Home;
