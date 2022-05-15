const getRangeOfElements = (startValue: number, endValue: number) => {
  const elementsRangeArray = [];
  for (let i = startValue; i <= endValue; i++) {
    elementsRangeArray.push(i);
  }
  return elementsRangeArray;
};

const divideNumbersList = (
  pagesNumbersList: number[],
  activeNumberOfPage: number,
) => {
  const dividedNumbersList: Array<number | string> = [...pagesNumbersList];
  const lastThirdListElement =
    dividedNumbersList[dividedNumbersList.length - 3];
  const lastListElement = dividedNumbersList[
    dividedNumbersList.length - 1
  ] as number;

  if (activeNumberOfPage < 3 || activeNumberOfPage > lastThirdListElement) {
    dividedNumbersList.splice(3, 0, '...');
  } else if (activeNumberOfPage < 6) {
    dividedNumbersList.splice(activeNumberOfPage + 1, 0, '...');
  } else if (lastListElement - 5 < activeNumberOfPage) {
    dividedNumbersList.splice(
      dividedNumbersList.indexOf(activeNumberOfPage) - 1,
      0,
      '...',
    );
  } else {
    dividedNumbersList.splice(3, 0, '...');
    dividedNumbersList.splice(7, 0, '...');
  }
  return dividedNumbersList;
};

const getPagesNumbersList = (totalPagesAmount: number, activePageNumber: number) => (
    totalPagesAmount < 10
      ? getRangeOfElements(1, totalPagesAmount)
      : activePageNumber < 3 || activePageNumber > totalPagesAmount - 2
      ? [
          ...getRangeOfElements(1, 3),
          ...getRangeOfElements(totalPagesAmount - 2, totalPagesAmount),
        ]
      : activePageNumber < 6
      ? [
          ...getRangeOfElements(1, activePageNumber + 1),
          ...getRangeOfElements(totalPagesAmount - 2, totalPagesAmount),
        ]
      : activePageNumber > totalPagesAmount - 5
      ? [
          ...getRangeOfElements(1, 3),
          ...getRangeOfElements(activePageNumber - 1, totalPagesAmount),
        ]
      : [
          ...getRangeOfElements(1, 3),
          ...getRangeOfElements(activePageNumber - 1, activePageNumber + 1),
          ...getRangeOfElements(totalPagesAmount - 2, totalPagesAmount),
        ]
);

const getTotalPagesAmount = (totalItemsAmount: number) => Math.ceil(totalItemsAmount / 10);

const getPagesNumbersListDivided = (activePageNumber: number, totalItemsAmount: number) => {
    const totalPagesAmount = getTotalPagesAmount(totalItemsAmount);
    const pagesNumbersList = getPagesNumbersList(totalPagesAmount, activePageNumber);
    return totalPagesAmount <= 10 ?  pagesNumbersList : divideNumbersList(pagesNumbersList, activePageNumber);
};

export default getPagesNumbersListDivided;

