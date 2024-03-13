import { useEffect, useState } from "react";
import flask1 from "./assets/flasks/1.png";
import flask2 from "./assets/flasks/2.png";
import flask3 from "./assets/flasks/3.png";
import flask4 from "./assets/flasks/4.png";
import flask5 from "./assets/flasks/5.png";

import rock1 from "./assets/rocks/1.png";
import rock2 from "./assets/rocks/2.png";
import rock3 from "./assets/rocks/3.png";
import rock4 from "./assets/rocks/4.png";
import rock5 from "./assets/rocks/5.png";
import rock6 from "./assets/rocks/6.png";

import { Box, Button, Card, LinearProgress } from "@mui/material";
import "./App.css";

export interface Item {
  name: string;
  src: string;
  color: string;
}

export interface Flask extends Item {
  coins: number;
}

export interface Rock extends Item {
  interest: number;
}

function App() {
  const [money, setMoney] = useState(10);
  const [multiplier, setMultiplier] = useState(1);
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
    if (multiplier * modifier > 0) {
      const interval = setTimeout(() => {
        autoAttack();
      }, 16);

      return () => clearInterval(interval);
    }
  });

  const autoAttack = () => {
    const newCurrentHP = CurrentHP - multiplier * modifier;
    if (newCurrentHP <= 0) {
      const newStartHP = Math.round(StartHP * 1.1);
      setStartHP(newStartHP);
      setCurrentHP(newStartHP);
      setMoney(money + Math.round((StartHP / 1.1) * interest));
      setProgress(100);
      updateFlask();
      updateRocks();
    } else {
      setCurrentHP(newCurrentHP);
      const progressPercentage = (newCurrentHP / StartHP) * 100;
      setProgress(progressPercentage);
    }
  };

  const attack = () => {
    const newCurrentHP = CurrentHP - clickAmount;

    if (newCurrentHP <= 0) {
      const newStartHP = Math.round(StartHP * 1.1);
      setStartHP(newStartHP);
      setCurrentHP(newStartHP);
      setMoney(money + Math.round(money + StartHP));
      setProgress(100);
      updateFlask();
      updateRocks();
    } else {
      setCurrentHP(newCurrentHP);
      const progressPercentage = (newCurrentHP / StartHP) * 100;
      setProgress(progressPercentage);
    }
  };

  const styles = () => {
    if (progress <= 20) {
      return {
        ".MuiLinearProgress-bar": { backgroundColor: "red" },
        bar: {
          animationDuration: "1s",
        },
      };
    }
    return {};
  };

  const updateFlask = () => {
    const randVal = Math.random();
    console.log(randVal);
    if (randVal <= 0.1) {
      return setFlask([
        ...flasks,
        {
          name: "common flask",
          src: flask1,
          coins: rand(1.05, 1.1),
          color: "#5c5c5c",
        },
      ]);
    } else if (randVal <= 0.15) {
      return setFlask([
        ...flasks,
        {
          name: "magic flask",
          src: flask2,
          coins: rand(1.2, 1.5),
          color: "#005b8d",
        },
      ]);
    } else if (randVal <= 0.17) {
      return setFlask([
        ...flasks,
        {
          name: "rare flask",
          src: flask3,
          coins: rand(1.6, 2),
          color: "#940000",
        },
      ]);
    } else if (randVal <= 0.18) {
      return setFlask([
        ...flasks,
        {
          name: "unique flask",
          src: flask4,
          coins: rand(2.6, 4),
          color: "#56009f",
        },
      ]);
    } else if (randVal <= 0.185) {
      return setFlask([
        ...flasks,
        {
          name: "legendary flask",
          src: flask5,
          coins: rand(5, 8),
          color: "#9f0000",
        },
      ]);
    }
  };

  const updateRocks = () => {
    const randVal = Math.random();
    console.log(randVal);
    if (randVal <= 0.1) {
      return setRocks((rocks) => [
        ...rocks,
        {
          name: "common rock",
          src: rock1,
          interest: rand(1.05, 1.2),
          color: "#5c5c5c",
        },
      ]);
    } else if (randVal <= 0.15) {
      return setRocks((rocks) => [
        ...rocks,
        {
          name: "magic rock",
          src: rock2,
          interest: rand(1.3, 2),
          color: "#005b8d",
        },
      ]);
    } else if (randVal <= 0.17) {
      return setRocks((rocks) => [
        ...rocks,
        {
          name: "rare rock",
          src: rock3,
          interest: rand(2.2, 3),
          color: "#940000",
        },
      ]);
    } else if (randVal <= 0.18) {
      return setRocks([
        ...rocks,
        {
          name: "unique rock",
          src: rock4,
          interest: rand(3.2, 4),
          color: "#56009f",
        },
      ]);
    } else if (randVal <= 0.185) {
      return setRocks([
        ...rocks,
        {
          name: "legendary rock",
          src: rock5,
          interest: rand(4.1, 5.5),
          color: "#9f0000",
        },
      ]);
    } else if (randVal <= 0.185) {
      return setRocks([
        ...rocks,
        {
          name: "epic rock",
          src: rock6,
          interest: rand(6, 8),
          color: "#FFFFFF",
        },
      ]);
    }
  };

  function rand(min: number, max: number) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

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
      <h3>DPS: {setDesi(multiplier * modifier * 60, 3)}</h3>
      <h1>Coins: {money.toFixed(0)}</h1>
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
          <Box
            sx={{
              minWidth: 600,
              maxWidth: 600,
              width: "100%",
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: "20px",
                borderRadius: 2,
                ...styles(),
                animationDuration: "0.1ms",
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
              Reward: {(StartHP / 2).toFixed(0)} x {interest.toFixed(2)}{" "}
              interest = {((StartHP / 2) * interest).toFixed(0)} coins
            </Box>
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
          {flasks?.map((flask, index) => (
            <Button
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: flask.color,
              }}
              variant="contained"
              onClick={() => clickFlask(index)}
            >
              <img src={flask.src} width="50px" height="50px" />
              <span>{flask.name}</span>
              {flask.coins} x coins
            </Button>
          ))}
          {rocks?.map((rock, index) => (
            <Button
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: rock.color,
              }}
              variant="contained"
              onClick={() => clickRock(index)}
            >
              <img src={rock.src} width="50px" height="50px" />
              <span>{rock.name}</span>
              {rock.interest} x interest
            </Button>
          ))}
        </Card>
      </Box>
    </>
  );
}

export default App;
