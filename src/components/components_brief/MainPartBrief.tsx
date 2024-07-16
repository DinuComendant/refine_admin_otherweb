import {
  Alert,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FieldErrors, useFormContext } from "react-hook-form";
import styles from "./BriefForm.module.css";
import {
  ANGELA_IMAGE,
  ASHLEY_IMAGE,
  LINK_OTHERWEB_IMAGE,
} from "@app/constants";
import { slugify } from "@app/utils";
import { Brief, CustomSession, UserSession } from "@app/interfaces";

interface Props {
  defaultData: Brief;
  editPage: boolean;
  errors: FieldErrors<Brief>;
  // session: CustomSession;
  // user: UserSession;
  authorName: string;
}

export const MainPartBrief = ({
  defaultData,
  editPage,
  errors,
  // session,
  // user,
  authorName,
}: Props) => {
  const methods = useFormContext();

  const hardCodedAvatar = authorName.includes("angela")
    ? ANGELA_IMAGE
    : authorName.includes("ashley")
    ? ASHLEY_IMAGE
    : LINK_OTHERWEB_IMAGE;
  // const authorAvatar =
  //   defaultData.author.avatar_url || user?.image || undefined;
  const authorAvatar = defaultData.author.avatar_url || undefined;
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "2rem 0",
      }}
      className={styles.textFields}
    >
      {defaultData.state === "published" && (
        <Alert severity="error">
          Warning! Published forms are READ-ONLY. To be able to change it, click
          the button <em>Move to Draft</em>
        </Alert>
      )}

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

      {errors.title && <Alert severity="error">{errors.title.message} </Alert>}

      <TextField
        required
        label="Description"
        multiline
        rows={3}
        size="small"
        {...methods.register("description")}
      ></TextField>
      {errors.description && (
        <Alert severity="error"> {errors.description.message} </Alert>
      )}
      <TextField
        required
        label="Slug"
        size="small"
        {...methods.register("slug")}
      ></TextField>
      {errors.slug && <Alert severity="error"> {errors.slug.message} </Alert>}
      <Stack direction="row" justifyContent="space-between">
        <TextField
          label="Date"
          size="small"
          required
          {...methods.register("date")}
          type="date"
          className={styles.inputWidth}
        ></TextField>
        {errors.date && <Alert severity="error">{errors.date.message}</Alert>}
        <Stack className={styles.inputWidth} spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* <Avatar
              src={
                session.user.username == "admin"
                  ? hardCodedAvatar
                  : authorAvatar
              }
            />
            <TextField
              defaultValue={session?.user.name}
              size="small"
              label="Author"
              required
              {...methods.register(`author.name`)}
            /> */}
          </Stack>
          {errors.author?.name && (
            <Alert severity="error"> {errors.author?.name.message} </Alert>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
