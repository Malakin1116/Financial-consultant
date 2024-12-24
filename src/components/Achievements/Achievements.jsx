import React from "react";
import { FaTrophy } from "react-icons/fa";
import styles from "./Achievements.module.css";

function Achievements({ xp }) {
  const achievements = [
    { name: "5 хвилин у додатку", condition: xp >= 5 },
    { name: "100 XP!", condition: xp >= 100 },
    { name: "Перший дохід", condition: xp >= 200 },
  ];

  return (
    <div className={styles.container}>
      <h2>Досягнення</h2>
      <ul>
        {achievements.map((achievement, index) => (
          <li
            key={index}
            className={achievement.condition ? styles.unlocked : ""}
          >
            {achievement.condition && <FaTrophy />}
            {achievement.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
