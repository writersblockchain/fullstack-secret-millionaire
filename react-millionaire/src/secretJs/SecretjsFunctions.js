import { useContext } from "react";
import { MsgExecuteContract } from "secretjs";
import { SecretjsContext } from "./SecretjsContext";

let contractCodeHash =
  "a448595e3a46197776ff966c980d0de770c052c7f1ced1577027906835126bd5";
let contractAddress = "secret107zv242mk90lwywqhm2xljqzy62yucwsc7f2xd";

const SecretjsFunctions = () => {
  const { secretjs, secretAddress } = useContext(SecretjsContext);

  let submit_net_worth = async (millionaire1, millionaire2) => {
    const millionaire1_tx = new MsgExecuteContract({
      sender: secretAddress,
      contract_address: contractAddress,
      msg: {
        submit_net_worth: {
          name: millionaire1.name,
          worth: parseInt(millionaire1.networth),
        },
      },
      code_hash: contractCodeHash,
    });

    const millionaire2_tx = new MsgExecuteContract({
      sender: secretAddress,
      contract_address: contractAddress,
      msg: {
        submit_net_worth: {
          name: millionaire2.name,
          worth: parseInt(millionaire2.networth),
        },
      },
      code_hash: contractCodeHash,
    });
    const txs = await secretjs.tx.broadcast(
      [millionaire1_tx, millionaire2_tx],
      {
        gasLimit: 300_000,
      }
    );
    console.log(txs);
  };
  // submit_net_worth(millionaire1, millionaire2);

  let reset_net_worth = async () => {
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: secretAddress,
        contract_address: contractAddress,
        msg: {
          reset: {},
        },
        code_hash: contractCodeHash,
      },
      { gasLimit: 100_000 }
    );

    console.log(tx);
  };
  // reset_net_worth();

  let query_net_worth = async (myQuery) => {
    let query = await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      query: {
        who_is_richer: {},
      },
      code_hash: contractCodeHash,
    });

    myQuery.push(query);

    console.log(myQuery);
  };
  //   query_net_worth();
  return {
    submit_net_worth,
    reset_net_worth,
    query_net_worth,
  };
};

export { SecretjsFunctions };
