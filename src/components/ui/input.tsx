import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  endComponent?: React.ReactNode;
  endAdornmentClassName?: string;
  containerClassName?:string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      endAdornment,
      endComponent,
      endAdornmentClassName,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex   border border-[#969AA0] rounded-[8px] ",
          containerClassName
        )}
      >
        {startAdornment && (
          <div className="flex items-center rounded-radius_md rounded-r-none pl-[0.813rem] pr-2  text-gray-600 text-md font-xs">
            {startAdornment}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full h-[2.75rem] leading-6 grow text-gray-900 border-input focus:outline-none bg-transparent  text-md placeholder:text-grey-500 placeholder:font-regular transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium  disabled:cursor-not-allowed disabled:opacity-50 flex py-[0.625rem] px-[0.875rem] items-center gap-2 rounded-radius_md ",
            className,
            startAdornment && " pl-0"
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <div
            className={cn(
              "min-w-fit rounded-radius_md rounded-l-none px-[0.875rem] flex items-center",
              endAdornmentClassName
            )}
          >
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
