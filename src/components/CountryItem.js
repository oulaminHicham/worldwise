import React from 'react';
import { format } from "date-fns";

import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
      <time>{format(country.date, '(yyyy/MM/dd)')}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CountryItem;
