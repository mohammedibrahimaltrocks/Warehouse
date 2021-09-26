export const types = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
};
export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export const stylecode = {
  bordercolor: "none",
};
export const Invalidstylecode = {
  bordercolor: "red",
};

export const order_type = {
  pallet: "pallet",
  bulk: "bulk",
  location: "location",
};
