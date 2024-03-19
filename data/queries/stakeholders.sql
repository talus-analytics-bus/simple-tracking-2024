-- all countries and organizations which should become pages on the site
SELECT
	CASE WHEN iso3 IS NULL
		THEN 'organization'
		ELSE 'country'
	END AS slug,
	name,
	LOWER(iso3) as iso3,
	LOWER(iso2) as iso2
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
	-- flows received by those stakeholders
	SELECT id, SUM(value) AS total
	FROM
		stakeholders
		JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY id
) received ON received.id = top_level_stakeholders.id
LEFT JOIN (
	-- flows sent by those stakeholders
	SELECT id, SUM(value) AS total
	FROM
		stakeholders
		JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
		JOIN simple_flows ON sf_id = flow_id
		WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 3000
		GROUP BY id
) disbursed ON disbursed.id = top_level_stakeholders.id
WHERE COALESCE(received.total, disbursed.total) IS NOT NULL
	AND iso3 IS NULL OR NOT iso3 IN ('GLOBAL', 'GLB')
ORDER BY slug, name ASC
