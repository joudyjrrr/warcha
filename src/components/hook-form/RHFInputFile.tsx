import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { FaCircleArrowUp, FaUser } from "react-icons/fa6";

interface RHFInputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  aspect?: number;
  apiPath: string;
}

function RHFInputFile({
  name,
  label,
  aspect,
  apiPath,
  className,

  ...other
}: RHFInputFileProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [startSubmitting, setStartSubmitting] = useState(false);
  const { control, setValue, watch } = useFormContext();

  const changeHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = e.target.files?.[0];
      setValue(name, newFile as File);
    },
    [name, setValue]
  );

  const currentValue = watch(name);

  //   const changeHandler = (event: React.DragEvent<HTMLDivElement>) => {
  //     event.preventDefault();
  //     const file = event.dataTransfer.files[0];
  //     console.log(file)
  //     setValue(name, file);
  //   };
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setValue(name, file);
  };
  //   console.log(URL.createObjectURL(currentValue))

  return (
    <div className={cn("flex flex-col gap-4 mb-6 ", className)}>
      <div className=" relative text-start">
        <Label>{label}</Label>
        <FormLabel
          htmlFor={name}
          className="absolute duration-150 left-0 opacity-5 w-full h-[calc(100%-1.5rem)] cursor-pointer"
        />
        <div className="flex gap-4 items-center">
          <div className="">
            {currentValue && (
              <img
                src={URL.createObjectURL(currentValue)}
                alt={currentValue.name}
                className="w-[88px] max-h-[88px] rounded-full object-cover"
              />
            )}
          </div>

          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem
                className={`gap-4 flex flex-col justify-center items-center border border-grey-200 rounded-xl p-6 w-full`}
                onDrop={dropHandler}
              >
                <div className="shadow-xs bg-Base-White border border-grey-200 rounded-md flex justify-center items-center p-2.5 w-10 h-10">
                <FaCircleArrowUp className="text-2xl text-primary"/> 
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex justify-center items-center gap-1 w-full">
                    <p className="text-brand-700 flex items-center justify-center cursor-default">
                      Click to upload{" "}
                    </p>

                    <FormControl>
                      <input
                        {...other}
                        name={name}
                        id={name}
                        type="file"
                        onChange={changeHandler}
                        className="hidden cursor-pointer w-full h-full"
                      />
                    </FormControl>

                    <span className="text-grey-600 flex items-center justify-center">
                      or drag and drop
                    </span>
                  </div>
                  <p className="text-grey-600 font-sm leadig-5 w-full flex justify-center items-center">
                    SVG, PNG, JPG or GIF (max. 800X400px)
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
      </div>
    </div>
  );
}

export default RHFInputFile;
