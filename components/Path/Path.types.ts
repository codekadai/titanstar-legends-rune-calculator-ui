import { RuneType } from "../Rune/Rune.types";

export type PathType = RuneType[];

export type PathProps = {
  path: PathType;
  pathIndex: number;
};
