import { createContext, useContext, useState, useEffect } from "react";
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { decryptData, encryptData } from "../utils/crypto";
import Encoder from "../utils/encodeData";

type AuthContextType = {
  user: User | null;
  login: (userData: string) => void;
  logout: () => void;
  isLoading: boolean;
  getUser: () => User | null;
  getSessionFingerPrint: () => Promise<unknown>;
  getHeaders: (multipart? : boolean) => Promise<HeadersInit>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {

      const encoder = new Encoder();
      const decodedEncryptedUserData = encoder.decode(JSON.parse(localStorage.getItem("user")!).data);
      setUser(decodedEncryptedUserData);
    }
    setLoading(false);
  }, []);

  const getSessionFingerPrint = async () => {
    try {
      const fingerprint = await getFingerprint();

      if (!fingerprint) {
        throw new Error('Failed to retrieve session fingerprint');
      }

      return fingerprint;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const getHeaders = async (multipart: boolean = false): Promise<HeadersInit> => {
    const fingerprint = await getSessionFingerPrint();
    const encoder = new Encoder();

    const encodedUserData = encoder.encode(user);
    const encryptedUserData = await encryptData(encodedUserData, fingerprint!);

    const encodedEncryptedUserData = encoder.encode(encryptedUserData);

    return multipart ?
      {
        "x-fingerprint": fingerprint!,
        "x-user-data": encodedEncryptedUserData
      }
      : {
        'Content-Type': 'application/json',
        "x-fingerprint": fingerprint!,
        "x-user-data": encodedEncryptedUserData
      }
  }

  type EncryptedData = {
    nonce: string;
    encrypted: string;
  }
  const login = async (userData: string) => {
    const fingerprint = await getSessionFingerPrint();

    const encoder = new Encoder();
    const decodedEncryptedUserData: EncryptedData | undefined = encoder.decode(userData);

    const decryptedUserData = await decryptData(decodedEncryptedUserData, fingerprint);
    const decodedDecryptedUserData = encoder.decode(decryptedUserData!)

    setUser(decodedDecryptedUserData);

    new Promise((resolve, reject) => {
      if (!decodedDecryptedUserData) {
        reject(false);
      }
      localStorage.setItem("user", JSON.stringify({ data: decryptedUserData }));
      resolve(true);
    });
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  }

  return (
    <AuthContext.Provider value={{
      user, isLoading, login, logout, getUser, getSessionFingerPrint, getHeaders
    }}>
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};