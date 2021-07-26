import { useEffect, useRef, useCallback } from "react";
import moment from "moment-timezone";
import styles from "./clock.module.scss";

const MARGIN = 25;
const WIDTH = 300;
const HEIGHT = 300;
const RADIUS = WIDTH / 2 - MARGIN;

const clock = () => {
  const canvas = useRef(null);

  const drawCircle = useCallback((context) => {
    context.beginPath();
    context.arc(WIDTH / 2, HEIGHT / 2, RADIUS, 0, Math.PI * 2, true);
    context.stroke();

    context.beginPath();
    context.arc(WIDTH / 2, HEIGHT / 2, 3, 0, Math.PI * 2, true);
    context.fill();
  }, []);

  const drawHand = useCallback((context) => {
    const _DATE = new Date();
    let H = _DATE.getHours() + _DATE.getMinutes() / 60;
    H = H > 12 ? H - 12 : H;
    const M = _DATE.getMinutes() + _DATE.getSeconds() / 60;
    const S = _DATE.getSeconds() + _DATE.getMilliseconds() / 1000;

    context.beginPath();
    context.moveTo(WIDTH / 2, HEIGHT / 2);
    context.lineTo(
      Math.cos((S * Math.PI) / 30 - 1.57) * RADIUS + WIDTH / 2,
      Math.sin((S * Math.PI) / 30 - 1.57) * RADIUS + HEIGHT / 2
    );
    context.stroke();

    context.beginPath();
    context.moveTo(WIDTH / 2, HEIGHT / 2);
    context.lineTo(
      Math.cos((M * Math.PI) / 30 - 1.57) * (RADIUS * 0.95) + WIDTH / 2,
      Math.sin((M * Math.PI) / 30 - 1.57) * (RADIUS * 0.95) + HEIGHT / 2
    );
    context.stroke();

    context.beginPath();
    context.moveTo(WIDTH / 2, HEIGHT / 2);
    context.lineTo(
      Math.cos((H * Math.PI) / 6 - 1.57) * (RADIUS * 0.8) + WIDTH / 2,
      Math.sin((H * Math.PI) / 6 - 1.57) * (RADIUS * 0.8) + HEIGHT / 2
    );
    context.stroke();

    context.fillText(S, 7, 15);
  }, []);

  const drawLoop = useCallback((context) => {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawCircle(context);
    drawHand(context);
    requestAnimationFrame(() => drawLoop(context));
  }, []);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    console.log(
      moment().valueOf() - moment(moment().tz("Asia/Seoul")).valueOf()
    );

    const context = canvas.current.getContext("2d");
    requestAnimationFrame(() => drawLoop(context));
  }, [canvas.current]);

  return (
    <div className={styles.wrap}>
      <canvas
        width={WIDTH}
        height={HEIGHT}
        className={styles.canvas}
        ref={canvas}
      />
    </div>
  );
};

export default clock;
