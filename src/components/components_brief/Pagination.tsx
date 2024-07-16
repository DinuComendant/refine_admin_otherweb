import { Button, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import ArrowLeftCircleIcon from "@heroicons/react/24/outline/ArrowLeftCircleIcon";
import { GridSlotsComponentsProps } from "@mui/x-data-grid";

export const Pagination = (
  props: NonNullable<GridSlotsComponentsProps["footer"]>
) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  function handlePageSize(pagesize: string) {
    const params = new URLSearchParams(searchParams);
    if (pagesize) {
      params.set("page_size", pagesize);
    } else {
      params.delete("page_size");
    }
    router.replace(`${path}?${params.toString()}`);
  }
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: " 1rem" }}
      >
        <Stack direction="row" spacing={2}>
          <Typography variant="overline">
            Total {path.slice(1)}: {props.totalItems}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="overline">
            {path.slice(1)} per page: {props.pageSize}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="overline">
            Total Pages: {props.totalPages}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography>Page Size: </Typography>
          <Button onClick={() => handlePageSize("10")}>10</Button>
          <Button onClick={() => handlePageSize("25")}>25</Button>
          <Button onClick={() => handlePageSize("100")}>100</Button>
          <Button onClick={() => router.push(`${path}/?page=1`)}>
            Go to first page
          </Button>
          <Button
            onClick={() =>
              props.pageNumber !== undefined &&
              Number(props.pageNumber) > 1 &&
              router.push(
                `${path}/?page=${Number(props.pageNumber) - 1}&q=${
                  props.search
                }&page_size=${props.pageSize}`
              )
            }
          >
            <SvgIcon>
              <ArrowLeftCircleIcon />
            </SvgIcon>
          </Button>
          {props.pageNumber}
          <Button
            onClick={() =>
              props.pageNumber !== undefined &&
              props.totalPages !== undefined &&
              Number(props.pageNumber) < Number(props.totalPages) &&
              router.push(
                `${path}/?page=${Number(props.pageNumber) + 1}&q=${
                  props.search
                }&page_size=${props.pageSize}`
              )
            }
          >
            <SvgIcon>
              <ArrowRightCircleIcon />
            </SvgIcon>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
