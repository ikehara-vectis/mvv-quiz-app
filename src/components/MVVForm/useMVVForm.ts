import { useState } from "react";

export type MVVSection = "vision" | "mission" | "values";

export function useMVVForm() {
  const [vision, setVision] = useState(["", "", ""]);
  const [mission, setMission] = useState(["", ""]);
  const [values, setValues] = useState(["", "", ""]);

  const updateSection = (section: MVVSection, index: number, value: string) => {
    const stateMap = {
      vision: [vision, setVision],
      mission: [mission, setMission],
      values: [values, setValues],
    } as const;

    const [current, setter] = stateMap[section];
    const updated = [...current];
    updated[index] = value;
    setter(updated);
  };

  return {
    vision,
    mission,
    values,
    updateSection,
  };
}
