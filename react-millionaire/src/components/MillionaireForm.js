import SecretToken from "./SecretToken";
import RicherModal from "./RicherModal";
import ResetModal from "./ResetModal";
import { WalletIcon } from "@heroicons/react/24/outline";
import { SecretjsContext } from "../secretJs/SecretjsContext";
import { SecretjsFunctions } from "../secretJs/SecretjsFunctions";
import { useContext, useState } from "react";

function MillionaireForm({
  millionaire1,
  setMillionaire1,
  millionaire2,
  setMillionaire2,
}) {
  const { connectWallet } = useContext(SecretjsContext);
  const { submit_net_worth, reset_net_worth, query_net_worth } =
    SecretjsFunctions();

  const [name1, setName1] = useState("");
  const [networth1, setNetworth1] = useState("");
  const [name2, setName2] = useState("");
  const [networth2, setNetworth2] = useState("");
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [richerModalOpen, setRicherModalOpen] = useState(false);
  const [myQuery, setMyQuery] = useState([]);
  const [showRicherButton, setShowRicherButton] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMillionaire1({ name: name1, networth: networth1 });
      setMillionaire2({ name: name2, networth: networth2 });

      // Call submit_net_worth with the updated values
      await submit_net_worth(
        { name: name1, networth: networth1 },
        { name: name2, networth: networth2 }
      );
      // let myQuery = [];
      await query_net_worth(myQuery);

      setRicherModalOpen(true);
      setShowRicherButton(false);
    } catch (error) {
      alert("Please approve the transaction in keplr.");
    }
  };

  const resetSubmit = async (e) => {
    e.preventDefault();
    try {
      await reset_net_worth();
      setResetModalOpen(true);
      setShowRicherButton(true);
    } catch (error) {
      alert("Please connect your wallet by selecting the wallet icon.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-end -mb-4 ">
            <WalletIcon
              onClick={connectWallet}
              className="h-10 w-10 text-white hover:text-indigo-500  "
            />
          </div>
          <SecretToken className="mb-2 " />
          <h2 className=" -mt-8 -mb-12 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Secret Millionaire
          </h2>
        </div>

        <br></br>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit} className="space-y-2">
            <p className="text-white">Millionaire #1</p>
            <div className="border-4 rounded-lg p-2 ">
              <div className="flex items-center justify-between ">
                <label className="block text-sm font-medium leading-6 text-white">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Name of Millionaire 1"
                  required
                  className="block w-full rounded-md border-0 bg-white/5
                py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10
                focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm
                sm:leading-6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">
                  Networth
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={networth1}
                    onChange={(e) => setNetworth1(e.target.value)}
                    placeholder="0"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <br></br>
            <p className="text-white ">Millionaire #2</p>
            <div className="border-4 rounded-lg p-2 ">
              <div className="flex items-center justify-between ">
                <label className="block text-sm font-medium leading-6 text-white">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Name of Millionaire 2"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">
                  Networth
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={networth2}
                    onChange={(e) => setNetworth2(e.target.value)}
                    placeholder="0"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              {showRicherButton ? (
                <button
                  type="submit"
                  id="richer-submit"
                  onClick={handleSubmit}
                  className="flex w-32 mx-auto justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Who is Richer?
                </button>
              ) : (
                <button
                  onClick={resetSubmit}
                  type="submit"
                  id="reset-submit"
                  className="flex w-32 mx-auto justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Built on{" "}
            <a
              href="https://docs.scrt.network/secret-network-documentation/"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Secret.
            </a>
          </p>
        </div>
      </div>
      <RicherModal
        richerModalOpen={richerModalOpen}
        setRicherModalOpen={setRicherModalOpen}
        myQuery={myQuery}
      />
      <ResetModal
        resetModalOpen={resetModalOpen}
        setResetModalOpen={setResetModalOpen}
      />
    </>
  );
}

export default MillionaireForm;
