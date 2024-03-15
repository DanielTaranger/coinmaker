import "../App.css";
import { useEffect, useState } from "react";
import { Box, Button, Card, LinearProgress } from "@mui/material";
import {
  Flask,
  Rock,
  flaskItems,
  mapFlasks,
  mapRocks,
  rockItems,
} from "./Items";
import "./Coin.css";
import ProgressBar from "./Progressbar";
import coinAudio from "../assets/sounds/coin.mp3";
import rockAudio from "../assets/sounds/rock.mp3";
import glassAudio from "../assets/sounds/glass.mp3";
import upgradeAudio from "../assets/sounds/upgrade.mp3";
import commonAudio from "../assets/sounds/common.wav";
import rareAudio from "../assets/sounds/rare.mp3";
import epicAudio from "../assets/sounds/epic.wav";
import hit1 from "../assets/sounds/hit1.mp3";
import hit2 from "../assets/sounds/hit2.mp3";
import hit3 from "../assets/sounds/hit3.mp3";
import hit4 from "../assets/sounds/hit4.mp3";
import hit5 from "../assets/sounds/hit1.mp3";
import hit6 from "../assets/sounds/hit6.mp3";
import { calcLogPercent, calcPercent } from "./utils";

export default function Coin() {
  const soundFiles = [hit1, hit2, hit3, hit4, hit5, hit6];

  const [clock, setClock] = useState(0);

  const [showMoneyLost, setShowMoneyLost] = useState(false);
  const [showMoneyGained, setShowMoneyGained] = useState(false);
  const [moneyLost, setMoneyLost] = useState(0);
  const [moneyGained, setMoneyGained] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  const [money, setMoney] = useState(10);
  const [modifier, setModifier] = useState(0);

  const [clickAmount, setClickAmount] = useState(1);
  const [upgradeClickerCost, setupgradeClickerCost] = useState(10);

  const [autoClickerAmount, setAutoClickerAmount] = useState(1);
  const [upgradeAutoClickerCost, setupgradeAutoClickerCost] = useState(10);

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
      play(upgradeAudio);
      animateMoneyLost(upgradeClickerCost);
    }
  };

  const animateMoneyLost = (money: number) => {
    setShowMoneyLost(true);
    setMoneyLost(money);
    setTimeout(() => {
      setShowMoneyLost(false);
    }, 1000);
  };

  const animateMoneyGained = (money: number) => {
    setShowMoneyGained(true);
    setMoneyGained(money);
    setTimeout(() => {
      setShowMoneyGained(false);
    }, 1000);
  };

  const setDesi = (num: number, desi: number): number => {
    return Number(num.toFixed(desi));
  };

  const upgradeAutoClicker = () => {
    if (money >= upgradeAutoClickerCost) {
      setAutoClickerAmount(Math.round(autoClickerAmount * 1.5));
      setMoney(Math.round(money - upgradeAutoClickerCost));
      setupgradeAutoClickerCost(Math.round(upgradeAutoClickerCost * 1.2));
      setModifier(modifier == 0 ? 0.05 : setDesi(modifier * 1.5, 3));
      play(upgradeAudio);
      animateMoneyLost(upgradeAutoClickerCost);
    }
  };

  const upgradeInterest = () => {
    if (money >= interestCost) {
      setInterest(interest * 1.5);
      setMoney(Math.round(money - interestCost));
      setInterestCost(Math.round(interestCost * 1.2));
      play(upgradeAudio);
      animateMoneyLost(interestCost);
    }
  };
  const autoAttack = () => {
    const newCurrentHP = CurrentHP - modifier;
    updateProgressbar(newCurrentHP);
  };

  const attack = () => {
    playRandomAttackSound();
    const newCurrentHP = CurrentHP - clickAmount;
    updateProgressbar(newCurrentHP);
  };

  const playRandomAttackSound = () => {
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    play(soundFiles[randomIndex]);
  };

  const updateProgressbar = (newCurrentHP: number) => {
    if (newCurrentHP <= 0) {
      const newStartHP = Math.round(StartHP * 1.1);
      setStartHP(newStartHP);
      setCurrentHP(newStartHP);
      setMoney(money + Math.round(StartHP / 3) * interest);
      setProgress(100);
      updateFlask();
      updateRocks();
      play(coinAudio);
      animateMoneyGained(Math.round(StartHP / 3) * interest);
      setTotalProgress(calcLogPercent(CurrentHP, 1.7976931348623157e308));
    } else {
      setCurrentHP(newCurrentHP);
      setProgress(calcPercent(newCurrentHP, StartHP));
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

  const updateFlask = () => {
    const randVal = Math.random();
    if (randVal <= 0.13) {
      play(commonAudio);
      return setFlask([...flasks, flaskItems.commonFlask]);
    } else if (randVal <= 0.135) {
      play(commonAudio);
      return setFlask([...flasks, flaskItems.magicFlask]);
    } else if (randVal <= 0.15) {
      play(commonAudio);
      return setFlask([...flasks, flaskItems.rareFlask]);
    } else if (randVal <= 0.16) {
      play(rareAudio);
      return setFlask([...flasks, flaskItems.uniqueFlask]);
    } else if (randVal <= 0.164) {
      play(epicAudio);
      return setFlask([...flasks, flaskItems.legendaryFlask]);
    }
  };

  const updateRocks = () => {
    const randVal = Math.random();
    if (randVal <= 0.13) {
      play(commonAudio);
      return setRocks([...rocks, rockItems.commonRock]);
    } else if (randVal <= 0.135) {
      play(commonAudio);
      return setRocks([...rocks, rockItems.magicRock]);
    } else if (randVal <= 0.15) {
      play(commonAudio);
      return setRocks([...rocks, rockItems.rareRock]);
    } else if (randVal <= 0.16) {
      play(rareAudio);
      return setRocks([...rocks, rockItems.uniqueRock]);
    } else if (randVal <= 0.164) {
      play(rareAudio);
      return setRocks([...rocks, rockItems.legendaryRock]);
    } else if (randVal <= 0.166) {
      play(epicAudio);
      return setRocks([...rocks, rockItems.epicRock]);
    }
  };

  const clickFlask = (index: number) => {
    setMoney(money * flasks[index].coins);
    animateMoneyGained(money * flasks[index].coins - money);
    setMoneyGained(money * flasks[index].coins - money);
    flasks.splice(index, 1);
    setFlask(flasks);
    play(glassAudio);
  };

  const clickRock = (index: number) => {
    setInterest(interest * rocks[index].interest);
    rocks.splice(index, 1);
    setRocks(rocks);
    play(rockAudio);
  };

  const play = (audioInput: string) => {
    const audio = new Audio(audioInput);
    audio.play();
  };

  const sumAll = () => {
    let sumAllFlasks = money;
    let sumAllRocks = interest;
    for (let i = 0; i < flasks.length; i++) {
      sumAllFlasks *= flasks[i].coins;
    }
    for (let i = 0; i < rocks.length; i++) {
      sumAllRocks *= rocks[i].interest;
    }
    setMoney(sumAllFlasks);
    setInterest(sumAllRocks);
  } 

  const takeAll = () => {
    sumAll();

    if (flasks.splice(0,flasks.length).length !== 0) {
      play(glassAudio);
    if (rocks.splice(0,rocks.length).length !== 0) {
      play(rockAudio);
    }
  };

  return (
    <>
      <div style={{ visibility: "hidden" }}>Timer: {formatTime(clock)}</div>
      <Box display="flex" flexDirection="column" gap={2}>
        <Card
          sx={{
            p: 2,
            pt: 1,
            flexDirection: "column",
            display: "inline-flex",
            alignItems: "center",
            overflow: "visible",
            flexGrow: 1,
            flexShrink: 0,
            rowGap: 1,
          }}
        >
          <Box position="relative">
            <h1 style={{ margin: 0 }}>{money.toFixed(0)}</h1>
            {showMoneyLost && (
              <div className="lost">-{moneyLost.toFixed(0)}</div>
            )}
            {showMoneyGained && (
              <div className="gained">+{moneyGained.toFixed(0)}</div>
            )}
            <h3 style={{ margin: 0 }}>DPS: {setDesi(modifier * 60, 3)}</h3>
          </Box>
          <Box
            sx={{
              minWidth: 650,
              maxWidth: 650,
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
        <p style={{ margin: -10 }}>Total progress</p>
        <LinearProgress
          variant="determinate"
          value={totalProgress}
          sx={{
            height: "20px",
            borderRadius: 2,
            width: "100%",
          }}
        />
        <Card
          sx={{
            p: 10,
            pt: 0,
            height: "auto",
            minWidth: 650,
            maxWidth: 650,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box width="100%">
            <p style={{ margin: 5 }}>{flasks.length + rocks.length} items</p>
            <Button variant="contained" onClick={() => takeAll()}>
              Take all
            </Button>
          </Box>
          {mapFlasks(flasks, clickFlask)}
          {mapRocks(rocks, clickRock)}
        </Card>
      </Box>
    </>
  );
}
