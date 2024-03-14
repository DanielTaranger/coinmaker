import { Box, LinearProgress, makeStyles } from "@mui/material";

interface ProgressBarProps {
  progress: number;
  CurrentHP: number;
  StartHP: number;
  interest: number;
}

export default function ProgressBar({
  progress,
  CurrentHP,
  StartHP,
  interest,
}: ProgressBarProps) {
  const progressStyles = () => {
    if (progress <= 20) {
      return {
        ".MuiLinearProgress-bar": {
          backgroundColor: "red",
          transition: "none",
        },
      };
    }
    return {
      ".MuiLinearProgress-bar": {
        transition: "none",
      },
    };
  };

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: "20px",
          borderRadius: 2,
          ...progressStyles(),
        }}
      />
      <Box
        sx={{
          fontWeight: 500,
          fontSize: 20,
          ...(progress <= 20 && {
            color: "red",
          }),
        }}
      >
        {CurrentHP.toFixed(0)} / {StartHP} HP
      </Box>
      <Box>
        Reward: {(StartHP / 3).toFixed(0)} x {interest.toFixed(2)} interest ={" "}
        {((StartHP / 3) * interest).toFixed(0)} coins
      </Box>
    </>
  );
}
