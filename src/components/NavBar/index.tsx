import React from 'react';
import { NavLink } from "react-router-dom";

export const NavBar = () => (<nav>
  <ul>
    <li>
      <div>
        <NavLink to="/goals/">Goals</NavLink>
      </div>
    </li>
    <li>
      <div>
        <NavLink to="/income/">Incomes</NavLink>
      </div>
    </li>
    <li>
      <div>
        <NavLink to="/summary/">Expenses</NavLink>
      </div>
    </li>
  </ul>
</nav>);
