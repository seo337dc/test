import { useState, useEffect, useRef } from "react";
import { timerFomatter } from "../../utils/common/fomatter";
import styles from "./CirclePercentagePlayer.module.scss";

const CirclePercentagePlayer = ({
  title = "",
  bgcolor = "#e3e3e3",
  innerColor = "#ffffff",
  radius = 20,
  borderWidth = 2,
  src,
}) => {
  const audio = useRef(null);
  const [now, setNow] = useState(0);
  const [total, setTotal] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [leftTransformerDegree, setLeftTransformerDegree] = useState(0);
  const [rightTransformerDegree, setRightTransformerDegree] = useState(0);

  useEffect(() => {
    const percent = (now / total) * 100;

    if (percent >= 50) {
      setLeftTransformerDegree((percent - 50) * 3.6);
      setRightTransformerDegree(180);
    } else {
      setLeftTransformerDegree(0);
      setRightTransformerDegree(percent * 3.6);
    }
  }, [now, total]);

  return (
    <div
      className={styles.warp}
      style={{ cursor: isPlay ? "not-allowed" : "pointer" }}
    >
      {title && <div className={styles.title}>{title}</div>}
      <div
        className={styles.circle}
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: bgcolor,
        }}
      >
        <div
          className={styles.left_wrap}
          style={{
            width: radius,
            height: radius * 2,
            left: 0,
          }}
        >
          <div
            className={styles.loader}
            style={{
              left: radius,
              width: radius,
              height: radius * 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              transform: `rotate(${leftTransformerDegree}deg)`,
              background: `linear-gradient(${
                leftTransformerDegree * -2 + 450
              }deg, #b5a496, #6b5d52)`,
            }}
          />
        </div>
        <div
          className={styles.right_wrap}
          style={{
            width: radius,
            height: radius * 2,
            left: radius,
          }}
        >
          <div
            className={styles.loader2}
            style={{
              left: -radius,
              width: radius,
              height: radius * 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              transform: `rotate(${rightTransformerDegree}deg)`,
            }}
          />
        </div>
        <div
          className={styles.inner_circle}
          style={{
            left: borderWidth,
            top: borderWidth,
            width: (radius - borderWidth) * 2,
            height: (radius - borderWidth) * 2,
            borderRadius: radius - borderWidth,
            backgroundColor: innerColor,
            fontSize: radius,
          }}
        >
          {isPlay ? (
            <i
              className="xi-pause"
              // onClick={() => {
              //   audio.current.pause();
              //   setIsPlay(false);
              // }}
            />
          ) : (
            <i
              className="xi-play"
              style={{ marginLeft: 4 }}
              onClick={() => {
                audio.current.play();
                setIsPlay(true);
              }}
            />
          )}

          <audio
            style={{ display: "none" }}
            ref={audio}
            src={src}
            onTimeUpdate={(e) => setNow(e.target.currentTime)}
            onDurationChange={(e) => setTotal(e.target.duration)}
            onEnded={() => setIsPlay(false)}
          />
        </div>
      </div>
      <div className={styles.time}>
        {timerFomatter(now.toFixed())} / {timerFomatter(total.toFixed())}
      </div>
    </div>
  );
};

export default CirclePercentagePlayer;
