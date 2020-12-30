import { SemanticICONS } from "semantic-ui-react";
import { Gender } from "./types";

const genderToIcon = (gender: Gender | undefined): SemanticICONS => {
  if (gender == null) {
    return "genderless";
  }
  switch (gender) {
    case "male":
      return "mars";
    case "female":
      return "venus";
    default:
      return "venus mars";
  }
};

export {
  genderToIcon
};