function SearchButton(){
    return(
        <div className="search-button-container">
      <a
        data-bs-toggle="offcanvas"
        href="#congregationList"
        role="button"
        aria-controls="offcanvasExample"
      >
       <img src="/search_icon.svg" alt="Logo" width="50" height="40" className="d-inline-block align-text-top" />
      </a>
        {/* <button
              className="btn btn-primary "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#congregationList"
              aria-controls="offcanvasExample"
            >
              Button with data-bs-target
            </button> */}
            </div>
    )
}

export default SearchButton;