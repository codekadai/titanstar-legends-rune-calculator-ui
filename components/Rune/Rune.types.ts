import { PathType } from "../Path";

export type RuneType = {
  name: string;
  isActive: boolean;
  isHovered: boolean;
  dependencies: string[];
};

export type RuneProps = {
  index: number;
  pathIndex: number;
  rune: RuneType;
  path: PathType;
};
