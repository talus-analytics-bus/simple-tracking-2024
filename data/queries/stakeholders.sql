SELECT
	stakeholders.name,
	stakeholders.iso3,
	stakeholders.iso2
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
ORDER BY stakeholders.name

