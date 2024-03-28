-- all countries and organizations, with their received and disbursed funding
WITH top_level_stakeholders AS (
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
),
received AS (
	-- flows received by those countries
	SELECT
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS response,
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS capacity,
		ROUND(SUM(value)) AS total
	FROM
		top_level_stakeholders
		JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND year BETWEEN 2014 AND 3000
), 
disbursed AS (
	-- flows sent by those countries
	SELECT
		ROUND(SUM(CASE WHEN response_or_capacity = 'response' THEN value ELSE 0 END)) AS response,
		ROUND(SUM(CASE WHEN response_or_capacity = 'capacity' THEN value ELSE 0 END)) AS capacity,
		ROUND(SUM(value)) AS total
	FROM
		top_level_stakeholders
		JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND year BETWEEN 2014 AND 3000
)
SELECT 
	received.response AS "totalResponseReceived",
	received.capacity AS "totalCapacityReceived",
	received.total AS "totalDisbursedReceived",
	disbursed.response AS "totalResponseDisbursed",
	disbursed.capacity AS "totalCapacityDisbursed",
	disbursed.total AS "totalDisbursed"
FROM received
FULL JOIN disbursed on 1=1
