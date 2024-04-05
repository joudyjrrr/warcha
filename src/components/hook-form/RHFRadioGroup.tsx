import { cn } from "@/lib/utils";

import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { ReactNode } from "react";


interface RHFRadioGroupProps {
  name: string;
  options: {
    id: string;
    name: string;
    className?: string;
    icon?:ReactNode
  }[];
  label: string;
  withoutIcon?: boolean;
  col?: boolean;
  iconType?: "filled" | "border";
  isOptional?: boolean;
  selectFeedback?: "ghost" | "outline" | "none";
  tooltipTitle?: string;
  className?: string;
  formClassName?: string;
  labelClassName?: string;
  tooltipDescription?: string;
  formlabelClassName?:string;
  onChange?:(arg:string)=>void
}

const RHFRadioGroup: React.FunctionComponent<RHFRadioGroupProps> = ({
  col,
  name,
  label,
  options,
  labelClassName,
  iconType,
  className,
  isOptional,
  withoutIcon,
  tooltipTitle,
  tooltipDescription,
  formlabelClassName,
  formClassName,
  selectFeedback = "ghost",
  onChange,
  ...other
}) => {
  const { control, watch, setValue } = useFormContext();

  const currentValue = watch(name);

  const changeHandler = (newValue: string) => {
    setValue(name, newValue);
    onChange?.(newValue)
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("mb-6 ", col && "rounded-none", className)}>
          <Label>{label}</Label>
          <RadioGroup
            {...field}
            {...other}
            className={cn(
              "flex rounded-radius_md overflow-hidden w-full",
              col ? "border-none flex flex-col gap-2" : ""
            )}
            onValueChange={changeHandler}
            // defaultValue={options[0].id as string}
          >
            {options.map((option) => (
              <FormItem
                key={option.name?.toString()}
                className={cn(
                  "flex flex-grow items-center focus:bg-grey-300 relative  border-gray-300  justify-center    basis-full  cursor-pointer hover:bg-grey-50 text-center ",
                  !withoutIcon && "py-[10px] px-4",
                  col && "border border-gray-200 justify-start rounded-xl p-4",
                  currentValue === option.id && selectFeedback === "ghost" && "bg-grey-50",
                  currentValue === option.id &&
                    selectFeedback === "outline" &&
                    "border border-brand-600",
                  currentValue === option.id && selectFeedback === "none" && "border-none",
                  option.className,
                  formClassName
                )}
              >
                <FormLabel
                  htmlFor={option.name}
                  className="absolute duration-150 left-0 opacity-5 w-full h-[calc(100%-1.5rem)] cursor-pointer"
                  onClick={changeHandler.bind(null, option.id)}
                />

                <FormControl>
                  <RadioGroupItem
                    id={option.name}
                    withoutIcon={withoutIcon && iconType === "border"}
                    iconClassName={selectFeedback === "ghost" ? "hidden" : ""}
                    value={option.id?.toString()}
                    className={cn(
                      "border border-brand-600 ",
                      currentValue === option.id && "border-brand-100",
                      withoutIcon && "hidden"
                    )}
                  />
                </FormControl>
                <div
                  className={cn(
                    "flex flex-col gap-1  items-start w-full ",
                    withoutIcon && "!mx-0",
                    labelClassName
                  )}
                >
                  <FormLabel
                    htmlFor={option.name}
                    className={cn(
                      "!font-semibold text-grey-700 cursor-pointer p-4  flex justify-center  gap-3 flex-grow w-full",
                      currentValue === option.id && "bg-[#88CDFF] border border-primary rounded-xl",
                      withoutIcon && "w-full h-full py-[10px] !m-0",
                      formlabelClassName
                    )}
                  >
                   <span className="text-lg">
                   {option.name}
                   </span>
                    {option.icon}
                  </FormLabel>
               
                </div>
              </FormItem>
            ))}
          </RadioGroup>

        </FormItem>
      )}
    />
  );
};

export default RHFRadioGroup;
