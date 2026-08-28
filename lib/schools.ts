// Full FBS program list, grouped by conference, for the onboarding school
// picker. Conference realignment happens most offseasons -- this reflects
// 2026-season alignment as best known at write time; re-check membership and
// touch up colors (approximate for some smaller programs) before each
// season, the same way the trivia bank's own "Conference Chaos" category
// flags itself for a yearly review.
export type Conference =
  | "SEC"
  | "Big Ten"
  | "ACC"
  | "Big 12"
  | "American"
  | "Conference USA"
  | "MAC"
  | "Mountain West"
  | "Pac-12"
  | "Sun Belt"
  | "Independent";

export type School = {
  id: string;
  name: string;
  color: string;
  conference: Conference;
};

export const CONFERENCES: Conference[] = [
  "SEC",
  "Big Ten",
  "ACC",
  "Big 12",
  "American",
  "Conference USA",
  "MAC",
  "Mountain West",
  "Pac-12",
  "Sun Belt",
  "Independent",
];

export const SCHOOLS: School[] = [
  // ---------------------------------------------------------------- SEC
  { id: "alabama", name: "Alabama", color: "#9E1B32", conference: "SEC" },
  { id: "arkansas", name: "Arkansas", color: "#9D2235", conference: "SEC" },
  { id: "auburn", name: "Auburn", color: "#0C2340", conference: "SEC" },
  { id: "florida", name: "Florida", color: "#0021A5", conference: "SEC" },
  { id: "georgia", name: "Georgia", color: "#BA0C2F", conference: "SEC" },
  { id: "kentucky", name: "Kentucky", color: "#0033A0", conference: "SEC" },
  { id: "lsu", name: "LSU", color: "#461D7C", conference: "SEC" },
  { id: "mississippi-state", name: "Mississippi State", color: "#660000", conference: "SEC" },
  { id: "missouri", name: "Missouri", color: "#F1B82D", conference: "SEC" },
  { id: "ole-miss", name: "Ole Miss", color: "#14213D", conference: "SEC" },
  { id: "oklahoma", name: "Oklahoma", color: "#841617", conference: "SEC" },
  { id: "south-carolina", name: "South Carolina", color: "#73000A", conference: "SEC" },
  { id: "tennessee", name: "Tennessee", color: "#FF8200", conference: "SEC" },
  { id: "texas", name: "Texas", color: "#BF5700", conference: "SEC" },
  { id: "texas-am", name: "Texas A&M", color: "#500000", conference: "SEC" },
  { id: "vanderbilt", name: "Vanderbilt", color: "#866D4B", conference: "SEC" },

  // ------------------------------------------------------------ Big Ten
  { id: "illinois", name: "Illinois", color: "#E84A27", conference: "Big Ten" },
  { id: "indiana", name: "Indiana", color: "#990000", conference: "Big Ten" },
  { id: "iowa", name: "Iowa", color: "#FFCD00", conference: "Big Ten" },
  { id: "maryland", name: "Maryland", color: "#E03A3E", conference: "Big Ten" },
  { id: "michigan", name: "Michigan", color: "#00274C", conference: "Big Ten" },
  { id: "michigan-state", name: "Michigan State", color: "#18453B", conference: "Big Ten" },
  { id: "minnesota", name: "Minnesota", color: "#7A0019", conference: "Big Ten" },
  { id: "nebraska", name: "Nebraska", color: "#E41C38", conference: "Big Ten" },
  { id: "northwestern", name: "Northwestern", color: "#4E2A84", conference: "Big Ten" },
  { id: "ohio-state", name: "Ohio State", color: "#BB0000", conference: "Big Ten" },
  { id: "oregon", name: "Oregon", color: "#154733", conference: "Big Ten" },
  { id: "penn-state", name: "Penn State", color: "#041E42", conference: "Big Ten" },
  { id: "purdue", name: "Purdue", color: "#CEB888", conference: "Big Ten" },
  { id: "rutgers", name: "Rutgers", color: "#CC0033", conference: "Big Ten" },
  { id: "ucla", name: "UCLA", color: "#2D68C4", conference: "Big Ten" },
  { id: "usc", name: "USC", color: "#990000", conference: "Big Ten" },
  { id: "washington", name: "Washington", color: "#4B2E83", conference: "Big Ten" },
  { id: "wisconsin", name: "Wisconsin", color: "#C5050C", conference: "Big Ten" },

  // ---------------------------------------------------------------- ACC
  { id: "boston-college", name: "Boston College", color: "#98002E", conference: "ACC" },
  { id: "california", name: "California", color: "#003262", conference: "ACC" },
  { id: "clemson", name: "Clemson", color: "#F56600", conference: "ACC" },
  { id: "duke", name: "Duke", color: "#00539B", conference: "ACC" },
  { id: "florida-state", name: "Florida State", color: "#782F40", conference: "ACC" },
  { id: "georgia-tech", name: "Georgia Tech", color: "#B3A369", conference: "ACC" },
  { id: "louisville", name: "Louisville", color: "#AD0000", conference: "ACC" },
  { id: "miami", name: "Miami", color: "#F47321", conference: "ACC" },
  { id: "nc-state", name: "NC State", color: "#CC0000", conference: "ACC" },
  { id: "north-carolina", name: "North Carolina", color: "#7BAFD4", conference: "ACC" },
  { id: "pittsburgh", name: "Pittsburgh", color: "#003594", conference: "ACC" },
  { id: "smu", name: "SMU", color: "#C8102E", conference: "ACC" },
  { id: "stanford", name: "Stanford", color: "#8C1515", conference: "ACC" },
  { id: "syracuse", name: "Syracuse", color: "#F76900", conference: "ACC" },
  { id: "virginia", name: "Virginia", color: "#232D4B", conference: "ACC" },
  { id: "virginia-tech", name: "Virginia Tech", color: "#630031", conference: "ACC" },
  { id: "wake-forest", name: "Wake Forest", color: "#9E7E38", conference: "ACC" },

  // ------------------------------------------------------------- Big 12
  { id: "arizona", name: "Arizona", color: "#CC0033", conference: "Big 12" },
  { id: "arizona-state", name: "Arizona State", color: "#8C1D40", conference: "Big 12" },
  { id: "baylor", name: "Baylor", color: "#154734", conference: "Big 12" },
  { id: "byu", name: "BYU", color: "#002E5D", conference: "Big 12" },
  { id: "cincinnati", name: "Cincinnati", color: "#E00122", conference: "Big 12" },
  { id: "colorado", name: "Colorado", color: "#CFB87C", conference: "Big 12" },
  { id: "houston", name: "Houston", color: "#C8102E", conference: "Big 12" },
  { id: "iowa-state", name: "Iowa State", color: "#C8102E", conference: "Big 12" },
  { id: "kansas", name: "Kansas", color: "#0051BA", conference: "Big 12" },
  { id: "kansas-state", name: "Kansas State", color: "#512888", conference: "Big 12" },
  { id: "oklahoma-state", name: "Oklahoma State", color: "#FF7300", conference: "Big 12" },
  { id: "tcu", name: "TCU", color: "#4D1979", conference: "Big 12" },
  { id: "texas-tech", name: "Texas Tech", color: "#CC0000", conference: "Big 12" },
  { id: "ucf", name: "UCF", color: "#000000", conference: "Big 12" },
  { id: "utah", name: "Utah", color: "#CC0000", conference: "Big 12" },
  { id: "west-virginia", name: "West Virginia", color: "#EAAA00", conference: "Big 12" },

  // -------------------------------------------------------- American
  { id: "army", name: "Army", color: "#000000", conference: "American" },
  { id: "charlotte", name: "Charlotte", color: "#046A38", conference: "American" },
  { id: "east-carolina", name: "East Carolina", color: "#592A8A", conference: "American" },
  { id: "florida-atlantic", name: "Florida Atlantic", color: "#003366", conference: "American" },
  { id: "memphis", name: "Memphis", color: "#003087", conference: "American" },
  { id: "navy", name: "Navy", color: "#00205B", conference: "American" },
  { id: "north-texas", name: "North Texas", color: "#00853E", conference: "American" },
  { id: "rice", name: "Rice", color: "#00205B", conference: "American" },
  { id: "south-florida", name: "South Florida", color: "#006747", conference: "American" },
  { id: "temple", name: "Temple", color: "#9D2235", conference: "American" },
  { id: "tulane", name: "Tulane", color: "#006747", conference: "American" },
  { id: "tulsa", name: "Tulsa", color: "#002D72", conference: "American" },
  { id: "uab", name: "UAB", color: "#1E6B52", conference: "American" },
  { id: "utsa", name: "UTSA", color: "#0C2340", conference: "American" },

  // -------------------------------------------------------- Conference USA
  { id: "delaware", name: "Delaware", color: "#00539F", conference: "Conference USA" },
  { id: "missouri-state", name: "Missouri State", color: "#821229", conference: "Conference USA" },
  { id: "jacksonville-state", name: "Jacksonville State", color: "#B0161A", conference: "Conference USA" },
  { id: "kennesaw-state", name: "Kennesaw State", color: "#000000", conference: "Conference USA" },
  { id: "liberty", name: "Liberty", color: "#002D62", conference: "Conference USA" },
  { id: "louisiana-tech", name: "Louisiana Tech", color: "#003087", conference: "Conference USA" },
  { id: "middle-tennessee", name: "Middle Tennessee", color: "#0066CC", conference: "Conference USA" },
  { id: "new-mexico-state", name: "New Mexico State", color: "#8C2434", conference: "Conference USA" },
  { id: "sam-houston", name: "Sam Houston", color: "#F26D22", conference: "Conference USA" },
  { id: "utep", name: "UTEP", color: "#FF8200", conference: "Conference USA" },
  { id: "western-kentucky", name: "Western Kentucky", color: "#B70A22", conference: "Conference USA" },

  // ---------------------------------------------------------------- MAC
  { id: "akron", name: "Akron", color: "#00285E", conference: "MAC" },
  { id: "ball-state", name: "Ball State", color: "#BA0C2F", conference: "MAC" },
  { id: "bowling-green", name: "Bowling Green", color: "#4F2C1D", conference: "MAC" },
  { id: "buffalo", name: "Buffalo", color: "#005BBB", conference: "MAC" },
  { id: "central-michigan", name: "Central Michigan", color: "#6A0032", conference: "MAC" },
  { id: "eastern-michigan", name: "Eastern Michigan", color: "#00694E", conference: "MAC" },
  { id: "kent-state", name: "Kent State", color: "#002664", conference: "MAC" },
  { id: "miami-oh", name: "Miami (OH)", color: "#C41230", conference: "MAC" },
  { id: "northern-illinois", name: "Northern Illinois", color: "#BA0C2F", conference: "MAC" },
  { id: "ohio", name: "Ohio", color: "#00694E", conference: "MAC" },
  { id: "toledo", name: "Toledo", color: "#003E7E", conference: "MAC" },
  { id: "western-michigan", name: "Western Michigan", color: "#492F24", conference: "MAC" },

  // ----------------------------------------------------- Mountain West
  { id: "air-force", name: "Air Force", color: "#003087", conference: "Mountain West" },
  { id: "hawaii", name: "Hawaii", color: "#024731", conference: "Mountain West" },
  { id: "nevada", name: "Nevada", color: "#003366", conference: "Mountain West" },
  { id: "new-mexico", name: "New Mexico", color: "#BA0C2F", conference: "Mountain West" },
  { id: "san-jose-state", name: "San Jose State", color: "#0055A2", conference: "Mountain West" },
  { id: "unlv", name: "UNLV", color: "#CF0A2C", conference: "Mountain West" },
  { id: "wyoming", name: "Wyoming", color: "#492F24", conference: "Mountain West" },

  // -------------------------------------------------------------- Pac-12
  { id: "boise-state", name: "Boise State", color: "#0033A0", conference: "Pac-12" },
  { id: "colorado-state", name: "Colorado State", color: "#1E4D2B", conference: "Pac-12" },
  { id: "fresno-state", name: "Fresno State", color: "#DB0032", conference: "Pac-12" },
  { id: "oregon-state", name: "Oregon State", color: "#DC4405", conference: "Pac-12" },
  { id: "san-diego-state", name: "San Diego State", color: "#A6192E", conference: "Pac-12" },
  { id: "utah-state", name: "Utah State", color: "#0F2439", conference: "Pac-12" },
  { id: "washington-state", name: "Washington State", color: "#981E32", conference: "Pac-12" },

  // ---------------------------------------------------------- Sun Belt
  { id: "app-state", name: "Appalachian State", color: "#000000", conference: "Sun Belt" },
  { id: "arkansas-state", name: "Arkansas State", color: "#CC092F", conference: "Sun Belt" },
  { id: "coastal-carolina", name: "Coastal Carolina", color: "#006F71", conference: "Sun Belt" },
  { id: "georgia-southern", name: "Georgia Southern", color: "#041E42", conference: "Sun Belt" },
  { id: "georgia-state", name: "Georgia State", color: "#0039A6", conference: "Sun Belt" },
  { id: "james-madison", name: "James Madison", color: "#450084", conference: "Sun Belt" },
  { id: "louisiana", name: "Louisiana", color: "#CE181E", conference: "Sun Belt" },
  { id: "louisiana-monroe", name: "Louisiana-Monroe", color: "#8B2331", conference: "Sun Belt" },
  { id: "marshall", name: "Marshall", color: "#00B140", conference: "Sun Belt" },
  { id: "old-dominion", name: "Old Dominion", color: "#003057", conference: "Sun Belt" },
  { id: "south-alabama", name: "South Alabama", color: "#00205B", conference: "Sun Belt" },
  { id: "southern-miss", name: "Southern Miss", color: "#FFAB00", conference: "Sun Belt" },
  { id: "texas-state", name: "Texas State", color: "#501214", conference: "Sun Belt" },
  { id: "troy", name: "Troy", color: "#8A0303", conference: "Sun Belt" },

  // -------------------------------------------------------- Independent
  { id: "notre-dame", name: "Notre Dame", color: "#0C2340", conference: "Independent" },
  { id: "uconn", name: "UConn", color: "#000E2F", conference: "Independent" },
  { id: "umass", name: "UMass", color: "#881C1C", conference: "Independent" },
];

export function schoolById(id: string | null | undefined): School | undefined {
  if (!id) return undefined;
  return SCHOOLS.find((s) => s.id === id);
}

export function schoolsByConference(conference: Conference): School[] {
  return SCHOOLS.filter((s) => s.conference === conference);
}
