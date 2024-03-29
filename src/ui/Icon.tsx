import React from "react";

type IconProps = {
  children: React.ReactElement;
  fontSize?: string;
};

function Icon({ children, fontSize = "2rem" }: IconProps) {
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { fontSize: fontSize })
  );
}

export default Icon;
