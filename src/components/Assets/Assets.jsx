import React, { useState } from "react";
import styles from "./Assets.module.css";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [assetValue, setAssetValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(assetValue);
    if (assetName && !isNaN(value)) {
      setAssets([...assets, { name: assetName, value }]);
    }
    setAssetName("");
    setAssetValue("");
  };

  return (
    <div className={styles.container}>
      <h2>Активи</h2>
      <ul>
        {assets.map((asset, index) => (
          <li key={index}>
            {asset.name}: {asset.value} грн
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          placeholder="Назва активу"
          className={styles.input}
        />
        <input
          type="number"
          value={assetValue}
          onChange={(e) => setAssetValue(e.target.value)}
          placeholder="Вартість"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Додати актив
        </button>
      </form>
    </div>
  );
}

export default Assets;
