import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface RHFTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tooltipTitle?: string;
  isOptional?: boolean;
  inputClassName?: string;
  tooltipDescription?: string;
  endAdornmentClassName?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  type?: ComponentProps<typeof Input>["type"];
}

const RHFTextField: React.FunctionComponent<RHFTextFieldProps> = ({
  name,
  type,
  label,
  className,
  isOptional,
  placeholder,
  endAdornment,
  tooltipTitle,
  startAdornment,
  inputClassName,
  tooltipDescription,
  endAdornmentClassName,
  ...other
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHandler = () => {
    if (type === "password") setShowPassword(() => !showPassword);
  };

  const passwordIcon = renderIcon(type === "password" && showPassword);

  return (
    <div className={cn("mb-spacing_3xl w-full flex gap-4 flex-col", className)}>
      <Label className="">{label}</Label>
      <FormField
        name={name as string}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormControl>
              <Input
              cl
                endAdornmentClassName={endAdornmentClassName}
                {...field}
                placeholder={placeholder ? placeholder : undefined}
                id={name}
                type={showPassword && type === "password" ? "text" : type}
                value={
                  typeof field.value === "number" && field.value === 0
                    ? ""
                    : field.value
                }
                startAdornment={startAdornment}
                endAdornment={endAdornment}
                className={cn("", inputClassName)}
                {...other}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const renderIcon = (show: boolean) => {
  switch (show) {
    case false:
      return "eva:eye-fill";
    case true:
      return "eva:eye-off-fill";
    default:
      return undefined;
  }
};

export default RHFTextField;
