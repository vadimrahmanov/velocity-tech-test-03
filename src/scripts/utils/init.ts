const init = (instantiate: () => void): void => {
  document.addEventListener('DOMContentLoaded', (): void => {
    instantiate();
  });
};

export default init;
