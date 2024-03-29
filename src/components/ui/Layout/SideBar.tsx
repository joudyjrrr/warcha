import { useWindowSize } from "@/hooks";
import { NavigationProject, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/assets/svgs";

function SideBar() {
  const [expanded, setExpanded] = useState(false);
  const size = useWindowSize();
  const location = useLocation();

  useEffect(() => {
    window.onresize = () => {
      if (size.width) {
        setExpanded(size.width > 1000 ? true : false);
      }
    };
    if (typeof window !== "undefined" && size.width) {
      setExpanded(size.width > 1000 ? true : false);
    }
  }, [size.width]);
  return (
    <aside
      className={cn(
        `bg-primary shadow-[0px_0px_8px_1px_rgba(0,0,0,0.4)] transition-all relative border-l min-h-svh`,
        {
          "w-[320px]": expanded,
          "w-auto": !expanded,
        }
      )}
    >
      <div className="pt-4 justify-center flex  flex-col items-center">
        <Logo />
        <h1 className="text-white text-xl font-md">HTC</h1>
      </div>
      <Button
        variant="outline"
        className="absolute top-4 left-0 -translate-x-1/2 aspect-square rounded-full w-9 h-9 p-1"
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
      >
        <FaAngleLeft
          size={"1rem"}
          className={cn("transition-all", { "rotate-180": expanded })}
        />
      </Button>
      <div className="flex flex-col items-center py-8 text-gray-600">
        {NavigationProject.map((link, index) =>
          link.titleLink ? (
            expanded ? (
              <Button
                key={`${index}`}
                variant={"link"}
                className={`justify-start w-full px-6 border-b border-white hover:!text-white  text-white ${link.path === location.pathname  &&  'bg-white text-primary'}`}
                asChild
              >
                <NavLink to={link.path} className={cn("text-xl")}>
                  {link.icon}
                  {link.titleLink}
                </NavLink>
              </Button>
            ) : (
              <Button
                key={`${index}`}
                variant={link.path === location.pathname ? "default" : "ghost"}
                className="w-full"
                size="icon"
                asChild
              >
                <Link to={link.path}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full h-full text-center justify-center flex items-center">
                        {link.icon}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.titleLink}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </Button>
            )
          ) : (
            // <Accordion
            //   key={index}
            //   type="single"
            //   className="w-full sidebar-menu"
            //   collapsible
            // >
            //   <AccordionItem value="item-1" className="border-none w-full px-6">
            //     <AccordionTrigger className="hover:no-underline">
            //       <div className="flex-shrink-0 flex gap-4">
            //         <LayoutPanelTop /> {link.title}
            //       </div>
            //     </AccordionTrigger>
            //     {link.list?.map((linkLevel2, indexLevel2) => (
            //       <AccordionContent
            //         key={`${index}-${indexLevel2}`}
            //         className="ps-2"
            //       >
            //         {linkLevel2.titleLink}
            //       </AccordionContent>
            //     ))}
            //   </AccordionItem>
            // </Accordion>
            <p key={index}></p>
          )
        )}
      </div>
    </aside>
  );
}

export default SideBar;
