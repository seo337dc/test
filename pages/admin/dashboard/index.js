import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import AdminItem from "../../../components/Admin/AdminItem/AdminItem";
import axios from "axios";
import checkAdminToken from "../../../utils/fetch/checkAdminToken";
import { GET_ADMIN_QUESTION_LIST } from "../../../utils/fetch/apiConfig";
import styles from "../../../components/Admin/dashboard.module.scss";

const DashBoard = ({ token }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchCD, setSearchCD] = useState("code");
  const [listData, setlistData] = useState([]);

  const [title, _] = useState({
    email: "이메일",
    document: "자료실",
    messenger: "메신저",
    report: "보고서",
    info: "문구 관련",
  });

  useEffect(() => {
    axios.defaults.headers.common["token"] = token;

    if (router.query.menu) {
      (async () => {
        const res = await axios.post(GET_ADMIN_QUESTION_LIST, {
          App_Name: router.query.menu,
        });

        let result = res.data.questionList.sort((a, b) => {
          return a.Intern_Quest_ID < b.Intern_Quest_ID
            ? -1
            : a.Intern_Quest_ID > b.Intern_Quest_ID
            ? 1
            : 0;
        });

        setSearchCD("code");
        setSearch("");
        setlistData(result);
      })();
    } else {
      router.push("/admin/dashboard?menu=email");
    }
  }, [router.query.menu]);

  return (
    <AdminLayout>
      <div className={styles.dashboard_wrap}>
        <div className={styles.title}>
          {title[router.query.menu]}

          <div className={styles.search}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${
                searchCD === "code" ? "자료코드 검색" : "제목 검색"
              }`}
            />
            {router.query.menu !== "messenger" && (
              <select
                onChange={(e) => setSearchCD(e.target.value)}
                value={searchCD}
              >
                <option value="code">자료코드 검색</option>
                <option value="title">제목 검색</option>
              </select>
            )}
          </div>
          <div className={styles.insert_btn}>
            <button
              onClick={() => {
                router.push(`/admin/dashboard/${router.query.menu}Editor`);
              }}
            >
              생성하기
            </button>
          </div>
        </div>
        <div className={styles.dashboard_container}>
          {listData
            .filter((f) => f.Intern_Quest_ID.includes(search))
            .map((data, idx) => (
              <AdminItem
                key={`admin_${
                  router.query.menu ? router.query.menu : "none"
                }_item_${idx}`}
                data={data}
              />
            ))}

          {searchCD === "title" &&
            listData
              .filter((f) => {
                if (router.query.menu === "email") {
                  return f.Mail_Subject ? f.Mail_Subject.includes(search) : [];
                } else if (router.query.menu === "document") {
                  return f.File_Name ? f.File_Name.includes(search) : [];
                } else if (router.query.menu === "report") {
                  return f.Report_Title ? f.Report_Title.includes(search) : [];
                }
              })
              .map((data, idx) => (
                <AdminItem
                  key={`admin_${
                    router.query.menu ? router.query.menu : "none"
                  }_item_${idx}`}
                  data={data}
                />
              ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkAdminToken(ctx);
};

export default DashBoard;
