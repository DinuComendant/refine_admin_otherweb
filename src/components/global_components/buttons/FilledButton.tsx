"use client";

import { Button, SvgIcon } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import EditIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import AddIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import SubmitIcon from "@heroicons/react/24/outline/ArrowUpCircleIcon";
import LockIcon from "@heroicons/react/24/outline/LockClosedIcon";
import CancelIcon from "@heroicons/react/24/outline/XCircleIcon";
import SaveIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";
import DraftIcon from "@heroicons/react/24/outline/ClipboardDocumentListIcon";
import ArrowBackIcon from "@heroicons/react/24/outline/ArrowLeftCircleIcon";
import YesIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import ArrowDownCircleIcon from "@heroicons/react/24/outline/ArrowDownCircleIcon";
import ArrowUpCircleIcon from "@heroicons/react/24/outline/ArrowUpCircleIcon";

interface Props {
  children?: string | ReactNode;
  typeOf: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  buttonType?: "submit" | "button";
  href?: string;
  target?: string;
}

// TODO: Add the confirmation modal

export function FilledButton({
  children,
  typeOf,
  size,
  onClick,
  buttonType,
  href,
  target,
}: Props) {
  return (
    <div>
      <Button
        sx={{
          opacity: "0.6",
          borderRadius: "20px",
          textTransform: "none",
          border: "1px solid",
        }}
        size={size || "small"}
        type={buttonType || "button"}
        variant={
          typeOf.includes("out")
            ? "outlined"
            : typeOf.includes("text")
            ? "text"
            : "contained"
        }
        onClick={onClick}
        color={
          typeOf.includes("delete") ||
          typeOf.includes("cancel") ||
          typeOf.includes("error")
            ? "error"
            : typeOf.includes("submit")
            ? "success"
            : typeOf.includes("orange")
            ? "warning"
            : "primary"
        }
        startIcon={
          typeOf.includes("delete") ? (
            <SvgIcon>
              <TrashIcon />
            </SvgIcon>
          ) : typeOf.includes("edit") ? (
            <SvgIcon>
              <EditIcon />
            </SvgIcon>
          ) : typeOf.includes("overview") ? (
            <SvgIcon>
              <EyeIcon />
            </SvgIcon>
          ) : typeOf.includes("add") ? (
            <SvgIcon>
              <AddIcon />
            </SvgIcon>
          ) : typeOf.includes("submit") ? (
            <SvgIcon>
              <SubmitIcon />
            </SvgIcon>
          ) : typeOf.includes("locked") ? (
            <SvgIcon>
              <LockIcon />
            </SvgIcon>
          ) : typeOf.includes("cancel") ? (
            <SvgIcon>
              <CancelIcon />
            </SvgIcon>
          ) : typeOf.includes("save") ? (
            <SvgIcon>
              <SaveIcon />
            </SvgIcon>
          ) : typeOf.includes("draft") ? (
            <SvgIcon>
              <DraftIcon />
            </SvgIcon>
          ) : typeOf.includes("back") ? (
            <SvgIcon>
              <ArrowBackIcon />
            </SvgIcon>
          ) : typeOf.includes("up") ? (
            <SvgIcon>
              <ArrowUpCircleIcon />
            </SvgIcon>
          ) : typeOf.includes("down") ? (
            <SvgIcon>
              <ArrowDownCircleIcon />
            </SvgIcon>
          ) : typeOf.includes("yes") ? (
            <SvgIcon>
              <YesIcon />
            </SvgIcon>
          ) : null
        }
        disabled={typeOf.includes("disabled") || false}
      >
        {typeOf.includes("link") ? (
          <Link target={target} href={href as string}>
            {children}
          </Link>
        ) : (
          //Used span because without it, it gives me a syntax error
          <span> {children}</span>
        )}
      </Button>
    </div>
  );
}
