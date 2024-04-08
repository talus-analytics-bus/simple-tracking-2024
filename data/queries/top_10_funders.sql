WITH top_level_stakeholders AS (
    SELECT id
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
        AND (
            iso3 IS NULL
            OR NOT iso3 IN ('GLOBAL', 'GLB', 'GUF')
        )
),
recipients_to_funders AS (
    -- All transaction pairs for selected stakeholders
    SELECT
        s1.name AS funder,
        s1.iso3 AS iso3,
        s2.name AS recipient,
        sf.year AS year,
        ROUND(SUM(sf.value)) AS total
    FROM flows_to_stakeholder_origins_direct_credit ftsodc
    JOIN simple_flows sf ON ftsodc.flow_id = sf.sf_id
    JOIN stakeholders s1 ON ftsodc.stakeholder_id = s1.id
    JOIN flows_to_stakeholder_targets_direct_credit ftstdc ON sf.sf_id = ftstdc.flow_id
    JOIN stakeholders s2 ON ftstdc.stakeholder_id = s2.id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf."year" BETWEEN 2014 AND 2022
        AND s1.id in (select * from top_level_stakeholders)
        AND s2.id in (select * from top_level_stakeholders)
    GROUP BY s1.name, s1.iso3, s2.name, sf.year
    ORDER BY funder DESC, recipient DESC
),
ranked_recipients AS (
    SELECT
        funder,
        iso3,
        year,
        recipient,
        total,
        ROW_NUMBER()
            OVER (
                PARTITION BY recipient, year
                ORDER BY total DESC
            ) AS rank
    FROM
        recipients_to_funders
)
SELECT
    recipient,
    year,
    CASE
        WHEN iso3 IS NULL THEN 'organization'
        ELSE 'country'
    END AS slug,
    funder,
    total
FROM
    ranked_recipients
WHERE
    rank <= 10;
