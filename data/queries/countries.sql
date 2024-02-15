-- all the countries which should become pages
SELECT name, iso3, iso2 FROM stakeholders
	WHERE subcat = 'country' 
	AND iso3 IS NOT null
	AND "show"
