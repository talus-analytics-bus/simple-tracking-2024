SELECT 
	all_countries.name AS name,
	all_countries.iso3 AS iso3,
	CASE WHEN received_capacities.year = NULL 
		THEN disbursed_capacities.year
		ELSE received_capacities.year
	END AS year,
	p1_received,
	p2_received,
	p3_received,
	p4_received,
	p5_received,
	p6_received,
	p7_received,
	d1_received,
	d2_received,
	d3_received,
	d4_received,
	r1_received,
	r2_received,
	r3_received,
	r4_received,
	r5_received,
	re_received,
	poe_received,
	ce_received,
	p1_disbursed,
	p2_disbursed,
	p3_disbursed,
	p4_disbursed,
	p5_disbursed,
	p6_disbursed,
	p7_disbursed,
	d1_disbursed,
	d2_disbursed,
	d3_disbursed,
	d4_disbursed,
	r1_disbursed,
	r2_disbursed,
	r3_disbursed,
	r4_disbursed,
	r5_disbursed,
	re_disbursed,
	poe_disbursed,
	ce_disbursed
FROM (
	-- All the stakeholders which are "countries"
	SELECT name, iso3 FROM stakeholders 
		WHERE subcat = 'country' 
		AND iso3 IS NOT null
		AND "show"
) all_countries
LEFT JOIN (
	-- all the countries which received core capacity funding
	WITH core_capacity_sums AS (
		SELECT
			s.name AS name,
			sf.year AS year,
			cc.name AS "Core Capacity",
			ROUND(SUM(sf.value)) AS "Total received"
		FROM
			simple_flows sf
			JOIN flows_to_stakeholder_targets_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
			JOIN stakeholders s ON s.id = ftsodc.stakeholder_id
			JOIN ccs_to_flows ctf ON ctf.flow_id = sf.sf_id
			JOIN core_capacities cc ON cc.id = ctf.cc_id
		WHERE
			sf.flow_type = 'disbursed_funds'
			AND sf.year BETWEEN 2014 AND 2022
		GROUP BY
			s.name,
			cc.name,
			sf.year
	)
	SELECT
		name, 
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
		MAX(CASE WHEN "Core Capacity" = 'RE'  THEN "Total received" END) AS re_received,
		MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total received" END) AS poe_received,
		MAX(CASE WHEN "Core Capacity" = 'CE'  THEN "Total received" END) AS ce_received
	FROM core_capacity_sums
	GROUP BY
		name, year
	ORDER BY
		name ASC, year DESC
) received_capacities
ON all_countries.name = received_capacities.name
LEFT JOIN (
	-- all the countries which disbursed core capacity funding
	WITH core_capacity_sums AS (
		SELECT
			s.name AS name,
			sf.year AS year,
			cc.name AS "Core Capacity",
			ROUND(SUM(sf.value)) AS "Total disbursed"
		FROM
			simple_flows sf
			JOIN flows_to_stakeholder_origins_direct_credit ftsodc ON sf.sf_id = ftsodc.flow_id
			JOIN stakeholders s ON s.id = ftsodc.stakeholder_id
			JOIN ccs_to_flows ctf ON ctf.flow_id = sf.sf_id
			JOIN core_capacities cc ON cc.id = ctf.cc_id
		WHERE
			sf.flow_type = 'disbursed_funds'
			AND sf.year BETWEEN 2014 AND 2022
		GROUP BY
			s.name,
			cc.name,
			sf.year
	)
	SELECT
		name, 
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
	FROM core_capacity_sums
	GROUP BY
		name, year
	ORDER BY
		name ASC, year DESC
) disbursed_capacities
ON all_countries.name = disbursed_capacities.name
AND received_capacities.year = disbursed_capacities.year
