SELECT * FROM (
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
			s.name AS "Name",
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
			cc.name
	)
	SELECT
		"Name",
		MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total received" END) AS "Total received for P.1",
		MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total received" END) AS "Total received for P.2",
		MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total received" END) AS "Total received for P.3",
		MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total received" END) AS "Total received for P.4",
		MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total received" END) AS "Total received for P.5",
		MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total received" END) AS "Total received for P.6",
		MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total received" END) AS "Total received for P.7",
		MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total received" END) AS "Total received for D.1",
		MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total received" END) AS "Total received for D.2",
		MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total received" END) AS "Total received for D.3",
		MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total received" END) AS "Total received for D.4",
		MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total received" END) AS "Total received for R.1",
		MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total received" END) AS "Total received for R.2",
		MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total received" END) AS "Total received for R.3",
		MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total received" END) AS "Total received for R.4",
		MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total received" END) AS "Total received for R.5",
		MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total received" END) AS "Total received for RE",
		MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total received" END) AS "Total received for PoE",
		MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total received" END) AS "Total received for CE"
	FROM core_capacity_sums
	GROUP BY
		"Name"
	ORDER BY
		"Name"
) received_capacities
ON all_countries.name = received_capacities."Name"
LEFT JOIN (
	-- all the countries which disbursed core capacity funding
		WITH core_capacity_sums AS (
			SELECT
				s.name AS "Name",
				cc.name AS "Core Capacity",
				ROUND(SUM(sf.value)) AS "Total disbursed"
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
				cc.name
		)
		SELECT
			"Name",
			MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total disbursed" END) AS "Total disbursed for P.1",
			MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total disbursed" END) AS "Total disbursed for P.2",
			MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total disbursed" END) AS "Total disbursed for P.3",
			MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total disbursed" END) AS "Total disbursed for P.4",
			MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total disbursed" END) AS "Total disbursed for P.5",
			MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total disbursed" END) AS "Total disbursed for P.6",
			MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total disbursed" END) AS "Total disbursed for P.7",
			MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total disbursed" END) AS "Total disbursed for D.1",
			MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total disbursed" END) AS "Total disbursed for D.2",
			MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total disbursed" END) AS "Total disbursed for D.3",
			MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total disbursed" END) AS "Total disbursed for D.4",
			MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total disbursed" END) AS "Total disbursed for R.1",
			MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total disbursed" END) AS "Total disbursed for R.2",
			MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total disbursed" END) AS "Total disbursed for R.3",
			MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total disbursed" END) AS "Total disbursed for R.4",
			MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total disbursed" END) AS "Total disbursed for R.5",
			MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total disbursed" END) AS "Total disbursed for RE",
			MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total disbursed" END) AS "Total disbursed for PoE",
			MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total disbursed" END) AS "Total disbursed for CE"
		FROM core_capacity_sums
		GROUP BY
			"Name"
		ORDER BY
			"Name"
) disbursed_capacities
ON all_countries.name = disbursed_capacities."Name"
