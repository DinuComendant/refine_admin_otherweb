"use client";

import {
  Stack,
  Divider,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import {
  Controller,
  FieldErrors,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { ArticleArray } from "./ArticleArray";
import { ErrorMessage } from "./ErrorMessage";
import { SelectComponent } from "./SelectComponent";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./BriefForm.module.css";
import dynamic from "next/dynamic";
import { ArticleBlock, ImageBlock, Brief } from "@app/interfaces";
import { menuItemsType, articleLabels } from "@app/constants";
import { FilledButton } from "@components/global_components/buttons/FilledButton";
import { YesNoMessage } from "@components/global_components/YesNoMessage";

interface Props {
  fields: (ArticleBlock | ImageBlock)[];
  block: ArticleBlock | ImageBlock;
  k: number;
  defaultData: Brief;
  type: string;
  isPublished: boolean;
  errors: FieldErrors<Brief>;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export const ArticleBlockBrief = ({
  fields,
  block,
  k,
  defaultData,
  type,
  isPublished,
  errors,
  remove,
  move,
}: Props) => {
  const storiesBlock: ArticleBlock = defaultData.blocks[k] as ArticleBlock;
  const storyType =
    defaultData.blocks[k]?.type == "news" && storiesBlock.stories !== null
      ? "stories"
      : "bubbling_under";
  const [blockIndex, setBlockIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [openSnackBarDelete, setOpenSnackBarDelete] = useState(false);
  const [storiesType, setStoriesType] = useState(storyType);
  const [open, setOpen] = useState(false);

  const methods = useFormContext();

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackBarDelete = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBarDelete(false);
  };

  const actionDelete = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBarDelete}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Stack spacing={2}>
      <Snackbar
        open={openSnackBarDelete}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarDelete}
        message="Block was deleted"
        action={actionDelete}
      />
      {/* {fields.indexOf(block) == blockIndex && (
        <ConfirmationModal
          onClick={handleModalClose}
          onClose={handleModalClose}
          onOpen={openModal}
          onSubmit={() => {
            remove(blockIndex);
            setOpenSnackBarDelete(true);
          }}
        />
      )} */}
      <Stack spacing={2} className={styles.textFields}>
        <Divider sx={{ margin: "2rem" }} variant="middle" />
        <Typography variant="h5">
          {block.type === "news" ? "Article block" : "Image block"}
        </Typography>
        <Stack direction="row" spacing={2}>
          <FilledButton
            typeOf={isPublished || k == 0 ? "up-out-disabled" : "up-out"}
            onClick={() => {
              move(k, k - 1);
            }}
          >
            Move block up
          </FilledButton>
          <FilledButton
            typeOf={
              isPublished || fields.length - 1 == k
                ? "error-down-out-disabled"
                : "error-down-out"
            }
            onClick={() => {
              move(k, k + 1);
            }}
          >
            Move block down
          </FilledButton>
        </Stack>
        <Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <SelectComponent
              state={defaultData.state}
              id="article-block"
              label="Type"
              menuValueObj={menuItemsType}
              indexBlock={k}
              property="type"
              defaultValue={block.type || ""}
            />

            <Stack>
              <FilledButton
                typeOf={
                  defaultData.state == "published"
                    ? "disabled-delete"
                    : "delete"
                }
                onClick={() => {
                  handleModalOpen();
                  setBlockIndex(k);
                }}
              >
                Remove block
              </FilledButton>
            </Stack>
          </Stack>
          {errors.blocks?.type && (
            <Typography>{errors.blocks.message}</Typography>
          )}
        </Stack>

        {isToggled && (
          <YesNoMessage
            message="Are you sure you want to delete the block?"
            yesClick={() => {
              remove(k);
              setIsToggled(false);
            }}
            noClick={() => {
              setIsToggled(false);
            }}
          />
        )}

        {type == "news" && (
          <Stack
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack className={styles.inputWidth} spacing={2}>
                <SelectComponent
                  state={defaultData.state}
                  id="label"
                  label="Article label"
                  menuValueArray={articleLabels}
                  indexBlock={k}
                  property="label"
                  defaultValue={(block.type == "news" && block.label) || ""}
                />
              </Stack>
              <Stack className={styles.inputWidth} spacing={2}>
                <TextField
                  size="small"
                  label="Article name"
                  required
                  {...methods.register(`blocks.${k}.source.name`)}
                />

                <ErrorMessage
                  errors={errors}
                  firstIndex={k}
                  firstProperty="source"
                  secondProperty="name"
                  secondIndex={null}
                />
              </Stack>
              <Stack className={styles.inputWidth} spacing={2}>
                <TextField
                  size="small"
                  label="Article source"
                  required
                  {...methods.register(`blocks.${k}.link_url`)}
                />
                <ErrorMessage
                  errors={errors}
                  firstIndex={k}
                  firstProperty="link_url"
                  secondProperty={null}
                  secondIndex={null}
                />
              </Stack>
              <Stack className={styles.inputWidth} spacing={2}>
                <TextField
                  size="small"
                  label="Article image"
                  required
                  {...methods.register(`blocks.${k}.image_url`)}
                />
                <ErrorMessage
                  errors={errors}
                  firstIndex={k}
                  firstProperty="image_url"
                  secondProperty={null}
                  secondIndex={null}
                />
              </Stack>
            </Stack>
            <TextField
              size="small"
              label="Article title"
              required
              {...methods.register(`blocks.${k}.title`)}
            />
            <ErrorMessage
              errors={errors}
              firstIndex={k}
              firstProperty="title"
              secondProperty={null}
              secondIndex={null}
            />

            <TextField
              size="small"
              label="Article description"
              {...methods.register(`blocks.${k}.description`)}
            />

            <Controller
              name={`blocks.${k}.content`}
              control={methods.control}
              render={({ field }) => (
                <SimpleMDE
                  spellCheck="false"
                  placeholder="Write the article"
                  {...field}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              firstIndex={k}
              firstProperty="content"
              secondProperty={null}
              secondIndex={null}
            />

            <FormControl>
              <InputLabel
                size="small"
                id={`demo-simple-select-label-stories`}
                required
              >
                Stories
              </InputLabel>
              <Select
                size="small"
                labelId={`demo-simple-select-label-stories`}
                id={`demo-simple-select-stories`}
                label="Stories"
                sx={{ minWidth: "16rem" }}
                defaultValue={
                  methods.getValues(`blocks.${k}.stories`)
                    ? "stories"
                    : methods.getValues(`blocks.${k}.bubbling_under`)
                    ? "bubbling_under"
                    : ""
                }
                disabled={defaultData.state == "published"}
              >
                <MenuItem
                  onClick={() => {
                    methods.setValue(
                      `blocks.${k}.stories`,
                      methods.getValues(`blocks.${k}.bubbling_under`)
                    );
                    // methods.setValue(`blocks.${k}.bubbling_under`, null);
                    methods.unregister(`blocks.${k}.bubbling_under`);

                    setStoriesType("stories");
                  }}
                  value={"stories"}
                >
                  Running Stories
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    methods.setValue(
                      `blocks.${k}.bubbling_under`,
                      methods.getValues(`blocks.${k}.stories`)
                    );
                    // methods.setValue(`blocks.${k}.stories`, null);
                    methods.unregister(`blocks.${k}.stories`);

                    setStoriesType("bubbling_under");
                  }}
                  value={"bubbling_under"}
                >
                  Bubbling Under
                </MenuItem>
              </Select>
            </FormControl>

            <ArticleArray
              errors={errors}
              storyType={storiesType}
              nestIndex={k}
              defaultData={defaultData}
            />
          </Stack>
        )}
        {type == "image" && (
          <Stack>
            <TextField
              size="small"
              label="Article image"
              required
              {...methods.register(`blocks.${k}.image`)}
            />
            {/* TODO: Check if data validation for image works properly */}
            <ErrorMessage
              errors={errors}
              firstIndex={k}
              firstProperty="image"
              secondProperty={null}
              secondIndex={null}
            />
          </Stack>
        )}
      </Stack>

      {/* <ConfirmationModal
        onClick={handleClose}
        onClose={handleClose}
        onOpen={open}
        // onOpen={false}
        onSubmit={() => remove(k)}
      /> */}
    </Stack>
  );
};
