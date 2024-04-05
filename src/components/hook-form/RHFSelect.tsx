/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { SelectOptions } from "@/types/shared";

interface RHFSelectProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  isAdornment?: boolean;
  classNameValue?: string;
  children?: React.ReactNode;
  onValueChange?: (newVaule: string) => void;
  options?: { name: string ; id: string }[];
  pathApi?: string;
}

const RHFSelect: React.FunctionComponent<RHFSelectProps> = ({
  name,
  label,
  pathApi,
  options,
  children,
  className,
  placeholder,
  classNameValue,
  isAdornment = false,
}) => {
  const { control, watch } = useFormContext();
  const [Name, setName] = useState<any>("");

  const currentValue = watch(name);
  useEffect(() => {
    if (currentValue) {
      setName(options?.find((d) => d.id == currentValue)?.name!);
    }
  }, [currentValue]);

  return (
    <div
      className={cn(
        !isAdornment && "mb-6",
        "w-full flex flex-col gap-4",
        className
      )}
    >
      <Label className="">{label}</Label>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Select {...field} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "border border-grey-300 text-gray-900 font-normal text-md  ",
                    isAdornment && "border-none p-0",
                    !currentValue && "text-grey-500 !font-normal ",
                    classNameValue
                  )}
                >
                  <SelectValue
                    placeholder={placeholder}
                    className={cn("text-grey-900 !disabled:text-grey-300 ")}
                  >
                    {Name}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="text-black">
                {options?.map((op) => (
                  <SelectItem
                    key={op.id}
                    value={label === "اختر عملة" ? op.name : op.id}
                    className="text-black"
                  >
                    {op.name}
                  </SelectItem>
                ))}
                {children}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};
export default RHFSelect;
