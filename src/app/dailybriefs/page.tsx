"use client";

import { Stack, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React, { useState } from "react";
import styles from "../styles/SharedCss.module.css";

export default function BlogPostList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { rows, paginationModel, ...restDataGridProps } = dataGridProps;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      minWidth: 200,
    },
    {
      field: "title",
      flex: 1,
      headerName: "Title",
      minWidth: 200,
    },
    {
      field: "author",
      flex: 1,
      headerName: "Author",
      minWidth: 300,
      renderCell: (params: GridCellParams) => {
        return params.row.author.name;
      },
    },
    {
      field: "state",
      flex: 1,
      headerName: "Status",
      minWidth: 200,
      renderCell: (params: GridCellParams) => {
        <Stack>
          {params.row.state === "draft" ? (
            <Typography
              variant="overline"
              className={[styles.statusDrafted, styles.blinkingInfinite].join(
                " "
              )}
            >
              {params.row.state}
            </Typography>
          ) : (
            <Typography variant="overline" className={styles.statusPublished}>
              {params.row.state}
            </Typography>
          )}
        </Stack>;
      },
    },
    {
      field: "created_at",
      flex: 1,
      headerName: "Created at",
      minWidth: 250,
      renderCell: function render({ value }) {
        return <DateField value={value} />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: function render({ row }) {
        return (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        );
      },
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
  ];

  return (
    <List>
      <DataGrid
        columns={columns}
        rows={rows.data || []}
        pageSizeOptions={[10, 25, 50, 100]}
        {...restDataGridProps}
        autoHeight
      />
    </List>
  );
}
