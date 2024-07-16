import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import styles from "./BriefForm.module.css";

// TODO: Re-write or delete the component
interface Props {
  style: boolean;
  label?: string;
  blockIndex: number;
  properties: {
    firstProperty: string;
    secondProperty: string | null;
  }[];
  nestedIndex: number | null;
}

// TODO: Review className
export const TextFieldComponent = ({
  blockIndex,
  properties,
  nestedIndex,
  label,
  style,
}: Props) => {
  const { register } = useFormContext();
  return (
    <>
      {properties.map((property) => (
        <Stack
          key={Math.random()}
          className={style ? styles.inputWidth : styles.empty}
          spacing={2}
        >
          <TextField
            size="small"
            label={`${label} ${property.secondProperty}`}
            required
            {...register(
              `blocks.${blockIndex}.${property.firstProperty}.${property.secondProperty}`
            )}
          />
        </Stack>
      ))}
    </>
  );
};
