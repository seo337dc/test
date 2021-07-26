import styles from "./SliderBtn.module.scss";

const defaultWidth = 40;
const defaultHeight = 20;
const defaultSliderMargin = 2;

const Slider = ({
  onClick,
  value,
  width = defaultWidth,
  height = defaultHeight,
  sliderMargin = defaultSliderMargin,
  noneIfSmallScreen,
}) => {
  return (
    <div
      className={`${styles.wrap} ${value ? styles.wrap_on : styles.wrap_off} ${
        noneIfSmallScreen ? styles.none_if_small_screen : ""
      }`}
      style={{
        width,
        height,
        padding: `0 ${height / 2}px`,
      }}
      onClick={onClick}
    >
      <div className={styles.slider_wrap}>
        <div
          className={`${styles.slider} ${value ? styles.on : styles.off}`}
          style={{
            width: height - sliderMargin * 2,
            height: height - sliderMargin * 2,
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
