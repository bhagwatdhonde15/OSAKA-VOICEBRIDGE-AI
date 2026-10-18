"""
Osaka Transit, Landmark & Accessibility Database
Impact Osaka Hackathon 2026
Tagline: “One city. Every language. No one left behind.”
"""

from typing import Dict, Any, List

OSAKA_STATIONS: Dict[str, Dict[str, Any]] = {
    "umeda": {
        "id": "umeda",
        "name_en": "Osaka / Umeda Station",
        "name_ja": "大阪駅 / 梅田駅",
        "romaji": "Ōsaka Eki / Umeda Eki",
        "lines": ["JR Osaka Loop Line", "Osaka Metro Midosuji Line (M16)", "Tanimachi Line (T20)", "Yotsubashi Line (Y11)", "Hankyu", "Hanshin"],
        "coordinates": {"lat": 34.7024, "lng": 135.4959},
        "district": "Kita (North Osaka Center)",
        "accessible_exits": [
            {
                "exit": "Central South Gate (Osaka Station City)",
                "features": ["High-capacity glass elevator", "Level connection to Grand Front Osaka & Lucua 1100", "English & multilingual tactile braille guide"],
                "best_for": "Finding Osaka Station with zero stairs from Metro Midosuji Line"
            },
            {
                "exit": "Exit 11 / Hankyu Department Connection",
                "features": ["Step-free ramp", "Senior rest lounge nearby", "Universal accessible restroom"],
                "best_for": "Navigating underground Umeda labyrinth ('Umeda Dungeon') safely"
            }
        ],
        "boarding_tips": "To reach Osaka Station from Midosuji Line, board at Car 6 for direct elevator access to the Central South Gate concourse.",
        "quiet_rest_zones": "JR Osaka Station City 5F 'Toki-no-Hiroba' (Time and Space Plaza) spacious benches and elevators."
    },
    "namba": {
        "id": "namba",
        "name_en": "Namba Station",
        "name_ja": "なんば駅 / 難波駅",
        "romaji": "Namba Eki",
        "lines": ["Midosuji Line (M20)", "Sennichimae Line (S16)", "Yotsubashi Line (Y15)", "Nankai Main Line", "Kintetsu-Hanshin"],
        "coordinates": {"lat": 34.6669, "lng": 135.5015},
        "district": "Minami (South Osaka Center)",
        "accessible_exits": [
            {
                "exit": "Exit 14 (Elevator Equipped)",
                "features": ["Street elevator directly to Midosuji Boulevard", "2-minute level walk to Dotonbori Glico sign", "Tactile paving guide"],
                "best_for": "Direct barrier-free route to Dotonbori Canal"
            },
            {
                "exit": "Exit 4 / Namba Walk",
                "features": ["Underground shopping concourse elevator", "Flat step-free path", "Multipurpose accessible restroom"],
                "best_for": "Rainy day senior navigation with low fatigue"
            }
        ],
        "boarding_tips": "Board Midosuji Line at Car 4 or Car 6 for wheelchair bays and minimal platform-train gap.",
        "quiet_rest_zones": "Namba SkyO 2F lounge and Namba Parks level 2 benches."
    },
    "shin_osaka": {
        "id": "shin_osaka",
        "name_en": "Shin-Osaka Station",
        "name_ja": "新大阪駅",
        "romaji": "Shin-Ōsaka Eki",
        "lines": ["Tokaido/Sanyo Shinkansen", "Osaka Metro Midosuji Line (M13)", "JR Kyoto/Kobe Line"],
        "coordinates": {"lat": 34.7335, "lng": 135.5003},
        "district": "Yodogawa",
        "accessible_exits": [
            {
                "exit": "Central Shinkansen Transfer Concourse (3F to 2F)",
                "features": ["Dual wide elevators", "Continuous braille blocks to Midosuji Line gate", "Multilingual Travel Service Center"],
                "best_for": "Bullet train transfer with heavy luggage or mobility aids"
            }
        ],
        "boarding_tips": "Use Elevator E-2 beside Shinkansen Central Gate to reach Osaka Metro Midosuji Line concourse with zero stairs.",
        "quiet_rest_zones": "3F Waiting Lounge beside Shinkansen Central Gate."
    },
    "osaka_castle": {
        "id": "osaka_castle",
        "name_en": "Osaka Castle / Tanimachi 4-chome Station",
        "name_ja": "大阪城 / 谷町四丁目駅",
        "romaji": "Ōsakajō / Tanimachi Yonchōme Eki",
        "lines": ["Tanimachi Line (T23)", "Chuo Line (C18)", "JR Osaka Loop Line (Osakajokoen)"],
        "coordinates": {"lat": 34.6873, "lng": 135.5262},
        "district": "Chuo Ward",
        "accessible_exits": [
            {
                "exit": "Tanimachi 4-chome Exit 1-B",
                "features": ["Elevator directly to Osaka History Museum plaza", "Barrier-free ramp entering Otemon Gate"],
                "best_for": "Zero-stair access to Osaka Castle grounds"
            }
        ],
        "boarding_tips": "Take the 300-yen electric road-train cart from Otemon gate up to the Castle Keep. Dedicated senior elevator to 8F observation deck.",
        "quiet_rest_zones": "Miraiza Osaka-jo 1F air-conditioned rest lounge."
    },
    "dotonbori": {
        "id": "dotonbori",
        "name_en": "Dotonbori Street",
        "name_ja": "道頓堀",
        "romaji": "Dōtonbori",
        "lines": ["Osaka Metro Namba Station (M20)"],
        "coordinates": {"lat": 34.6687, "lng": 135.5013},
        "district": "Minami",
        "accessible_exits": [
            {
                "exit": "Namba Station Exit 14",
                "features": ["Direct street elevator", "Step-free path to Ebisu Bridge"],
                "best_for": "Street food & Takoyaki stalls"
            }
        ],
        "boarding_tips": "Tonbori River Walk has gentle wheelchair ramps at Ebisu Bridge.",
        "quiet_rest_zones": "Dotonbori Riverside benches east of Nipponbashi bridge."
    }
}

TRANSIT_LINES = [
    {
        "id": "midosuji",
        "name": "Osaka Metro Midosuji Line",
        "symbol": "M",
        "color": "#E5171F",
        "textColor": "#FFFFFF",
        "key_stops": ["Shin-Osaka (M13)", "Umeda / Osaka Station (M16)", "Shinsaibashi (M19)", "Namba (M20)", "Tennoji (M23)"],
        "frequency": "Every 2-4 minutes",
        "accessibility_rating": "High (All stations 100% elevator equipped with platform screen doors)"
    },
    {
        "id": "jr_loop",
        "name": "JR Osaka Loop Line (Kanjo-sen)",
        "symbol": "O",
        "color": "#F15A22",
        "textColor": "#FFFFFF",
        "key_stops": ["Osaka (JR-O11)", "Kyobashi (JR-O08)", "Osakajokoen (JR-O07)", "Tennoji (JR-O01)"],
        "frequency": "Every 3-5 minutes",
        "accessibility_rating": "High (Step-free platform boarding ramps available from station master)"
    }
]

ESSENTIAL_PHRASES = [
    {
        "id": "phrase_osaka_station",
        "category": "transit",
        "title": "Finding Osaka Station Elevator",
        "english": "Excuse me, how do I reach Osaka Station using the elevator?",
        "japanese": "すみません、エレベーターを使って大阪駅へ行くにはどう行けばいいですか？",
        "romaji": "Sumimasen, erebētā o tsukatte Ōsaka-eki e iku ni wa dō ikeba ii desu ka?",
        "furigana": "すみません、エレベーターを使（つか）って大阪駅（おおさかえき）へ行（い）くにはどう行（い）けばいいですか？",
        "context": "Essential for international travelers arriving in Umeda seeking step-free access to JR Osaka Station.",
        "station_staff_card": "【駅員様へ】足が不自由または大きな荷物があります。エレベーターでJR大阪駅へ行く道順を教えてください。(Traveler requests step-free elevator directions to JR Osaka Station.)"
    },
    {
        "id": "phrase_allergy_shrimp",
        "category": "food_dietary",
        "title": "Takoyaki Food Allergy Check",
        "english": "Excuse me, does this Takoyaki or sauce contain shrimp or shellfish? I have a severe allergy.",
        "japanese": "すみません、このたこ焼きやタレにエビや甲殻類は入っていますか？アレルギーがあります。",
        "romaji": "Sumimasen, kono takoyaki ya tare ni ebi ya kōkakurui wa haitte imasuka? Arerugī ga arimasu.",
        "furigana": "すみません、このたこ焼（や）きやタレにエビや甲殻類（こうかくるい）は入（はい）っていますか？アレルギーがあります。",
        "context": "Protects international travelers dining at Osaka street food stalls from seafood cross-contamination.",
        "station_staff_card": "【飲食店・屋台スタッフ様へ】\n私は甲殻類（エビ・カニ等）に重篤なアレルギーがあります。\nこの料理や出汁・タレに含まれていますか？\n(Customer has serious shellfish allergy. Does this food contain shrimp/crab?)"
    },
    {
        "id": "phrase_icoca_purchase",
        "category": "transit",
        "title": "Simplified Travel & ICOCA Tap",
        "english": "Can you explain in simple steps how to buy an ICOCA card and tap into the subway?",
        "japanese": "イコカ（ICOCA）カードの買い方と、改札の通り方を簡単に教えてください。",
        "romaji": "Ikoka kādo no kaikata to, kaisatsu no tōrikata o kantan ni oshiete kudasai.",
        "furigana": "ICOCA（イコカ）カードの買（か）い方（かた）と、改札（かいさつ）の通（とお）り方（かた）を簡単（かんたん）に教（おし）えてください。",
        "context": "Clear instructions for first-time visitors using Osaka's contactless smart transit card.",
        "station_staff_card": "【駅員様へ】ICOCAカードの購入とチャージ、改札の通り方を教えていただけますか？(Traveler requesting assistance to buy or tap ICOCA transit card.)"
    }
]

DEMO_SCENARIOS = [
    {
        "id": "scenario_find_osaka_station",
        "title": "Scenario 1: Finding Osaka Station",
        "subtitle": "Step-Free Elevator Route to JR Osaka Station / Umeda",
        "badge": "Station Navigation",
        "user_query": "I am looking for Osaka Station. Can you guide me through the elevator route with no stairs?",
        "destination": "Osaka / Umeda Station",
        "origin": "Current Location",
        "category": "directions",
        "icon": "train"
    },
    {
        "id": "scenario_simple_instructions",
        "title": "Scenario 2: Simpler Travel Directions",
        "subtitle": "Simplified Midosuji Line & ICOCA Tap Guide",
        "badge": "Simplified Transit",
        "user_query": "I feel overwhelmed by the transit maps. Please give me simpler travel directions for the Midosuji subway and ICOCA card.",
        "destination": "Osaka / Umeda Station",
        "origin": "Shin-Osaka Station",
        "category": "transit",
        "icon": "accessibility"
    },
    {
        "id": "scenario_essential_phrase",
        "title": "Scenario 3: Translating an Essential Phrase",
        "subtitle": "Food Allergy Verification & Station Staff Flashcard",
        "badge": "Voice Translation",
        "user_query": "How do I ask if Takoyaki has shrimp or shellfish? I need to show a clear Japanese card to the street food vendor.",
        "destination": "Dotonbori",
        "origin": "Current Location",
        "category": "translation",
        "icon": "languages"
    }
]
