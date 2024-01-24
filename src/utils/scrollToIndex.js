export const scrollToIndex = (info, flatListRef) => {
  const wait = new Promise((resolve) => setTimeout(resolve, 500));
  wait.then(() => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }
  });
};
