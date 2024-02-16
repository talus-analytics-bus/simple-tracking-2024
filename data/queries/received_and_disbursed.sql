-- all countries and organizations, with their received and disbursed funding
SELECT 
	all_stakeholders.name AS "name",
	all_stakeholders.iso3 AS "iso3",
	CASE WHEN received.year = NULL THEN disbursed.year ELSE received.year END AS "Year",
	response_received AS "Total Response Received",
	capacity_received AS "Total Capacity Received",
	total_received AS "Total Disbursed Received",
	total_response AS "Total Response Disbursed",
	total_capacity AS "Total Capacity Disbursed",
	total_disbursed AS "Total Disbursed"
FROM (
	SELECT name, iso3, child_id, parent_id FROM stakeholders 
		JOIN children_to_parents_direct_credit 
		ON stakeholders.id = children_to_parents_direct_credit.parent_id
		WHERE (
			-- All the stakeholders which are "countries"
			subcat = 'country' 
			AND iso3 IS NOT NULL
			AND child_id = parent_id
			AND stakeholders.show
		) OR (
			-- All the stakeholders which are "organizations"
			stakeholders.cat != 'government'
			AND stakeholders.subcat != 'sub-organization'
			AND stakeholders.iso3 IS NULL
			AND child_id = parent_id
			and stakeholders.show
		)
) all_stakeholders
LEFT JOIN (
	-- flows received by those countries
	SELECT
		name,
		iso3,
		year,
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS "response_received",
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS "capacity_received",
		ROUND(SUM(CASE WHEN value IS NOT NULL THEN value ELSE 0 END)) AS "total_received"
	FROM
		stakeholders
		JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY id, year
) received
ON received.name = all_stakeholders.name
LEFT JOIN (
	-- flows sent by those countries
	SELECT
		name,
		iso3,
		year,
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS total_response,
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS total_capacity,
		ROUND(SUM(CASE WHEN value IS NOT NULL THEN value ELSE 0 END)) AS total_disbursed
	FROM
		stakeholders
		JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY id, year
) disbursed 
ON disbursed.name = all_stakeholders.name AND disbursed.year = received.year
ORDER BY name ASC, "Year" DESC;
