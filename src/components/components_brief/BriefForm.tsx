"use client";

import { Fragment, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Alert, Divider, IconButton, Snackbar, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
// import "easymde/dist/easymde.min.css";
import dayjs from "dayjs";
import styles from "./BriefForm.module.css";

import { schema } from "./schema";

import { ToolbarButtons } from "./ToolbarButtons";
import CloseIcon from "@mui/icons-material/Close";

import { ArticleBlockBrief } from "./ArticleBlockBrief";
import { MainPartBrief } from "./MainPartBrief";
import { useCreate, useCustom } from "@refinedev/core";
import {
  ANGELA_IMAGE,
  ASHLEY_IMAGE,
  errorMessages,
  LINK_OTHERWEB_IMAGE,
  storiesBrief,
} from "@app/constants";
import { Brief, CustomSession, StoryType, ArticleBlock } from "@app/interfaces";
import { convertToOrigin, getFavicon } from "@app/utils";
import { PATH_BRIEFS } from "@app/paths";
import { FilledButton } from "@components/global_components/buttons/FilledButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

// Benchmark

interface Props {
  // submitData: (data: Brief) => Promise<Brief>;
  defaultData: Brief;
  // publishData: (id: string) => Promise<void> | null;
  // draftData: (id: string) => Promise<void> | null;
  editPage: boolean;
  // author?: string | null;
  // session: CustomSession | null;
}

interface storyItem {
  blockIndex: number;
  type: (typeof storiesBrief)[number];
  storyIndex: number;
  story: StoryType;
}

let count = 0;

export default function BriefForm({
  defaultData,
  // submitData,
  // publishData,
  // draftData,
  editPage,
}: // session,
Props) {
  count++;

  const router = useRouter();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [customError, setCustomError] = useState(false);

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const closeCustomError = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setCustomError(false);
  };

  const actionCloseError = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeCustomError}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const { mutate } = useCreate();

  const methods = useForm<Brief>({
    defaultValues: {
      ...defaultData,
      date: dayjs(defaultData.date).format("YYYY-MM-DD"),
    },
    resolver: zodResolver(schema),
  });

  const isDrafted = methods.formState.isDirty;

  const { errors } = methods.formState;

  const { fields, append, remove, move } = useFieldArray({
    name: "blocks",
    control: methods.control,
  });

  const onSave = async () => {
    const blocks = watchAll.blocks;
    const findInvalidEntries = (blocks: ArticleBlock[]) => {
      const invalidEntries: storyItem[] = [];

      blocks.forEach((block, blockIndex) => {
        if (block.type === "news") {
          const { stories, bubbling_under } = block;

          if (Array.isArray(stories)) {
            stories.forEach((story, storyIndex) => {
              const { title, link_url, link_title } = story;
              if (!title || !link_url || !link_title) {
                invalidEntries.push({
                  blockIndex,
                  type: "stories",
                  storyIndex,
                  story,
                });
              }
            });
          }

          // Check bubbling_under if it exists and is an array
          if (Array.isArray(bubbling_under)) {
            bubbling_under.forEach((story, storyIndex) => {
              const { title, link_url, link_title } = story;
              if (!title || !link_url || !link_title) {
                invalidEntries.push({
                  blockIndex,
                  type: "bubbling_under",
                  storyIndex,
                  story,
                });
              }
            });
          }
        }
      });
      return invalidEntries;
    };

    const invalidEntries = findInvalidEntries(blocks as ArticleBlock[]);

    invalidEntries.length > 0 ? setCustomError(true) : setCustomError(false);
    if (invalidEntries.length > 0) return;

    if (Object.keys(errors).length !== 0) return;
    authorName.includes("palmer")
      ? methods.setValue("author.avatar_url", ANGELA_IMAGE)
      : authorName.includes("taylor")
      ? methods.setValue("author.avatar_url", ASHLEY_IMAGE)
      : methods.setValue("author.avatar_url", LINK_OTHERWEB_IMAGE);
    methods.setValue("slug", `${watchAll.slug}`);
    methods.setValue("date", `${dayjs(watchAll.date).format("YYYY-MM-DD")}`);

    fields.map((block, k) => {
      if ("source" in block) {
        const linkWatch = methods.watch(`blocks.${k}.link_url`);
        "source" in block &&
          methods.setValue(
            `blocks.${k}.source.source_url`,
            convertToOrigin(linkWatch)
          );
        methods.setValue(`blocks.${k}.source.image_url`, getFavicon(linkWatch));
      }
    });
    const data = methods.getValues();
    // const response = await submitData(data);
    const response = mutate({
      errorNotification: (data, values, resource) => {
        console.log("data@@@@@@@", data);
        console.log("values#########", values);
        console.log("resource%%%%%%", resource);
        return {
          message: `something went wrong ${data.id}`,
          description: "Error",
          type: "error",
        };
      },
      resource: "dailybriefs",
      values: data,
    });
    console.log("errors", response);
    // if (response.id) {
    //   router.push(`/briefs/${response.id}/edit`);
    //   setOpenSnackBar(true);
    //   router.refresh();
    // } else {
    //   if (response.detail !== undefined) setErrorMessage(response.detail);
    //   setIsError(true);
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const onDraft = () => {
  //   if (defaultData.id) {
  //     authorName.includes("palmer")
  //       ? methods.setValue("author.avatar_url", ANGELA_IMAGE)
  //       : authorName.includes("taylor")
  //       ? methods.setValue("author.avatar_url", ASHLEY_IMAGE)
  //       : null;

  //     router.push(`/briefs/${defaultData.id}/edit`);
  //     router.refresh();
  //   }
  // };

  // const onPublish = () => {
  //   if (defaultData.id) {
  //     publishData(defaultData.id);
  //     router.push(PATH_BRIEFS);
  //     router.refresh();
  //   }
  // };
  const isPublished = defaultData.state == "published";

  // TODO: Change watchAll to the specific fields
  const watchAll = methods.watch();
  const authorName = methods.watch("author.name").toLowerCase();

  // if (session)
  return (
    <>
      <Stack spacing={2} className={styles.inputContent}>
        <Stack className={styles.formContent}>
          <FormProvider {...methods}>
            <Snackbar
              open={openSnackBar}
              autoHideDuration={3000}
              onClose={handleCloseSnackBar}
              message="Form is saved and ready to be published"
              action={action}
            />
            <Snackbar
              sx={{ opacity: "0.6" }}
              open={customError}
              autoHideDuration={10000}
              onClose={closeCustomError}
              action={actionCloseError}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <Alert
                severity="error"
                variant="filled"
                onClose={closeCustomError}
              >
                Some fields from Running Stories/Bubbling Under are empty.
                Please fill them in or delete the story fields
              </Alert>
            </Snackbar>
            <form noValidate onSubmit={methods.handleSubmit(onSave)}>
              <Stack spacing={2}>
                <ToolbarButtons
                  defaultData={defaultData}
                  // onDraft={onDraft}
                  // onPublish={onPublish}
                  isDrafted={isDrafted}
                  watchAll={watchAll}
                  state={defaultData.state}
                  // user={session.user}
                />

                {/* <div>
                <Divider variant="middle" />
              </div> */}
                <Stack sx={{ zIndex: "500" }}>
                  {isError && (
                    <Alert severity="error">
                      {errorMessage.includes("date")
                        ? errorMessages.date
                        : errorMessage.includes("slug")
                        ? errorMessages.slug
                        : errorMessage}
                    </Alert>
                  )}
                  <fieldset
                    disabled={defaultData.state === "published"}
                    style={{ border: "none" }}
                  >
                    <MainPartBrief
                      defaultData={defaultData}
                      editPage={editPage}
                      errors={errors}
                      // session={session}
                      // user={session?.user}
                      authorName={authorName}
                    />

                    <Stack spacing={2}>
                      {fields.map((block, k) => {
                        const type = methods.watch(`blocks.${k}.type`);
                        // TODO : rename k index
                        return (
                          <ArticleBlockBrief
                            key={block.id}
                            fields={fields}
                            block={block}
                            k={k}
                            defaultData={defaultData}
                            type={type}
                            isPublished={isPublished}
                            errors={errors}
                            remove={remove}
                            move={move}
                          />
                        );
                      })}
                      <Divider className={styles.textFields} />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ padding: "1rem 0" }}
                      className={styles.textFields}
                    >
                      <FilledButton
                        typeOf={isPublished ? "add-out-disabled" : "add-out"}
                        onClick={() =>
                          append({
                            type: "news",
                            label: "",
                            description: "",
                            title: "",
                            content: "",
                            link_url: "",
                            image_url: "",
                            source: {
                              name: "",
                              image_url: "",
                              source_url: "",
                            },
                            bubbling_under: null,
                            stories: null,
                          })
                        }
                      >
                        Add an article block
                      </FilledButton>
                      <FilledButton
                        typeOf={isPublished ? "add-out-disabled" : "add-out"}
                        onClick={() =>
                          append({
                            type: "image",
                            image: "",
                          })
                        }
                      >
                        Add an image block
                      </FilledButton>
                    </Stack>
                  </fieldset>
                </Stack>
              </Stack>
            </form>
          </FormProvider>
        </Stack>
      </Stack>
      <DevTool control={methods.control} placement="top-right" />
    </>
  );
}
