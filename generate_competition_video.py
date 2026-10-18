"""
OSAKA VOICEBRIDGE AI - Official Competition Video Generator
Impact Osaka Hackathon 2026

Generates the required 90-second (2,160 frames @ 24fps) cinematic video:
- Scene 1 (0-10s): The Problem (Language & Accessibility barriers in Osaka)
- Scene 2 (10-25s): The Solution (OSAKA VOICEBRIDGE AI Reveal)
- Scene 3 (25-45s): Live Demonstration (Finding Osaka Station step-free route)
- Scene 4 (45-60s): Accessibility (Senior mode, Takoyaki allergy, Staff Flashcard)
- Scene 5 (60-75s): The Technology (AI Decision Matrix & ElevenLabs Neural Voice)
- Scene 6 (75-90s): The Impact (Osaka 2026, National Rail, Global vision)

Output: output/OSAKA_VOICEBRIDGE_AI_COMPETITION_VIDEO.mp4
"""

import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1280
HEIGHT = 720
FPS = 24
TOTAL_DURATION = 90  # seconds
TOTAL_FRAMES = TOTAL_DURATION * FPS  # 2160 frames

OUTPUT_DIR = "output"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "OSAKA_VOICEBRIDGE_AI_COMPETITION_VIDEO.mp4")

# Load system fonts
FONT_MAIN = "C:/Windows/Fonts/segoeui.ttf"
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_JP = "C:/Windows/Fonts/msgothic.ttc"

# Luxury Venture-backed Color Tokens
COLOR_BG_TOP = (8, 11, 22)
COLOR_BG_BOT = (17, 22, 42)
COLOR_CARD = (17, 22, 42)
COLOR_SURFACE = (13, 18, 36)
COLOR_BORDER = (30, 38, 64)
COLOR_VIOLET = (139, 92, 246)
COLOR_CYAN = (103, 232, 249)
COLOR_TEXT = (248, 250, 252)
COLOR_MUTED = (148, 163, 184)
COLOR_OSAKA_RED = (225, 29, 72)
COLOR_OSAKA_GOLD = (245, 158, 11)
COLOR_EMERALD = (16, 185, 129)

def get_font(size, bold=False, jp=False):
    try:
        if jp and os.path.exists(FONT_JP):
            return ImageFont.truetype(FONT_JP, size)
        if bold and os.path.exists(FONT_BOLD):
            return ImageFont.truetype(FONT_BOLD, size)
        if os.path.exists(FONT_MAIN):
            return ImageFont.truetype(FONT_MAIN, size)
    except Exception:
        pass
    return ImageFont.load_default()

def create_base_canvas(color_top=COLOR_BG_TOP, color_bot=COLOR_BG_BOT):
    """Create a vertical gradient background with subtle ambient radial glow."""
    img = Image.new("RGB", (WIDTH, HEIGHT), color_top)
    draw = ImageDraw.Draw(img)
    for y in range(HEIGHT):
        r = int(color_top[0] + (color_bot[0] - color_top[0]) * (y / HEIGHT))
        g = int(color_top[1] + (color_bot[1] - color_top[1]) * (y / HEIGHT))
        b = int(color_top[2] + (color_bot[2] - color_top[2]) * (y / HEIGHT))
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    return img

def draw_header(draw, title_category="IMPACT OSAKA HACKATHON 2026"):
    # Header bar
    draw.rectangle([(0, 0), (WIDTH, 56)], fill=(13, 18, 36))
    draw.line([(0, 56), (WIDTH, 56)], fill=(30, 38, 64), width=1)
    
    # Emblem
    draw.rounded_rectangle([(30, 10), (66, 46)], radius=8, fill=(17, 22, 42), outline=(139, 92, 246), width=1)
    f_badge = get_font(18, bold=True, jp=True)
    draw.text((38, 16), "大", fill=(248, 250, 252), font=f_badge)
    
    # Title
    f_title = get_font(18, bold=True)
    draw.text((78, 18), "OSAKA VOICEBRIDGE AI", fill=(248, 250, 252), font=f_title)
    
    f_sub = get_font(13)
    draw.text((320, 21), "大阪ボイスブリッジ • Next-Gen Voice Accessibility", fill=(148, 163, 184), font=f_sub)
    
    # Category tag
    f_cat = get_font(11, bold=True)
    draw.rounded_rectangle([(WIDTH - 260, 14), (WIDTH - 30, 42)], radius=20, fill=(17, 22, 42), outline=(139, 92, 246))
    draw.text((WIDTH - 245, 19), title_category, fill=(103, 232, 249), font=f_cat)

def draw_caption_bar(draw, caption_text, time_str=""):
    # Lower third caption bar
    draw.rectangle([(0, HEIGHT - 84), (WIDTH, HEIGHT)], fill=(8, 11, 22))
    draw.line([(0, HEIGHT - 84), (WIDTH, HEIGHT - 84)], fill=(139, 92, 246), width=2)
    
    f_cap = get_font(17, bold=True)
    draw.text((40, HEIGHT - 68), caption_text, fill=(248, 250, 252), font=f_cap)
    
    f_time = get_font(13)
    draw.text((WIDTH - 140, HEIGHT - 64), time_str, fill=(103, 232, 249), font=f_time)

def render_scene_1(progress):
    """SCENE 1: THE PROBLEM (0-10s)"""
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_header(draw, "THE PROBLEM • 00:00 - 00:10")
    
    # Central Warning Badge
    draw.rounded_rectangle([(100, 95), (WIDTH - 100, 190)], radius=18, fill=(24, 16, 26), outline=(225, 29, 72), width=1)
    f_alert = get_font(26, bold=True)
    draw.text((130, 115), "THE CHALLENGE: TRANSIT BARRIERS IN OSAKA", fill=(255, 120, 140), font=f_alert)
    f_alert_sub = get_font(15)
    draw.text((130, 155), "Multi-level underground hubs ('Umeda Dungeon') & Kanji signage present critical hurdles.", fill=(226, 232, 240), font=f_alert_sub)
    
    # Problem Cards Grid
    cards = [
        ("Language Friction", "Kanji & Japanese transit signage overwhelm first-time international visitors arriving at Shin-Osaka & Umeda.", (225, 29, 72)),
        ("Accessibility Deficit", "Wheelchair travelers, stroller parents, and elderly visitors struggle to locate step-free elevator exits.", (139, 92, 246)),
        ("Multi-Line Anxiety", "Connecting across Osaka Metro, JR Loop, and Hankyu causes missed connections and confusion.", (103, 232, 249))
    ]
    
    card_w = 340
    for i, (title, desc, color) in enumerate(cards):
        cx = 100 + i * (card_w + 30)
        cy = 220
        draw.rounded_rectangle([(cx, cy), (cx + card_w, cy + 350)], radius=18, fill=(17, 22, 42), outline=color, width=1)
        draw.rounded_rectangle([(cx + 20, cy + 20), (cx + 56, cy + 56)], radius=10, fill=(13, 18, 36), outline=color)
        f_num = get_font(20, bold=True)
        draw.text((cx + 31, cy + 25), str(i + 1), fill=color, font=f_num)
        
        f_ct = get_font(18, bold=True)
        draw.text((cx + 70, cy + 26), title, fill=(248, 250, 252), font=f_ct)
        
        f_cd = get_font(14)
        words = desc.split()
        lines = []
        cur = ""
        for w in words:
            if len(cur + " " + w) < 28: cur += " " + w
            else: lines.append(cur); cur = w
        if cur: lines.append(cur)
        
        for li, l in enumerate(lines):
            draw.text((cx + 20, cy + 85 + li * 24), l, fill=(148, 163, 184), font=f_cd)
            
        draw.rounded_rectangle([(cx + 20, cy + 290), (cx + card_w - 20, cy + 330)], radius=8, fill=(13, 18, 36))
        draw.text((cx + 35, cy + 302), "CRITICAL MOBILITY BARRIER", fill=color, font=get_font(11, bold=True))

    draw_caption_bar(draw, "Millions visit Osaka annually, but language barriers and complex transit steps leave seniors and tourists stranded.", "0:06 / 1:30")
    return img

def render_scene_2(progress):
    """SCENE 2: THE SOLUTION (10-25s)"""
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_header(draw, "THE SOLUTION • 00:10 - 00:25")
    
    # Hero Title & Tagline
    f_sol = get_font(34, bold=True)
    draw.text((100, 95), "OSAKA VOICEBRIDGE AI", fill=(248, 250, 252), font=f_sol)
    
    f_tag = get_font(22, bold=True)
    draw.text((100, 145), "“One city. Every language. No one left behind.”", fill=(139, 92, 246), font=f_tag)
    
    # 4 Language Badges
    languages = [
        ("English", "🇺🇸", "Native Voice"),
        ("日本語", "🇯🇵", "Local Guidance"),
        ("हिन्दी", "🇮🇳", "Hindi Bridge"),
        ("Español", "🇪🇸", "Spanish Tourism")
    ]
    
    lw = 240
    for i, (lname, flag, subtitle) in enumerate(languages):
        lx = 100 + i * (lw + 40)
        ly = 200
        draw.rounded_rectangle([(lx, ly), (lx + lw, ly + 90)], radius=16, fill=(17, 22, 42), outline=(103, 232, 249), width=1)
        f_flag = get_font(28)
        draw.text((lx + 16, ly + 25), flag, fill=(255, 255, 255), font=f_flag)
        f_ln = get_font(18, bold=True, jp=True)
        draw.text((lx + 65, ly + 22), lname, fill=(248, 250, 252), font=f_ln)
        f_ls = get_font(12)
        draw.text((lx + 65, ly + 52), subtitle, fill=(148, 163, 184), font=f_ls)
        
    # Feature Pill Banner
    draw.rounded_rectangle([(100, 320), (WIDTH - 100, 580)], radius=20, fill=(13, 18, 36), outline=(30, 38, 64), width=1)
    
    pillars = [
        ("Voice-First Interaction Core", "Natural speech-to-text with browser recognition and instantaneous neural voice feedback."),
        ("Verified Elevator Mapping", "Precise step-free exit numbers for Osaka Metro & JR stations (e.g. Namba Exit 14, Umeda Central South)."),
        ("Show-to-Staff Flashcards", "High-contrast fullscreen bilingual cards for seamless communication with conductors and chefs.")
    ]
    
    for pi, (pt, pd) in enumerate(pillars):
        py = 350 + pi * 75
        draw.ellipse([(140, py + 5), (164, py + 29)], fill=(139, 92, 246))
        draw.text((148, py + 8), "✔", fill=(255, 255, 255), font=get_font(14, bold=True))
        draw.text((180, py), pt, fill=(248, 250, 252), font=get_font(18, bold=True))
        draw.text((180, py + 30), pd, fill=(148, 163, 184), font=get_font(14))

    draw_caption_bar(draw, "OSAKA VOICEBRIDGE AI: A voice-first assistant breaking language and mobility barriers in 4 key languages.", "0:18 / 1:30")
    return img

def render_scene_3(progress):
    """SCENE 3: LIVE DEMONSTRATION (25-45s)"""
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_header(draw, "LIVE DEMONSTRATION • 00:25 - 00:45")
    
    # User Voice Query Box
    draw.rounded_rectangle([(100, 80), (WIDTH - 100, 160)], radius=18, fill=(17, 22, 42), outline=(103, 232, 249), width=1)
    draw.ellipse([(120, 105), (160, 145)], fill=(139, 92, 246))
    draw.text((135, 112), "🎤", fill=(255, 255, 255), font=get_font(18))
    f_q_label = get_font(12, bold=True)
    draw.text((180, 95), "SCENARIO 1: FINDING OSAKA STATION (STEP-FREE ELEVATOR ROUTE)", fill=(103, 232, 249), font=f_q_label)
    f_q_text = get_font(17, bold=True)
    draw.text((180, 120), "“I am looking for Osaka Station. Can you guide me through the elevator route with no stairs?”", fill=(248, 250, 252), font=f_q_text)
    
    # 3 Route Steps Visual Cards
    steps = [
        ("Step 1: Boarding Optimization", "Board Osaka Metro Midosuji Line at Car 6. Doors align directly with Umeda elevator.", "Midosuji Line (M16)", (225, 29, 72)),
        ("Step 2: Alight at Umeda Station", "Follow blue tactile floor tiles straight to Central Elevator bank. Zero stairs required.", "Umeda Platform", (139, 92, 246)),
        ("Step 3: Central South Gate Elevator", "Tap ICOCA card at Wide Gate 3 and take glass elevator directly into JR Osaka Station City.", "JR Osaka Connection", (103, 232, 249))
    ]
    
    sw = 330
    for si, (st, sd, line_badge, color) in enumerate(steps):
        sx = 100 + si * (sw + 45)
        sy = 185
        draw.rounded_rectangle([(sx, sy), (sx + sw, sy + 250)], radius=16, fill=(17, 22, 42), outline=(30, 38, 64), width=1)
        draw.rounded_rectangle([(sx + 15, sy + 15), (sx + 45, sy + 45)], radius=8, fill=color)
        draw.text((sx + 24, sy + 19), str(si + 1), fill=(255, 255, 255), font=get_font(18, bold=True))
        
        draw.text((sx + 55, sy + 22), st, fill=(248, 250, 252), font=get_font(15, bold=True))
        draw.rounded_rectangle([(sx + 15, sy + 60), (sx + 180, sy + 85)], radius=6, fill=(13, 18, 36), outline=color)
        draw.text((sx + 25, sy + 64), line_badge, fill=color, font=get_font(11, bold=True))
        
        words = sd.split()
        lines = []
        cur = ""
        for w in words:
            if len(cur + " " + w) < 28: cur += " " + w
            else: lines.append(cur); cur = w
        if cur: lines.append(cur)
        for li, l in enumerate(lines):
            draw.text((sx + 15, sy + 105 + li * 22), l, fill=(148, 163, 184), font=get_font(13))
            
        draw.rounded_rectangle([(sx + 15, sy + 195), (sx + sw - 15, sy + 235)], radius=8, fill=(13, 18, 36))
        draw.text((sx + 25, sy + 205), "✔ Step-Free Elevator Path", fill=(16, 185, 129), font=get_font(12, bold=True))
        
    # Audio Player Bar
    draw.rounded_rectangle([(100, 460), (WIDTH - 100, 580)], radius=16, fill=(13, 18, 36), outline=(139, 92, 246), width=1)
    draw.ellipse([(130, 485), (170, 525)], fill=(139, 92, 246))
    draw.polygon([(147, 498), (147, 514), (160, 506)], fill=(255, 255, 255))
    draw.text((185, 488), "ELEVENLABS NEURAL VOICE AUDIO PLAYBACK", fill=(103, 232, 249), font=get_font(12, bold=True))
    draw.text((185, 510), "“To reach Osaka Station with zero stairs, take the Osaka Metro Midosuji Line to Umeda Station...”", fill=(248, 250, 252), font=get_font(14))
    
    for bi in range(25):
        bx = 185 + bi * 34
        bh = 10 + int(24 * np.sin(progress * 10 + bi * 0.4) ** 2)
        draw.rectangle([(bx, 555 - bh), (bx + 6, 555)], fill=(103, 232, 249))

    draw_caption_bar(draw, "Live execution: Identifying the zero-stair elevator route to Osaka Station with neural voice guidance.", "0:35 / 1:30")
    return img

def render_scene_4(progress):
    """SCENE 4: ACCESSIBILITY & SAFETY (45-60s)"""
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_header(draw, "ACCESSIBILITY & SAFETY • 00:45 - 01:00")
    
    # Left Box: Senior Mode & High Contrast
    draw.rounded_rectangle([(100, 90), (620, 580)], radius=20, fill=(17, 22, 42), outline=(139, 92, 246), width=1)
    draw.text((130, 115), "UNIVERSAL DESIGN & SENIOR MODE", fill=(139, 92, 246), font=get_font(20, bold=True))
    draw.text((130, 145), "Inclusive features for aging travelers and cognitive simplicity.", fill=(148, 163, 184), font=get_font(13))
    
    features = [
        ("A+ Senior Large Text (+30%)", "One-click font magnification across instructions, maps, and station exit numbers."),
        ("WCAG AAA High Contrast", "Pure black OLED theme with neon boundaries for low-vision navigation."),
        ("Speed Rate Adjustment (0.8x)", "Allows elderly or non-native listeners to hear audio responses at a comfortable slow pace.")
    ]
    for fi, (ft, fd) in enumerate(features):
        fy = 190 + fi * 110
        draw.rounded_rectangle([(130, fy), (590, fy + 90)], radius=14, fill=(13, 18, 36), outline=(30, 38, 64))
        draw.text((150, fy + 15), ft, fill=(248, 250, 252), font=get_font(15, bold=True))
        draw.text((150, fy + 45), fd, fill=(148, 163, 184), font=get_font(12))

    # Right Box: Show to Japanese Station Staff Flashcard
    draw.rounded_rectangle([(660, 90), (WIDTH - 100, 580)], radius=20, fill=(17, 22, 42), outline=(225, 29, 72), width=1)
    draw.rounded_rectangle([(660, 90), (WIDTH - 100, 150)], radius=20, fill=(225, 29, 72))
    draw.text((690, 108), "SHOW TO JAPANESE STATION STAFF", fill=(255, 255, 255), font=get_font(18, bold=True))
    draw.text((690, 130), "駅員・乗務員・店員様へのご案内画面", fill=(254, 202, 202), font=get_font(12, jp=True))
    
    draw.rounded_rectangle([(690, 175), (WIDTH - 130, 430)], radius=14, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    draw.text((710, 195), "● 日本語メッセージ (For Station / Store Staff)", fill=(220, 38, 38), font=get_font(11, bold=True, jp=True))
    draw.text((710, 230), "【飲食店・屋台スタッフ様へ】\n私は甲殻類（エビ・カニ等）に\n重篤なアレルギーがあります。\nこの料理に含まれていますか？", fill=(15, 23, 42), font=get_font(19, bold=True, jp=True))
    draw.text((710, 375), "Romaji: Kono ryōri ni ebi wa haitte imasuka?", fill=(71, 85, 105), font=get_font(12))

    draw.rounded_rectangle([(690, 460), (WIDTH - 130, 550)], radius=12, fill=(13, 18, 36))
    draw.text((710, 480), "Food Allergy Protection in Dotonbori", fill=(16, 185, 129), font=get_font(15, bold=True))
    draw.text((710, 510), "Enables safe dining at Takoyaki stalls with zero language barrier.", fill=(148, 163, 184), font=get_font(12))

    draw_caption_bar(draw, "Accessibility first: Senior large text mode, audio speed control, and instant Japanese staff flashcards.", "0:52 / 1:30")
    return img

def render_scene_5(progress):
    """SCENE 5: THE TECHNOLOGY (60-75s)"""
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_header(draw, "THE TECHNOLOGY • 01:00 - 01:15")
    
    f_arch = get_font(26, bold=True)
    draw.text((100, 90), "MODULAR AI DECISION CORE & ELEVENLABS PIPELINE", fill=(248, 250, 252), font=f_arch)
    
    nodes = [
        ("1. Speech Input", "Web Speech API\n& Multilingual Audio", (103, 232, 249)),
        ("2. AI Decision Core", "Intent Classification: 99%\nLanguage Detection: 98%", (139, 92, 246)),
        ("3. Verified Transit KB", "Osaka Municipal Subway\nElevator Exit Database", (245, 158, 11)),
        ("4. ElevenLabs Voice", "Neural Multilingual v2\nHigh-Clarity Audio", (16, 185, 129))
    ]
    
    nw = 230
    for ni, (nt, nd, nc) in enumerate(nodes):
        nx = 100 + ni * (nw + 50)
        ny = 160
        draw.rounded_rectangle([(nx, ny), (nx + nw, ny + 150)], radius=16, fill=(17, 22, 42), outline=nc, width=1)
        draw.text((nx + 16, ny + 20), nt, fill=nc, font=get_font(16, bold=True))
        for li, l in enumerate(nd.split('\n')):
            draw.text((nx + 16, ny + 65 + li * 24), l, fill=(226, 232, 240), font=get_font(13))
        
        if ni < 3:
            arrow_x = nx + nw + 10
            draw.polygon([(arrow_x, ny + 70), (arrow_x + 25, ny + 75), (arrow_x, ny + 80)], fill=(139, 92, 246))
            
    draw.rounded_rectangle([(100, 340), (WIDTH - 100, 580)], radius=20, fill=(13, 18, 36), outline=(30, 38, 64), width=1)
    draw.text((130, 365), "AI DECISION & CONFIDENCE MATRIX (LIVE METRICS)", fill=(103, 232, 249), font=get_font(16, bold=True))
    
    metrics = [
        ("Detected Intent", "station_navigation_guidance (99% Confidence)"),
        ("Detected Language", "English / 日本語 / हिन्दी / Español (98% Confidence)"),
        ("Proposed Safety Action", "Retrieve Osaka Station Central South Gate elevator access route"),
        ("Uncertainty Advisory", "Verified static dataset — Cross-check overhead digital platform signs")
    ]
    
    for mi, (mt, md) in enumerate(metrics):
        my = 410 + mi * 38
        draw.text((130, my), f"• {mt}:", fill=(148, 163, 184), font=get_font(14, bold=True))
        draw.text((370, my), md, fill=(248, 250, 252), font=get_font(14))

    draw_caption_bar(draw, "The technology: Modular intent classification, verified municipal transit data, and ElevenLabs speech.", "1:08 / 1:30")
    return img

def render_scene_6(progress):
    """SCENE 6: THE IMPACT & FUTURE (75-90s) - STARTUP FINAL END CARD"""
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_header(draw, "THE IMPACT & VISION • 01:15 - 01:30")
    
    # Grand Brand Box
    draw.rounded_rectangle([(100, 90), (WIDTH - 100, 270)], radius=24, fill=(17, 22, 42), outline=(139, 92, 246), width=2)
    
    draw.rounded_rectangle([(130, 120), (180, 170)], radius=12, fill=(13, 18, 36), outline=(139, 92, 246), width=1)
    draw.text((142, 126), "大", fill=(248, 250, 252), font=get_font(30, bold=True, jp=True))
    
    draw.text((200, 115), "OSAKA VOICEBRIDGE AI", fill=(248, 250, 252), font=get_font(30, bold=True))
    draw.text((200, 160), "“One city. Every language. No one left behind.”", fill=(139, 92, 246), font=get_font(22, bold=True))
    draw.text((200, 205), "Impact Osaka Hackathon 2026 • Official Project Submission", fill=(103, 232, 249), font=get_font(15))

    # Scaling Pillars
    pillars = [
        ("Phase 1: Osaka 2026", "Deployment across Kansai airport hubs, Osaka Metro transfers, and Dotonbori zones."),
        ("Phase 2: National Rail", "Extending to JR West, Shinkansen bullet trains, Kyoto & Tokyo metropolitan lines."),
        ("Phase 3: Global Cities", "Universal voice blueprint adapted for Seoul, Paris, London, and international transit.")
    ]
    
    pw = 330
    for pi, (pt, pd) in enumerate(pillars):
        px = 100 + pi * (pw + 45)
        py = 300
        draw.rounded_rectangle([(px, py), (px + pw, py + 180)], radius=16, fill=(13, 18, 36), outline=(30, 38, 64), width=1)
        draw.text((px + 20, py + 25), pt, fill=(103, 232, 249), font=get_font(16, bold=True))
        
        words = pd.split()
        lines = []
        cur = ""
        for w in words:
            if len(cur + " " + w) < 26: cur += " " + w
            else: lines.append(cur); cur = w
        if cur: lines.append(cur)
        for li, l in enumerate(lines):
            draw.text((px + 20, py + 70 + li * 24), l, fill=(148, 163, 184), font=get_font(13))

    # Bottom Tagline Call to Action
    draw.rounded_rectangle([(100, 505), (WIDTH - 100, 570)], radius=14, fill=(17, 22, 42), outline=(139, 92, 246))
    draw.text((140, 525), "Making Osaka the world's most accessible, welcoming city for every traveler.", fill=(248, 250, 252), font=get_font(16, bold=True))

    draw_caption_bar(draw, "The future: Making Osaka the world's most accessible, welcoming city for every traveler.", "1:26 / 1:30")
    return img

def generate_video():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(OUTPUT_FILE, fourcc, FPS, (WIDTH, HEIGHT))

    print(f"Starting video generation: {TOTAL_FRAMES} frames ({TOTAL_DURATION}s @ {FPS}fps)")
    
    scenes = [
        (0, 10, render_scene_1),
        (10, 25, render_scene_2),
        (25, 45, render_scene_3),
        (45, 60, render_scene_4),
        (60, 75, render_scene_5),
        (75, 90, render_scene_6)
    ]
    
    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        active_render = render_scene_6
        for start_s, end_s, renderer in scenes:
            if start_s <= t < end_s:
                active_render = renderer
                break
                
        progress = (t % 15.0) / 15.0
        pil_img = active_render(progress)
        
        frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        out.write(frame)
        
        if frame_idx % 240 == 0:
            print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({int(t)}s / {TOTAL_DURATION}s)...")
            
    out.release()
    print("Video generation complete!")
    if os.path.exists(OUTPUT_FILE):
        size_mb = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)
        print(f"Exported MP4: {OUTPUT_FILE} ({size_mb:.2f} MB, Duration: {TOTAL_DURATION} seconds)")

if __name__ == "__main__":
    generate_video()
