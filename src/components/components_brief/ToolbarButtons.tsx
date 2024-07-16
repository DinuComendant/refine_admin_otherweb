"use client";

import { Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import PreviewModal from "./PreviewModal";
import { useRouter } from "next/navigation";
import { Brief } from "@app/interfaces";
import { FilledButton } from "@components/global_components/buttons/FilledButton";

interface Props {
  defaultData: Brief;
  // onDraft: () => void;
  // onPublish: () => void;
  isDrafted: boolean;
  watchAll: Brief;
  state: "draft" | "published";
  // user: UserSession;
}

export const ToolbarButtons = ({
  defaultData,
  // onDraft,
  // onPublish,
  isDrafted,
  watchAll,
  state,
}: // user,
Props) => {
  const router = useRouter();
  const [openCancel, setOpenCancel] = useState(false);

  const handleCancelOpen = () => {
    setOpenCancel(true);
  };

  const handleCancelClose = () => {
    setOpenCancel(false);
  };

  return (
    <Stack
      sx={{
        padding: " 0rem 1rem",
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        zIndex: "501",
      }}
      direction="column"
      spacing={2}
    >
      <Stack direction="row" justifyContent="space-between">
        {/* <ConfirmationModal
          onClick={handleCancelClose}
          onClose={handleCancelClose}
          onOpen={openCancel}
          // onOpen={false}
          onSubmit={() => router.push(PATH_BRIEFS)}
        /> */}
        <FilledButton typeOf="cancel-out" onClick={handleCancelOpen}>
          Cancel
        </FilledButton>
        <Stack spacing={2} direction="row">
          {/* {defaultData.state === "published" && (
            <FilledButton onClick={onDraft} typeOf="draft-out-orange">
              Move to Draft
            </FilledButton>
          )} */}
          {/* <PreviewModal user={user} brief={watchAll} /> */}
          {isDrafted && state == "draft" ? (
            <FilledButton buttonType="submit" typeOf="save-out">
              Save
            </FilledButton>
          ) : (
            <FilledButton typeOf="save-out-disabled">Save</FilledButton>
          )}

          {/* {defaultData.id && defaultData.state === "draft" ? (
            <FilledButton typeOf="submit-out" onClick={onPublish}>
              Publish
            </FilledButton>
          ) : (
            <FilledButton typeOf="submit-disabled-out">Publish</FilledButton>
          )} */}
        </Stack>
      </Stack>
      <div>
        <Divider />
      </div>
    </Stack>
  );
};
