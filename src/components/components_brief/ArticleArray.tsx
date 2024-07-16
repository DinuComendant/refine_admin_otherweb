"use client";

import { useState } from "react";
import { FieldErrors, useFieldArray, useFormContext } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import { Brief } from "@app/interfaces";
import { FilledButton } from "@components/global_components/buttons/FilledButton";

interface Props {
  nestIndex: number;
  defaultData: Brief;
  storyType: string;
  errors: FieldErrors<Brief>;
}

// TODO: Find an alternative to not send the entire defaultData to this component

export function ArticleArray({
  nestIndex,
  defaultData,
  storyType,
  errors,
}: Props) {
  const methods = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: `blocks.${nestIndex}.${storyType}`,
    control: methods.control,
  });
  const [open, setOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isPublished = defaultData.state == "published";

  return (
    <Stack spacing={4}>
      {fields.map((item, k) => {
        return (
          <Stack key={item.id} spacing={2}>
            <TextField
              sx={{ width: "50%" }}
              size="small"
              label="Short title"
              required
              {...methods.register(
                `blocks.${nestIndex}.${storyType}.${k}.title`
              )}
            />

            <TextField
              size="small"
              label="Story title"
              required
              {...methods.register(
                `blocks.${nestIndex}.${storyType}.${k}.link_title`
              )}
            />

            <TextField
              size="small"
              label="Story link"
              required
              {...methods.register(
                `blocks.${nestIndex}.${storyType}.${k}.link_url`
              )}
            />

            {/* {fields.indexOf(item) == storyIndex && (
              <ConfirmationModal
                onClick={handleClose}
                onClose={handleClose}
                onOpen={open}
                onSubmit={() => remove(storyIndex)}
              />
            )} */}
            <FilledButton
              typeOf="delete-out"
              onClick={() => {
                handleOpen();
                setStoryIndex(k);
              }}
            >
              Delete running story
            </FilledButton>
          </Stack>
        );
      })}
      <Stack direction="row" justifyContent="space-between">
        <FilledButton
          typeOf={isPublished ? "add-out-disabled" : "add-out"}
          onClick={() => {
            append({
              title: null,
              link_title: null,
              link_url: null,
            });
          }}
        >
          Add running story
        </FilledButton>
      </Stack>
    </Stack>
  );
}
