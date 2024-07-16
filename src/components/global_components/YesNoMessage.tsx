import { Alert, Stack } from "@mui/material";
import { FilledButton } from "./buttons/FilledButton";

interface Props {
  message: string;
  yesClick: () => void;
  noClick: () => void;
}

export const YesNoMessage = ({ message, yesClick, noClick }: Props) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Alert severity="warning">{message}</Alert>
      <FilledButton typeOf="yes-text" onClick={yesClick}>
        Yes
      </FilledButton>
      <FilledButton typeOf="cancel-text" onClick={noClick}>
        No
      </FilledButton>
    </Stack>
  );
};
