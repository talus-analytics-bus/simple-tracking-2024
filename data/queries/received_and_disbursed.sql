-- all countries and organizations, with their received and disbursed funding
SELECT 
	name,
	COALESCE(received.year, disbursed.year) AS year,
	received.response AS "totalResponseReceived",
	received.capacity AS "totalCapacityReceived",
	received.total AS "totalDisbursedReceived",
	disbursed.response AS "totalResponseDisbursed",
	disbursed.capacity AS "totalCapacityDisbursed",
	disbursed.total AS "totalDisbursed"
FROM (
	SELECT id, name, iso3, iso2
	FROM stakeholders
	INNER JOIN LATERAL (
		SELECT COUNT(id) > 1 as is_sub_stakeholder
		FROM stakeholders sta
		JOIN children_to_parents_direct_credit ctpdc
			ON sta.id = ctpdc.parent_id
		WHERE ctpdc.child_id = stakeholders.id
	) AS sub_stakeholders on True
	WHERE
		stakeholders.show
		AND NOT sub_stakeholders.is_sub_stakeholder
		AND stakeholders.slug != 'not-reported'
		AND stakeholders.subcat NOT IN (
			'sub-organization',
			'region',
			'agency'
		)
) top_level_stakeholders
LEFT JOIN (
	-- flows received by those countries
	SELECT
		id,
		year,
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS response,
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS capacity,
		ROUND(SUM(value)) AS total
	FROM
		stakeholders
		JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY id, year
) received
ON received.id = top_level_stakeholders.id
LEFT JOIN (
	-- flows sent by those countries
	SELECT
		id,
		year,
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS response,
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS capacity,
		ROUND(SUM(value)) AS total
	FROM
		stakeholders
		JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY id, year
) disbursed 
ON disbursed.id = top_level_stakeholders.id AND disbursed.year = received.year
WHERE COALESCE(
	received.response,
	received.capacity,
	received.total,
	disbursed.response, 
	disbursed.capacity, 
	disbursed.total
) IS NOT NULL
ORDER BY name ASC, year DESC;
