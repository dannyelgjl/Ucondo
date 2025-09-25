export interface SelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  mb?: number;
  mt?: number;
}
