import { Input } from '@nextui-org/react';

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: (e: string) => void;
  type?: string;
  disabled?: boolean;
  isRequired?: boolean;
  readonly?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export const CustomInput = ({
  label,
  placeholder,
  value,
  setValue,
  disabled = false,
  isRequired = true,
  readonly = false,
  isInvalid = false,
  errorMessage,
  type,
}: CustomInputProps) => {
  return (
    <Input
      type={type}
      label={label}
      isClearable={disabled || readonly ? false : true}
      variant="bordered"
      isDisabled={disabled}
      isRequired={isRequired}
      isReadOnly={readonly}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      value={value}
      onValueChange={(e) => {
        setValue(e);
      }}
      placeholder={placeholder}
      labelPlacement="outside"
      classNames={{
        label: 'text-black ',
        input: [],
        innerWrapper: 'bg-transparent',
        inputWrapper: ['border-1 px-[10px] py-[8px] '],
      }}

      // startContent={
      //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      // }
    />
  );
};
