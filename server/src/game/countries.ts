export type Difficulty = "easy" | "medium" | "hard"

export interface Country {
	code: string
	name: string
	aliases?: string[]
	difficulty: Difficulty
}

export const countries: Country[] = [
	{ code: "AF", name: "Afghanistan", difficulty: "medium" },
	{ code: "ZA", name: "Afrique du Sud", aliases: ["Afrique Sud"], difficulty: "easy" },
	{ code: "AL", name: "Albanie", difficulty: "medium" },
	{ code: "DZ", name: "Algérie", difficulty: "medium" },
	{ code: "DE", name: "Allemagne", difficulty: "easy" },
	{ code: "AD", name: "Andorre", difficulty: "hard" },
	{ code: "AO", name: "Angola", difficulty: "medium" },
	{ code: "AG", name: "Antigua-et-Barbuda", aliases: ["Antigua"], difficulty: "hard" },
	{ code: "SA", name: "Arabie Saoudite", aliases: ["Arabie"], difficulty: "easy" },
	{ code: "AR", name: "Argentine", difficulty: "easy" },
	{ code: "AM", name: "Arménie", difficulty: "medium" },
	{ code: "AU", name: "Australie", difficulty: "easy" },
	{ code: "AT", name: "Autriche", difficulty: "easy" },
	{ code: "AZ", name: "Azerbaïdjan", difficulty: "medium" },
	{ code: "BS", name: "Bahamas", difficulty: "medium" },
	{ code: "BH", name: "Bahreïn", difficulty: "hard" },
	{ code: "BD", name: "Bangladesh", difficulty: "medium" },
	{ code: "BB", name: "Barbade", difficulty: "hard" },
	{ code: "BE", name: "Belgique", difficulty: "easy" },
	{ code: "BZ", name: "Belize", difficulty: "hard" },
	{ code: "BJ", name: "Bénin", difficulty: "hard" },
	{ code: "BT", name: "Bhoutan", difficulty: "hard" },
	{ code: "BY", name: "Biélorussie", difficulty: "medium" },
	{ code: "MM", name: "Birmanie", difficulty: "medium" },
	{ code: "BO", name: "Bolivie", difficulty: "medium" },
	{ code: "BA", name: "Bosnie-Herzégovine", aliases: ["Bosnie"], difficulty: "medium" },
	{ code: "BW", name: "Botswana", difficulty: "hard" },
	{ code: "BR", name: "Brésil", difficulty: "easy" },
	{ code: "BN", name: "Brunei", difficulty: "hard" },
	{ code: "BG", name: "Bulgarie", difficulty: "medium" },
	{ code: "BF", name: "Burkina Faso", difficulty: "hard" },
	{ code: "BI", name: "Burundi", difficulty: "hard" },
	{ code: "KH", name: "Cambodge", difficulty: "medium" },
	{ code: "CM", name: "Cameroun", difficulty: "medium" },
	{ code: "CA", name: "Canada", difficulty: "easy" },
	{ code: "CV", name: "Cap-Vert", aliases: ["Cap Vert"], difficulty: "hard" },
	{ code: "CL", name: "Chili", difficulty: "easy" },
	{ code: "CN", name: "Chine", difficulty: "easy" },
	{ code: "CY", name: "Chypre", difficulty: "medium" },
	{ code: "CO", name: "Colombie", difficulty: "medium" },
	{ code: "KM", name: "Comores", difficulty: "hard" },
	{ code: "CG", name: "Congo", difficulty: "medium" },
	{ code: "KP", name: "Corée du Nord", aliases: ["Coree du Nord"], difficulty: "easy" },
	{ code: "KR", name: "Corée du Sud", aliases: ["Coree du Sud"], difficulty: "easy" },
	{ code: "CR", name: "Costa Rica", difficulty: "medium" },
	{
		code: "CI",
		name: "Côte d'Ivoire",
		aliases: ["Cote d'Ivoire", "Cote Ivoire"],
		difficulty: "medium",
	},
	{ code: "HR", name: "Croatie", difficulty: "easy" },
	{ code: "CU", name: "Cuba", difficulty: "easy" },
	{ code: "DK", name: "Danemark", difficulty: "easy" },
	{ code: "DJ", name: "Djibouti", difficulty: "hard" },
	{ code: "DM", name: "Dominique", difficulty: "hard" },
	{ code: "EG", name: "Égypte", difficulty: "easy" },
	{
		code: "AE",
		name: "Émirats Arabes Unis",
		aliases: ["UAE", "EAU", "Emirats"],
		difficulty: "medium",
	},
	{ code: "EC", name: "Équateur", difficulty: "medium" },
	{ code: "ER", name: "Érythrée", difficulty: "hard" },
	{ code: "ES", name: "Espagne", difficulty: "easy" },
	{ code: "EE", name: "Estonie", difficulty: "medium" },
	{ code: "SZ", name: "Eswatini", difficulty: "hard" },
	{
		code: "US",
		name: "États-Unis",
		aliases: ["USA", "US", "Etats Unis", "Amerique"],
		difficulty: "easy",
	},
	{ code: "ET", name: "Éthiopie", difficulty: "medium" },
	{ code: "FJ", name: "Fidji", difficulty: "hard" },
	{ code: "FI", name: "Finlande", difficulty: "easy" },
	{ code: "FR", name: "France", difficulty: "easy" },
	{ code: "GA", name: "Gabon", difficulty: "hard" },
	{ code: "GM", name: "Gambie", difficulty: "hard" },
	{ code: "GE", name: "Géorgie", difficulty: "medium" },
	{ code: "GH", name: "Ghana", difficulty: "medium" },
	{ code: "GR", name: "Grèce", difficulty: "easy" },
	{ code: "GD", name: "Grenade", difficulty: "hard" },
	{ code: "GT", name: "Guatemala", difficulty: "medium" },
	{ code: "GN", name: "Guinée", difficulty: "hard" },
	{ code: "GW", name: "Guinée-Bissau", aliases: ["Guinee Bissau"], difficulty: "hard" },
	{ code: "GQ", name: "Guinée Équatoriale", aliases: ["Guinee Equatoriale"], difficulty: "hard" },
	{ code: "GY", name: "Guyana", difficulty: "hard" },
	{ code: "HT", name: "Haïti", difficulty: "medium" },
	{ code: "HN", name: "Honduras", difficulty: "medium" },
	{ code: "HU", name: "Hongrie", difficulty: "easy" },
	{ code: "MH", name: "Îles Marshall", difficulty: "hard" },
	{ code: "SB", name: "Îles Salomon", difficulty: "hard" },
	{ code: "IN", name: "Inde", difficulty: "easy" },
	{ code: "ID", name: "Indonésie", difficulty: "easy" },
	{ code: "IQ", name: "Irak", difficulty: "easy" },
	{ code: "IR", name: "Iran", difficulty: "easy" },
	{ code: "IE", name: "Irlande", difficulty: "easy" },
	{ code: "IS", name: "Islande", difficulty: "easy" },
	{ code: "IL", name: "Israël", difficulty: "easy" },
	{ code: "IT", name: "Italie", difficulty: "easy" },
	{ code: "JM", name: "Jamaïque", difficulty: "medium" },
	{ code: "JP", name: "Japon", difficulty: "easy" },
	{ code: "JO", name: "Jordanie", difficulty: "medium" },
	{ code: "KZ", name: "Kazakhstan", difficulty: "medium" },
	{ code: "KE", name: "Kenya", difficulty: "medium" },
	{ code: "KG", name: "Kirghizistan", difficulty: "hard" },
	{ code: "KI", name: "Kiribati", difficulty: "hard" },
	{ code: "XK", name: "Kosovo", difficulty: "medium" },
	{ code: "KW", name: "Koweït", difficulty: "medium" },
	{ code: "LA", name: "Laos", difficulty: "hard" },
	{ code: "LS", name: "Lesotho", difficulty: "hard" },
	{ code: "LV", name: "Lettonie", difficulty: "medium" },
	{ code: "LB", name: "Liban", difficulty: "medium" },
	{ code: "LR", name: "Liberia", difficulty: "hard" },
	{ code: "LY", name: "Libye", difficulty: "medium" },
	{ code: "LI", name: "Liechtenstein", difficulty: "hard" },
	{ code: "LT", name: "Lituanie", difficulty: "medium" },
	{ code: "LU", name: "Luxembourg", difficulty: "medium" },
	{ code: "MK", name: "Macédoine du Nord", aliases: ["Macedoine"], difficulty: "medium" },
	{ code: "MG", name: "Madagascar", difficulty: "medium" },
	{ code: "MY", name: "Malaisie", difficulty: "medium" },
	{ code: "MW", name: "Malawi", difficulty: "hard" },
	{ code: "MV", name: "Maldives", difficulty: "hard" },
	{ code: "ML", name: "Mali", difficulty: "medium" },
	{ code: "MT", name: "Malte", difficulty: "hard" },
	{ code: "MA", name: "Maroc", difficulty: "easy" },
	{ code: "MU", name: "Maurice", difficulty: "hard" },
	{ code: "MR", name: "Mauritanie", difficulty: "hard" },
	{ code: "MX", name: "Mexique", difficulty: "easy" },
	{ code: "FM", name: "Micronésie", difficulty: "hard" },
	{ code: "MD", name: "Moldavie", difficulty: "medium" },
	{ code: "MC", name: "Monaco", difficulty: "medium" },
	{ code: "MN", name: "Mongolie", difficulty: "medium" },
	{ code: "ME", name: "Monténégro", difficulty: "medium" },
	{ code: "MZ", name: "Mozambique", difficulty: "medium" },
	{ code: "NA", name: "Namibie", difficulty: "hard" },
	{ code: "NR", name: "Nauru", difficulty: "hard" },
	{ code: "NP", name: "Népal", difficulty: "medium" },
	{ code: "NI", name: "Nicaragua", difficulty: "medium" },
	{ code: "NE", name: "Niger", difficulty: "hard" },
	{ code: "NG", name: "Nigeria", difficulty: "easy" },
	{ code: "NO", name: "Norvège", difficulty: "easy" },
	{ code: "NZ", name: "Nouvelle-Zélande", aliases: ["Nouvelle Zelande"], difficulty: "easy" },
	{ code: "OM", name: "Oman", difficulty: "medium" },
	{ code: "UG", name: "Ouganda", difficulty: "medium" },
	{ code: "UZ", name: "Ouzbékistan", difficulty: "medium" },
	{ code: "PK", name: "Pakistan", difficulty: "easy" },
	{ code: "PW", name: "Palaos", difficulty: "hard" },
	{ code: "PS", name: "Palestine", difficulty: "medium" },
	{ code: "PA", name: "Panama", difficulty: "medium" },
	{ code: "PG", name: "Papouasie-Nouvelle-Guinée", aliases: ["Papouasie"], difficulty: "hard" },
	{ code: "PY", name: "Paraguay", difficulty: "medium" },
	{ code: "NL", name: "Pays-Bas", difficulty: "easy" },
	{ code: "PE", name: "Pérou", difficulty: "medium" },
	{ code: "PH", name: "Philippines", difficulty: "easy" },
	{ code: "PL", name: "Pologne", difficulty: "easy" },
	{ code: "PT", name: "Portugal", difficulty: "easy" },
	{ code: "QA", name: "Qatar", difficulty: "medium" },
	{
		code: "CF",
		name: "République Centrafricaine",
		aliases: ["RCA", "Centrafrique"],
		difficulty: "hard",
	},
	{
		code: "CD",
		name: "République Démocratique du Congo",
		aliases: ["RDC", "Congo-Kinshasa"],
		difficulty: "medium",
	},
	{ code: "DO", name: "République Dominicaine", aliases: ["Dominicaine"], difficulty: "medium" },
	{
		code: "CZ",
		name: "République Tchèque",
		aliases: ["Tcheque", "Tchequie"],
		difficulty: "easy",
	},
	{ code: "RO", name: "Roumanie", difficulty: "medium" },
	{
		code: "GB",
		name: "Royaume-Uni",
		aliases: ["UK", "Angleterre", "Grande-Bretagne"],
		difficulty: "easy",
	},
	{ code: "RU", name: "Russie", difficulty: "easy" },
	{ code: "RW", name: "Rwanda", difficulty: "medium" },
	{
		code: "KN",
		name: "Saint-Christophe-et-Niévès",
		aliases: ["Saint Christophe"],
		difficulty: "hard",
	},
	{ code: "LC", name: "Sainte-Lucie", aliases: ["Sainte Lucie"], difficulty: "hard" },
	{ code: "SM", name: "Saint-Marin", aliases: ["Saint Marin"], difficulty: "hard" },
	{
		code: "VC",
		name: "Saint-Vincent-et-les-Grenadines",
		aliases: ["Saint Vincent"],
		difficulty: "hard",
	},
	{ code: "WS", name: "Samoa", difficulty: "hard" },
	{ code: "ST", name: "São Tomé-et-Príncipe", aliases: ["Sao Tome"], difficulty: "hard" },
	{ code: "SN", name: "Sénégal", difficulty: "medium" },
	{ code: "RS", name: "Serbie", difficulty: "medium" },
	{ code: "SC", name: "Seychelles", difficulty: "hard" },
	{ code: "SL", name: "Sierra Leone", difficulty: "hard" },
	{ code: "SG", name: "Singapour", difficulty: "medium" },
	{ code: "SK", name: "Slovaquie", difficulty: "medium" },
	{ code: "SI", name: "Slovénie", difficulty: "medium" },
	{ code: "SO", name: "Somalie", difficulty: "medium" },
	{ code: "SD", name: "Soudan", difficulty: "medium" },
	{ code: "SS", name: "Soudan du Sud", aliases: ["Sud Soudan"], difficulty: "hard" },
	{ code: "LK", name: "Sri Lanka", difficulty: "medium" },
	{ code: "SE", name: "Suède", difficulty: "easy" },
	{ code: "CH", name: "Suisse", difficulty: "easy" },
	{ code: "SR", name: "Suriname", difficulty: "hard" },
	{ code: "SY", name: "Syrie", difficulty: "easy" },
	{ code: "TJ", name: "Tadjikistan", difficulty: "hard" },
	{ code: "TZ", name: "Tanzanie", difficulty: "medium" },
	{ code: "TD", name: "Tchad", difficulty: "hard" },
	{ code: "TH", name: "Thaïlande", difficulty: "easy" },
	{ code: "TL", name: "Timor Oriental", aliases: ["Timor"], difficulty: "hard" },
	{ code: "TG", name: "Togo", difficulty: "hard" },
	{ code: "TO", name: "Tonga", difficulty: "hard" },
	{ code: "TT", name: "Trinité-et-Tobago", aliases: ["Trinite"], difficulty: "hard" },
	{ code: "TN", name: "Tunisie", difficulty: "medium" },
	{ code: "TM", name: "Turkménistan", difficulty: "hard" },
	{ code: "TR", name: "Turquie", difficulty: "easy" },
	{ code: "TV", name: "Tuvalu", difficulty: "hard" },
	{ code: "UA", name: "Ukraine", difficulty: "easy" },
	{ code: "UY", name: "Uruguay", difficulty: "medium" },
	{ code: "VU", name: "Vanuatu", difficulty: "hard" },
	{ code: "VA", name: "Vatican", difficulty: "medium" },
	{ code: "VE", name: "Venezuela", difficulty: "medium" },
	{ code: "VN", name: "Viêt Nam", difficulty: "easy" },
	{ code: "YE", name: "Yémen", difficulty: "medium" },
	{ code: "ZM", name: "Zambie", difficulty: "hard" },
	{ code: "ZW", name: "Zimbabwe", difficulty: "medium" },
]

export function getRandomCountry(difficulty?: Difficulty): Country {
	const filteredCountries = difficulty
		? countries.filter((c) => c.difficulty === difficulty)
		: countries

	if (filteredCountries.length === 0) {
		// Fallback to all countries if no match
		return countries[Math.floor(Math.random() * countries.length)]!
	}

	return filteredCountries[
		Math.floor(Math.random() * filteredCountries.length)
	]!
}

/**
 * Gets a random country based on the current round number.
 * Progressive difficulty: easy (rounds 1-7), medium (rounds 8-14), hard (rounds 15-20)
 */
export function getRandomCountryByRound(round: number, maxRounds: number = 20): Country {
	const progress = round / maxRounds

	if (progress <= 0.35) {
		// First 35% of rounds: easy
		return getRandomCountry("easy")
	} else if (progress <= 0.7) {
		// Next 35%: medium
		return getRandomCountry("medium")
	} else {
		// Last 30%: hard
		return getRandomCountry("hard")
	}
}

/**
 * Generates a pool of unique countries for a game.
 * @param count - Number of countries needed
 * @param progressive - If true, uses progressive difficulty (easy -> medium -> hard)
 * @returns Array of unique countries
 */
export function generateCountryPool(count: number, progressive: boolean = true): Country[] {
	if (!progressive) {
		// Simple random shuffle and take first N
		const shuffled = [...countries].sort(() => Math.random() - 0.5)
		return shuffled.slice(0, count)
	}

	// Progressive difficulty distribution
	const easyCount = Math.ceil(count * 0.35) // First 35%
	const mediumCount = Math.ceil(count * 0.35) // Next 35%
	const hardCount = count - easyCount - mediumCount // Remaining 30%

	// Get countries by difficulty and shuffle each group
	const easyCountries = countries
		.filter((c) => c.difficulty === "easy")
		.sort(() => Math.random() - 0.5)
		.slice(0, easyCount)

	const mediumCountries = countries
		.filter((c) => c.difficulty === "medium")
		.sort(() => Math.random() - 0.5)
		.slice(0, mediumCount)

	const hardCountries = countries
		.filter((c) => c.difficulty === "hard")
		.sort(() => Math.random() - 0.5)
		.slice(0, hardCount)

	// Combine in order: easy first, then medium, then hard
	return [...easyCountries, ...mediumCountries, ...hardCountries]
}

export function getCountryByCode(code: string): Country | undefined {
	return countries.find((c) => c.code === code)
}

export function getCountryByName(name: string): Country | undefined {
	return countries.find((c) => c.name.toLowerCase() === name.toLowerCase())
}
