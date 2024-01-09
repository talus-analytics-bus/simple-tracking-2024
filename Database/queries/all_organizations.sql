-- all the organizations which should become pages
SELECT name FROM stakeholders 
	JOIN children_to_parents_direct_credit 
	ON stakeholders.id = children_to_parents_direct_credit.parent_id
	WHERE stakeholders.cat != 'government'
	AND stakeholders.iso3 IS NULL
	AND child_id = parent_id
