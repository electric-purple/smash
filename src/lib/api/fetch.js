// export const fetcher = async ({
//   input: RequestInfo,
//   init: RequestInit,
//   ...args: any[]
// }) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

export const fetcher = async ({ input, init, ...args }) => {
  const res = await fetch(input, init);
  console.log(args); // squelch ts warning
  return res.json();
};
