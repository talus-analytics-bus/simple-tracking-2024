-- all countries with their received and disbursed funding
WITH countries AS (
	SELECT id, iso3, iso2
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
		AND stakeholders.iso3 IS NOT NULL
),
received AS (
	-- flows received by those countries
	SELECT iso3, iso2, ROUND(SUM(value)) AS total
	FROM
		countries
		JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND year BETWEEN 2014 AND 2022
		GROUP BY iso3, iso2
), 
disbursed AS (
	-- flows sent by those countries
	SELECT
		iso3, iso2, ROUND(SUM(value)) AS total
	FROM
		countries
		JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND year BETWEEN 2014 AND 2022
		GROUP BY iso3, iso2
)
SELECT 
	COALESCE(received.iso3, disbursed.iso3) AS iso3,
	COALESCE(received.iso2, disbursed.iso2) AS iso2,
	received.total AS "totalDisbursedReceived",
	disbursed.total AS "totalDisbursed"
FROM received
FULL JOIN disbursed ON received.iso3 = disbursed.iso3 
WHERE
	COALESCE(received.iso3, disbursed.iso3) IS NULL
	OR NOT COALESCE(received.iso3, disbursed.iso3) IN ('GLOBAL', 'GLB', 'GUF')
ORDER BY iso3 ASC
