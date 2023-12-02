import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      sx={{
        mx: 5,
        my: 3,
        py: 1,
        px: 5,
        borderRadius: "3px",
        border: "1px solid #B9BBBE",
      }}
    >
      <Grid container justifyContent={"space-between"}>
        <Grid display={"flex"}>
          <Grid sx={{ mx: 1, textAlign: "center" }}>
            <ButtonBase
              onClick={() => {
                window.open(`https://github.com/Majid-Ebrahimi`, "_blank");
              }}
            >
              <Image
                width={24}
                height={24}
                alt="star"
                src={`images/bi_github.svg`}
              ></Image>
            </ButtonBase>
            <Typography variant="body2">github</Typography>
          </Grid>
          <Grid sx={{ mx: 1, textAlign: "center" }}>
            <ButtonBase
              onClick={() => {
                // TODO: Fix LinkedIn Link
                window.open(`https://www.linkedin.com`, "_blank");
              }}
            >
              <Image
                width={24}
                height={24}
                alt="star"
                src={`images/devicon-plain_linkedin.svg`}
              ></Image>
            </ButtonBase>
            <Typography variant="body2">linkedin</Typography>
          </Grid>
          <Grid sx={{ mx: 1, textAlign: "center" }}>
            <ButtonBase
              onClick={() => {
                window.open(`https://t.me/Majidebrahiimi`, "_blank");
              }}
            >
              <Image
                width={24}
                height={24}
                alt="star"
                src={`images/simple-icons_telegram.svg`}
              ></Image>
            </ButtonBase>
            <Typography variant="body2">telegram</Typography>
          </Grid>
        </Grid>
        <Grid sx={{ mx: 1, p: 0.5 }}>
          <Typography color={"#7A7D87"} variant="h6">
            راه های ارتباط با سلکامپ
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
