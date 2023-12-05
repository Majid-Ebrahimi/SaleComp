import { Product } from "@/models";
import { Box, Tab, Tabs } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  categories: Product["category"][] | undefined[] | undefined;
  setCategory: Dispatch<SetStateAction<string>>;
}

const NavigationMenu = (props: Props) => {
  const [value, setValue] = useState(-1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setCategory(`/category/${event.currentTarget.textContent as string}`);
  };
  return (
    <Box sx={{ direction: "ltr", width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="Tabs where each tab needs to be selected manually"
      >
        {props.categories &&
          props.categories.map((item) => {
            return <Tab key={item} label={item} />;
          })}
      </Tabs>
    </Box>
  );
};

export default NavigationMenu;
