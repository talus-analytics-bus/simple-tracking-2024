SELECT 
	all_countries.name AS name,
	all_countries.iso3 AS iso3,
	CASE WHEN received_capacities.year = NULL 
		THEN disbursed_capacities.year
		ELSE received_capacities.year
	END AS years,
	p1Received AS "National legislation, policy and financing received",
	p2Received AS "IHR coordination, communication and advocacy received",
	p3Received AS "Antimicrobial resistance (AMR) received",
	p4Received AS "Zoonotic disease received",
	p5Received AS "Food safety received",
	p6Received AS "Biosafety and biosecurity received",
	p7Received AS "Immunization received",
	d1Received AS "National laboratory system received",
	d2Received AS "Real-time surveillance received",
	d3Received AS "Reporting received",
	d4Received AS "Workforce development received",
	r1Received AS "Preparedness received",
	r2Received AS "Emergency response operations received",
	r3Received AS "Linking public health and security authorities received",
	r4Received AS "Medical countermeasures and personnel deployment received",
	r5Received AS "Risk communication received",
	reReceived AS "Radiation events received",
	poeReceived AS "Points of entry received",
	ceReceived AS "Chemical events received",
	p1Disbursed AS "National legislation, policy and financing disbursed",
	p2Disbursed AS "IHR coordination, communication and advocacy disbursed",
	p3Disbursed AS "Antimicrobial resistance (AMR) disbursed",
	p4Disbursed AS "Zoonotic disease disbursed",
	p5Disbursed AS "Food safety disbursed",
	p6Disbursed AS "Biosafety and biosecurity disbursed",
	p7Disbursed AS "Immunization disbursed",
	d1Disbursed AS "National laboratory system disbursed",
	d2Disbursed AS "Real-time surveillance disbursed",
	d3Disbursed AS "Reporting disbursed",
	d4Disbursed AS "Workforce development disbursed",
	r1Disbursed AS "Preparedness disbursed",
	r2Disbursed AS "Emergency response operations disbursed",
	r3Disbursed AS "Linking public health and security authorities disbursed",
	r4Disbursed AS "Medical countermeasures and personnel deployment disbursed",
	r5Disbursed AS "Risk communication disbursed",
	reDisbursed AS "Radiation events disbursed",
	poeDisbursed AS "Points of entry disbursed",
	ceDisbursed AS "Chemical events disbursed"
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
		MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total received" END) AS p1Received,
		MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total received" END) AS p2Received,
		MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total received" END) AS p3Received,
		MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total received" END) AS p4Received,
		MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total received" END) AS p5Received,
		MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total received" END) AS p6Received,
		MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total received" END) AS p7Received,
		MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total received" END) AS d1Received,
		MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total received" END) AS d2Received,
		MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total received" END) AS d3Received,
		MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total received" END) AS d4Received,
		MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total received" END) AS r1Received,
		MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total received" END) AS r2Received,
		MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total received" END) AS r3Received,
		MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total received" END) AS r4Received,
		MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total received" END) AS r5Received,
		MAX(CASE WHEN "Core Capacity" = 'RE'  THEN "Total received" END) AS reReceived,
		MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total received" END) AS poeReceived,
		MAX(CASE WHEN "Core Capacity" = 'CE'  THEN "Total received" END) AS ceReceived
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
		MAX(CASE WHEN "Core Capacity" = 'P.1' THEN "Total disbursed" END) AS p1Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'P.2' THEN "Total disbursed" END) AS p2Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'P.3' THEN "Total disbursed" END) AS p3Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'P.4' THEN "Total disbursed" END) AS p4Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'P.5' THEN "Total disbursed" END) AS p5Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'P.6' THEN "Total disbursed" END) AS p6Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'P.7' THEN "Total disbursed" END) AS p7Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'D.1' THEN "Total disbursed" END) AS d1Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'D.2' THEN "Total disbursed" END) AS d2Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'D.3' THEN "Total disbursed" END) AS d3Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'D.4' THEN "Total disbursed" END) AS d4Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'R.1' THEN "Total disbursed" END) AS r1Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'R.2' THEN "Total disbursed" END) AS r2Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'R.3' THEN "Total disbursed" END) AS r3Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'R.4' THEN "Total disbursed" END) AS r4Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'R.5' THEN "Total disbursed" END) AS r5Disbursed,
		MAX(CASE WHEN "Core Capacity" = 'RE' THEN "Total disbursed" END) AS reDisbursed,
		MAX(CASE WHEN "Core Capacity" = 'PoE' THEN "Total disbursed" END) AS poeDisbursed,
		MAX(CASE WHEN "Core Capacity" = 'CE' THEN "Total disbursed" END) AS ceDisbursed
	FROM core_capacity_sums
	GROUP BY
		name, year
	ORDER BY
		name ASC, year DESC
) disbursed_capacities
ON all_countries.name = disbursed_capacities.name
AND received_capacities.year = disbursed_capacities.year
