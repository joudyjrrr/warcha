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
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/assets/svgs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <div className="flex flex-col items-center py-8">
        {NavigationProject.map((link, index) =>
          link.list ? (
            <Accordion
              key={index}
              type="single"
              className="w-full sidebar-menu border-b border-white"
              collapsible
            >
              <AccordionItem
                value="item-1"
                className="border-none w-full text-white"
              >
                <AccordionTrigger
                  className={cn(`hover:no-underline px-6`, {
                    "bg-background text-primary hover:bg-background":
                      location.pathname.startsWith(link.path!),
                  })}
                >
                  <div className="flex-shrink-0 flex gap-4 ">
                    {link.icon} {link.title}
                  </div>
                </AccordionTrigger>
                {link.list.map((linkLevel2, indexLevel2) => (
                  <NavLink
                    to={`${link.path! + linkLevel2!.path}`}
                    key={`${index}-${indexLevel2}`}
                  >
                    {({ isActive }) => (
                      <AccordionContent
                        className={cn(
                          "ps-12 hover:bg-white/10 transition-all py-3",
                          {
                            "bg-background text-primary hover:bg-background":
                              isActive,
                          }
                        )}
                      >
                        {linkLevel2.titleLink}
                      </AccordionContent>
                    )}
                  </NavLink>
                ))}
              </AccordionItem>
            </Accordion>
          ) : expanded ? (
            <NavLink
              to={link.path!}
              key={`${index}`}
              className={cn("w-full rounded-b-none")}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "outline" : "default"}
                  className={cn(
                    `justify-start !rounded-none border-x-0 border-t-0 w-full px-6 border-b text-md`,
                    { "text-primary hover:text-primary": isActive }
                  )}
                >
                  {link.icon}
                  {link.titleLink}
                </Button>
              )}
            </NavLink>
          ) : (
            <NavLink key={`${index}`} to={link.path!}>
              {({ isActive }) => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full text-center justify-center flex items-center">
                      <Button
                        key={`${index}`}
                        variant={isActive ? "outline" : "default"}
                        className="w-full"
                        size="icon"
                        asChild
                      >
                        {link.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.titleLink}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </NavLink>
          )
        )}
      </div>
    </aside>
  );
}

export default SideBar;
