import { Button } from "@mui/material";
import flask1 from "../assets/flasks/1.png";
import flask2 from "../assets/flasks/2.png";
import flask3 from "../assets/flasks/3.png";
import flask4 from "../assets/flasks/4.png";
import flask5 from "../assets/flasks/5.png";
import rock1 from "../assets/rocks/1.png";
import rock2 from "../assets/rocks/2.png";
import rock3 from "../assets/rocks/3.png";
import rock4 from "../assets/rocks/4.png";
import rock5 from "../assets/rocks/5.png";
import rock6 from "../assets/rocks/6.png";

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

function rand(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export const rockItems = {
  commonRock: {
    name: "common rock",
    src: rock1,
    interest: rand(1.05, 1.2),
    color: "#a4a4a4",
  },
  magicRock: {
    name: "magic rock",
    src: rock2,
    interest: rand(1.3, 2),
    color: "#005b8d",
  },
  rareRock: {
    name: "rare rock",
    src: rock3,
    interest: rand(2.2, 3),
    color: "#940000",
  },
  uniqueRock: {
    name: "unique rock",
    src: rock4,
    interest: rand(3.2, 4),
    color: "#56009f",
  },
  legendaryRock: {
    name: "legendary rock",
    src: rock5,
    interest: rand(4.1, 5.5),
    color: "#9f0000",
  },
  epicRock: {
    name: "epic rock",
    src: rock6,
    interest: rand(6, 8),
    color: "#5c0000",
  },
};

export const flaskItems = {
  commonFlask: {
    name: "common flask",
    src: flask1,
    coins: rand(1.05, 1.1),
    color: "#a4a4a4",
  },
  magicFlask: {
    name: "magic flask",
    src: flask2,
    coins: rand(1.2, 1.5),
    color: "#005b8d",
  },
  rareFlask: {
    name: "rare flask",
    src: flask3,
    coins: rand(1.6, 2),
    color: "#940000",
  },
  uniqueFlask: {
    name: "unique flask",
    src: flask4,
    coins: rand(2.6, 4),
    color: "#56009f",
  },
  legendaryFlask: {
    name: "legendary flask",
    src: flask5,
    coins: rand(5, 8),
    color: "#9f0000",
  },
};

export function mapFlasks(
  flasks: Flask[],
  clickFlask: (index: number) => void
) {
  return (
    <>
      {flasks.map((flask, i) => (
        <Button
          key={i}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: flask.color,
          }}
          variant="contained"
          onClick={() => clickFlask(i)}
        >
          <img src={flask.src} width="50px" height="50px" />
          <span>{flask.name}</span>
          {flask.coins} x coins
        </Button>
      ))}
    </>
  );
}

export function mapRocks(rocks: Rock[], clickRock: (index: number) => void) {
  return (
    <>
      {rocks.map((rock, i) => (
        <Button
          key={i}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: rock.color,
          }}
          variant="contained"
          onClick={() => clickRock(i)}
        >
          <img src={rock.src} width="50px" height="50px" />
          <span>{rock.name}</span>
          {rock.interest} x interest
        </Button>
      ))}
    </>
  );
}
