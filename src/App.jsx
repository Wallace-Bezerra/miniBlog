import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import styles from "./styles/main.module.scss";

import { Home } from "./Pages/Home/Home";
import { About } from "./Pages/About/About";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { NotFound } from "./Pages/NotFound/NotFound";

import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { CreatePost } from "./Pages/CreatePost/CreatePost";
import { EditPost } from "./Pages/EditPost/EditPost";
import { Search } from "./Pages/Search/Search";
import { Post } from "./Pages/Post/Post";
import { Loading } from "./components/Loading/Loading";
import { AppProvider } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToUp/ScrollToUp";

function App() {
  const [user, setUser] = useState();
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth, user]);

  return (
    <div className={styles.App}>
      <AuthProvider value={{ user }}>
        <AppProvider>
          <BrowserRouter>
            <NavBar />

            {loadingUser ? (
              <Loading />
            ) : (
              <>
                <ScrollToTop>
                  <Routes>
                    <Route path="/" element={<Home />}></Route>

                    <Route path="/about" element={<About />}></Route>
                    <Route path="/search" element={<Search />}></Route>
                    <Route path="/posts/:id" element={<Post />}></Route>
                    <Route
                      path="/login"
                      element={!user ? <Login /> : <Navigate to="/" />}
                    ></Route>
                    <Route
                      path="/signup"
                      element={!user ? <SignUp /> : <Navigate to="/" />}
                    ></Route>
                    <Route
                      path="/dashboard"
                      element={user ? <Dashboard /> : <Navigate to="/login" />}
                    ></Route>
                    <Route
                      path="/posts/create"
                      element={user ? <CreatePost /> : <Navigate to="/login" />}
                    ></Route>
                    <Route
                      path="/posts/edit/:id"
                      element={user ? <EditPost /> : <Navigate to="/login" />}
                    ></Route>

                    <Route path="/*" element={<NotFound />}></Route>
                  </Routes>
                </ScrollToTop>
                <Footer />
              </>
            )}
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
