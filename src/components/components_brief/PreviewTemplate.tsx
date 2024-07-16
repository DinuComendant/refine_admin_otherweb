import styles from "./BriefForm.module.css";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import CalendarIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import Link from "next/link";
import dayjs from "dayjs";
import { ANGELA_IMAGE, ASHLEY_IMAGE } from "@/app/constants";
import { PATH_BRIEFS } from "@/app/paths";
import ArrowBackIcon from "@heroicons/react/24/outline/ArrowLeftCircleIcon";
import generalStyles from "./GeneralCss.module.css";
import { getFavicon } from "@/app/utils";
import { Brief } from "@/app/interfaces";

interface Props {
  brief?: Brief;
}
// TO DO: Fix brief undefined

export function PreviewTemplate({ brief }: Props) {
  return (
    <Box>
      <Button
        startIcon={
          <SvgIcon>
            <ArrowBackIcon />
          </SvgIcon>
        }
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          opacity: "0.6",
          border: "1px solid",
        }}
        variant="outlined"
      >
        <Link href={PATH_BRIEFS}>Go Back</Link>
      </Button>
      <Divider sx={{ margin: "1rem 0" }} />
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ padding: "0.5rem 19vw" }}
          alignItems="center"
        >
          <Typography variant="overline" fontSize={18}>
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
        {/* TO DO: Check the containers */}
        <Stack
          alignItems="center"
          sx={{ padding: "2rem" }}
          spacing={2}
          className={styles.inputContentPreview}
        >
          <Stack spacing={2} sx={{ width: "45rem" }}>
            <Typography variant="h4">{brief?.title || " "}</Typography>

            <Stack spacing={2} direction="row" alignItems="center">
              <Avatar
                src={
                  brief?.author.avatar_url
                    ? brief.author.avatar_url
                    : brief?.author.name.includes("Palmer")
                    ? ANGELA_IMAGE
                    : brief?.author.name.includes("Taylor")
                    ? ASHLEY_IMAGE
                    : "/assets/orange_logo_otherweb.png"
                }
              />
              <Typography>by {brief?.author?.name}</Typography>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            {brief?.blocks?.map((block) => (
              <Stack spacing={2} justifyContent="center" key={Math.random()}>
                {block.type === "news" ? (
                  <Stack spacing={3} className={styles.articleBox}>
                    <Stack
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      sx={{ padding: "0 28px" }}
                    >
                      {/* TO DO: Fix bug for giving invalid URL */}
                      <Avatar
                        src={
                          block.source.image_url ||
                          getFavicon(block.source.source_url)
                        }
                        sx={{
                          width: "25px",
                          height: "25px",
                          border: "1px solid lightgray",
                        }}
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
                    <Divider />
                    <Stack
                      alignItems="initial"
                      sx={{ padding: "0 2rem" }}
                      spacing={2}
                      key={block.content}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {block.title}
                      </Typography>
                      {block.image_url && (
                        <img src={block.image_url} alt="News source" />
                      )}
                      <Stack className={styles.padding} spacing={2}>
                        <ReactMarkdown>{block.content}</ReactMarkdown>
                        {block.link_url && (
                          <Link
                            style={{ fontWeight: "bold", paddingTop: "2rem" }}
                            target="_blank"
                            href={block.link_url}
                          >
                            Read full article
                          </Link>
                        )}

                        <Divider />
                        <Stack spacing={2}>
                          {block.stories !== null
                            ? block.stories?.map((story) => (
                                <Stack spacing={2} key={Math.random()}>
                                  <Typography style={{ fontWeight: "bold" }}>
                                    {story.title}
                                  </Typography>
                                  <Link
                                    style={{ color: "cadetblue" }}
                                    href={story.link_url}
                                  >
                                    {story.link_title}
                                  </Link>
                                </Stack>
                              ))
                            : block.bubbling_under !== null
                            ? block.bubbling_under?.map((story) => (
                                <Stack spacing={2} key={Math.random()}>
                                  <Typography style={{ fontWeight: "bold" }}>
                                    {story.title}
                                  </Typography>
                                  <Link
                                    style={{ color: "cadetblue" }}
                                    href={story.link_url}
                                  >
                                    {story.link_title}
                                  </Link>
                                </Stack>
                              ))
                            : null}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack>
                    <img
                      style={{ borderRadius: "10px", margin: "0 3rem" }}
                      src={block.image}
                    />
                  </Stack>
                )}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
