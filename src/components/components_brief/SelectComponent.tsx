import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface MenuItemObj {
  type: string;
  text: string;
}

interface Props {
  state: string;
  id: string;
  label: string;
  menuValueObj?: Array<MenuItemObj>;
  menuValueArray?: string[];
  indexBlock: number;
  property: string;
  defaultValue?: any;
}

export const SelectComponent = ({
  state,
  id,
  menuValueObj,
  label,
  indexBlock,
  property,
  menuValueArray,
  defaultValue,
}: Props) => {
  const { register } = useFormContext();
  return (
    <FormControl>
      <InputLabel size="small" id={`demo-simple-select-label-${id}`} required>
        {label}
      </InputLabel>
      <Select
        size="small"
        labelId={`demo-simple-select-label-${id}`}
        id={`demo-simple-select${id}`}
        label={label}
        sx={{ minWidth: "16rem" }}
        {...register(`blocks.${indexBlock}.${property}`)}
        defaultValue={defaultValue || ""}
        disabled={state == "published"}
      >
        {menuValueObj !== undefined
          ? menuValueObj.map((item, index) => {
              return (
                <MenuItem key={index} value={item.type}>
                  {item.text}
                </MenuItem>
              );
            })
          : menuValueArray?.map((label, index) => (
              <MenuItem key={index} value={label}>
                {label}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
};
