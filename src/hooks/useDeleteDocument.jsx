import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      console.log(action, "ação loading");
      return { loading: true, error: null };
    case "DELETED_DOC":
      console.log(action, "ação deleted");
      return { loading: false, error: null };
    case "ERROR":
      console.log(action, "ação erro");
      return { loading: false, error: action.payload };
    default:
      console.log(action, "ação padrao");
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setCancelled(false);
    return () => {
      setCancelled(true);
    };
  }, []);

  // função de despachar ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  // funcão que insere os dados no firebase
  const deleteDocument = async (id) => {
    //despachar ação de LOADING
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deleteDocument = await deleteDoc(doc(db, docCollection, id));

      //despachar ação de Deleted
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deleteDocument,
      });
    } catch (error) {
      //despachar ação de ERROR
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { deleteDocument, response };
};
