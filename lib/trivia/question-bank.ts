// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx), updated with
// additional questions from a later content pass.
// Each question: { format: 'mcq', q, options[4], correct } or { format: 'typed', q, a, aliases[] }.
export const QUESTION_BANK = {
  "_meta": {
    "format_key": "Each question has \"format\": \"mcq\" (q, options[4], correct index) or \"typed\" (q, a, aliases[] for fuzzy-matched typed answers, matches the existing isAnswerCorrect() helper).",
    "fact_check_flagged": [
      "Coaching Trees \u2014 widely reported but worth a second look before shipping",
      "Records That May Never Be Broken \u2014 kept intentionally short; I only included records I'm confident are still standing",
      "The Transfer Portal \u2014 only 2 concept-level questions included on purpose. Specific player transfers age out fast and change every window, so this category probably wants a rotating/seasonal refresh rather than a static bank",
      "Conference Chaos \u2014 accurate as of the 2024\u20132025 realignment wave (Texas/Oklahoma to SEC, Oregon/USC/UCLA/Washington to Big Ten, Arizona/Arizona State/Colorado/Utah to Big 12, Cal/Stanford/SMU to ACC). Realignment is ongoing (Pac-12 has since started rebuilding) \u2014 worth re-verifying before each season"
    ]
  },
  "categories": [
    {
      "name": "Heisman History",
      "questions": [
        {
          "format": "typed",
          "q": "This Michigan defensive back and returner won the 1997 Heisman, becoming the first primarily-defensive player to do so \u2014 edging out Tennessee's Peyton Manning.",
          "a": "Charles Woodson",
          "aliases": [
            "woodson"
          ]
        },
        {
          "format": "typed",
          "q": "This Ohio State running back is the only two-time Heisman winner in history, taking the trophy in both 1974 and 1975.",
          "a": "Archie Griffin",
          "aliases": [
            "griffin"
          ]
        },
        {
          "format": "typed",
          "q": "In 2012, this Texas A&M quarterback became the first true freshman to ever win the Heisman Trophy.",
          "a": "Johnny Manziel",
          "aliases": [
            "manziel",
            "johnny football"
          ]
        },
        {
          "format": "typed",
          "q": "This running back won Alabama's first-ever Heisman Trophy in 2009.",
          "a": "Mark Ingram",
          "aliases": [
            "ingram"
          ]
        },
        {
          "format": "typed",
          "q": "This 2005 USC Heisman winner had his trophy vacated in 2010 over NCAA violations, then had it reinstated by the Heisman Trust in 2024.",
          "a": "Reggie Bush",
          "aliases": [
            "bush"
          ]
        },
        {
          "format": "typed",
          "q": "This Florida quarterback won the 2007 Heisman as a sophomore, becoming the first underclassman ever to win it.",
          "a": "Tim Tebow",
          "aliases": [
            "tebow"
          ]
        },
        {
          "format": "typed",
          "q": "This SMU back won the very first Heisman-caliber national recognition in 1948 and is the namesake of the award given annually to the nation's top running back.",
          "a": "Doak Walker",
          "aliases": [
            "walker"
          ]
        },
        {
          "format": "typed",
          "q": "Indiana's first-ever Heisman winner took home the trophy after the 2025 season, quarterbacking the Hoosiers to their first national championship.",
          "a": "Fernando Mendoza",
          "aliases": [
            "mendoza"
          ]
        },
        {
          "format": "mcq",
          "q": "This Louisville quarterback won the 2016 Heisman Trophy.",
          "options": [
            "Lamar Jackson",
            "Deshaun Watson",
            "Baker Mayfield",
            "Jalen Hurts"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Alabama running back won the 2015 Heisman Trophy.",
          "options": [
            "Derrick Henry",
            "Mark Ingram",
            "Najee Harris",
            "Trent Richardson"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Florida State quarterback won the 2013 Heisman as a redshirt freshman.",
          "options": [
            "Jameis Winston",
            "Cam Newton",
            "Deshaun Watson",
            "Marcus Mariota"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Colorado running back won the 1994 Heisman Trophy.",
          "options": [
            "Rashaan Salaam",
            "Eddie George",
            "Ki-Jana Carter",
            "Ron Dayne"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Michigan return specialist won the 1991 Heisman, famous for his one-handed catch and Heisman pose.",
          "options": [
            "Desmond Howard",
            "Charles Woodson",
            "Anthony Carter",
            "Braylon Edwards"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This USC running back won the 1968 Heisman Trophy.",
          "options": [
            "O.J. Simpson",
            "Marcus Allen",
            "Charles White",
            "Mike Garrett"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This USC running back won the 1981 Heisman, setting the single-season rushing record at the time.",
          "options": [
            "Marcus Allen",
            "O.J. Simpson",
            "Charles White",
            "Reggie Bush"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Pitt running back won the 1976 Heisman Trophy.",
          "options": [
            "Tony Dorsett",
            "Herschel Walker",
            "Earl Campbell",
            "George Rogers"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Oklahoma quarterback won the 2003 Heisman despite the Sooners losing the national title game.",
          "options": [
            "Jason White",
            "Sam Bradford",
            "Baker Mayfield",
            "Kyler Murray"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Nebraska option quarterback won the 2001 Heisman Trophy.",
          "options": [
            "Eric Crouch",
            "Tommie Frazier",
            "Scott Frost",
            "Turner Gill"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Wisconsin running back won the 1999 Heisman, then the NCAA's all-time leading rusher.",
          "options": [
            "Ron Dayne",
            "Jonathan Taylor",
            "Melvin Gordon",
            "P.J. Hill"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Texas running back won the 1998 Heisman after breaking the NCAA career rushing record.",
          "options": [
            "Ricky Williams",
            "Earl Campbell",
            "Cedric Benson",
            "Jamaal Charles"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Notre Dame receiver and returner won the 1987 Heisman Trophy.",
          "options": [
            "Tim Brown",
            "Raghib Ismail",
            "Rocket Ismail",
            "Jerome Bettis"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Navy quarterback won the 1963 Heisman as a junior, later a Pro Football Hall of Famer.",
          "options": [
            "Roger Staubach",
            "Joe Bellino",
            "Napoleon McCallum",
            "Keenan Reynolds"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This running back won USC's first-ever Heisman Trophy in 1965.",
          "options": [
            "Mike Garrett",
            "O.J. Simpson",
            "Charles White",
            "Marcus Allen"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "National Champions",
      "questions": [
        {
          "format": "typed",
          "q": "This team beat Washington 34-13 in Houston to win the 2023-season national championship, capping a perfect 15-0 season.",
          "a": "Michigan",
          "aliases": [
            "michigan wolverines"
          ]
        },
        {
          "format": "typed",
          "q": "This team beat Notre Dame 34-23 in the first-ever 12-team College Football Playoff to win the 2024-season national title.",
          "a": "Ohio State",
          "aliases": [
            "ohio state buckeyes",
            "buckeyes"
          ]
        },
        {
          "format": "typed",
          "q": "This team beat Miami 27-21 to win the 2025-season national championship \u2014 the first title in program history.",
          "a": "Indiana",
          "aliases": [
            "indiana hoosiers",
            "hoosiers"
          ]
        },
        {
          "format": "typed",
          "q": "This team throttled TCU 65-7 to win the 2022-season national championship, one of the most lopsided title-game results ever.",
          "a": "Georgia",
          "aliases": [
            "georgia bulldogs"
          ]
        },
        {
          "format": "typed",
          "q": "This team beat Alabama for the 2021-season title, its first national championship since 1980.",
          "a": "Georgia",
          "aliases": [
            "georgia bulldogs"
          ]
        },
        {
          "format": "typed",
          "q": "This team beat Ohio State 52-24 to win the 2020-season national title under head coach Nick Saban.",
          "a": "Alabama",
          "aliases": [
            "alabama crimson tide",
            "crimson tide"
          ]
        },
        {
          "format": "typed",
          "q": "This team beat Alabama in both the 2016-season and 2018-season national championship games.",
          "a": "Clemson",
          "aliases": [
            "clemson tigers"
          ]
        },
        {
          "format": "mcq",
          "q": "This team, led by Cam Newton, beat Oregon to win the 2010-season national title.",
          "options": [
            "Auburn",
            "Alabama",
            "LSU",
            "Oklahoma"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team won the chaotic, two-loss 2007-season national championship.",
          "options": [
            "LSU",
            "Ohio State",
            "USC",
            "Georgia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat Ohio State 41-14 to win the 2006-season national title.",
          "options": [
            "Florida",
            "Georgia",
            "LSU",
            "Michigan"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat Miami in double overtime, on a controversial late penalty call, to win the 2002-season title.",
          "options": [
            "Ohio State",
            "Nebraska",
            "Iowa",
            "Penn State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This star-studded team beat Nebraska to win the 2001-season national championship.",
          "options": [
            "Miami",
            "Florida State",
            "Florida",
            "Tennessee"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team, under first-year coach Bob Stoops, beat Florida State for the 2000-season national title.",
          "options": [
            "Oklahoma",
            "Nebraska",
            "Texas",
            "Kansas State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team, coached by Steve Spurrier, beat Florida State for the 1996-season national title.",
          "options": [
            "Florida",
            "Tennessee",
            "Auburn",
            "Georgia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat Clemson 42-25, led by quarterback Joe Burrow, to win the 2019-season national title.",
          "options": [
            "LSU",
            "Alabama",
            "Ohio State",
            "Oklahoma"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat Georgia in overtime, on a Tua Tagovailoa walk-off touchdown pass, to win the 2017-season title.",
          "options": [
            "Alabama",
            "Clemson",
            "Oklahoma",
            "Ohio State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat Oregon 42-20 to win the first-ever College Football Playoff title after the 2014 season.",
          "options": [
            "Ohio State",
            "Alabama",
            "Florida State",
            "TCU"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat LSU 21-0 in a rematch to win the 2011-season national title.",
          "options": [
            "Alabama",
            "Oklahoma State",
            "Stanford",
            "Oregon"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team beat Texas to win Nick Saban's first national title at Alabama, capping the 2009 season.",
          "options": [
            "Alabama",
            "Florida",
            "TCU",
            "Cincinnati"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team, led by Tim Tebow, beat Oklahoma to win the 2008-season national title.",
          "options": [
            "Florida",
            "USC",
            "Texas",
            "Utah"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team went 12-0 to win the 1995-season national title, often cited as one of the greatest college teams ever.",
          "options": [
            "Nebraska",
            "Florida State",
            "Florida",
            "Ohio State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This team, coached by Barry Switzer, won the 1985-season national title.",
          "options": [
            "Oklahoma",
            "Penn State",
            "Michigan",
            "Iowa"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "College Football Legends",
      "questions": [
        {
          "format": "typed",
          "q": "This Georgia running back won the 1982 Heisman and is considered one of the greatest college backs ever.",
          "a": "Herschel Walker",
          "aliases": [
            "walker"
          ]
        },
        {
          "format": "typed",
          "q": "This Auburn running back and two-sport star won the 1985 Heisman before playing both pro football and baseball.",
          "a": "Bo Jackson",
          "aliases": [
            "jackson"
          ]
        },
        {
          "format": "typed",
          "q": "This Oklahoma State running back's 1988 season is still considered one of the greatest ever put together by a college rusher.",
          "a": "Barry Sanders",
          "aliases": [
            "sanders"
          ]
        },
        {
          "format": "typed",
          "q": "This Tennessee quarterback famously never won a Heisman, finishing runner-up in 1997 to Charles Woodson.",
          "a": "Peyton Manning",
          "aliases": [
            "manning"
          ]
        },
        {
          "format": "typed",
          "q": "This Florida State cornerback, nicknamed 'Prime Time,' won a national title in 1993 and later starred in both the NFL and MLB.",
          "a": "Deion Sanders",
          "aliases": [
            "deion",
            "prime time",
            "neon deion"
          ]
        },
        {
          "format": "mcq",
          "q": "This Nebraska option quarterback led the team to a share of the 1997 national title and later became Nebraska's head coach himself.",
          "options": [
            "Scott Frost",
            "Tommie Frazier",
            "Eric Crouch",
            "Turner Gill"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Florida running back never won a Heisman but went on to become the NFL's all-time leading rusher.",
          "options": [
            "Emmitt Smith",
            "Errict Rhett",
            "Fred Taylor",
            "Neal Anderson"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Texas running back won the 1977 Heisman Trophy.",
          "options": [
            "Earl Campbell",
            "Ricky Williams",
            "Cedric Benson",
            "Jamaal Charles"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This defensive lineman, later an NFL Hall of Famer nicknamed 'The Minister of Defense,' played at Tennessee.",
          "options": [
            "Reggie White",
            "Peyton Manning",
            "Eric Berry",
            "Jason Witten"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Mascots Gone Wild",
      "questions": [
        {
          "format": "mcq",
          "q": "Which school's mascot is the Demon Deacons?",
          "options": [
            "Wake Forest",
            "Duke",
            "Vanderbilt",
            "Baylor"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is a Duck, backed by a licensing deal with Disney since the 1940s?",
          "options": [
            "Oregon",
            "Oregon State",
            "Washington",
            "Boise State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Horned Frogs?",
          "options": [
            "TCU",
            "Rice",
            "Baylor",
            "SMU"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Boilermakers?",
          "options": [
            "Purdue",
            "Illinois",
            "Michigan State",
            "Northwestern"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Gamecocks?",
          "options": [
            "South Carolina",
            "Georgia",
            "Clemson",
            "Tennessee"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is a kangaroo named Zippy?",
          "options": [
            "Akron",
            "Kent State",
            "Toledo",
            "Ball State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Yellow Jackets?",
          "options": [
            "Georgia Tech",
            "Georgia",
            "Tech State",
            "Auburn"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is 'Hey Reb!', a Rebel prospector?",
          "options": [
            "UNLV",
            "Ole Miss",
            "UNR",
            "New Mexico"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Scarlet Knights?",
          "options": [
            "Rutgers",
            "Army",
            "UCF",
            "Rhode Island"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Golden Gophers?",
          "options": [
            "Minnesota",
            "Wisconsin",
            "Iowa",
            "Michigan State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Blue Devils?",
          "options": [
            "Duke",
            "UNC",
            "NC State",
            "Wake Forest"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Lobos?",
          "options": [
            "New Mexico",
            "New Mexico State",
            "UTEP",
            "Colorado State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Black Knights?",
          "options": [
            "Army",
            "Navy",
            "Air Force",
            "The Citadel"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Midshipmen?",
          "options": [
            "Navy",
            "Army",
            "Air Force",
            "Coast Guard"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Wolf Pack?",
          "options": [
            "Nevada",
            "UNLV",
            "Idaho",
            "Fresno State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot, the Green Wave, is one of the more unusual names in college football?",
          "options": [
            "Tulane",
            "Tulsa",
            "Temple",
            "Toledo"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Cyclones?",
          "options": [
            "Iowa State",
            "Iowa",
            "Kansas State",
            "Oklahoma State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Bearcats?",
          "options": [
            "Cincinnati",
            "Baylor",
            "Ohio",
            "Akron"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Blazers?",
          "options": [
            "UAB",
            "UTSA",
            "Charlotte",
            "FIU"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Rockets?",
          "options": [
            "Toledo",
            "Bowling Green",
            "Kent State",
            "Buffalo"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot, the Thundering Herd, is one of the most memorable in college football?",
          "options": [
            "Marshall",
            "Ohio",
            "Miami (OH)",
            "Western Michigan"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Miners?",
          "options": [
            "UTEP",
            "Texas Tech",
            "New Mexico State",
            "UTSA"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school's mascot is the Rainbow Warriors?",
          "options": [
            "Hawaii",
            "San Jose State",
            "Fresno State",
            "New Mexico State"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Fight Songs",
      "questions": [
        {
          "format": "mcq",
          "q": "'Hail to the Victors' is the fight song of which school?",
          "options": [
            "Michigan",
            "Ohio State",
            "Michigan State",
            "Penn State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The 'Notre Dame Victory March' belongs to which school?",
          "options": [
            "Notre Dame",
            "Boston College",
            "USC",
            "Navy"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Fight On' is the fight song of which school?",
          "options": [
            "USC",
            "UCLA",
            "Stanford",
            "Cal"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'On Wisconsin' is the fight song of which school?",
          "options": [
            "Wisconsin",
            "Minnesota",
            "Iowa",
            "Nebraska"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The 'Buckeye Battle Cry' belongs to which school?",
          "options": [
            "Ohio State",
            "Michigan",
            "Michigan State",
            "Purdue"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Yea Alabama' \u2014 the school's actual official fight song, distinct from the unofficial anthem often played at games \u2014 belongs to which team?",
          "options": [
            "Alabama",
            "Auburn",
            "LSU",
            "Ole Miss"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Rocky Top,' one of the most beloved anthems in college football, belongs to which school?",
          "options": [
            "Tennessee",
            "Kentucky",
            "Vanderbilt",
            "Missouri"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Anchors Aweigh' is the fight song of which school?",
          "options": [
            "Navy",
            "Army",
            "Air Force",
            "Coast Guard"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'The Aggie War Hymn' is the fight song of which school?",
          "options": [
            "Texas A&M",
            "Utah State",
            "New Mexico State",
            "NC State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Ramblin' Wreck From Georgia Tech' is the fight song of which school?",
          "options": [
            "Georgia Tech",
            "Georgia",
            "Auburn",
            "Clemson"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Boomer Sooner' is the fight song of which school?",
          "options": [
            "Oklahoma",
            "Oklahoma State",
            "Kansas",
            "Texas"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "'Tiger Rag,' a favorite of the marching band, is associated with which school?",
          "options": [
            "LSU",
            "Clemson",
            "Auburn",
            "Missouri"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "College Football Nicknames",
      "questions": [
        {
          "format": "typed",
          "q": "This longtime Florida and South Carolina head coach was universally known by the nickname 'The Ol' Ball Coach.'",
          "a": "Steve Spurrier",
          "aliases": [
            "spurrier"
          ]
        },
        {
          "format": "typed",
          "q": "Two famous stadiums share the nickname 'Death Valley' \u2014 Clemson's Memorial Stadium, and the home of which SEC team?",
          "a": "LSU",
          "aliases": [
            "louisiana state",
            "tigers"
          ]
        },
        {
          "format": "typed",
          "q": "This program is nicknamed 'The Bayou Bengals.'",
          "a": "LSU",
          "aliases": [
            "louisiana state"
          ]
        },
        {
          "format": "typed",
          "q": "What is Auburn's famous game-day rallying cry, shouted by fans regardless of the score?",
          "a": "War Eagle",
          "aliases": [
            "war eagle"
          ]
        },
        {
          "format": "typed",
          "q": "This program's stadium famously displays a sign claiming its fans are the greatest in college football, win or lose.",
          "a": "Nebraska",
          "aliases": [
            "nebraska cornhuskers",
            "huskers"
          ]
        },
        {
          "format": "mcq",
          "q": "Ohio State's nickname, 'Buckeyes,' refers to what?",
          "options": [
            "A type of nut/tree native to Ohio",
            "A nickname for early Ohio pioneers",
            "A 19th-century coach",
            "A Native American word for river"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This legendarily brutal 1954 Texas A&M preseason training camp, run by a young coach who'd later become a legend at Alabama, is remembered as what?",
          "options": [
            "The Junction Boys",
            "The Aggie Grind",
            "Camp Crimson",
            "The Bootcamp Boys"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Georgia's ferocious defenses of the late 1970s and 1980s earned what collective nickname?",
          "options": [
            "The Junkyard Dogs",
            "The Bulldog Brigade",
            "The Hedges Defense",
            "The Wrecking Crew"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Rivalry Week",
      "questions": [
        {
          "format": "typed",
          "q": "The Florida-Georgia rivalry has long carried what unofficial nickname referencing its neutral-site location?",
          "a": "The World's Largest Outdoor Cocktail Party",
          "aliases": [
            "worlds largest outdoor cocktail party",
            "largest outdoor cocktail party"
          ]
        },
        {
          "format": "typed",
          "q": "BYU vs. Utah, two rival programs with religious roots, is nicknamed what?",
          "a": "Holy War",
          "aliases": [
            "the holy war"
          ]
        },
        {
          "format": "typed",
          "q": "West Virginia vs. Pittsburgh is nicknamed what?",
          "a": "The Backyard Brawl",
          "aliases": [
            "backyard brawl"
          ]
        },
        {
          "format": "typed",
          "q": "Georgia vs. Georgia Tech carries what pointed nickname?",
          "a": "Clean, Old-Fashioned Hate",
          "aliases": [
            "clean old fashioned hate"
          ]
        },
        {
          "format": "typed",
          "q": "The Red River Rivalry between Texas and Oklahoma is played annually at a neutral site during the state fair \u2014 in which city?",
          "a": "Dallas",
          "aliases": [
            "dallas texas"
          ]
        },
        {
          "format": "typed",
          "q": "The Notre Dame-USC rivalry trophy, awarded since 1942, is shaped like what iconic object?",
          "a": "The Jeweled Shillelagh",
          "aliases": [
            "jeweled shillelagh",
            "shillelagh"
          ]
        }
      ]
    },
    {
      "name": "Bowl Games",
      "questions": [
        {
          "format": "typed",
          "q": "The Orange Bowl is traditionally played in which Florida city?",
          "a": "Miami",
          "aliases": [
            "miami gardens"
          ]
        },
        {
          "format": "typed",
          "q": "The Cotton Bowl is historically associated with which Texas city?",
          "a": "Dallas",
          "aliases": [
            "dallas texas"
          ]
        },
        {
          "format": "typed",
          "q": "The Fiesta Bowl is played in which Arizona city?",
          "a": "Glendale",
          "aliases": [
            "glendale arizona"
          ]
        },
        {
          "format": "typed",
          "q": "The Peach Bowl is played in which city?",
          "a": "Atlanta",
          "aliases": [
            "atlanta georgia"
          ]
        },
        {
          "format": "typed",
          "q": "Which bowl game, historically played in Orlando, has long carried a citrus theme in its name?",
          "a": "Citrus Bowl",
          "aliases": [
            "the citrus bowl"
          ]
        },
        {
          "format": "typed",
          "q": "What nickname does the Rose Bowl carry, referencing its stature among bowl games?",
          "a": "The Granddaddy of Them All",
          "aliases": [
            "granddaddy of them all",
            "granddaddy"
          ]
        },
        {
          "format": "mcq",
          "q": "The Sugar Bowl is played in which city?",
          "options": [
            "New Orleans",
            "Baton Rouge",
            "Atlanta",
            "Miami"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The Rose Bowl is played in which city?",
          "options": [
            "Pasadena",
            "Los Angeles",
            "San Diego",
            "Anaheim"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The Holiday Bowl is played in which city?",
          "options": [
            "San Diego",
            "San Francisco",
            "Sacramento",
            "Los Angeles"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The Alamo Bowl is played in which city?",
          "options": [
            "San Antonio",
            "Austin",
            "Houston",
            "El Paso"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The Gator Bowl is played in which city?",
          "options": [
            "Jacksonville",
            "Tampa",
            "Orlando",
            "Miami"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Stadiums",
      "questions": [
        {
          "format": "typed",
          "q": "Nicknamed 'The Big House,' this is the largest stadium in college football, seating well over 100,000 fans.",
          "a": "Michigan Stadium",
          "aliases": [
            "the big house",
            "michigan"
          ]
        },
        {
          "format": "typed",
          "q": "Besides LSU's Tiger Stadium, which other program's stadium is also nicknamed 'Death Valley'?",
          "a": "Clemson",
          "aliases": [
            "clemson memorial stadium"
          ]
        },
        {
          "format": "typed",
          "q": "This Tennessee stadium sits along a river where fans famously arrive by boat \u2014 a fleet nicknamed the 'Vol Navy.'",
          "a": "Neyland Stadium",
          "aliases": [
            "neyland"
          ]
        },
        {
          "format": "typed",
          "q": "This Oregon stadium has a reputation as one of the loudest venues in college football.",
          "a": "Autzen Stadium",
          "aliases": [
            "autzen"
          ]
        },
        {
          "format": "typed",
          "q": "Ole Miss's stadium sits next to this famous, elaborately decorated tailgating ground.",
          "a": "The Grove",
          "aliases": [
            "the grove"
          ]
        },
        {
          "format": "mcq",
          "q": "Texas A&M's stadium, home of the '12th Man' tradition, is named what?",
          "options": [
            "Kyle Field",
            "Aggie Stadium",
            "Reveille Field",
            "Cotton Bowl"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "What is the official name of LSU's stadium, nicknamed 'Death Valley'?",
          "options": [
            "Tiger Stadium",
            "Bayou Stadium",
            "LSU Field",
            "Mike Stadium"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Alabama's stadium is named for two figures, including legendary coach Bear Bryant \u2014 what's it called?",
          "options": [
            "Bryant-Denny Stadium",
            "Crimson Stadium",
            "Tide Field",
            "Legion Field"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Notre Dame Stadium carries the nickname 'The House That ___ Built,' honoring the coach who pushed for it to be constructed.",
          "options": [
            "Rockne",
            "Parseghian",
            "Leahy",
            "Holtz"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Coaching Legends",
      "questions": [
        {
          "format": "typed",
          "q": "This Florida State head coach won national titles in 1993 and 1999 and built the Seminoles into a powerhouse over decades.",
          "a": "Bobby Bowden",
          "aliases": [
            "bowden"
          ]
        },
        {
          "format": "typed",
          "q": "This Nebraska head coach won national titles in the mid-to-late 1990s, including a share of the 1997 title.",
          "a": "Tom Osborne",
          "aliases": [
            "osborne"
          ]
        },
        {
          "format": "typed",
          "q": "This Ohio State coaching legend won multiple national titles but is also remembered for a sideline incident at the 1978 Gator Bowl that cost him his job.",
          "a": "Woody Hayes",
          "aliases": [
            "hayes"
          ]
        },
        {
          "format": "typed",
          "q": "This Oklahoma head coach won three national titles in the 1970s and 1980s (1974, 1975, and 1985).",
          "a": "Barry Switzer",
          "aliases": [
            "switzer"
          ]
        },
        {
          "format": "typed",
          "q": "This coach won national titles at two different schools \u2014 Florida and Ohio State.",
          "a": "Urban Meyer",
          "aliases": [
            "meyer"
          ]
        },
        {
          "format": "mcq",
          "q": "This coach won a national title at Miami in 1983, just his fourth year on the job.",
          "options": [
            "Howard Schnellenberger",
            "Jimmy Johnson",
            "Dennis Erickson",
            "Butch Davis"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This coach won three national titles at USC in the late 1960s and 1970s.",
          "options": [
            "John McKay",
            "John Robinson",
            "Pete Carroll",
            "Larry Smith"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Penn State coach spent 46 seasons leading the Nittany Lions, the longest tenure of any major-program coach in the sport.",
          "options": [
            "Joe Paterno",
            "Rip Engle",
            "James Franklin",
            "Bill O'Brien"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Coaching Trees",
      "questions": [
        {
          "format": "typed",
          "q": "This Georgia head coach played and later served as defensive coordinator under Nick Saban at Alabama before taking over the Bulldogs.",
          "a": "Kirby Smart",
          "aliases": [
            "smart"
          ]
        },
        {
          "format": "typed",
          "q": "This coach served as offensive coordinator under Nick Saban at Alabama before becoming Ole Miss's head coach.",
          "a": "Lane Kiffin",
          "aliases": [
            "kiffin"
          ]
        },
        {
          "format": "typed",
          "q": "This Clemson head coach played wide receiver at Alabama in the early 1990s, part of the Crimson Tide's 1992 national title roster.",
          "a": "Dabo Swinney",
          "aliases": [
            "swinney"
          ]
        },
        {
          "format": "typed",
          "q": "This coach served as offensive coordinator under Nick Saban at Alabama before becoming Texas's head coach.",
          "a": "Steve Sarkisian",
          "aliases": [
            "sarkisian",
            "sark"
          ]
        }
      ]
    },
    {
      "name": "NFL Stars: College Edition",
      "questions": [
        {
          "format": "mcq",
          "q": "Patrick Mahomes played his college ball at which school?",
          "options": [
            "Texas Tech",
            "Texas",
            "Oklahoma",
            "Baylor"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Josh Allen played his college ball at which school?",
          "options": [
            "Wyoming",
            "Boise State",
            "Utah State",
            "Fresno State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Justin Jefferson played his college ball at which school?",
          "options": [
            "LSU",
            "Alabama",
            "Ole Miss",
            "Mississippi State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Micah Parsons played his college ball at which school?",
          "options": [
            "Penn State",
            "Ohio State",
            "Michigan",
            "Rutgers"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Trevor Lawrence played his college ball at which school?",
          "options": [
            "Clemson",
            "Alabama",
            "Georgia",
            "South Carolina"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "CeeDee Lamb played his college ball at which school?",
          "options": [
            "Oklahoma",
            "Oklahoma State",
            "Texas",
            "TCU"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Myles Garrett played his college ball at which school?",
          "options": [
            "Texas A&M",
            "Texas",
            "LSU",
            "Alabama"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Nick Bosa played his college ball at which school?",
          "options": [
            "Ohio State",
            "Michigan",
            "Penn State",
            "Michigan State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Justin Herbert played his college ball at which school?",
          "options": [
            "Oregon",
            "Oregon State",
            "Washington",
            "Washington State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Joe Mixon played his college ball at which school?",
          "options": [
            "Oklahoma",
            "Oklahoma State",
            "Texas",
            "Baylor"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "DK Metcalf played his college ball at which school?",
          "options": [
            "Ole Miss",
            "Mississippi State",
            "Alabama",
            "LSU"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Saquon Barkley played his college ball at which school?",
          "options": [
            "Penn State",
            "Ohio State",
            "Michigan",
            "Rutgers"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Aidan Hutchinson played his college ball at which school?",
          "options": [
            "Michigan",
            "Michigan State",
            "Ohio State",
            "Wisconsin"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Bijan Robinson played his college ball at which school?",
          "options": [
            "Texas",
            "Texas A&M",
            "TCU",
            "Oklahoma"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Puka Nacua played his college ball at which school?",
          "options": [
            "BYU",
            "Utah",
            "Utah State",
            "Boise State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Sauce Gardner played his college ball at which school?",
          "options": [
            "Cincinnati",
            "Ohio",
            "Louisville",
            "Memphis"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Christian McCaffrey played his college ball at which school?",
          "options": [
            "Stanford",
            "Cal",
            "USC",
            "UCLA"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "George Kittle played his college ball at which school?",
          "options": [
            "Iowa",
            "Iowa State",
            "Nebraska",
            "Wisconsin"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Travis Kelce played his college ball at which school?",
          "options": [
            "Cincinnati",
            "Ohio",
            "Miami (OH)",
            "Toledo"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Deebo Samuel played his college ball at which school?",
          "options": [
            "South Carolina",
            "Clemson",
            "North Carolina",
            "NC State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Tee Higgins played his college ball at which school?",
          "options": [
            "Clemson",
            "South Carolina",
            "Tennessee",
            "Georgia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Amon-Ra St. Brown played his college ball at which school?",
          "options": [
            "USC",
            "UCLA",
            "Stanford",
            "Cal"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Brock Purdy played his college ball at which school?",
          "options": [
            "Iowa State",
            "Iowa",
            "Kansas State",
            "Nebraska"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Cooper Kupp played his college ball at a small school in Washington state \u2014 which one?",
          "options": [
            "Eastern Washington",
            "Washington State",
            "Western Washington",
            "Central Washington"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Position U (QB / RB / WR)",
      "questions": [
        {
          "format": "typed",
          "q": "This school, alma mater of Carson Palmer, Matt Leinart, and Mark Sanchez, is often nicknamed 'Quarterback U.'",
          "a": "USC",
          "aliases": [
            "southern california"
          ]
        },
        {
          "format": "typed",
          "q": "In the modern era, this Big Ten school \u2014 alma mater of Jonathan Taylor and Melvin Gordon \u2014 has earned the nickname 'Running Back U.'",
          "a": "Wisconsin",
          "aliases": [
            "wisconsin badgers"
          ]
        },
        {
          "format": "typed",
          "q": "This program, alma mater of Michael Irvin and Santana Moss, is often nicknamed 'Wide Receiver U.'",
          "a": "Miami",
          "aliases": [
            "the u",
            "university of miami"
          ]
        }
      ]
    },
    {
      "name": "The Transfer Portal",
      "questions": [
        {
          "format": "typed",
          "q": "What is the informal name for the NCAA database that lets college athletes declare their intent to transfer schools?",
          "a": "The Transfer Portal",
          "aliases": [
            "transfer portal"
          ]
        },
        {
          "format": "typed",
          "q": "In what year did the NCAA introduce the transfer portal system?",
          "a": "2018",
          "aliases": []
        }
      ]
    },
    {
      "name": "College Football Geography",
      "questions": [
        {
          "format": "mcq",
          "q": "Boise State is located in which city?",
          "options": [
            "Boise, Idaho",
            "Pocatello, Idaho",
            "Moscow, Idaho",
            "Twin Falls, Idaho"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Notre Dame is located in which city?",
          "options": [
            "South Bend, Indiana",
            "Indianapolis, Indiana",
            "Bloomington, Indiana",
            "Fort Wayne, Indiana"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Duke is located in which city?",
          "options": [
            "Durham, North Carolina",
            "Chapel Hill, North Carolina",
            "Raleigh, North Carolina",
            "Charlotte, North Carolina"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "TCU is located in which city?",
          "options": [
            "Fort Worth, Texas",
            "Dallas, Texas",
            "Austin, Texas",
            "Waco, Texas"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Baylor is located in which city?",
          "options": [
            "Waco, Texas",
            "Fort Worth, Texas",
            "Lubbock, Texas",
            "College Station, Texas"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Ole Miss is located in which city?",
          "options": [
            "Oxford, Mississippi",
            "Jackson, Mississippi",
            "Starkville, Mississippi",
            "Hattiesburg, Mississippi"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Clemson is located in a town that shares which name?",
          "options": [
            "Clemson, South Carolina",
            "Columbia, South Carolina",
            "Greenville, South Carolina",
            "Anderson, South Carolina"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Auburn is located in a town that shares which name?",
          "options": [
            "Auburn, Alabama",
            "Tuscaloosa, Alabama",
            "Montgomery, Alabama",
            "Birmingham, Alabama"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Michigan's campus is located in which city?",
          "options": [
            "Ann Arbor, Michigan",
            "East Lansing, Michigan",
            "Detroit, Michigan",
            "Kalamazoo, Michigan"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Alabama's campus is located in which city?",
          "options": [
            "Tuscaloosa, Alabama",
            "Birmingham, Alabama",
            "Auburn, Alabama",
            "Montgomery, Alabama"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Georgia's campus is located in which city \u2014 one that shares its name with a European capital?",
          "options": [
            "Athens, Georgia",
            "Atlanta, Georgia",
            "Savannah, Georgia",
            "Macon, Georgia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Oklahoma's campus is located in which city?",
          "options": [
            "Norman, Oklahoma",
            "Stillwater, Oklahoma",
            "Tulsa, Oklahoma",
            "Oklahoma City, Oklahoma"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Florida's campus is located in which city?",
          "options": [
            "Gainesville, Florida",
            "Tallahassee, Florida",
            "Orlando, Florida",
            "Tampa, Florida"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "LSU's campus is located in which city?",
          "options": [
            "Baton Rouge, Louisiana",
            "New Orleans, Louisiana",
            "Lafayette, Louisiana",
            "Shreveport, Louisiana"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Nebraska's campus is located in which city?",
          "options": [
            "Lincoln, Nebraska",
            "Omaha, Nebraska",
            "Kearney, Nebraska",
            "North Platte, Nebraska"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "BYU's campus is located in which city?",
          "options": [
            "Provo, Utah",
            "Salt Lake City, Utah",
            "Ogden, Utah",
            "Logan, Utah"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "West Virginia's campus is located in which city?",
          "options": [
            "Morgantown, West Virginia",
            "Charleston, West Virginia",
            "Huntington, West Virginia",
            "Wheeling, West Virginia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Kansas State's campus is located in a city that shares its name with a much bigger city \u2014 which one?",
          "options": [
            "Manhattan, Kansas",
            "Wichita, Kansas",
            "Topeka, Kansas",
            "Lawrence, Kansas"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Mississippi State's campus is located in which city?",
          "options": [
            "Starkville, Mississippi",
            "Jackson, Mississippi",
            "Oxford, Mississippi",
            "Hattiesburg, Mississippi"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Virginia Tech's campus is located in which city?",
          "options": [
            "Blacksburg, Virginia",
            "Richmond, Virginia",
            "Charlottesville, Virginia",
            "Norfolk, Virginia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Penn State's campus is located in which town?",
          "options": [
            "University Park, Pennsylvania",
            "Pittsburgh, Pennsylvania",
            "Philadelphia, Pennsylvania",
            "Harrisburg, Pennsylvania"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Washington State's campus is located in which city?",
          "options": [
            "Pullman, Washington",
            "Seattle, Washington",
            "Spokane, Washington",
            "Tacoma, Washington"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Wake Forest's campus is located in which city?",
          "options": [
            "Winston-Salem, North Carolina",
            "Raleigh, North Carolina",
            "Charlotte, North Carolina",
            "Durham, North Carolina"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Conference Chaos",
      "questions": [
        {
          "format": "mcq",
          "q": "Which of these schools left the Big 12 to join the SEC in 2024?",
          "options": [
            "Texas",
            "Florida State",
            "Miami",
            "Clemson"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which school did NOT join the Big Ten in the 2024 realignment, going to the ACC instead?",
          "options": [
            "Oregon",
            "USC",
            "Stanford",
            "UCLA"
          ],
          "correct": 2
        },
        {
          "format": "mcq",
          "q": "Colorado, Utah, and Arizona State all joined which conference in 2024?",
          "options": [
            "Big 12",
            "Big Ten",
            "ACC",
            "SEC"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Oklahoma left the Big 12 for which conference in 2024, alongside Texas?",
          "options": [
            "SEC",
            "ACC",
            "Big Ten",
            "American"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "After the 2024 realignment wave, how many members did the Big Ten have?",
          "options": [
            "18",
            "16",
            "14",
            "20"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "After the 2024 realignment wave, how many members did the Big 12 have?",
          "options": [
            "16",
            "14",
            "18",
            "12"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "After adding Cal, Stanford, and SMU in 2024, how many members did the ACC have?",
          "options": [
            "17",
            "15",
            "16",
            "18"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "After the 2024 exodus, the Pac-12 was down to just two holdover members before starting to rebuild. Which two schools stayed?",
          "options": [
            "Oregon State and Washington State",
            "California and Stanford",
            "Utah and Colorado",
            "Arizona and Arizona State"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Upset Alerts",
      "questions": [
        {
          "format": "typed",
          "q": "In 2007, this FCS school stunned #5 Michigan at the Big House \u2014 still considered one of the biggest upsets in college football history.",
          "a": "Appalachian State",
          "aliases": [
            "app state"
          ]
        },
        {
          "format": "typed",
          "q": "This program used a Statue of Liberty trick play to upset Oklahoma in the 2007 Fiesta Bowl.",
          "a": "Boise State",
          "aliases": []
        },
        {
          "format": "typed",
          "q": "In 2007, this unranked team upset #2 USC, ending one of the longest winning streaks in college football at the time.",
          "a": "Stanford",
          "aliases": [
            "stanford cardinal"
          ]
        },
        {
          "format": "typed",
          "q": "In 2013, this FCS program upset Florida in Gainesville.",
          "a": "Georgia Southern",
          "aliases": []
        }
      ]
    },
    {
      "name": "Records That May Never Be Broken",
      "questions": [
        {
          "format": "typed",
          "q": "Which Oklahoma State running back set the NCAA single-season rushing record in 1988, a mark that still stands?",
          "a": "Barry Sanders",
          "aliases": [
            "sanders"
          ]
        },
        {
          "format": "typed",
          "q": "This TCU running back set the FBS single-game rushing record in a 1999 game against UTEP, a mark that still stands today.",
          "a": "LaDainian Tomlinson",
          "aliases": [
            "tomlinson",
            "lt"
          ]
        },
        {
          "format": "mcq",
          "q": "This program holds the FBS record for consecutive wins, a 47-game streak from 1953-1957 under coach Bud Wilkinson.",
          "options": [
            "Oklahoma",
            "Miami",
            "USC",
            "Alabama"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Oddball College Football",
      "questions": [
        {
          "format": "typed",
          "q": "LSU keeps a live Bengal tiger in a habitat next to its stadium \u2014 what is the tiger's name?",
          "a": "Mike the Tiger",
          "aliases": [
            "mike"
          ]
        },
        {
          "format": "typed",
          "q": "Colorado's live buffalo mascot runs across the field before home games \u2014 what's her name?",
          "a": "Ralphie",
          "aliases": []
        },
        {
          "format": "typed",
          "q": "Before running down the hill into the stadium, Clemson players rub what for good luck?",
          "a": "Howard's Rock",
          "aliases": [
            "the rock"
          ]
        },
        {
          "format": "typed",
          "q": "Texas A&M's tradition of the entire student body standing for the whole game, ready to play if needed, is called what?",
          "a": "The 12th Man",
          "aliases": [
            "12th man",
            "twelfth man"
          ]
        },
        {
          "format": "typed",
          "q": "Between the third and fourth quarters at Wisconsin home games, the entire stadium does this to a House of Pain song.",
          "a": "Jump Around",
          "aliases": [
            "jumps around"
          ]
        },
        {
          "format": "typed",
          "q": "Instead of a traditional mascot, this school is represented at games by a person costumed as a tree.",
          "a": "Stanford",
          "aliases": [
            "the stanford tree"
          ]
        },
        {
          "format": "mcq",
          "q": "Which school keeps two live black bears, Judge and Bruiser, on campus as mascots?",
          "options": [
            "Baylor",
            "Missouri",
            "Cal",
            "Brown"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This program's on-field mascot has changed twice since 2003 \u2014 from a Confederate-associated colonel, to a black bear in 2010, to a landshark in 2018 (inspired by the football defense's own nickname).",
          "options": [
            "Ole Miss",
            "Mississippi State",
            "Alabama",
            "Auburn"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This program famously paints its visiting team's locker room entirely pink.",
          "options": [
            "Iowa",
            "Wisconsin",
            "Minnesota",
            "Nebraska"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This school's live mascot is a longhorn steer named Bevo.",
          "options": [
            "Texas",
            "Texas A&M",
            "Texas Tech",
            "TCU"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Name That School",
      "questions": [
        {
          "format": "mcq",
          "q": "Mascot: a Duck. Home: Eugene. Famous for a Disney licensing deal on its logo. Name the school.",
          "options": [
            "Oregon",
            "Oregon State",
            "Washington",
            "Washington State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Stadium: 'The Big House,' the largest in college football. Mascot: a Wolverine. Name the school.",
          "options": [
            "Michigan",
            "Michigan State",
            "Ohio State",
            "Penn State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Pregame tradition: rubbing a rock before running down a hill. Color: orange. Name the school.",
          "options": [
            "Clemson",
            "Tennessee",
            "Auburn",
            "Florida"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Live mascot: a Bengal tiger. Nickname: The Bayou Bengals. Name the school.",
          "options": [
            "LSU",
            "Auburn",
            "Missouri",
            "Memphis"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Tailgating ground: The Grove. Mascot: a Landshark/Rebel. Name the school.",
          "options": [
            "Ole Miss",
            "Mississippi State",
            "Alabama",
            "Auburn"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Live mascot: a buffalo named Ralphie. Conference (as of 2024): the Big 12. Name the school.",
          "options": [
            "Colorado",
            "Wyoming",
            "Colorado State",
            "Utah"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Fight song: 'Boomer Sooner.' Mascot: the Sooners. Name the school.",
          "options": [
            "Oklahoma",
            "Oklahoma State",
            "Kansas",
            "Texas"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Stadium: Bryant-Denny, named for a coaching legend. Colors: crimson and white. Name the school.",
          "options": [
            "Alabama",
            "South Carolina",
            "Georgia",
            "Arkansas"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Founding & Firsts",
      "questions": [
        {
          "format": "mcq",
          "q": "The first college football game ever played, in 1869, was between Rutgers and which school?",
          "options": [
            "Princeton",
            "Yale",
            "Harvard",
            "Columbia"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "In what year was the first college football game ever played?",
          "options": [
            "1869",
            "1876",
            "1880",
            "1892"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Walter Camp, often called the 'Father of American Football' for shaping its early rules, played and coached at which school?",
          "options": [
            "Yale",
            "Harvard",
            "Princeton",
            "Penn"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "In what year was the forward pass legalized in college football?",
          "options": [
            "1906",
            "1912",
            "1920",
            "1899"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "In what year was the Heisman Trophy first awarded?",
          "options": [
            "1935",
            "1920",
            "1945",
            "1950"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The AP Top 25 poll for college football began in which decade?",
          "options": [
            "1930s",
            "1920s",
            "1950s",
            "1960s"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "The Playoff Era",
      "questions": [
        {
          "format": "mcq",
          "q": "The four-team College Football Playoff, which began with the 2014 season, replaced what earlier system?",
          "options": [
            "The BCS (Bowl Championship Series)",
            "The AP Poll Championship",
            "The Coaches Poll Series",
            "The Bowl Alliance"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The College Football Playoff expanded from 4 teams to how many for the 2024 season?",
          "options": [
            "12",
            "8",
            "16",
            "10"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The first-ever four-team CFP, after the 2014 season, featured Ohio State and Oregon in the title game. Which two teams lost in the semifinals?",
          "options": [
            "Alabama and Florida State",
            "Alabama and TCU",
            "Michigan State and Baylor",
            "Georgia and Florida State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Under the 12-team CFP format introduced in 2024, how many teams receive a first-round bye?",
          "options": [
            "4",
            "2",
            "6",
            "8"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "HBCU Football",
      "questions": [
        {
          "format": "mcq",
          "q": "Which conference, made up primarily of HBCUs, includes schools like Jackson State and Southern University?",
          "options": [
            "SWAC",
            "MEAC",
            "CIAA",
            "SIAC"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "The Bayou Classic is an annual rivalry game between Grambling State and which other HBCU?",
          "options": [
            "Southern University",
            "Jackson State",
            "Alcorn State",
            "Prairie View A&M"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Deion Sanders made national headlines coaching which HBCU before moving on to Colorado?",
          "options": [
            "Jackson State",
            "Grambling State",
            "Southern University",
            "Alabama State"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which conference, made up primarily of HBCUs along the East Coast, includes schools like Howard and North Carolina A&T?",
          "options": [
            "MEAC",
            "SWAC",
            "CIAA",
            "Big South"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Eddie Robinson coached for over 50 years and won more games than any coach in the sport at the time of his retirement \u2014 at which HBCU?",
          "options": [
            "Grambling State",
            "Southern University",
            "Jackson State",
            "Florida A&M"
          ],
          "correct": 0
        }
      ]
    },
    {
      "name": "Group of Five & Blue Turf",
      "questions": [
        {
          "format": "mcq",
          "q": "Which Group of Five program plays home games on iconic blue turf, nicknamed 'Smurf Turf'?",
          "options": [
            "Boise State",
            "Fresno State",
            "San Diego State",
            "Nevada"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Boise State's blue turf, installed in 1986, was the first non-green playing surface in college football.",
          "options": [
            "True",
            "False",
            "It was actually the second",
            "It was originally red"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "Which Group of Five program made a surprise four-team CFP appearance after the 2021 season, coached by Luke Fickell?",
          "options": [
            "Cincinnati",
            "UCF",
            "Boise State",
            "Houston"
          ],
          "correct": 0
        },
        {
          "format": "mcq",
          "q": "This Group of Five program went undefeated in 2017 and controversially declared itself 'national champions' despite not playing in the CFP.",
          "options": [
            "UCF",
            "Boise State",
            "Memphis",
            "Houston"
          ],
          "correct": 0
        }
      ]
    }
  ]
};
export type TriviaQuestionBank = typeof QUESTION_BANK;
