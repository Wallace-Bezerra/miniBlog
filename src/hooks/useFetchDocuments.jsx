import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [cancelled, setCancelled] = useState(false);

  const getDateAndHours = (dateDoc) => {
    const optionsDate = {
      date: {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
      hours: {
        hour: "numeric",
        minute: "numeric",
      },
    };

    const dataAtual = new Date();
    const date = new Date(dateDoc);
    const formatedDate = date.toLocaleDateString("pt-BR", optionsDate.date);
    const formatedDateHours = date.toLocaleTimeString(
      "pt-BR",
      optionsDate.hours
    );
    const formated = date.toLocaleTimeString("pt-BR", {
      ...optionsDate.date,
      ...optionsDate.hours,
    });

    console.log(formated);
    console.log(formatedDate);
    console.log(formatedDateHours);

    let time1 = dateDoc.getTime();
    let time2 = dataAtual.getTime();
    let differenceInMilliseconds = time2 - time1;
    let differenceInDays = differenceInMilliseconds / 86400000;
    let differenceInHours = differenceInDays * 24;
    let differenceInMinutes = differenceInHours * 60;

    let differenceInWeeks = differenceInDays / 7;
    let differenceInMonths = differenceInDays / 30;
    let differenceInYears = differenceInDays / 365;

    let dateDifference = undefined;

    if (differenceInMinutes < 60) {
      dateDifference = Math.floor(differenceInMinutes) + " min";
      if (dateDifference.includes("0 min")) {
        dateDifference = "Agora";
      }
    } else if (differenceInHours < 24) {
      dateDifference = Math.floor(differenceInHours) + " h";
    } else if (differenceInDays < 7) {
      dateDifference = Math.floor(differenceInDays) + " d";
    } else if (differenceInWeeks < 3) {
      dateDifference = Math.floor(differenceInWeeks) + " sem";
    } else if (differenceInMonths < 12 && differenceInMonths > 0) {
      dateDifference = Math.floor(differenceInMonths) + " m";
    } else {
      dateDifference = Math.floor(differenceInYears) + " a";
    }

    return { formatedDate, formatedDateHours, dateDifference };
  };

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;
      setLoading(true);
      setError(false);
      const collectionRef = await collection(db, docCollection);
      try {
        let q;
        // busca de dados
        if (search) {
          q = await query(
            collectionRef,
            where("arrayTags", "array-contains", search),
            orderBy("CreatedAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("CreatedAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("CreatedAt", "desc"));
        }

        // manipulação de data

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => {
              const { formatedDate, formatedDateHours, dateDifference } =
                getDateAndHours(doc.data().CreatedAt.toDate());

              return {
                id: doc.id,
                createdDate: {
                  formatedDate,
                  formatedDateHours,
                  dateDifference,
                },
                ...doc.data(),
              };
            })
          );
        });
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.log("Uid", documents);
    loadData();
  }, [docCollection, search, uid, cancelled]);

  //cleanUp
  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  });

  return { documents, error, loading };
};
