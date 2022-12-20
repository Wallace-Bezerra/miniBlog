import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //cleanUp
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    //cleanUp
    return () => {
      setCancelled(true);
    };
  }, []);
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //signUp
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Este email já está cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }
      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  //logout

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login
  const login = async (data) => {
    checkIfIsCancelled();
    setError("");
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return user;
    } catch (error) {
      let systemErrorMessage = error.message;
      // wrong-password
      // user-not-found
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }
      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };
  return {
    auth,
    createUser,
    logout,
    login,
    error,
    setError,
    loading,
  };
};
