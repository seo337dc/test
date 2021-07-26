import { GET_TIME_TABLE_RESULT } from "../fetch/apiConfig";
import { getMessengerRoomList } from "../store/actions/messengerAction";
import { setMailList } from "../store/actions/mailActions";
import axios from "axios";

export const getItemDirectly = async (qId, dispatch, debounced) => {
  //아이템 하나 실행

  const res = await axios.post(GET_TIME_TABLE_RESULT, {
    internQuestId: qId,
  });

  if (res.data.kindCd === "EM") {
    dispatch(setMailList("from"));
  } else if (res.data.kindCd === "MS") {
    dispatch(getMessengerRoomList());
  }

  debounced(res.data.kindCd);
};

const nextAction = async (nextActionArray, dispatch) => {
  try {
    if (Array.isArray(nextActionArray)) {
      for (let i = 0; i < nextActionArray.length; i++) {
        await getItemDirectly(nextActionArray[i].INTERN_QUEST_ID, dispatch);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default nextAction;
