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
		MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total received" END) AS "National legislation, policy and financing",
		MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total received" END) AS "IHR coordination, communication and advocacy",
		MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total received" END) AS "Antimicrobial resistance (AMR)",
		MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total received" END) AS "Zoonotic disease",
		MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total received" END) AS "Food safety",
		MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total received" END) AS "Biosafety and biosecurity",
		MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total received" END) AS "Immunization",
		MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total received" END) AS "National laboratory system",
		MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total received" END) AS "Real-time surveillance",
		MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total received" END) AS "Reporting",
		MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total received" END) AS "Workforce development",
		MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total received" END) AS "Preparedness",
		MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total received" END) AS "Emergency response operations",
		MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total received" END) AS "Linking public health and security authorities",
		MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total received" END) AS "Medical countermeasures and personnel deployment",
		MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total received" END) AS "Risk communication",
		MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total received" END) AS "Radiation events",
		MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total received" END) AS "Points of entry",
		MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total received" END) AS "Chemical events"
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
		MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total disbursed" END) AS "National legislation, policy and financing",
		MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total disbursed" END) AS "IHR coordination, communication and advocacy",
		MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total disbursed" END) AS "Antimicrobial resistance (AMR)",
		MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total disbursed" END) AS "Zoonotic disease",
		MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total disbursed" END) AS "Food safety",
		MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total disbursed" END) AS "Biosafety and biosecurity",
		MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total disbursed" END) AS "Immunization",
		MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total disbursed" END) AS "National laboratory system",
		MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total disbursed" END) AS "Real-time surveillance",
		MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total disbursed" END) AS "Reporting",
		MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total disbursed" END) AS "Workforce development",
		MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total disbursed" END) AS "Preparedness",
		MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total disbursed" END) AS "Emergency response operations",
		MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total disbursed" END) AS "Linking public health and security authorities",
		MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total disbursed" END) AS "Medical countermeasures and personnel deployment",
		MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total disbursed" END) AS "Risk communication",
		MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total disbursed" END) AS "Radiation events",
		MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total disbursed" END) AS "Points of entry",
		MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total disbursed" END) AS "Chemical events"
	FROM core_capacity_sums
	GROUP BY
		"Name"
	ORDER BY
		"Name"
) disbursed_capacities
ON all_countries.name = disbursed_capacities."Name"
