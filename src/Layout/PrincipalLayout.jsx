import React from "react";
import { NavbarApp } from "../components/NavbarApp";

export const PrincipalLayout = ({ children }) => {
  return (
    <div className="app">
      <NavbarApp />
      <section className="principal-section">{children}</section>
    </div>
  );
};
