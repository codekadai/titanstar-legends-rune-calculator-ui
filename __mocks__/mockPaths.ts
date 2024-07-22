export const mockPaths = [
  [
    {
      name: "building",
      isActive: false,
      dependencies: [],
    },
    {
      name: "cooking",
      isActive: false,
      dependencies: ["building"],
    },
    {
      name: "baking",
      isActive: false,
      dependencies: ["building", "cooking"],
    },
    {
      name: "leading",
      isActive: false,
      dependencies: ["building", "cooking", "baking"],
    },
  ],
  [
    {
      name: "sailing",
      isActive: false,
      dependencies: [],
    },
    {
      name: "diving",
      isActive: false,
      dependencies: ["sailing"],
    },
    {
      name: "forecasting",
      isActive: false,
      dependencies: ["sailing", "diving"],
    },
    {
      name: "cloning",
      isActive: false,
      dependencies: ["sailing", "diving", "forecasting"],
    },
  ],
];
