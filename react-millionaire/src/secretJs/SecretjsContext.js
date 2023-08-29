import { createContext, useState } from "react";
import { SecretNetworkClient } from "secretjs";

const SecretjsContext = createContext(null);
const SECRET_CHAIN_ID = "pulsar-3";
const SECRET_LCD = "https://api.pulsar3.scrttestnet.com";

const SecretjsContextProvider = ({ children }) => {
  const [secretjs, setSecretjs] = useState(null);
  const [secretAddress, setSecretAddress] = useState("");

  async function setupKeplr(setSecretjs, setSecretAddress) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }

    await window.keplr.enable(SECRET_CHAIN_ID);
    window.keplr.defaultOptions = {
      sign: {
        preferNoSetFee: false,
        disableBalanceCheck: true,
      },
    };

    const keplrOfflineSigner =
      window.getOfflineSignerOnlyAmino(SECRET_CHAIN_ID);
    const accounts = await keplrOfflineSigner.getAccounts();

    const secretAddress = accounts[0].address;

    const secretjs = new SecretNetworkClient({
      url: SECRET_LCD,
      chainId: SECRET_CHAIN_ID,
      wallet: keplrOfflineSigner,
      walletAddress: secretAddress,
      encryptionUtils: window.getEnigmaUtils(SECRET_CHAIN_ID),
    });

    setSecretAddress(secretAddress);
    setSecretjs(secretjs);
  }

  async function connectWallet() {
    try {
      if (!window.keplr) {
        console.log("intall keplr!");
      } else {
        await setupKeplr(setSecretjs, setSecretAddress);
        localStorage.setItem("keplrAutoConnect", "true");
        console.log(secretAddress);
      }
    } catch (error) {
      alert(
        "An error occurred while connecting to the wallet. Please try again."
      );
    }
  }

  function disconnectWallet() {
    // reset secretjs and secretAddress
    setSecretAddress("");
    setSecretjs(null);

    // disable auto connect
    localStorage.setItem("keplrAutoConnect", "false");

    // console.log for success
    console.log("Wallet disconnected!");
  }

  return (
    <SecretjsContext.Provider
      value={{
        secretjs,
        setSecretjs,
        secretAddress,
        setSecretAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </SecretjsContext.Provider>
  );
};

export { SecretjsContext, SecretjsContextProvider };
