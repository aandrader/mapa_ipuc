function SearchButton(){
  return(
      <div className="search-button-container">
    <a
      data-bs-toggle="offcanvas"
      href="#templeList"
      role="button"
      aria-controls="offcanvasExample"
    >
     <img src="/SearchIcon.svg" alt="Logo" width="50" height="40" className="d-inline-block align-text-top" />
    </a>
          </div>
  )
}

export default SearchButton;

