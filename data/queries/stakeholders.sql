SELECT sta.name, sta.iso3, sta.iso2
	FROM stakeholders as sta
	JOIN children_to_parents_direct_credit AS ctpdc
		ON sta.id = ctpdc.parent_id
	WHERE (
		-- All the stakeholders which are "countries"
		sta.subcat = 'country'
		AND sta.iso3 IS NOT NULL
		AND ctpdc.child_id = ctpdc.parent_id
		AND sta.show
	) OR (
		-- All the stakeholders which are "organizations"
		sta.cat != 'government'
		AND sta.subcat != 'sub-organization'
		AND ctpdc.child_id = ctpdc.parent_id
		AND sta.iso3 IS NULL
		AND sta.show
	)

