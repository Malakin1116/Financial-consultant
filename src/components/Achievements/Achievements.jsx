import React from "react";
import { FaTrophy, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./Achievements.module.css";

function Achievements({ xp }) {
  const achievements = [
    { name: "Перші 5 хвилин у додатку", xpRequired: 5 },
    { name: "Отримано 100 XP", xpRequired: 100 },
    { name: "Досягнуто 500 XP", xpRequired: 500 },
    { name: "Майстер фінансів! 1000 XP", xpRequired: 1000 },
  ];

  return (
    <div className={styles.container}>
      <h2>Досягнення</h2>
      <ul>
        {achievements.map((achievement, index) => {
          const unlocked = xp >= achievement.xpRequired;

          return (
            <motion.li
              key={index}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{
                opacity: unlocked ? 1 : 0.5,
                scale: unlocked ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className={`${styles.achievement} ${
                unlocked ? styles.unlocked : ""
              }`}
            >
              {unlocked ? (
                <FaTrophy className={styles.icon} />
              ) : (
                <FaLock className={styles.lock} />
              )}
              <span>{achievement.name}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export default Achievements;
