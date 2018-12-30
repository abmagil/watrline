import React from 'react';
import { NavLink } from "react-router-dom";
import './styles.css';

export const NavBar = () => (
  <nav className="NavBar">
    <ul>
      <li>
        <NavLink to="/goals/">Goals</NavLink>
      </li>
      <li>
        <NavLink to="/income/">Incomes</NavLink>
      </li>
      <li>
        <NavLink to="/summary/">Expenses</NavLink>
      </li>
    </ul>
  </nav>);
