import {
    FieldValues,
    FormProvider as Form,
  } from "react-hook-form";
  
  interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> {
    children: React.ReactNode;
    methods: TFieldValues;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  }
  
  export const FormProvider: React.FunctionComponent<any> = ({
    children,
    onSubmit,
    methods,
  }) => {
    return (
      <Form   {...methods}>
        <form onSubmit={onSubmit}>{children}</form>
      </Form>
    );
  };
  