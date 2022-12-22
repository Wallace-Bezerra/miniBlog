import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      console.log(action, "ação loading");
      return { loading: true, error: null };
    case "INSERTED_DOC":
      console.log(action, "ação inserted");
      return { loading: false, error: null };
    case "ERROR":
      console.log(action, "ação erro");
      return { loading: false, error: action.payload };
    default:
      console.log(action, "ação padrao");
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
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
  const insertDocument = async (document) => {

    //despachar ação de LOADING
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...document, CreatedAt: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      //despachar ação de INSERTED
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });

    } catch (error) {
      //despachar ação de ERROR
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { insertDocument, response };
};
