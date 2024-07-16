import { Alert, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface Props {
  editPage: boolean;
}
const slugify = require("slugify");

export const MainBriefFields = ({ editPage }: Props) => {
  const methods = useFormContext();
  const { errors } = methods.formState;
  return (
    <Stack>
      {editPage ? (
        <TextField
          required
          label="Brief title"
          size="small"
          {...methods.register("title")}
        />
      ) : (
        <TextField
          required
          label="Brief title"
          size="small"
          {...methods.register("title", {
            onChange(event) {
              methods.setValue(
                "slug",
                slugify(event.target.value, {
                  lower: true,
                  remove: /[*+~.()'"!:@,;^%&#=`{}?<>]/g,
                })
              );
            },
          })}
        />
      )}
    </Stack>
  );
};
