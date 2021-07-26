import { useState } from "react";
import { useRouter } from "next/router";
import LoadingAdminFullScreen from "../LoadingAdminFullScreen/LoadingAdminFullScreen";
import axios from "axios";
import { setCookie } from "nookies";
import { ADMIN_LOGIN, ADMIN_LOGIN_FIRST } from "../../../utils/fetch/apiConfig";
import styles from "./AdminLogin.module.scss";

const AdminLogin = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [certification, setCertification] = useState("");

  const certificate = async (e) => {
    if (!certification) {
      alert("인증번호를 입력하세요.");
      return;
    }

    if (!id) {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!pw) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    e.preventDefault();
    if (isLoading) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(ADMIN_LOGIN, {
        U_ID: id,
        U_PASS: pw,
        confirmNo: certification,
        radio: 1,
      });

      if (res.data.result === "OK") {
        axios.defaults.headers.common["token"] = res.data.token;

        setCookie(null, "token", res.data.token, {
          path: "/",
          maxAge: 60 * 60 * 1000,
        });

        router.push("/admin/dashboard");
      } else {
        alert(`[${res.data.result}] ${res.data.msg}`);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(ADMIN_LOGIN_FIRST, {
        U_ID: id,
        U_PASS: pw,
        radio: 1,
      });

      if (res.data.result === "OK") {
        setIsFirstLogin(true);
        alert("인증번호 발송!");
      } else {
        alert(`[${res.data.result}] ${res.data.msg}`);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.text_container}>
          <h1>LOTTE 가상인턴 문항관리</h1>
        </div>

        <form className={styles.form_container}>
          <div className={styles.input_container}>
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <input
              type="password"
              placeholder="PASSWORD"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            {isFirstLogin && (
              <input
                type="number"
                placeholder="인증번호"
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
              />
            )}
          </div>
          <div className={styles.btn_container}>
            <button onClick={isFirstLogin ? certificate : login}>
              {isFirstLogin ? "로그인" : "인증번호 발송"}
            </button>
          </div>
          <img src="/img/INSA_LOGO_black.svg" alt="logo" />
        </form>
      </div>
      {isLoading && <LoadingAdminFullScreen />}
    </div>
  );
};

export default AdminLogin;
