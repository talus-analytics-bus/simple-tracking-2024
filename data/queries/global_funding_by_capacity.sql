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
        AND (
            iso3 IS NULL
            OR NOT iso3 IN ('GLOBAL', 'GLB', 'GUF')
        )
),
received AS (
    -- Flows received by those stakeholders
    SELECT
        s.id as id,
        s.name AS name,
        s.iso3 as iso3,
        sf.year AS year,
        cc.name AS "Core Capacity",
        ROUND(SUM(sf.value)) AS "Total received"
    FROM
        simple_flows sf
        JOIN flows_to_stakeholder_targets_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
        JOIN top_level_stakeholders s ON s.id = ftsodc.stakeholder_id
        JOIN ccs_to_flows ctf ON ctf.flow_id = sf.sf_id
        JOIN core_capacities cc ON cc.id = ctf.cc_id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf.year BETWEEN 2014 AND 2022
    GROUP BY
        s.id,
        s.name,
        s.iso3,
        cc.name,
        sf.year
), 
disbursed AS(
    -- Flows sent by those stakeholders
    SELECT
        s.id as id,
        s.name AS name,
        s.iso3 as iso3,
        sf.year AS year,
        cc.name AS "Core Capacity",
        ROUND(SUM(sf.value)) AS "Total disbursed"
    FROM
        simple_flows sf
        JOIN flows_to_stakeholder_origins_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
        JOIN top_level_stakeholders s ON s.id = ftsodc.stakeholder_id
        JOIN ccs_to_flows ctf ON ctf.flow_id = sf.sf_id
        JOIN core_capacities cc ON cc.id = ctf.cc_id
    WHERE
        sf.flow_type = 'disbursed_funds'
        AND sf.year BETWEEN 2014 AND 2022
    GROUP BY
        s.id,
        s.name,
        s.iso3,
        cc.name,
        sf.year
),
received_capacities AS (
    -- Pivot table for received capacities
    SELECT
        id,
        name,
        iso3,
        year,
        MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total received" END) AS p1_received,
        MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total received" END) AS p2_received,
        MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total received" END) AS p3_received,
        MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total received" END) AS p4_received,
        MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total received" END) AS p5_received,
        MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total received" END) AS p6_received,
        MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total received" END) AS p7_received,
        MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total received" END) AS d1_received,
        MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total received" END) AS d2_received,
        MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total received" END) AS d3_received,
        MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total received" END) AS d4_received,
        MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total received" END) AS r1_received,
        MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total received" END) AS r2_received,
        MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total received" END) AS r3_received,
        MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total received" END) AS r4_received,
        MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total received" END) AS r5_received,
        MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total received" END) AS re_received,
        MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total received" END) AS poe_received,
        MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total received" END) AS ce_received
    FROM received
    GROUP BY
        id,name,iso3, year
),
disbursed_capacities AS (
    -- Pivot table for disbursed capacities
    SELECT
        id,
        name,
        iso3,
        year,
        MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total disbursed" END) AS p1_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total disbursed" END) AS p2_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total disbursed" END) AS p3_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total disbursed" END) AS p4_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total disbursed" END) AS p5_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total disbursed" END) AS p6_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total disbursed" END) AS p7_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total disbursed" END) AS d1_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total disbursed" END) AS d2_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total disbursed" END) AS d3_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total disbursed" END) AS d4_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total disbursed" END) AS r1_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total disbursed" END) AS r2_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total disbursed" END) AS r3_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total disbursed" END) AS r4_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total disbursed" END) AS r5_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total disbursed" END) AS re_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total disbursed" END) AS poe_disbursed,
        MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total disbursed" END) AS ce_disbursed
    FROM disbursed
    GROUP BY
        id, name, iso3,year
)
SELECT
    COALESCE(received_capacities.year, disbursed_capacities.year) as year,
    SUM(p1_received) AS p1_received,
    SUM(p2_received) AS p2_received,
    SUM(p3_received) AS p3_received,
    SUM(p4_received) AS p4_received,
    SUM(p5_received) AS p5_received,
    SUM(p6_received) AS p6_received,
    SUM(p7_received) AS p7_received,
    SUM(d1_received) AS d1_received,
    SUM(d2_received) AS d2_received,
    SUM(d3_received) AS d3_received,
    SUM(d4_received) AS d4_received,
    SUM(r1_received) AS r1_received,
    SUM(r2_received) AS r2_received,
    SUM(r3_received) AS r3_received,
    SUM(r4_received) AS r4_received,
    SUM(r5_received) AS r5_received,
    SUM(re_received) AS re_received,
    SUM(poe_received) AS poe_received,
    SUM(ce_received) AS ce_received,
    SUM(p1_disbursed) AS p1_disbursed,
    SUM(p2_disbursed) AS p2_disbursed,
    SUM(p3_disbursed) AS p3_disbursed,
    SUM(p4_disbursed) AS p4_disbursed,
    SUM(p5_disbursed) AS p5_disbursed,
    SUM(p6_disbursed) AS p6_disbursed,
    SUM(p7_disbursed) AS p7_disbursed,
    SUM(d1_disbursed) AS d1_disbursed,
    SUM(d2_disbursed) AS d2_disbursed,
    SUM(d3_disbursed) AS d3_disbursed,
    SUM(d4_disbursed) AS d4_disbursed,
    SUM(r1_disbursed) AS r1_disbursed,
    SUM(r2_disbursed) AS r2_disbursed,
    SUM(r3_disbursed) AS r3_disbursed,
    SUM(r4_disbursed) AS r4_disbursed,
    SUM(r5_disbursed) AS r5_disbursed,
    SUM(re_disbursed) AS re_disbursed,
    SUM(poe_disbursed) AS poe_disbursed,
    SUM(ce_disbursed) AS ce_disbursed
FROM received_capacities
FULL JOIN disbursed_capacities ON received_capacities.name = disbursed_capacities.name and received_capacities.year = disbursed_capacities.year
group by COALESCE(received_capacities.year, disbursed_capacities.year)
ORDER BY year ASC;

