WITH top_level_stakeholders AS (
    SELECT id, name
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
received AS (
    -- all the countries which received response funding
    SELECT
        e.name AS pheic,
        ROUND(SUM(sf.value)) AS total
    FROM
        simple_flows sf
        JOIN flows_to_stakeholder_targets_direct_credit ftstdc ON sf.sf_id = ftstdc.flow_id
        JOIN top_level_stakeholders s ON s.id = ftstdc.stakeholder_id
        JOIN events_to_flows etf ON etf.flow_id = sf.sf_id
        JOIN events e ON e.id = etf.event_id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf.response_or_capacity = 'response'
    GROUP BY pheic
),
disbursed AS (
    -- all the countries which disbursed response funding
    SELECT
        e.name AS pheic,
        ROUND(SUM(sf.value)) AS total
    FROM
        simple_flows sf
        JOIN flows_to_stakeholder_origins_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
        JOIN top_level_stakeholders s ON s.id = ftsodc.stakeholder_id
        JOIN events_to_flows etf ON etf.flow_id = sf.sf_id
        JOIN events e ON e.id = etf.event_id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf.response_or_capacity = 'response'
    GROUP BY pheic
)
SELECT
    COALESCE(received.pheic, disbursed.pheic) AS pheic,
    received.total AS received,
    disbursed.total AS disbursed
FROM received
FULL JOIN disbursed 
    ON received.pheic = disbursed.pheic 
ORDER BY pheic
