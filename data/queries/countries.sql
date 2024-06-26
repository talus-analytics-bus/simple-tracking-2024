-- all countries
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
		AND iso3 IS NOT NULL
		AND iso3 NOT IN ('GLOBAL', 'GLB', 'GUF')
),
received AS (
    -- flows received by those stakeholders
    SELECT id, name, iso3, iso2, SUM(value) AS total
    FROM
        top_level_stakeholders
        JOIN flows_to_stakeholder_targets_direct_credit ON stakeholder_id = id
        JOIN simple_flows ON sf_id = flow_id
        WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 2022
        GROUP BY id, name, iso3, iso2
), 
disbursed AS(
    -- flows sent by those stakeholders
    SELECT id, name, iso3, iso2, SUM(value) AS total
    FROM
        top_level_stakeholders
        JOIN flows_to_stakeholder_origins_direct_credit ON stakeholder_id = id
        JOIN simple_flows ON sf_id = flow_id
        WHERE flow_type = 'disbursed_funds' AND "year" BETWEEN 2014 AND 2022
        GROUP BY id, name, iso3, iso2
)
SELECT
    COALESCE(received.name, disbursed.name) as name,
    COALESCE(received.iso3, disbursed.iso3) as iso3,
    COALESCE(received.iso2, disbursed.iso2) as iso2
FROM received
FULL JOIN disbursed ON disbursed.id = received.id
ORDER BY name ASC
