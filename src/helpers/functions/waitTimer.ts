export const waitTimer = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
