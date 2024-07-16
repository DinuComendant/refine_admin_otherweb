import { Fragment, useState } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import {
  Alert,
  Avatar,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/app/main-components/ConfirmationModal";
import "easymde/dist/easymde.min.css";
import dayjs from "dayjs";
import styles from "./BriefForm.module.css";
import { FilledButton } from "@/app/main-components/buttons/FilledButton";
import { PATH_BRIEFS } from "@/app/paths";
import PreviewModal from "./PreviewModal";
import { ArticleArray } from "./ArticleArray";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import dynamic from "next/dynamic";
import CloseIcon from "@mui/icons-material/Close";
import {
  ANGELA_IMAGE,
  ASHLEY_IMAGE,
  LINK_OTHERWEB_IMAGE,
} from "@/app/constants";
import { useSession } from "next-auth/react";

const Imports = {
  Fragment,
  useState,
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
  Alert,
  Avatar,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useRouter,
  ConfirmationModal,
  dayjs,
  styles,
  FilledButton,
  PATH_BRIEFS,
  PreviewModal,
  ArticleArray,
  zodResolver,
  schema,
  dynamic,
  CloseIcon,
  ANGELA_IMAGE,
  ASHLEY_IMAGE,
  LINK_OTHERWEB_IMAGE,
  useSession,
};

export default Imports;
