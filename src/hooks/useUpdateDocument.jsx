import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};
const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            console.log(action, "ação loading");
            return { loading: true, error: null };
        case "UPDATED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            console.log(action, "ação erro");
            return { loading: false, error: action.payload };
        default:
            console.log(action, "ação padrao");
            return state;
    }
};

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);
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
    const updateDocument = async (data, id) => {

        //despachar ação de LOADING
        checkCancelBeforeDispatch({
            type: "LOADING",
        });
        setTimeout(async () => {
            try {
                const docRef = await doc(db, docCollection, id)
                const updatedDocument = await updateDoc(docRef, data)
                //   const newDocument = { ...document, CreatedAt: Timestamp.now() };
                //   const insertedDocument = await addDoc(
                //     collection(db, docCollection),
                //     newDocument
                //   );

                //despachar ação de UPDATE
                checkCancelBeforeDispatch({
                    type: "UPDATED_DOC",
                    payload: updatedDocument,
                });

            } catch (error) {
                //despachar ação de ERROR
                checkCancelBeforeDispatch({
                    type: "ERROR",
                    payload: error.message,
                });
            }
        }, 1000);

    };

    return { updateDocument, response };
};
