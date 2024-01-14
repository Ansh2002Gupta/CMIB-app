export const getValidCurrentPage = (page) => {
  if (+page && +page > 0) {
    return +page;
  }
  return 1;
};
