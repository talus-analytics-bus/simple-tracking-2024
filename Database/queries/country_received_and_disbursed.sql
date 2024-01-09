-- all countries, with their received and disbursed funding
SELECT 
	all_countries.name AS "Name",
	all_countries.iso3 AS "ISO3",
	response_received AS "Total Response Received",
	capacity_received AS "Total Capacity Received",
	total_received AS "Total Disbursed Received",
	total_response AS "Total Response Disbursed",
	total_capacity AS "Total Capacity Disbursed",
	total_disbursed AS "Total Disbursed"
FROM (
	-- All the stakeholders which are "countries"
	SELECT name, iso3 FROM stakeholders 
		WHERE subcat = 'country' 
		AND iso3 IS NOT null
		AND "show"
) all_countries
LEFT JOIN (
	-- flows received by those countries
	SELECT
		name,
		iso3,
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS "response_received",
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS "capacity_received",
		ROUND(SUM(CASE WHEN value IS NOT NULL THEN value ELSE 0 END)) AS "total_received"
	FROM
		stakeholders
		JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY name, iso3
) received
ON received.iso3 = all_countries.iso3
LEFT JOIN (
	-- flows sent by those countries
	SELECT
		name,
		iso3,
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS total_response,
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS total_capacity,
		ROUND(SUM(CASE WHEN value IS NOT NULL THEN value ELSE 0 END)) AS total_disbursed
	FROM
		stakeholders
		JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY name, iso3
) disbursed 
ON disbursed.iso3 = all_countries.iso3
ORDER BY "Name" ASC;
