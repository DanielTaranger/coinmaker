import "../App.css";
import { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import {
  Flask,
  Rock,
  flaskItems,
  mapFlasks,
  mapRocks,
  rockItems,
} from "./Items";
import ProgressBar from "./Progressbar";

export default function Coin() {
  const [clock, setClock] = useState(0);

  const [money, setMoney] = useState(10);
  const [modifier, setModifier] = useState(0);

  const [clickAmount, setClickAmount] = useState(1);
  const [upgradeClickerCost, setupgradeClickerCost] = useState(10);

  const [autoClickerAmount, setAutoClickerAmount] = useState(1);
  const [upgradeAutoClickerCost, setupgradeAutoClickerCost] = useState(50);

  const [interest, setInterest] = useState(1);
  const [interestCost, setInterestCost] = useState(100);

  const [StartHP, setStartHP] = useState(10);
  const [CurrentHP, setCurrentHP] = useState(StartHP);
  const [progress, setProgress] = useState(100);

  const [flasks, setFlask] = useState<Flask[]>([]);
  const [rocks, setRocks] = useState<Rock[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock((prevTime) => {
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const upgrade = () => {
    if (money >= upgradeClickerCost) {
      setClickAmount(Math.round(clickAmount * 1.5));
      setMoney(Math.round(money - upgradeClickerCost));
      setupgradeClickerCost(Math.round(upgradeClickerCost * 2));
    }
  };

  const setDesi = (num: number, desi: number): number => {
    return Number(num.toFixed(desi));
  };

  const upgradeAutoClicker = () => {
    if (money >= upgradeAutoClickerCost) {
      setAutoClickerAmount(Math.round(autoClickerAmount * 1.5));
      setMoney(Math.round(money - upgradeClickerCost));
      setupgradeAutoClickerCost(Math.round(upgradeAutoClickerCost * 2.5));
      setModifier(modifier == 0 ? 0.05 : setDesi(modifier * 1.5, 3));
    }
  };

  const upgradeInterest = () => {
    if (money >= interestCost) {
      setInterest(interest * 1.1);
      setMoney(Math.round(money - interestCost));
      setInterestCost(Math.round(interestCost * 1.2));
    }
  };

  useEffect(() => {
    if (modifier > 0) {
      const interval = setTimeout(() => {
        autoAttack();
      }, 16);
      return () => clearInterval(interval);
    }
  });

  const autoAttack = () => {
    const newCurrentHP = CurrentHP - modifier;
    updateProgressbar(newCurrentHP);
  };

  const attack = () => {
    const newCurrentHP = CurrentHP - clickAmount;
    updateProgressbar(newCurrentHP);
  };

  const updateProgressbar = (newCurrentHP: number) => {
    if (newCurrentHP <= 0) {
      const newStartHP = Math.round(StartHP * 1.1);
      setStartHP(newStartHP);
      setCurrentHP(newStartHP);
      setMoney(money + Math.round(StartHP / 2) * interest);
      setProgress(100);
      updateFlask();
      updateRocks();
    } else {
      setCurrentHP(newCurrentHP);
      const percentage = (newCurrentHP / StartHP) * 100;
      setProgress(percentage);
    }
  };

  const updateFlask = () => {
    const randVal = Math.random();
    if (randVal <= 0.1) {
      return setFlask([...flasks, flaskItems.commonFlask]);
    } else if (randVal <= 0.15) {
      return setFlask([...flasks, flaskItems.magicFlask]);
    } else if (randVal <= 0.17) {
      return setFlask([...flasks, flaskItems.rareFlask]);
    } else if (randVal <= 0.18) {
      return setFlask([...flasks, flaskItems.uniqueFlask]);
    } else if (randVal <= 0.185) {
      return setFlask([...flasks, flaskItems.legendaryFlask]);
    }
  };

  const updateRocks = () => {
    const randVal = Math.random();
    console.log(randVal);
    if (randVal <= 0.1) {
      return setRocks([...rocks, rockItems.commonRock]);
    } else if (randVal <= 0.15) {
      return setRocks([...rocks, rockItems.magicRock]);
    } else if (randVal <= 0.17) {
      return setRocks([...rocks, rockItems.rareRock]);
    } else if (randVal <= 0.18) {
      return setRocks([...rocks, rockItems.uniqueRock]);
    } else if (randVal <= 0.185) {
      return setRocks([...rocks, rockItems.legendaryRock]);
    } else if (randVal <= 0.185) {
      return setRocks([...rocks, rockItems.epicRock]);
    }
  };

  const clickFlask = (index: number) => {
    setMoney(money * flasks[index].coins);
    const copy = [...flasks];
    copy.splice(index, 1);
    setFlask(copy);
  };

  const clickRock = (index: number) => {
    setInterest(interest * rocks[index].interest);
    const copy = [...rocks];
    copy.splice(index, 1);
    setRocks(copy);
  };

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: 100, margin: 0 }}>
        e308
      </Typography>
      <div>Timer: {formatTime(clock)}</div>
      <Box display="flex" flexDirection="column" gap={2}>
        <Card
          sx={{
            p: 2,
            flexDirection: "column",
            display: "inline-flex",
            alignItems: "center",
            flexGrow: 1,
            flexShrink: 0,
            rowGap: 2,
          }}
        >
          <h3>DPS: {setDesi(modifier * 60, 3)}</h3>
          <h1>Coins: {money.toFixed(0)}</h1>
          <Box
            sx={{
              minWidth: 600,
              maxWidth: 600,
              width: "100%",
            }}
          >
            <ProgressBar
              progress={progress}
              CurrentHP={CurrentHP}
              StartHP={StartHP}
              interest={interest}
            />
          </Box>
          <Button variant="contained" onClick={() => attack()}>
            {clickAmount} damage
          </Button>
          <Box flexDirection="row" display="flex" gap={2} alignItems="center">
            <Button
              disabled={!(money >= upgradeClickerCost)}
              variant="outlined"
              onClick={() => upgrade()}
            >
              Upgrade damage {upgradeClickerCost} coins
            </Button>
          </Box>
          <Box flexDirection="row" display="flex" gap={2} alignItems="center">
            <Box>
              <Box sx={{ mr: 2 }}>Autoclicker</Box>
              <Button
                disabled={!(money >= upgradeAutoClickerCost)}
                variant="outlined"
                onClick={() => upgradeAutoClicker()}
              >
                Upgrade auto damage {upgradeAutoClickerCost} coins
              </Button>
            </Box>
            <Box>
              <Box sx={{ mr: 2 }}>Interest</Box>
              <Button
                disabled={!(money >= interestCost)}
                variant="outlined"
                onClick={() => upgradeInterest()}
              >
                Upgrade {interestCost} coins
              </Button>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            p: 10,
            height: "auto",
            minWidth: 600,
            maxWidth: 600,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {mapFlasks(flasks, clickFlask)}
          {mapRocks(rocks, clickRock)}
        </Card>
      </Box>
    </>
  );
}
