interface SortByASCProps {
  sortByAsc: () => void;
  sortByASC: boolean;
}

function SortByASC({ sortByAsc, sortByASC }: SortByASCProps) {
  function handleOnClick() {
    sortByAsc();
  }

  return (
    <>
      id
      <div className="idFilter">
        <img
          onClick={handleOnClick}
          className="filterArrow"
          src={
            sortByASC
              ? "https://www.svgrepo.com/show/446819/triangle-up.svg"
              : "https://www.svgrepo.com/show/446816/triangle-down.svg"
          }
        />
      </div>
    </>
  );
}

export default SortByASC;
