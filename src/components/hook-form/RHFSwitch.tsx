import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "../ui/switch";

interface RHFSwitchProps {
  name: string;
}

const RHFSwitch: React.FunctionComponent<RHFSwitchProps> = ({
  name,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          dir="ltr"
          {...field}
          {...other}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
};

export default RHFSwitch;
