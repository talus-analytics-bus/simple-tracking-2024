WITH all_countries AS (
    -- All the stakeholders which are "countries"
    SELECT id FROM stakeholders 
    WHERE subcat = 'country' 
    AND iso3 IS NOT NULL
    AND "show"
), 
all_orgs AS (
    -- All the organizations which should become pages
    SELECT id FROM stakeholders 
    JOIN children_to_parents_direct_credit ON stakeholders.id = children_to_parents_direct_credit.parent_id
    WHERE stakeholders.cat != 'government' 
    AND stakeholders.subcat != 'sub-organization'
    AND stakeholders.iso3 IS NULL
    AND child_id = parent_id
),
pheic_sums_received AS (
    -- all the countries which received response funding
    SELECT
        s.name AS name,
        e.name AS pheic,
		sf.year AS year,
        ROUND(SUM(sf.value)) AS received
    FROM
        simple_flows sf
        JOIN flows_to_stakeholder_targets_direct_credit ftstdc ON sf.sf_id = ftstdc.flow_id
        JOIN stakeholders s ON s.id = ftstdc.stakeholder_id
        JOIN events_to_flows etf ON etf.flow_id = sf.sf_id
        JOIN events e ON e.id = etf.event_id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf.response_or_capacity = 'response'
        AND (s.id IN (SELECT * FROM all_countries) OR s.id IN (SELECT * FROM all_orgs))
    GROUP BY
        s.name,
		sf.year,
        e.name
),
pheic_sums_disbursed AS (
    -- all the countries which disbursed response funding
    SELECT
        s.name AS name,
        e.name AS pheic,
		sf.year AS year,
        ROUND(SUM(sf.value)) AS disbursed
    FROM
        simple_flows sf
        JOIN flows_to_stakeholder_origins_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
        JOIN stakeholders s ON s.id = ftsodc.stakeholder_id
        JOIN events_to_flows etf ON etf.flow_id = sf.sf_id
        JOIN events e ON e.id = etf.event_id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf.response_or_capacity = 'response'
        AND (s.id IN (SELECT * FROM all_countries) OR s.id IN (SELECT * FROM all_orgs))
    GROUP BY
        s.name,
		sf.year,
        e.name
)
SELECT
    COALESCE(pr.name, pd.name) AS name,
	COALESCE(pr.year, pd.year) AS year,
    COALESCE(pr.pheic, pd.pheic) AS pheic,
    pr.received,
    pd.disbursed
FROM
    pheic_sums_received pr
FULL JOIN
    pheic_sums_disbursed pd
ON
    pr.name = pd.name AND pr.pheic = pd.pheic
order by pr.name, year DESC, pheic, received, disbursed;
