const Search = ({ search, setSearch }) => {
    return (
        <>
            find countries: <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </>
    )
}

export default Search