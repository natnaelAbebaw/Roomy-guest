import React from "react";

type IconProps = React.ComponentProps<"div"> & {
  children: React.ReactElement;
  fontSize?: string;
};

function Icon({ children, fontSize = "2.4rem", ...props }: IconProps) {
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { fontSize: fontSize, ...props })
  );
}

export default Icon;
