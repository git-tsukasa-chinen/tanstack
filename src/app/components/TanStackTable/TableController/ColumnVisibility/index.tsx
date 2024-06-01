import { List as ListIcon } from "@mui/icons-material";
import { Column } from "@tanstack/react-table";
import { Box, Stack, List, ListItem, ListItemText, Switch, Chip, Popover } from "@mui/material";
import { bindPopover, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";

type Props<T> = {
  allColumns: Column<T>[];
  popupId: string;
};

export function ColumnVisibility<T>({ allColumns, popupId }: Props<T>) {
  const changeableColumns = allColumns.reduce((acc, column) => {
    const { header, enableHiding } = column.columnDef;
    if (header && enableHiding !== false) {
      acc[column.id] = header.toString();
    }
    return acc;
  }, {} as { [key: string]: string });

  const popupState = usePopupState({
    variant: "popover",
    popupId: popupId,
  });

  return (
    <>
      <Chip
        size="small"
        label={
          <Stack spacing={1} direction="row" alignItems="center">
            <ListIcon fontSize="small" />
            <Box>表示項目</Box>
          </Stack>
        }
        {...bindTrigger(popupState)}
      />
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <List>
            {allColumns.map((column) => (
              <Box key={column.id}>
                {column.id in changeableColumns && (
                  <ListItem>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                      <ListItemText sx={{ flexGrow: 1 }}>{changeableColumns[column.id]}</ListItemText>
                      <Switch
                        size="small"
                        edge="end"
                        checked={column.getIsVisible()}
                        disabled={!column.getCanHide()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                    </Stack>
                  </ListItem>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
}
