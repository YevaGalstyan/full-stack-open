const CountryList = ({ countries, onShow }) => {
    if(countries === null) {
        return null;
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1 && countries.length <= 10) {
        return (
            <>
                {
                    countries.map(country => (
                        <div key={country.name.common}>{country.name.common}
                            <button onClick={() => onShow(country)}>show</button>
                        </div>
                    ))
                }
            </>
        )
    }

    if(countries.length === 0) {    
        return <p>No matches found</p>
    }
};

export default CountryList;