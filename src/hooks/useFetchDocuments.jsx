import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useGetDateAndHours } from "./useGetDateAndHours";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { getDateAndHours } = useGetDateAndHours();

  useEffect(() => {
  }, [loading]);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // if (cancelled) return;
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
        setError(error.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
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
