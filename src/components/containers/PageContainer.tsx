import React from "react";
import Table from "../ui/Layout/Table";
import { Link, useLocation } from "react-router-dom";
import { TableProps } from "../../types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type PageContainerProps = {
  addFunction?: { children: React.ReactNode; click?: () => void };
  addLink?: { children: React.ReactNode; to: string };
  children?: React.ReactNode;
  filterComponent?: React.ReactNode;
  table?: TableProps;
  pageTabs?: { pageTitle: string; pageLink: string }[];
  breadcrumb?: { title: string; href?: string }[];
};
function PageContainer({
  addFunction,
  children,
  filterComponent,
  table,
  breadcrumb,
  pageTabs,
  addLink,
}: PageContainerProps) {
  // const [filterState, setFilterState] = useState(false);
  const location = useLocation();
  return (
    <main className="container mx-auto pt-9 bg-white">
      {breadcrumb && (
        <Breadcrumb className="border-b border-[#DBDAD] pb-4  mb-8">
          <BreadcrumbList>
            {breadcrumb.map((bread, index) => (
              <div className="flex items-center gap-4" key={index}>
                <BreadcrumbItem>
                  {bread.href ? (
                    <BreadcrumbLink
                      className="text-2xl font-bold"
                      href={`${bread.href}`}
                    >
                      {bread.title}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-2xl">
                      {bread.title}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumb.length - 1 && (
                  <BreadcrumbSeparator className="rotate-180 font-bold" />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
         {filterComponent}

      <div className="mb-4 flex justify-end gap-4">
        {addFunction && (
          <Button onClick={addFunction.click} variant={"default"}>
            {addFunction.children}
          </Button>
        )}
        {addLink && (
          <Button asChild={true} variant={"default"}>
            <Link to={addLink.to}>{addLink.children}</Link>
          </Button>
        )}
      </div>

   
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
