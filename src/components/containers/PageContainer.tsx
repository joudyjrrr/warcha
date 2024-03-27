import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Table  from "../ui/Layout/Table";
import { Link, useLocation } from "react-router-dom";
import { TableProps } from "../../types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type PageContainerProps = {
  addFunction?: { children: React.ReactNode; click?: () => void };
  children?: React.ReactNode;
  filterComponent?: React.ReactNode;
  table?: TableProps;
  pageTabs?: { pageTitle: string; pageLink: string }[];
};
function PageContainer({
  addFunction,
  children,
  filterComponent,
  table,
  pageTabs,
}: PageContainerProps) {
  const [filterState, setFilterState] = useState(false);
  const location = useLocation();
  return (
    <main className="container mx-auto pt-9">
      <div className="mb-4 flex justify-end gap-4">
        {filterComponent && (
          <Button
            theme="dark"
            onClick={() => setFilterState((prop) => !prop)}
            styleType="outline"
          >
            <CiFilter size={"1.5rem"} />
            <p>فلترة</p>
          </Button>
        )}
        {addFunction && (
          <Button onClick={addFunction.click} theme="primary">
            {addFunction.children}
          </Button>
        )}
      </div>

      {filterState && filterComponent}
      {pageTabs && (
        <div className="bg-secondary-500/10 mb-4 flex w-full overflow-hidden rounded-t-md border-b">
          {pageTabs.map((page, index) => (
            <Link
              key={index}
              className={cn(
                "hover:bg-secondary-500/20 w-full py-2 text-center transition-all hover:text-primary-500",
                {
                  "border-b-2 border-b-primary-500 text-primary-500":
                    location.pathname === page.pageLink,
                }
              )}
              to={page.pageLink}
            >
              {page.pageTitle}
            </Link>
          ))}
        </div>
      )}
      {table && <Table table={table} />}
      <div className="">{children}</div>
    </main>
  );
}

export default PageContainer;
