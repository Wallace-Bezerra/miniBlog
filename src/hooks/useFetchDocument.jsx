import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useGetDateAndHours } from "./useGetDateAndHours";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { getDateAndHours } = useGetDateAndHours();
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;
      setLoading(true);
      setError(false);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        const { formatedDate, formatedDateHours, dateDifference } =
          getDateAndHours(docSnap.data().CreatedAt.toDate());

        setDocument({
          id: docSnap.id,
          createdDate: {
            formatedDate,
            formatedDateHours,
            dateDifference,
          },
          ...docSnap.data(),
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    console.log(document);
  }, [docCollection, id, cancelled]);

  //cleanUp
  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  });

  return { document, error, loading };
};
