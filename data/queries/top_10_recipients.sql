WITH recipients_to_funders AS (
    WITH all_countries AS (
		-- All the stakeholders which are "countries"
		SELECT id FROM stakeholders
			WHERE subcat = 'country'
			AND iso3 IS NOT null
			AND "show"
    ), all_orgs AS (
	    -- All the organizations which should become pages
	    SELECT id FROM stakeholders
		    JOIN children_to_parents_direct_credit
		    ON stakeholders.id = children_to_parents_direct_credit.parent_id
		    WHERE stakeholders.cat != 'government' and stakeholders.subcat != 'sub-organization'
		    AND stakeholders.iso3 IS NULL
		    AND child_id = parent_id
    )
    -- All transaction pairs for selected stakeholders
    SELECT
		s1.name AS recipient,
		s2.name AS funder,
		sf.year AS year,
		ROUND(SUM(sf.value)) AS total
	FROM flows_to_stakeholder_targets_direct_credit ftstdc
    JOIN simple_flows sf ON ftstdc.flow_id = sf.sf_id
    JOIN stakeholders s1 ON ftstdc.stakeholder_id = s1.id
    JOIN flows_to_stakeholder_origins_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
    JOIN stakeholders s2 ON ftsodc.stakeholder_id = s2.id
    WHERE
		sf.flow_type = 'disbursed_funds'
		AND sf."year" BETWEEN 2014 AND 3000
		AND (
				s1.id in (select * from all_countries) 
				or s1.id in (select * from all_orgs)
			)
		AND (
				s2.id in (select * from all_countries) 
				or s2.id in (select * from all_orgs)
			)
    GROUP BY
	s1.name, s2.name, sf.year
    ORDER BY
	recipient DESC, funder DESC
),
ranked_funders AS (
    SELECT
        recipient,
		year,
        funder,
        total,
        ROW_NUMBER()
			OVER (
				PARTITION BY funder, year
				ORDER BY total DESC
			) AS rank
    FROM
        recipients_to_funders
)
SELECT
    funder,
    year,
    recipient,
    total
FROM
    ranked_funders
WHERE
    rank <= 10;
