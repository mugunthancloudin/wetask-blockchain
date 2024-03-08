import React, { useState } from "react";
import { UserView, Deposit } from "../../services/blockchain";

const UserDetails = () => {
  const { data, isConnected } = UserView();
  const [amount, setAmount] = useState("");

  console.log(data);

  const handleClick = () => {
    if (isConnected && data) {
      console.log("Assets:", data.assets);
      console.log("Points:", data.points);
      console.log("Level:", data.level);
    } else {
      console.log("User data not available or not connected to wallet");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>User</button>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />
      <Deposit amount={amount} />
    </div>
  );
};

export default UserDetails;
