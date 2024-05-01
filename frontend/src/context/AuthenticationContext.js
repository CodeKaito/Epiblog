import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(""); // Stato per memorizzare il token dell'utente
  const [isLogged, setIsLogged] = useState(false); // Stato per gestire se l'utente è autenticato o meno
  const [sessionExpired, setSessionExpired] = useState(false); // Stato per gestire l'avviso di sessione scaduta

  // Funzione per controllare la validità del token
  const checkTokenValidity = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return; // Se non c'è un token salvato, esci

    // Decodifica il token per ottenere la data di scadenza
    const { exp } = JSON.parse(atob(storedToken.split(".")[1]));

    // Se la data di scadenza è nel passato, effettua il logout
    if (Date.now() >= exp * 1000) {
      setSessionExpired(true); // Imposta lo stato di sessione scaduta
      localStorage.setItem("sessionExpired", sessionExpired); // Salva sessionExpired nel localStorage
      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLogged");
    localStorage.setItem("isSessionExpired", sessionExpired);

    if (storedToken && isLoggedIn === "true") {
      setToken(storedToken);
      setIsLogged(true);

      checkTokenValidity();
    }
  }, []);

  useEffect(() => {
    // Esegue il controllo della validità del token ogni 5 minuti
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 2 * 60 * 1000); // 2 minuti

    // Pulisce l'intervallo quando il componente si smonta
    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    setToken(token);
    setIsLogged(true);
    setSessionExpired(false);

    localStorage.setItem("token", token); // Memorizza il token di accesso dell'utente nel localStorage
    localStorage.setItem("isLogged", "true"); // Memorizza lo stato di autenticazione nel localStorage
    localStorage.removeItem("sessionExpired");
  };

  const logout = () => {
    setIsLogged(false);

    localStorage.removeItem("token"); // Rimuovi i dati dell'utente dal localStorage
    localStorage.removeItem("isLogged"); // Rimuovi lo stato di autenticazione dal localStorage

    // Reindirizza alla pagina di login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLogged,
        login,
        logout,
        sessionExpired,
        setSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
