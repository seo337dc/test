import axios from "axios";
import { UPLOAD_IMG } from "../fetch/apiConfig";

const uploadFiles = async (file) => {
  //토큰으로 변경 예정
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const data = new FormData();
    data.append("filecontent", file);

    const res = await axios.post(UPLOAD_IMG, data, config);

    return { data: { url: res.data.viewUrl } };
  } catch (error) {
    alert("이미지 올리기 실패했습니다.");

    console.log(error);
  }
};

export default uploadFiles;
