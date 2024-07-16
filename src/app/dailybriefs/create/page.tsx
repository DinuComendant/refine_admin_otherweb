"use client";

import { LINK_OTHERWEB_IMAGE } from "@app/constants";
import BriefForm from "@components/components_brief/BriefForm";
import dayjs from "dayjs";

export default function BlogPostCreate() {
  // const {
  //   saveButtonProps,
  //   refineCore: { formLoading, onFinish },
  //   handleSubmit,
  //   register,
  //   control,
  //   formState: { errors },
  // } = useForm({});

  return (
    <BriefForm
      // submitData={addBrief}
      // publishData={changeStatePublishedBrief}
      // draftData={changeStateDraftBrief}
      editPage={false}
      // session={session}
      defaultData={{
        title: "",
        date: dayjs().format("DD MMMM YYYY"),
        created_at: null,
        updated_at: null,
        published_at: null,
        state: "draft",
        slug: " ",
        description: "",
        author: {
          name: "Angela Palmer",
          // avatar_url: user == "Otherweb" ? LINK_OTHERWEB_IMAGE : avatar,
          avatar_url: LINK_OTHERWEB_IMAGE,
        },
        blocks: [
          {
            type: "news",
            title: "",
            content: "",
            description: null,
            link_url: "",
            image_url: "",
            label: "",
            source: {
              name: "",
              image_url: null,
              source_url: "",
            },
            stories: null,
            bubbling_under: null,
          },
        ],
      }}
    />
  );
}
