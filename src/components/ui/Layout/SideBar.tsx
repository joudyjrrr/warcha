"use client";
import { useWindowSize } from "@/hooks";
import { NavigationProject, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { SiNextdotjs } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SideBar() {
  const [expanded, setExpanded] = useState(false);
  const size = useWindowSize();
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
        `bg-white shadow-[0px_0px_8px_1px_rgba(0,0,0,0.4)] transition-all relative border-l min-h-svh`,
        {
          "w-3/12": expanded,
          "w-auto": !expanded,
        }
      )}
    >
      <div className="pt-4 flex items-center px-6 gap-4">
        <SiNextdotjs size={"3rem"} />
        {expanded && <p className="text-2xl">logo</p>}
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
          link.titleLink ? (
            expanded ? (
              <Button
                key={`${index}`}
                variant="ghost"
                className="justify-start w-full px-6"
                asChild
              >
                <Link href={link.path} className="text-xl">
                  <FaHome size={"1.5rem"} className="me-4" />
                  {link.titleLink}
                </Link>
              </Button>
            ) : (
              <Button
                key={`${index}`}
                variant="ghost"
                className="w-full"
                size="icon"
                asChild
              >
                <Link href={link.path}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full h-full text-center justify-center flex items-center">
                        <FaHome size={"1.5rem"} />
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