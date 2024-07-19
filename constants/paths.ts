import { PathType } from "@/components/Path/Path.types";

export const paths: PathType[] = [
  [
    {
      name: "building",
      isActive: false,
      isHovered: false,
      dependencies: [],
    },
    {
      name: "cooking",
      isActive: false,
      isHovered: false,
      dependencies: ["building"],
    },
    {
      name: "baking",
      isActive: false,
      isHovered: false,
      dependencies: ["building", "cooking"],
    },
    {
      name: "leading",
      isActive: false,
      isHovered: false,
      dependencies: ["building", "cooking", "baking"],
    },
  ],
  [
    {
      name: "sailing",
      isActive: false,
      isHovered: false,
      dependencies: [],
    },
    {
      name: "diving",
      isActive: false,
      isHovered: false,
      dependencies: ["sailing"],
    },
    {
      name: "forecasting",
      isActive: false,
      isHovered: false,
      dependencies: ["sailing", "diving"],
    },
    {
      name: "cloning",
      isActive: false,
      isHovered: false,
      dependencies: ["sailing", "diving", "forecasting"],
    },
  ],
];
