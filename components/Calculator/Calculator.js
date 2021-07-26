import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModalDrag from "../../utils/customHook/useModalDrag";
import { setIsCalcOpen } from "../../utils/store/actions/modalStateAction";
import styles from "./Calculator.module.scss";

const Calculator = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState);
  const [position, dragHandler, setFocus, options] = useModalDrag(
    80,
    340,
    "calc"
  );
  const [re, setRe] = useState(false);
  const [exp, setExp] = useState("");
  const [tmp, setTmp] = useState("");
  const container = useRef();
  const isClickOutSide = useRef(false);

  const numToCom = (n) => {
    //노가다의 정석 콤마 찍기, 준영이 버전 나 쫌 똑똑한듯 히히
    const mArry = [];
    for (let i = 0; i < n.length; i++) {
      //각 기호단위로 나눠 배열 만들기
      if (n[i] === "-" || n[i] === "+" || n[i] === "×" || n[i] === "÷") {
        mArry.push(n[i]);
      } else {
        if (
          mArry[mArry.length - 1] === "-" ||
          mArry[mArry.length - 1] === "+" ||
          mArry[mArry.length - 1] === "×" ||
          mArry[mArry.length - 1] === "÷"
        ) {
          mArry.push(n[i]);
        } else {
          //처음부토 숫자일때
          if (mArry.length === 0) {
            mArry.push(n[i]);
          } else {
            //그 외
            mArry[mArry.length - 1] += n[i];
          }
        }
      }
    }
    //배열을 콤마찍어 내보내기
    return mArry
      .map((num) => {
        if (num === "-" || num === "+" || num === "×" || num === "÷") {
          return num;
        } else {
          //소숫점 콤마 제거
          const parts = num.split(".");
          return (
            parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            (parts[1] !== undefined ? "." + parts[1] : "")
          );
        }
      })
      .join("");
  };

  const keyEvent = (e) => {
    if (modalState.focus !== "calc" || isClickOutSide.current) {
      return;
    }

    const checkrule =
      exp.endsWith(".") ||
      exp.endsWith("+") ||
      exp.endsWith("-") ||
      exp.endsWith("@") ||
      exp.endsWith("x") ||
      exp === "";

    if (exp.length > 17) {
      if (e.keyCode === 8) {
        //지우기
        if (exp.slice(exp.length - 2, exp.length) === "0.") {
          setExp(exp.slice(0, exp.length - 2));
        } else {
          setExp(exp.slice(0, exp.length - 1));
        }
      } else if (e.keyCode === 13) {
        //계산
        const r = /^[0-9+\-*/(). ]*$/g;
        const tmpExp = exp.replace(/\@/g, "/").replace(/\x/g, "*");

        const isCalc =
          r.test(tmpExp) &&
          !tmpExp.endsWith("+") &&
          !tmpExp.endsWith("-") &&
          !tmpExp.endsWith("*") &&
          !tmpExp.endsWith("/");

        if (isCalc) {
          setExp(String(parseFloat(eval(tmpExp).toFixed(5))));
          setTmp(exp);
          setRe(true);
        }
      }
      return;
    }

    if (re) {
      if (e.keyCode === 13) {
        return;
      }

      setTmp(exp);
      setRe(false);
      setExp("");
      return;
    }

    if (
      (!e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57) ||
      (!e.shiftKey && e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      if (e.keyCode === 48 || e.keyCode === 96) {
        //시작 0과 .예외처리
        if (checkrule) {
          if (exp.endsWith(".")) {
            setExp(exp + "0");
          } else {
            setExp(exp + "0.");
          }

          return;
        }
      }
      //수정 (혹시 첨보는 오류가 생기면 여기를 고려)
      if (exp === "0") {
        setExp(e.key);
      } else {
        setExp(exp + e.key);
      }
    } else if (e.keyCode === 8) {
      //지우기
      if (exp.slice(exp.length - 2, exp.length) === "0.") {
        setExp(exp.slice(0, exp.length - 2));
      } else {
        setExp(exp.slice(0, exp.length - 1));
      }
    } else if (exp === "" && e.keyCode === 109) {
      setExp(exp + "-");
    } else if (exp === "" && e.keyCode === 189) {
      setExp(exp + "-");
    } else if (checkrule) {
      return;
    } else if (e.keyCode === 110 || e.keyCode === 190) {
      //.
      //중복 . 제거
      const tmpArry = exp
        .replace(/\@/g, ",")
        .replace(/\x/g, ",")
        .replace(/\+/g, ",")
        .replace(/\-/g, ",")
        .split(",");

      if (tmpArry[tmpArry.length - 1].includes(".")) {
        return;
      } else {
        setExp(exp + ".");
      }
    } else if (e.keyCode === 106) {
      //*
      setExp(exp + "x");
    } else if (e.keyCode === 109) {
      // -
      setExp(exp + "-");
    } else if (e.keyCode === 107) {
      // +
      setExp(exp + "+");
    } else if (e.keyCode === 111) {
      // /
      setExp(exp + "@");
    } else if (e.keyCode === 13) {
      //계산
      const r = /^[0-9+\-*/(). ]*$/g;
      const tmpExp = exp.replace(/\@/g, "/").replace(/\x/g, "*");
      const isCalc =
        r.test(tmpExp) &&
        !tmpExp.endsWith("+") &&
        !tmpExp.endsWith("-") &&
        !tmpExp.endsWith("*") &&
        !tmpExp.endsWith("/");

      if (isCalc) {
        setExp(String(parseFloat(eval(tmpExp).toFixed(5))));
        setTmp(exp);
        // setRe(true)
      }
    } else if (e.shiftKey && e.keyCode === 187) {
      // + mac & window
      setExp(exp + "+");
    } else if (!e.shiftKey && e.keyCode === 189) {
      // - mac & window
      setExp(exp + "-");
    } else if (e.shiftKey && e.keyCode === 56) {
      //* mac & window
      setExp(exp + "x");
    } else if (e.keyCode === 191) {
      // / mac & window
      setExp(exp + "@");
    }
  };

  const handleClickOutside = (e) => {
    if (container.current) {
      isClickOutSide.current = !container.current.contains(e.target);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    () => document.removeEventListener("mousedown", handleClickOutside);
  }, [container.current]);

  useEffect(() => {
    document.addEventListener("keydown", keyEvent);

    return () => {
      document.removeEventListener("keydown", keyEvent);
    };
  }, [keyEvent, exp, tmp, re]);

  return (
    <div
      className={styles.wrap}
      style={{
        right: position,
        zIndex: options.zIndex,
      }}
      onMouseDown={setFocus}
      onFocus={() => console.log("focus calc")}
      ref={container}
    >
      <div className={styles.nav} {...dragHandler}>
        <div />
        계산기
        <i
          className="xi-close-thin"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => dispatch(setIsCalcOpen(false))}
        />
      </div>
      <div className={styles.calc_wrap}>
        <div
          className={styles.result}
          style={{
            fontSize: exp.length > 24 ? 14 : "",
          }}
        >
          <div className={styles.result_sub}>
            {numToCom(tmp.replace(/\@/g, "÷").replace(/\x/g, "×"))}
          </div>
          {numToCom(exp.replace(/\@/g, "÷").replace(/\x/g, "×"))}
        </div>
        <div className={styles.btn_wrap}>
          <div
            className={`${styles.single} ${styles.double} ${styles.gray}`}
            onClick={() => {
              setExp("");
              setTmp("");
              setRe(false);
            }}
          >
            C
          </div>
          <div
            className={`${styles.single} ${styles.gray}`}
            onClick={() => {
              setExp("");
              setRe(false);
            }}
          >
            CE
          </div>
          <div
            className={`${styles.single} ${styles.gray}`}
            onClick={() => keyEvent({ keyCode: 111 })}
          >
            ÷
          </div>

          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 55, key: "7" })}
          >
            7
          </div>
          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 56, key: "8" })}
          >
            8
          </div>
          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 57, key: "9" })}
          >
            9
          </div>
          <div
            className={`${styles.single} ${styles.gray}`}
            onClick={() => keyEvent({ keyCode: 106 })}
          >
            ×
          </div>

          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 52, key: "4" })}
          >
            4
          </div>
          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 53, key: "5" })}
          >
            5
          </div>
          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 54, key: "6" })}
          >
            6
          </div>
          <div
            className={`${styles.single} ${styles.gray}`}
            onClick={() => keyEvent({ keyCode: 109, key: "-" })}
          >
            -
          </div>

          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 49, key: "1" })}
          >
            1
          </div>
          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 50, key: "2" })}
          >
            2
          </div>
          <div
            className={styles.single}
            onClick={() => keyEvent({ keyCode: 51, key: "3" })}
          >
            3
          </div>
          <div
            className={`${styles.single} ${styles.gray}`}
            onClick={() => keyEvent({ keyCode: 107, key: "+" })}
          >
            +
          </div>

          <div
            className={`${styles.single} ${styles.double}`}
            onClick={() => keyEvent({ keyCode: 48, key: "0" })}
          >
            0
          </div>
          <div
            className={`${styles.single} ${styles.gray}`}
            onClick={() => keyEvent({ keyCode: 110, key: "." })}
          >
            .
          </div>
          <div
            className={`${styles.single} ${styles.black}`}
            onClick={() => keyEvent({ keyCode: 13 })}
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
