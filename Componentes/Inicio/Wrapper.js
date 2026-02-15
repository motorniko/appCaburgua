import React from "react";

export default function Wrapper({ route }) {
  const { component: Component, props } = route.params;
  return <Component {...props} />;
}
