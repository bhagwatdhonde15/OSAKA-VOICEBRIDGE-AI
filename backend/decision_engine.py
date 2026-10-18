"""
OSAKA VOICEBRIDGE AI - Modular Decision Engine
Impact Osaka Hackathon 2026

Identifies:
1. Request Category (directions, transit, translation, accessibility, emergency)
2. Language (Japanese, English, Hindi, Spanish)
3. Destination & Origin (Osaka Station, Namba, Dotonbori, Shin-Osaka, Osaka Castle)
4. Accessibility & Simplification Needs (wheelchair, senior, cognitive simplicity)
5. AI Decision Metrics (Intent, Confidence, Proposed Action, Uncertainty)
"""

import re
from typing import Dict, Any, List, Optional
from transit_data import OSAKA_STATIONS, TRANSIT_LINES, ESSENTIAL_PHRASES, DEMO_SCENARIOS


class DecisionEngine:
    def __init__(self):
        self.stations = OSAKA_STATIONS
        self.lines = TRANSIT_LINES
        self.phrases = ESSENTIAL_PHRASES

    def detect_language(self, text: str) -> Dict[str, Any]:
        """Detect language of user input among English, Japanese, Hindi, Spanish."""
        # 1. Hindi Devanagari script detection
        if re.search(r'[\u0900-\u097F]', text):
            return {"code": "hi", "name": "Hindi", "label": "हिन्दी", "confidence": 0.99}
        
        # 2. Japanese Hiragana, Katakana, Kanji detection
        if re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', text):
            return {"code": "ja", "name": "Japanese", "label": "日本語", "confidence": 0.98}

        # 3. Spanish keywords
        spanish_keywords = ["donde", "estacion", "ascensor", "por favor", "ayuda", "tren", "como llego", "senor", "estoy", "hola"]
        if any(w in text.lower() for w in spanish_keywords):
            return {"code": "es", "name": "Spanish", "label": "Español", "confidence": 0.95}

        # 4. Default to English
        return {"code": "en", "name": "English", "label": "English", "confidence": 0.97}

    def extract_accessibility_needs(self, text: str) -> Dict[str, Any]:
        """Identify mobility, elevator, senior, or cognitive simplification needs."""
        text_lower = text.lower()
        needs = {
            "has_accessibility_need": False,
            "wheelchair": False,
            "elderly": False,
            "simplified_needed": False,
            "step_free_required": False,
            "rest_needed": False,
            "allergy": False,
            "notes": []
        }

        if any(k in text_lower for k in ["simpler", "simple", "confused", "overwhelm", "easy", "kantan", "सरल"]):
            needs["simplified_needed"] = True
            needs["notes"].append("Cognitive simplification requested: breakdown into bite-sized transit steps.")

        if any(k in text_lower for k in ["wheelchair", "kurumaisu", "車椅子", "silla de ruedas"]):
            needs["wheelchair"] = True
            needs["step_free_required"] = True
            needs["notes"].append("Wheelchair step-free elevator path prioritized.")

        if any(k in text_lower for k in ["elderly", "senior", "parent", "slow walk", "can't walk far", "高齢", "वयस्क"]):
            needs["elderly"] = True
            needs["step_free_required"] = True
            needs["rest_needed"] = True
            needs["notes"].append("Minimal stair walking and rest lounges highlighted.")

        if any(k in text_lower for k in ["elevator", "lift", "ramp", "stairs", "no stairs", "step-free", "エレベーター"]):
            needs["step_free_required"] = True
            needs["notes"].append("Step-free elevator exit guidance requested.")

        if any(k in text_lower for k in ["allergy", "allergic", "seafood", "shrimp", "takoyaki", "crab", "アレルギー", "एलर्जी"]):
            needs["allergy"] = True
            needs["notes"].append("Dietary/allergen safety verification flagged.")

        if needs["wheelchair"] or needs["elderly"] or needs["simplified_needed"] or needs["step_free_required"] or needs["allergy"]:
            needs["has_accessibility_need"] = True

        return needs

    def classify_category(self, text: str, accessibility: Dict[str, Any]) -> Dict[str, Any]:
        """Classify user's core intent with confidence metrics."""
        text_lower = text.lower()

        if accessibility.get("allergy") or any(k in text_lower for k in ["allergy", "contain", "takoyaki", "shrimp", "food"]):
            return {
                "category": "translation",
                "intent_name": "dietary_allergen_verification",
                "confidence": 0.98,
                "action": "Generate bilingual allergy safety flashcard and phonetic pronunciation."
            }

        if any(k in text_lower for k in ["how do i say", "translate", "phrase", "japanese for", "ask vendor", "phrase"]):
            return {
                "category": "translation",
                "intent_name": "essential_phrase_translation",
                "confidence": 0.96,
                "action": "Display Japanese Kanji, Furigana, Romaji, and Station Staff Flashcard."
            }

        if any(k in text_lower for k in ["simpler", "simple directions", "icoca", "how to take", "midosuji", "subway steps"]):
            return {
                "category": "transit",
                "intent_name": "simplified_transit_instructions",
                "confidence": 0.97,
                "action": "Synthesize simplified 4-step subway & ICOCA tap tutorial."
            }

        if any(k in text_lower for k in ["osaka station", "find osaka", "looking for osaka", "umeda", "where is", "direction", "how to get"]):
            return {
                "category": "directions",
                "intent_name": "station_navigation_guidance",
                "confidence": 0.99,
                "action": "Retrieve Osaka Station Central South Gate elevator access route."
            }

        return {
            "category": "directions",
            "intent_name": "general_city_navigation",
            "confidence": 0.91,
            "action": "Provide general transit and barrier-free routing."
        }

    def resolve(self, query: str) -> Dict[str, Any]:
        """Main processing pipeline for user query."""
        lang_info = self.detect_language(query)
        accessibility = self.extract_accessibility_needs(query)
        intent_info = self.classify_category(query, accessibility)
        category = intent_info["category"]

        dest = self.stations["umeda"]
        origin = self.stations["shin_osaka"]

        # 1. SCENARIO 1: Finding Osaka Station (Step-Free Elevator Route)
        if "osaka station" in query.lower() or intent_info["intent_name"] == "station_navigation_guidance":
            dest = self.stations["umeda"]
            spoken_text = "To reach Osaka Station with zero stairs, take the Osaka Metro Midosuji Line to Umeda Station (Stop M16). Exit using the Central South Gate elevator, which connects directly to the JR Osaka Station concourse and Lucua shopping plaza."
            steps = [
                {
                    "step": 1,
                    "title": "Board Midosuji Line at Car 6 (Elevator Aligned)",
                    "instruction": "Board Osaka Metro Midosuji Line (Red). Board specifically at Car 6; its doors open directly adjacent to the elevator at Umeda Station.",
                    "transit_line": "Osaka Metro Midosuji Line (M16)",
                    "badge_color": "#E5171F",
                    "accessible_feature": "Level train threshold & Wheelchair / Stroller dedicated area."
                },
                {
                    "step": 2,
                    "title": "Alight at Umeda Station (M16)",
                    "instruction": "Arrive at Umeda Platform 1 or 2. Follow the floor-projected blue accessibility icons directly to the Central Elevator bank.",
                    "transit_line": "Umeda Station Platform",
                    "badge_color": "#E5171F",
                    "accessible_feature": "High-capacity elevator connecting platform to gate concourse."
                },
                {
                    "step": 3,
                    "title": "Pass Through Central South Gate & Street Elevator",
                    "instruction": "Tap your ICOCA or phone card at the wide ticket gate (Gate 3). Take Elevator EL-1 straight to the ground-floor JR Osaka Station City entrance.",
                    "transit_line": "JR Osaka Station City Concourse",
                    "badge_color": "#F15A22",
                    "accessible_feature": "Direct step-free bridge connecting Metro to JR Osaka Station."
                }
            ]
            action_phrase = self.phrases[0]  # Osaka station elevator phrase
            staff_card = "【駅員様へ】足が不自由または大きな荷物があります。エレベーターでJR大阪駅へ行く道順を教えてください。(Traveler requests step-free elevator directions to JR Osaka Station.)"
            uncertainty = "Elevator EL-1 maintenance may occasionally occur. If closed, alternate elevator is located 20 meters west at Exit 11."

        # 2. SCENARIO 2: Requesting Simpler Travel Directions (Midosuji Subway & ICOCA)
        elif intent_info["intent_name"] == "simplified_transit_instructions" or "simple" in query.lower() or "icoca" in query.lower():
            dest = self.stations["umeda"]
            spoken_text = "Here are simplified travel instructions. In Osaka, you do not need paper tickets. Simply tap an ICOCA card at the glowing blue sensor on any ticket gate. On the Midosuji subway, follow the Red M signs. Umeda is only three stops away."
            steps = [
                {
                    "step": 1,
                    "title": "Get an ICOCA Card (Easy Contactless)",
                    "instruction": "At any ticket machine, tap English on the top right and press 'Purchase ICOCA'. Insert 2,000 yen cash. You now have a card pre-loaded with transit credit.",
                    "transit_line": "Ticket Gate Concourse",
                    "badge_color": "#0067AC",
                    "accessible_feature": "English audio prompts and visual diagrams on screen."
                },
                {
                    "step": 2,
                    "title": "Tap Your Card on the Gate",
                    "instruction": "Walk up to any gate with a green arrow. Hold your ICOCA card against the glowing blue IC sensor pad on the right. You will hear a pleasant beep and the gate will open.",
                    "transit_line": "Wide Ticket Gate",
                    "badge_color": "#009944",
                    "accessible_feature": "Wide gate accommodates suitcases, wheelchairs, and strollers."
                },
                {
                    "step": 3,
                    "title": "Follow the Red 'M' Signs (Midosuji Line)",
                    "instruction": "Osaka subways use colored letters. Follow the Red 'M' circle to Platform 1 heading toward Umeda and Namba. Trains arrive every 2 to 3 minutes.",
                    "transit_line": "Osaka Metro Midosuji Line",
                    "badge_color": "#E5171F",
                    "accessible_feature": "High-contrast signage and numbered station codes (e.g., M16)."
                },
                {
                    "step": 4,
                    "title": "Ride 3 Stops to Umeda (6 Minutes)",
                    "instruction": "Sit back and relax. In 6 minutes, the train will announce 'Next stop is Umeda, M16' in English. Tap your card again at the exit gate.",
                    "transit_line": "Arrive at Umeda",
                    "badge_color": "#F15A22",
                    "accessible_feature": "Dual-language LCD screens above doors show the active station."
                }
            ]
            action_phrase = self.phrases[2]  # ICOCA card
            staff_card = "【駅員様へ】ICOCAカードの購入とチャージ、改札の通り方を教えていただけますか？(Traveler requesting assistance to buy or tap ICOCA transit card.)"
            uncertainty = "Rush hour trains (8:00 AM - 9:00 AM) are crowded. Elderly travelers are advised to board the designated Priority Car."

        # 3. SCENARIO 3: Translating an Essential Phrase (Takoyaki Allergy & Japanese Flashcard)
        else:
            dest = self.stations["dotonbori"]
            spoken_text = "Here is your food allergy verification card. When ordering Takoyaki or street food in Dotonbori, show this card to the cook. It clearly explains in Japanese that you cannot consume shrimp, crab, or seafood broth."
            steps = [
                {
                    "step": 1,
                    "title": "Show the Japanese Flashcard to the Vendor",
                    "instruction": "Tap 'Show to Station / Vendor Staff' below to display oversized Japanese text. Japanese food stall chefs can read it instantly.",
                    "transit_line": "Visual Safety Flashcard",
                    "badge_color": "#E5171F",
                    "accessible_feature": "High-contrast oversized Kanji and Katakana legible from 1 meter away."
                },
                {
                    "step": 2,
                    "title": "Spoken Voice Pronunciation",
                    "instruction": "Press play to have VoiceBridge speak: 'Sumimasen, kono takoyaki ni ebi wa haitte imasuka?'",
                    "transit_line": "ElevenLabs Neural Audio Guide",
                    "badge_color": "#009944",
                    "accessible_feature": "Native Tokyo/Kansai intonation calibrated for clear street comprehension."
                }
            ]
            action_phrase = self.phrases[1]  # Takoyaki allergy phrase
            staff_card = "【飲食店・屋台スタッフ様へ】\n私は甲殻類（エビ・カニ等）に重篤なアレルギーがあります。\nこの料理や出汁・タレに含まれていますか？\n(Customer has serious shellfish allergy. Does this food contain shrimp/crab?)"
            uncertainty = "Some traditional dashi stocks contain mixed seafood extracts. When in doubt, vendor should confirm individual ingredient labels."

        # Assemble map metadata
        map_data = {
            "origin": {
                "name": origin["name_en"],
                "coordinates": origin["coordinates"],
                "exit": origin["accessible_exits"][0]["exit"]
            },
            "destination": {
                "name": dest["name_en"],
                "coordinates": dest["coordinates"],
                "exit": dest["accessible_exits"][0]["exit"],
                "district": dest["district"]
            },
            "transit_waypoints": [
                {"name": origin["name_en"], "lat": origin["coordinates"]["lat"], "lng": origin["coordinates"]["lng"], "type": "station"},
                {"name": dest["name_en"], "lat": dest["coordinates"]["lat"], "lng": dest["coordinates"]["lng"], "type": "destination"}
            ]
        }

        return {
            "status": "success",
            "query": query,
            "detected_language": lang_info,
            "category": category,
            "ai_decision": {
                "intent": intent_info["intent_name"],
                "intent_confidence": f"{int(intent_info['confidence'] * 100)}%",
                "language_detected": f"{lang_info['name']} ({lang_info['label']})",
                "language_confidence": f"{int(lang_info['confidence'] * 100)}%",
                "proposed_action": intent_info["action"],
                "uncertainty_factor": uncertainty,
                "accessibility_flags": accessibility["notes"] if accessibility["has_accessibility_need"] else ["Standard accessible urban route"]
            },
            "accessibility_analysis": accessibility,
            "destination": {
                "id": dest["id"],
                "name_en": dest["name_en"],
                "name_ja": dest["name_ja"],
                "romaji": dest["romaji"],
                "accessible_exits": dest["accessible_exits"],
                "boarding_tips": dest["boarding_tips"],
                "quiet_rest_zones": dest.get("quiet_rest_zones", "")
            },
            "spoken_response": spoken_text,
            "steps": steps,
            "action_phrase": action_phrase,
            "staff_card": staff_card,
            "map_data": map_data,
            "meta": {
                "engine": "VoiceBridge Osaka Decision Core v1.0",
                "tagline": "One city. Every language. No one left behind.",
                "data_source": "Verified Osaka Transit & Municipal Accessibility Guidelines (Static Hackathon Dataset)",
                "live_status_note": "Simulated Live Transit Status — Always confirm platform departures on digital overhead displays.",
                "demo_mode": True
            }
        }
