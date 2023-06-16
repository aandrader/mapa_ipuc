import PropTypes from "prop-types";

function SearchButton({ toggleTempleList }) {
  return (
    <div className="search-button-container">
      <a
        onClick={() => {
          toggleTempleList();
        }}
      >
        <img
          src="/SearchIcon.svg"
          alt="Logo"
          width="50"
          height="40"
          className="d-inline-block align-text-top"
        />
      </a>
    </div>
  );
}

SearchButton.propTypes = {
  toggleTempleList: PropTypes.func.isRequired,
};

export default SearchButton;
