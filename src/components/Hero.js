import React from "react";

export default function Hero({ children, heroImg }) {
  return <header className={heroImg}>{children}</header>;
}

Hero.defaultProps = {
  heroImg: "defaultHero"
};
