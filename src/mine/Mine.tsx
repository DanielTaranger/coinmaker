import React, { useState, useEffect, useRef } from "react";
import run1 from "./player-run/player-run1.png";
import run2 from "./player-run/player-run2.png";
import run3 from "./player-run/player-run3.png";
import run4 from "./player-run/player-run4.png";
import run5 from "./player-run/player-run5.png";
import run6 from "./player-run/player-run6.png";
import idle1 from "./player-idle/player-idle1.png";
import idle2 from "./player-idle/player-idle2.png";
import idle3 from "./player-idle/player-idle3.png";
import idle4 from "./player-idle/player-idle4.png";
import idle5 from "./player-idle/player-idle5.png";
import idle6 from "./player-idle/player-idle6.png";

interface Position {
  x: number;
  y: number;
}

const runFrameUrls = [run1, run2, run3, run4, run5, run6];
const idleFrameUrls = [idle1, idle2, idle3, idle4, idle5, idle6];

const Mine: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 111, y: 0 });
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | undefined>();
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isGrounded, setIsGrounded] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const lastFrameUpdate = useRef(performance.now());

  const obs = [
    { x: 100, y: 400, width: 50, height: 50, id: 1 },
    { x: 300, y: 300, width: 50, height: 50 },
    { x: 350, y: 300, width: 50, height: 50 },
    { x: 350, y: 300, width: 50, height: 50 },
    { x: 350, y: 250, width: 50, height: 50 },
    { x: 400, y: 500, width: 50, height: 50 },
  ];

  const [obstacles, setObstacles] = useState<any[]>(obs);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!pressedKeys.includes(event.key)) {
      setPressedKeys((prevKeys) => [...prevKeys, event.key]);
      console.log(pressedKeys);
      setIsIdle(false);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== event.key));
    if (pressedKeys.length === 1 && pressedKeys[0] === event.key) {
      setIsIdle(true); // Set to idle only when all keys are released
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

  useEffect(() => {
    const speed = 0.5;
    const jumpSpeed = 2;
    const gravity = 0.07;

    const move = () => {
      const now = performance.now();
      lastFrameUpdate.current = now;

      let deltaX = 0;
      let deltaY = 0;

      if (pressedKeys.includes("w")) {
        setVelocity((prev) => ({ ...prev, y: jumpSpeed }));
        setIsGrounded(false);
      }

      if (pressedKeys.includes("a")) {
        deltaX -= speed;
        setDirection("left");
      }
      if (pressedKeys.includes("d")) {
        deltaX += speed;
        setDirection("right");
      }

      if (!isGrounded) {
        setVelocity((prev) => ({
          ...prev,
          y: Math.max(prev.y - gravity, -jumpSpeed),
        }));
      }

      deltaX += velocity.x;
      deltaY -= velocity.y;

      let nextX = position.x + deltaX;
      let nextY = Math.max(0, position.y + deltaY);

      let isColliding = false; // Track if the character is colliding with any obstacles

      for (const obstacle of obstacles) {
        if (
          nextX < obstacle.x + obstacle.width &&
          nextX + 50 > obstacle.x &&
          position.y < obstacle.y + obstacle.height &&
          position.y + 50 > obstacle.y
        ) {
          isColliding = true;
          if ((obstacle.id = 1)) {
            setObstacles(
              obstacles.filter(function (obstacle) {
                return obstacle.id !== 1;
              })
            );
            console.log(obstacles);
          }
          if (deltaX > 0) {
            nextX = obstacle.x - 50;
          } else if (deltaX < 0) {
            nextX = obstacle.x + obstacle.width;
          }
        }

        if (
          position.x < obstacle.x + obstacle.width &&
          position.x + 50 > obstacle.x &&
          nextY < obstacle.y + obstacle.height &&
          nextY + 50 > obstacle.y
        ) {
          if (deltaY > 0) {
            nextY = obstacle.y - 50;
            setVelocity((prev) => ({ ...prev, y: 0 }));
            setIsGrounded(true);
          } else if (deltaY < 0) {
            nextY = obstacle.y + obstacle.height;
            setVelocity((prev) => ({ ...prev, y: 0 }));
          }
        }
      }

      // If not colliding with an obstacle, set isGrounded to false
      if (!isColliding) {
        setIsGrounded(false);
      }

      setPosition({ x: nextX, y: nextY });
    };

    const animationFrame = requestAnimationFrame(move);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [pressedKeys, position, obstacles, velocity, isGrounded]);

  useEffect(() => {
    const frameChangeInterval = 100;

    const updateFrame = () => {
      setCurrentFrameIndex((prevIndex) =>
        isIdle
          ? (prevIndex + 1) % idleFrameUrls.length
          : (prevIndex + 1) % runFrameUrls.length
      );
    };

    const frameIntervalId = setInterval(updateFrame, frameChangeInterval);

    return () => {
      clearInterval(frameIntervalId);
    };
  }, [isIdle]);

  return (
    <div
      style={{
        width: "1000px",
        height: "1000px",
        border: "1px solid white",
        position: "relative",
      }}
    >
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          style={{
            width: obstacle.width,
            height: obstacle.height,
            backgroundColor: "brown",
            position: "absolute",
            top: `${obstacle.y}px`,
            left: `${obstacle.x}px`,
          }}
        ></div>
      ))}
      <img
        src={
          isIdle
            ? idleFrameUrls[currentFrameIndex]
            : runFrameUrls[currentFrameIndex]
        }
        style={{
          width: "50px",
          height: "50px",
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        }}
        alt="Character"
      />
    </div>
  );
};

export default Mine;
