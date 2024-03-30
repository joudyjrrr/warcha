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
  options?: { name: string | ReactNode; id: string }[];
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
  const [Name,setName] = useState<any>("")
  const [Optins, setOptins] = useState(options);
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-select"],
    queryFn: async () => {
      const { data } = await axios.get(pathApi!);
      return data.data;
    },
    select: (data) =>
      data.data.map((data: any) => ({
        id: data.id,
        name: data.name,
      })) as SelectOptions[],
  });
  const currentValue = watch(name);
  useEffect(() => {
    if (data) {
      setOptins(data);
    }
    if(currentValue){
        setName(Optins?.find((d) => d.id == currentValue)?.name!)
    }

  }, [data , currentValue]);

  return (
    <div className={cn(!isAdornment && "mb-6", "w-full flex flex-col gap-4", className)}>
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
                {Optins?.map((op) => (
                  <SelectItem key={op.id} value={op.id} className="text-black">
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
