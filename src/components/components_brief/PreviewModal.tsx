import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Divider, Stack, SvgIcon } from "@mui/material";
import styles from "./BriefForm.module.css";
import CalendarIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ReactMarkdown from "react-markdown";
import { FilledButton } from "@/app/main-components/buttons/FilledButton";
import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import generalStyles from "./GeneralCss.module.css";
import { getFavicon } from "@/app/utils";
import { AdminUser, Brief, UserSession } from "@/app/interfaces";

const style = {
  position: "absolute" as "absolute",
  top: "45%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  width: "54rem",
  padding: "2rem",
  border: "0px solid white",
  outline: "none",
  margin: "3rem 0",
  height: "80vh",
};

interface Props {
  brief?: Brief;
  user: UserSession;
}

export default function BasicModal({ brief, user }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <FilledButton onClick={handleOpen} typeOf="overview-out">
        Preview
      </FilledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} spacing={2}>
          <Stack
            sx={{ paddingBottom: "2rem" }}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ textTransform: "none" }}>
              Daily brief
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="center"
              className={generalStyles.previewDate}
            >
              <SvgIcon>
                <CalendarIcon />
              </SvgIcon>
              <Typography variant="subtitle2">
                {dayjs(brief?.date).format("MMM DD, YYYY")}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            spacing={2}
            className={[
              styles.inputContentPreview,
              styles.scrollBar,
              styles.previewBox,
            ].join(" ")}
            alignItems="center"
          >
            <Typography variant="h4">{brief?.title || " "}</Typography>

            <Stack spacing={2} direction="row" alignItems="center">
              <Avatar src={user?.image || "/assets/Logo.png"} />
              <Typography>by {brief?.author?.name}</Typography>
            </Stack>
            <Stack alignItems="center" spacing={2}>
              {brief?.blocks?.map((block) => (
                <Stack spacing={2} justifyContent="center" key={Math.random()}>
                  {block.type === "news" ? (
                    <Stack spacing={4} className={styles.articleBox}>
                      <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        sx={{ padding: "0 28px" }}
                      >
                        <Avatar
                          src={
                            block.source.image_url
                              ? block.source.image_url
                              : block.link_url
                              ? getFavicon(block.link_url)
                              : "https://otherweb.com/favicon.ico"
                          }
                          sx={{ width: "25px", height: "25px" }}
                        />
                        <Typography variant="subtitle2">
                          {block.source.name}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          sx={{
                            borderRadius: "20px",
                            backgroundColor: "lightgray",
                            padding: "4px 10px",
                          }}
                        >
                          {block.label}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="h6"
                        sx={{ padding: "0 28px", fontWeight: "bold" }}
                      >
                        {block.title}
                      </Typography>
                      <Stack spacing={2} key={block.content}>
                        {block.image_url && (
                          <img
                            style={{ marginLeft: "2rem" }}
                            src={block.image_url}
                            alt="News source"
                          />
                        )}
                        <Stack sx={{ padding: "0 3rem" }} spacing={2}>
                          <ReactMarkdown>{block.content}</ReactMarkdown>
                          {block.link_url && (
                            <Link
                              style={{ fontWeight: "bold" }}
                              target="_blank"
                              href={block.link_url}
                            >
                              Read full article
                            </Link>
                          )}

                          <Divider />
                          <Stack spacing={2}>
                            {block.stories ? (
                              <Stack>
                                <Typography>Running Stories</Typography>
                                {block.stories?.map((story) => (
                                  <Stack spacing={2} key={Math.random()}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                      {story.title}
                                    </Typography>
                                    <Link
                                      style={{ color: "cadetblue" }}
                                      href={story.link_url}
                                      target="_blank"
                                    >
                                      {story.link_title}
                                    </Link>
                                  </Stack>
                                ))}
                              </Stack>
                            ) : block.bubbling_under?.length !== 0 ? (
                              <Stack>
                                <Typography>Bubbling Under</Typography>
                                {block.bubbling_under?.map((story) => (
                                  <Stack spacing={2} key={Math.random()}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                      {story.title}
                                    </Typography>
                                    <Link
                                      style={{ color: "cadetblue" }}
                                      href={story.link_url}
                                      target="_blank"
                                    >
                                      {story.link_title}
                                    </Link>
                                  </Stack>
                                ))}
                              </Stack>
                            ) : null}
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack>
                      <img style={{ borderRadius: "10px" }} src={block.image} />
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
