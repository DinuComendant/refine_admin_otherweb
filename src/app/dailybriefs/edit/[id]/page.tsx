"use client";

import { LINK_OTHERWEB_IMAGE } from "@app/constants";
import BriefForm from "@components/components_brief/BriefForm";
import { useOne } from "@refinedev/core";
import dayjs from "dayjs";

interface Props {
  params: { id: string };
}

export default function BlogPostEdit({ params }: Props) {
  const briefId = params.id;
  const { data } = useOne({
    resource: "dailybriefs",
    id: briefId,
  });
  if (!data) {
    return null;
  }
  console.log("DATA", data);
  return (
    <BriefForm
      // submitData={addBrief}
      // publishData={changeStatePublishedBrief}
      // draftData={changeStateDraftBrief}
      editPage={false}
      // session={session}
      defaultData={data.data}
    />
  );
}
